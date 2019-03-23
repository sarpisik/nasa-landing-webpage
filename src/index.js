import getElement from './selector'
import form from './form'
import 'normalize.css'
import './index.css'

window.addEventListener('load', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!')
  }

  // If the browser supports serviceWorker, register our service worker.
  // Else, do nothing.
  if ('serviceWorker' in navigator) {
    // Registering Our Service Worker for offline usability.
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  }

  // Shutdown loading screen after 2s
  const el = getElement('.intro-loader')
  setTimeout(() => {
    el.parentNode.removeChild(el)
  }, 2000)

  // Form component of search bar.
  // If the form filled, do search. Else, display alert box.
  form((res, ...props) => (res ? lazySearch(...props) : lazyAlert(...props)))
})

// Lazy loading functions
function lazySearch(...props) {
  import(/* webpackChunkName: "search" */ './search').then(module => {
    // Search component
    const doSearch = module.default

    // Pass lazy loaded Alert component
    // to display alert in case of not found any media
    doSearch(lazyAlert, ...props)
  })
}
function lazyAlert(...props) {
  import(/* webpackChunkName: "alert" */ './alertBox').then(module => {
    // Alert component
    const alertBox = module.default

    // Display alert
    alertBox(...props)
  })
}
