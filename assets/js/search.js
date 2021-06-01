const sloader = document.querySelector("header nav .search .preloader-search")
const container = document.querySelector("#search-results")
const input = document.querySelector("nav input")
const body = document.querySelector("body")
const searchButton = document.querySelector(".search__input svg")
let searchTimeout = null

const fetchResults = async (string) => {
    const res = await fetch(`${POSTS}?search=${string}`);
    const json = await res.json();
    return json;
}

const populateResults = async (string) => {
    container.innerHTML = ""
    const results = await fetchResults(string)
    results.forEach(post => container.innerHTML += createResult(post))
}

const handleSearch = (e) => {
    const string = e.target.value
    setLoading(true)
    if (searchTimeout) clearTimeout(searchTimeout)

    searchTimeout = setTimeout(() => {
        setLoading(false)
        if (!string.length) return clearResults()
        populateResults(string)
        container.classList.add("active")
    }, 500)
}

const handleButton = (e) => location.href = `/search-results.html?q=${input.value}`

const handleEnter = (e) => (e.keyCode === 13) ? location.href = `/search-results.html?q=${e.target.value}` : null

const clearResults = () => {
    container.innerHTML = ""
    container.classList.remove("active")
}

const setLoading = (bool) => bool ? sloader.classList.add("active") : sloader.classList.remove("active")

const closeSearchOnClick = (e) => {
    const target = e.target
    if (!target.getAttribute("id")) clearResults()
}

const createResult = (post) => `
    <a class="result" href="post.html?id=${post.id}">
        <div class="title">${post.title.rendered}</div>
        <div class="date">${formatDate(post.date)}</div>
    </a>
`

input.addEventListener("input", handleSearch)
input.addEventListener("keydown", handleEnter)
searchButton.addEventListener("click", handleButton)
body.addEventListener("click", closeSearchOnClick)