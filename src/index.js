// TODO: CODE SPLIT
// TODO: INIT LOADING INDICATOR
import getElement from './selector'
import doSearch from './search'
import 'normalize.css'
import './index.css'
import alertBox from './alertBox'

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

  // Validate by input values
  const validation = {
    text: ''
  }

  // Get Element
  const form = getElement('search-form', 'id')

  // Functions
  const handleChange = e => {
    validation[e.target.type] = e.target.value
  }

  const handleSubmit = e => {
    e.preventDefault()

    // If input has value, do search. Else, notify user.
    validation.text !== '' || alertBox('Please type in the search bar')
    validation.text !== '' && doSearch(form, validation.text)
  }

  // Events
  form.addEventListener('change', handleChange)
  form.addEventListener('submit', handleSubmit)

  // Shutdown loading screen after 2s
  const el = getElement('.intro-loader')
  setTimeout(() => {
    el.parentNode.removeChild(el)
  }, 2000)
})
