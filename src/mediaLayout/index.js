import getElement from '../selector'
import { createNode, append } from '../creator'
import searchHistory from '../searchHistory'
import smoothScroll from '../scroll'
import toggleModal from '../modal'
import filterCreator from '../filter'
import './index.css'

// Get Element
const intro = getElement('.intro')
const section = getElement('.media')

// Functions
const removeList = () => {
  while (intro.hasChildNodes()) {
    intro.removeChild(intro.firstChild)
  }
}

const renderMedia = item => {
  // Create Elements
  let media,
    track,
    h1 = createNode('h1'),
    small = createNode('small'),
    p = createNode('p'),
    header = createNode('div', 'header'),
    image = createNode('div', 'image'),
    text = createNode('div', 'text'),
    wrapper = createNode('div', 'wrapper')

  // Set Contents
  if (item.data[0].media_type === 'image') {
    media = createNode('img')
    media.src = item.links[0].href
    media.alt = item.data[0].title
  } else {
    media = createNode('video')
    track = createNode('track')
    track.src = `http://images-assets.nasa.gov/video/${item.data[0].nasa_id}/${
      item.data[0].nasa_id
    }.vtt`
    media.src = `http://images-assets.nasa.gov/video/${item.data[0].nasa_id}/${
      item.data[0].nasa_id
    }~preview.mp4`
    media.controls = true
  }
  p.textContent = item.data[0].description
  h1.textContent = item.data[0].title
  small.innerHtml = '<br />' + item.data[0].date_created

  // Append elements
  item.data[0].media_type === 'video' && append(media, track)
  append(h1, small)
  append(header, h1)
  append(image, media)
  append(text, p)
  append(wrapper, header)
  append(wrapper, image)
  append(wrapper, text)
  append(intro, wrapper)

  // Open modal onclick
  item.data[0].media_type === 'image' &&
    wrapper.addEventListener('click', () => {
      toggleModal(item)
    })

  searchHistory.isSearched = true
}

export default (items, form) => {
  // Delete previous media if Exist
  searchHistory.isSearched && removeList()

  setTimeout(() => {
    // Remove loading indicator
    form.classList.remove('loading')
    // Smooth scroll the results section
    smoothScroll(intro, 500)
  }, 1000)

  section.style.minHeight = '100%'

  // Create filter form
  filterCreator(intro)

  // Print medias
  items.forEach(renderMedia)
}
