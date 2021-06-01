const fetchPosts = async () => {
    const res = await fetch(`${POSTS}?_embed`)
    const json = await res.json()
    return json;
}

const populatePosts = async () => {
    const container = document.querySelector("div#content")
    try {
        const posts = await fetchPosts()
        container.innerHTML = ""
        posts.forEach(post => container.innerHTML += createPost(post))
        next.style.visibility = "visible"
        prev.style.visibility = "visible"
    } catch(err) {
        container.innerHTML = "There was an error loading the posts."
    }
}

populatePosts()