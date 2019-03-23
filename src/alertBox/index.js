import getElement from '../selector'
import { append, createNode } from '../creator'
import './index.css'

// Get Elements
const alertBox = getElement('.alert-container')
const alertText = getElement('.alert-text')

export default (text, strong) => {
  if (strong) {
    alertText.textContent = 'There is no result for '
    const alertTextStrong = createNode('strong')
    alertTextStrong.textContent = text
    append(alertText, alertTextStrong)
  } else {
    alertText.textContent = text
  }

  // Turn on alert box
  alertBox.classList.toggle('show')

  // Turn off alert box after 3s
  setTimeout(() => {
    alertBox.classList.toggle('show')
  }, 3000)
}
