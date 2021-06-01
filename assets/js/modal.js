const modal = document.querySelector("#modal")
const modalImg = document.querySelector("#modal img")
const modalCap = document.querySelector("#modal .caption")

const handleClick = (e) => {
    modal.style.display = "block"
    modalImg.src = e.target.src
    modalCap.innerHTML = e.target.alt
}

const handleClose = (e) => {
    if (e.target.id === "modal") modal.style.display = "none"
    if (e.target.classList.contains("close")) modal.style.display = "none"
}

const addEvents = () => {
    const images = document.querySelectorAll("img")
    images.forEach(image => {
        if (!image.classList.contains("modal-image")) {
            image.addEventListener("click", handleClick)
            image.classList.add("clickable")
        }
    })
    modal.addEventListener("click", handleClose)
}