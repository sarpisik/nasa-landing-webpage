import 'normalize.css'
import './index.css'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

// Registering Our Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

const getElementByClass = className => document.querySelector(`.${className}`)
const getElementById = id => document.getElementById(id)

const doSearch = e => {
  e.preventDefault()
  console.log(searchInput.value)
}

const searchInput = getElementById('search')

getElementById('search-form').addEventListener('submit', doSearch)

const createNode = (element, ...rest) => {
  let el = document.createElement(element)
  el.classList.add(...rest)

  return el
}

const append = (parrent, element) => parrent.appendChild(element)

const logError = error => console.log(error)

const END_POINT = 'https://api.nasa.gov/planetary/apod?api_key='
const API_KEY = 'twWX80n1gwefAwda1ekpVnxeX5jEGasGfYhCflGY'

// fetch(END_POINT + API_KEY)
//   .then(resp => resp.json())
//   .then(showData)
//   .catch(logError)

const NASA_URL = 'https://images-api.nasa.gov/search?q=earth&media_type=image'
fetch()
  .then(resp => resp.json())
  .then(data => {
    const items = data.collection.items
    items.forEach(item => {
      let img = createNode('img'),
        h1 = createNode('h1'),
        small = createNode('small'),
        p = createNode('p'),
        header = createNode('div', 'header'),
        image = createNode('div', 'image'),
        text = createNode('div', 'text'),
        wrapper = createNode('div', 'wrapper')

      img.src = item.links[0].href
      img.alt = item.data[0].title
      p.innerHTML = item.data[0].description
      h1.innerHTML = item.data[0].title
      small.innerHTML = '<br />' + item.data[0].date_created

      const intro = getElementByClass('intro')

      append(h1, small)
      append(header, h1)
      append(image, img)
      append(text, p)
      append(wrapper, header)
      append(wrapper, image)
      append(wrapper, text)
      append(intro, wrapper)
    })
  })
  .catch(error => console.log(error))

const showData = data => {
  console.log(data)
  let img = createNode('img'),
    h1 = createNode('h1'),
    h3 = createNode('h3'),
    span = createNode('span'),
    div = createNode('div')

  img.src = data.url
  img.alt = data.title
  span.innerHTML = data.explanation
  h1.innerHTML = data.title
  h3.innerHTML = `${data.copyright} - ${data.date}`

  const container = getElementByClass('intro')

  append(div, h1)
  append(div, h3)
  append(div, img)
  append(div, span)
  append(container, div)
}
