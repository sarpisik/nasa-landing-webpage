export const createNode = (element, ...rest) => {
  let el = document.createElement(element)
  el.classList.add(...rest)

  return el
}

export const append = (parrent, element) => parrent.appendChild(element)

export const extract = (parrent, element) => parrent.removeChild(element)
