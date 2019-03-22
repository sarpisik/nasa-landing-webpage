import { createNode, append } from '../creator'
import getElement from '../selector'
import videoBunny from '../../assets/video/652333414.mp4'
import icon from '../../assets/icons/fullscreen.png'

// Create Elements
const player = createNode('div', 'player')
const video = createNode('video', 'player__video', 'viewer')
const playerControls = createNode('div', 'player__controls')
const progress = createNode('div', 'progress')
const progressBar = createNode('div', 'progress__filled')
const toggle = createNode('button', 'player__button', 'toggle')
toggle.title = 'Toggle Play'
toggle.innerHTML = '►'
const ranges = [
  createNode('input', 'player__slider')
  // createNode('input', 'player__slider')
].map((input, i) => {
  input.type = 'range'
  input.name = i === 0 ? 'volume' : 'playbackRate'
  input.min = i === 0 ? '0' : '0.5'
  input.max = i === 0 ? '1' : '2'
  input.step = i === 0 ? '0.05' : '0.1'
  input.value = '1'
  return input
})
const skipButtons = [
  createNode('button', 'player__button'),
  createNode('button', 'player__button')
].map((button, i) => {
  const skipValue = i === 0 ? '-10' : '25'
  button.setAttribute('data-skip', skipValue)
  button.innerHTML = i === 0 ? '« 10s' : '25s »'
  return button
})
// const fullScreenButton = createNode('button', 'player__button')
const fullScreenIcon = createNode('img', 'player__button', 'full__screen')
fullScreenIcon.src = icon

// Get Element
const intro = getElement('.intro')

// Append Elements to DOM
append(intro, player)
append(player, video)
append(player, playerControls)
append(playerControls, progress)
append(progress, progressBar)
append(playerControls, toggle)
ranges.forEach(input => {
  append(playerControls, input)
})
skipButtons.forEach(button => {
  append(playerControls, button)
})
append(playerControls, fullScreenIcon)
// append(fullScreenButton, fullScreenIcon)

// Set video
video.src = videoBunny

// Functions
const togglePLay = () => {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

function skip() {
  // Convert to number
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

const handleProgress = () => {
  const percentage = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percentage}%`
}

const scrub = e => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

const toggleFullScreen = () => {
  if (video.requestFullScreen) {
    video.requestFullScreen()
  } else if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen()
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen()
  }
}

// Event Listeners
export default () => {
  video.addEventListener('click', togglePLay)
  video.addEventListener('play', updateButton)
  video.addEventListener('pause', updateButton)
  video.addEventListener('timeupdate', handleProgress)

  toggle.addEventListener('click', togglePLay)
  skipButtons.forEach(button => button.addEventListener('click', skip))
  ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate)
    range.addEventListener('mousemove', handleRangeUpdate)
  })

  let mousedown = false
  progress.addEventListener('click', scrub)
  progress.addEventListener('mousemove', e => mousedown && scrub(e))
  progress.addEventListener('mousedown', () => (mousedown = true))
  progress.addEventListener('mouseup', () => (mousedown = false))

  fullScreenIcon.addEventListener('click', toggleFullScreen)
}
