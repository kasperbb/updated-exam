const POSTS = 'https://exam-one.bjorno.dev/wp-json/wp/v2/posts'
const CATEGORIES = 'https://exam-one.bjorno.dev/wp-json/wp/v2/categories'
const params = new URLSearchParams(window.location.search)

const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}