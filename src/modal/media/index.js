import getElement from '../../selector'

// Get Elements
const modalContent = getElement('.modal_content')
const image = modalContent.getElementsByTagName('img')[0]
const title = modalContent.getElementsByTagName('h1')[0]
const date = modalContent.getElementsByTagName('small')[0]
const text = modalContent.getElementsByTagName('p')[0]

export default (item, type) => {
  image.src = type === 'apply' ? item.links[0].href : ''
  image.alt = type === 'apply' ? item.data[0].title : ''
  title.innerHTML = type === 'apply' ? item.data[0].title : ''
  date.innerHTML = type === 'apply' ? '<br />' + item.data[0].date_created : ''
  text.innerHTML = type === 'apply' ? item.data[0].description : ''
}
