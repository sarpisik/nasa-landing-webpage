import getElement from '../selector'

// Store text input value
const state = {
  text: ''
}

// Get Element
const form = getElement('search-form', 'id')

// Functions
const handleChange = e => {
  state[e.target.type] = e.target.value
}

const handleSubmit = (e, callback) => {
  e.preventDefault()
  // Show loading indicator
  form.classList.add('loading')

  state.text !== '' ||
    (form.classList.remove('loading'),
    callback(false, 'Please type in the search bar'))

  state.text !== '' && callback(true, form, state.text)
}

export default callback => {
  // Events
  form.addEventListener('change', handleChange)
  form.addEventListener('submit', e => {
    handleSubmit(e, callback)
  })
}
