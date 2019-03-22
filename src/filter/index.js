import { append, createNode } from '../creator'
import filterItems from './filterItems'

// Create Elements
let formContainer = createNode('div', 'form-container'),
  form = createNode('form', 'filter-form'),
  radioWrapper = createNode('div', 'radio-wrapper'),
  textWrapper = createNode('div', 'text-wrapper'),
  inputContainers = [
    createNode('div', 'input-container'),
    createNode('div', 'input-container')
  ],
  radioContainers = [
    createNode('div', 'radio'),
    createNode('div', 'radio'),
    createNode('div', 'radio')
  ],
  radios = ['Image', 'Video', 'All'],
  textInput = createNode('input')

// Set Attributes & Append Elements
radioContainers.forEach((container, index) => {
  const input = createNode('input')
  input.type = 'radio'
  input.name = 'media'
  input.value = radios[index].toLowerCase()
  container.textContent = radios[index]
  // Append radio into div.radio
  append(container, input)
  // Append div.radio into div.input-container
  append(inputContainers[0], container)
})
textInput.type = 'text'
textInput.name = 'search'
textInput.placeholder = 'Filter by description'
// Append text input into div.input-container
append(inputContainers[1], textInput)
// Append container of div.radio into div.radio-wrapper
append(radioWrapper, inputContainers[0])
// Append container of text input into div.text-wrapper
append(textWrapper, inputContainers[1])
// Append wrappers into form#filter-form
append(form, radioWrapper)
append(form, textWrapper)
// Append form into div.form-container
append(formContainer, form)

export default intro => {
  append(intro, formContainer)

  form.addEventListener('input', filterItems)
  form.addEventListener('submit', e => e.preventDefault())
}
