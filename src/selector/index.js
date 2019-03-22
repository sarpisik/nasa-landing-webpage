export default (el, type) => {
  switch (type) {
    case undefined:
      return document.querySelector(el)
    case 'id':
      return document.getElementById(el)
    case 'all':
      return document.querySelectorAll(el)

    default:
      break
  }
}
