const getCoordinate = (element, dimension) =>
  element.getBoundingClientRect()[dimension]

const getStartPosition = () => window.pageYOffset

const smoothScroll = (element, scrollTimer) => {
  // Calculate the distance of the target element.
  const distance = getCoordinate(element, 'top')

  // Current position of the user when clicked on a nav link
  const startPosition = getStartPosition()
  let startTime = null

  // Run the animation
  const animation = currentTime => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    // Get ease of smooth scroll
    const run = ease(timeElapsed, startPosition, distance, scrollTimer)
    // Smooth scroll
    window.scrollTo(0, run)
    if (timeElapsed < scrollTimer) requestAnimationFrame(animation)
  }

  // The pace of the smooth
  const ease = (timeElapsed, startPosition, distance, scrollTimer) => {
    timeElapsed /= scrollTimer / 2
    if (timeElapsed < 1)
      return (distance / 2) * timeElapsed * timeElapsed + startPosition
    timeElapsed--
    return (
      (-distance / 2) * (timeElapsed * (timeElapsed - 2) - 1) + startPosition
    )
  }
  // Run smooth scroll
  requestAnimationFrame(animation)
}

export default smoothScroll
