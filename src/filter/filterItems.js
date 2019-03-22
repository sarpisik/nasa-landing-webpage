import getElement from '../selector'

const getParentArray = parent => Array.from(getElement(parent, 'all'))

const filterByText = (parent, value, mediasWrapper) => {
  getParentArray(parent).forEach((container, index) => {
    container.firstElementChild.textContent.toLowerCase().indexOf(value) != -1
      ? (mediasWrapper[index].style.display = 'inline-block')
      : (mediasWrapper[index].style.display = 'none')
  })
}

const filterByRadio = (type, mediasContent, mediasWrapper) => {
  if (type === 'all') {
    mediasWrapper.forEach(media => {
      media.style.display = 'inline-block'
    })
  } else {
    mediasContent.forEach((media, index) => {
      media.firstElementChild.nodeName.toLowerCase() === type
        ? (mediasWrapper[index].style.display = 'inline-block')
        : (mediasWrapper[index].style.display = 'none')
    })
  }
}

export default e => {
  // Get Elements
  const mediasWrapper = getParentArray('.intro .wrapper')
  const mediasContent = getParentArray('.wrapper .image')

  // Filter by event type
  switch (e.target.value) {
    case 'image':
      filterByRadio('img', mediasContent, mediasWrapper)
      break
    case 'video':
      filterByRadio('video', mediasContent, mediasWrapper)
      break
    case 'all':
      filterByRadio('all', mediasContent, mediasWrapper)
      break

    default:
      filterByText(
        '.wrapper .text',
        e.target.value.toLowerCase(),
        mediasWrapper
      )
      break
  }
}
