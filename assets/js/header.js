const hamburger = document.querySelector(".hamburger")
const nav = document.querySelector("nav")
const header = document.querySelector("header")

const hamburgerIcon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />`
const crossIcon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`


let open = false

const openNav = () => {
    open = true
    header.classList.add("open")
    hamburger.innerHTML = crossIcon
}

const closeNav = () => {
    open = false
    header.classList.remove("open")
    hamburger.innerHTML = hamburgerIcon
}

const toggleNav = () => open ? closeNav() : openNav()

hamburger.addEventListener("click", toggleNav)