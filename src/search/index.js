import getElement from '../selector'
import searchHistory from '../searchHistory'
import mediaLayout from '../mediaLayout'
import smoothScroll from '../scroll'

// Get Elements
const intro = getElement('.intro')

export default (form, text) => {
  // Show loading indicator
  form.classList.add('loading')

  // If this is not the repeat of the previous search, fetch data.
  // Else if this one of the previous search, get the data from searchHistory object and update the DOM.
  // Else, jump to results
  if (!searchHistory[text]) {
    fetch(`https://images-api.nasa.gov/search?q=${text}`)
      .then(res => res.json())
      .then(res => {
        // Save this search
        searchHistory[text] = { text: text, data: res }
        searchHistory.lastSearch = text

        // Update DOM
        mediaLayout(res, form, text, intro)
      })
      .catch(error => console.log(error))
  } else if (text !== searchHistory.lastSearch && searchHistory[text]) {
    // Save search text to avoid update DOM if user submit search again without any text change
    searchHistory.lastSearch = text

    // Update DOM
    mediaLayout(searchHistory[text].data, form, searchHistory[text].text, intro)
  } else {
    // Stop loading indicator
    form.classList.remove('loading')

    // jump to results
    smoothScroll(intro, 500)
  }
}
