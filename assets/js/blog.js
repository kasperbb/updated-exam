const loader = document.querySelector(".preloader")
const button = document.querySelector("button")
const filter = document.querySelector("#filter")
const categoriesForm = document.querySelector("form fieldset.categories")
let page = 1
let totalPages = null
let categoriesArr = []

/* Posts */

const fetchFilteredPosts = async (page, order, categories) => {
    const categoryString = categories.length ? '&categories=' + categories.join(",") : ''

    const res = await fetch(`${POSTS}?page=${page}&order=${order}${categoryString}&_embed`)
    const json = await res.json()

    totalPages = res.headers.get("x-wp-totalpages")
    loader.remove()
    return json
}

const populateFilteredPosts = async (order) => {
    page = 1
    const container = document.querySelector("#results")
    try {
        const posts = await fetchFilteredPosts(page, order, categoriesArr)
        container.innerHTML = ""
        button.innerHTML = "Load more"
        posts.forEach(post => container.innerHTML += createPost(post))
    } catch(err) {
        container.innerHTML = "There was an error loading the posts."
    }
}

const appendFilteredPosts = async (order) => {
    const container = document.querySelector("#results")
    const posts = await fetchFilteredPosts(page, order, categoriesArr)
    posts.forEach(post => container.innerHTML += createPost(post))
}

const loadMore = async () => {
    if (page >= totalPages) return button.innerHTML = "No more posts"
    try {
        page++
        button.innerHTML = "Loading... <div class='preloader-button'></div>"
        await appendFilteredPosts(filter.value)
        button.innerHTML = "Load more"
    } catch (err) {
        button.innerHTML = "No more posts"
    }
}

const handleFilter = () => populateFilteredPosts(filter.value)

const handleScroll = async () => {
    if (page >= totalPages) return button.innerHTML = "No more posts"
    if ((window.innerHeight + window.scrollY) + 1 >= document.body.offsetHeight) {
        console.log('bottom')
        try {
            page++
            button.innerHTML = "Loading... <div class='preloader-button'></div>"
            await appendFilteredPosts(filter.value)
            button.innerHTML = "Load more"
        } catch (err) {
            button.innerHTML = "No more posts"
        }
    }
}


window.addEventListener("scroll", handleScroll)
filter.addEventListener("input", handleFilter)
button.addEventListener("click", loadMore)
populateFilteredPosts(filter.value)

/* Categories */
const fetchAllCategories = async () => {
    const res = await fetch(`${CATEGORIES}`)
    return await res.json()
}

const populateCategories = async () => {
    const categories = await fetchAllCategories()
    const categoriesFieldset = document.querySelector("form fieldset.categories")
    categories.forEach(category => categoriesFieldset.innerHTML += `
        <div class="category">
            <input type="checkbox" id="${category.slug}" name="${category.slug}" value="${category.id}">
            <label for="${category.slug}">${category.name} (${category.count})</label>
        </div>
    `)
}

const handleCategories = (e) => {
    if (e.target.checked) {
        categoriesArr = [ ...categoriesArr, e.target.value ]
    } else {
        categoriesArr = categoriesArr.filter(item => item !== e.target.value)
    }
    populateFilteredPosts('desc')
}

categoriesForm.addEventListener("change", handleCategories)
populateCategories()