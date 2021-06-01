const breadcrumbs = document.querySelector("section.breadcrumbs")
const loader = document.querySelector(".loader-double.big")

const ID = params.get("id")

if (!ID) location.href = "/"

const convertUnicodeToChar = (string) => {
    if (string.includes("&#")) {
        const first = string.split("&#")[0]
        const second = string.split("&#")[1].split(";")
        const char = String.fromCharCode(second[0])

        return first + char + second[1]
    }

    return string
}

const fetchPost = async (id) => {
    const res = await fetch(`${POSTS}/${id}?_embed`)
    const json = await res.json()
    document.title += ` ${convertUnicodeToChar(json.title.rendered)}`
    return json
}

const populatePost = async () => {
    const container = document.querySelector("section.main")
    const post = await fetchPost(ID);
    container.innerHTML = createPostDetails(post)
    breadcrumbs.innerHTML += `<span>${post.title.rendered}</span>`
}

const fixSrc = (element, type) => {
    element.forEach((el, i) => {
        const caption = document.querySelectorAll(`.wp-block-${type} figcaption`)[i]
        el.src = el.dataset.src
        el.alt = caption.innerHTML
    })
}

const fixAllSrc = () => {
    const images = document.querySelectorAll(".wp-block-image img")
    const videos = document.querySelectorAll(".wp-block-video video")

    fixSrc(images, "image")
    fixSrc(videos, "video")
}

populatePost().then(() => {
    addEvents()
    fixAllSrc()
})
