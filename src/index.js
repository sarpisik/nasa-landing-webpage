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
const createNode = (element, ...rest) => {
  let el = document.createElement(element)
  el.classList.add(...rest)

  return el
}
const append = (parrent, element) => parrent.appendChild(element)

const getMediaType = item => {
  fetch(`https://images-api.nasa.gov/asset/${item.data[0].nasa_id}`)
    .then(resp => resp.json())
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
}
const doSearch = e => {
  e.preventDefault()
  document.getElementsByName('media').forEach(radio => {
    radio.checked &&
      fetch(
        `https://images-api.nasa.gov/search?q=${searchInput.value}&media_type=${
          radio.value
        }`
      )
        .then(resp => resp.json())
        .then(mediaLayout)
        .catch(error => console.log(error))
  })
}

const intro = getElementByClass('intro')
const searchInput = getElementById('search')

getElementById('search-form').addEventListener('submit', doSearch)

const mediaLayout = data => {
  const items = data.collection.items
  console.log(items)
  items.forEach(item => {
    let media,
      track,
      h1 = createNode('h1'),
      small = createNode('small'),
      p = createNode('p'),
      header = createNode('div', 'header'),
      image = createNode('div', 'image'),
      text = createNode('div', 'text'),
      wrapper = createNode('div', 'wrapper')

    item.data[0].media_type === 'image'
      ? ((media = createNode('img')),
        (media.src = item.links[0].href),
        (media.alt = item.data[0].title))
      : ((media = createNode('video')),
        (track = createNode('track')),
        ((track.src = `http://images-assets.nasa.gov/video/${
          item.data[0].nasa_id
        }/${item.data[0].nasa_id}.vtt`),
        (media.src = `http://images-assets.nasa.gov/video/${
          item.data[0].nasa_id
        }/${item.data[0].nasa_id}~preview.mp4`)),
        (media.controls = true),
        getMediaType(item))

    p.innerHTML = item.data[0].description
    h1.innerHTML = item.data[0].title
    small.innerHTML = '<br />' + item.data[0].date_created

    item.data[0].media_type === 'video' && append(media, track)
    append(h1, small)
    append(header, h1)
    append(image, media)
    append(text, p)
    append(wrapper, header)
    append(wrapper, image)
    append(wrapper, text)
    append(intro, wrapper)
  })
}

// TODO: SET VIDEO QUALITY
// TODO: LOOK FOR .SRT TO .VTT
// TODO: LOAD CAPTION IMAGE FIRST AND THEN VIDEO SRC
// TODO: SEARCH MIX IMG AND VIDEO FUNC
