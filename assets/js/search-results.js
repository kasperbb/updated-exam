const query = params.get("q")

const loader = document.querySelector("#results .preloader")

if (!query) location.href = "/"

const fetchSearchResults = async () => {
    const res = await fetch(`${POSTS}?search=${query}&_embed`)
    const json = await res.json()
    loader.remove()
    return json
}

const populateSearchResults = async () => {
    const container = document.querySelector("#results")
    try {
        const results = await fetchSearchResults()
        populateHeading()
        results.forEach(post => container.innerHTML += createPost(post))
    } catch(err) {
        container.innerHTML = "Error loading the search results. Try again later."
    }
}

const populateHeading = () => {
    const container = document.querySelector("section.main h1")
    const breadcrumb = document.querySelector("section.breadcrumbs span")
    container.innerHTML += ` ${query}`
    breadcrumb.innerHTML += ` ${query}`
    document.title += ` ${query}`
}

populateSearchResults()