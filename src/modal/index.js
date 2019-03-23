import getElement from '../selector'
import mediaModal from './media'
import './index.css'

const modal = getElement('.modal')
const body = document.body

const onEsc = event => {
  const key = event.key || event.keyCode
  if (key === 'Escape' || key === 'Esc' || key === 27) {
    toggleModal()
  }
}

const attachModalListeners = modalElm => {
  modalElm.querySelector('.close_modal').addEventListener('click', toggleModal)
  modalElm.querySelector('.overlay').addEventListener('click', toggleModal)
  document.addEventListener('keyup', onEsc)
}

const detachModalListeners = modalElm => {
  modalElm
    .querySelector('.close_modal')
    .removeEventListener('click', toggleModal)
  modalElm.querySelector('.overlay').removeEventListener('click', toggleModal)
  document.removeEventListener('keyup', onEsc)
}

const toggleModal = item => {
  const currentState = modal.style.display

  // If modal is visible, hide it. Else, display it.
  if (currentState === 'none') {
    modal.style.display = 'block'
    // Lock body scroll
    body.style.overflow = 'hidden'
    attachModalListeners(modal)
    mediaModal(item, 'apply')
  } else {
    // Unlock body scroll
    body.style.overflow = 'auto'
    modal.style.display = 'none'
    mediaModal()
    detachModalListeners(modal)
  }
}

export default toggleModal
