
const carousel = document.querySelector("#carousel")
const content = document.querySelector("#content")
const next = document.querySelector("#next")
const prev = document.querySelector("#prev")
const scrollText = document.querySelector("#scrollText")

const gap = 16
const animationTime = 500
let width = carousel.offsetWidth
let moving = false
let timeout = null

const handleDisablePrev = () => {
    const isStart = carousel.scrollLeft - width - gap <= 0

    prev.disabled = isStart
    next.disabled = false
}

const handleDisableNext = () => {
    const isEnd = content.scrollWidth - width - gap <= carousel.scrollLeft + width + gap

    prev.disabled = false
    next.disabled = isEnd
}

const moveNext = () => {
    if (moving) return
    
    moving = true
    handleDisableNext()
    carousel.scrollBy(width + gap, 0)

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => moving = false, animationTime)
}


const movePrev = () => {
    if (moving) return

    moving = true
    handleDisablePrev()
    carousel.scrollBy(-(width + gap), 0)

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => moving = false, animationTime)
}


next.addEventListener("click", moveNext);
prev.addEventListener("click", movePrev);


window.addEventListener("resize", () => (width = carousel.offsetWidth));
