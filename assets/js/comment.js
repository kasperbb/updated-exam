const COMMENTS = 'https://exam-one.bjorno.dev/wp-json/wp/v2/comments'

const button = document.querySelector("section.comment form button")
const form = document.querySelector("section.comment form")
const tooltip = document.querySelector(".tooltip")

let timeout = null

const fetchComments = async () => {
    const res = await fetch(COMMENTS)
    const json = await res.json()
    const filtered = json.filter(comment => comment.post === +ID)
    return filtered
}

const populateComments = async () => {
    const container = document.querySelector("#comments")
    try {
        const comments = await fetchComments()
        container.innerHTML = ""
        comments.forEach(comment => container.innerHTML += createComment(comment))
        if (!comments.length) container.innerHTML = "<p class='no-comments'>No comments</p>"
    } catch(err) {
        container.innerHTML = "<p class='no-comments'>No comments</p>"
    }
}

const getFormFields = () => [
    form["email"],
    form["name"],
    form["message"],
]

const minLength = (target, length) => (target.value.trim().length >= length) ? true : false

const validEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const patternMatches = regEx.test(email.value)
    return patternMatches
}

const validForm = (form) => {
    const [email, name, message] = getFormFields()
    const arr = [
        validEmail(email),
        minLength(name, 5),
        minLength(message, 25),
    ]

    const passesValidation = arr.every(el => el)
    return passesValidation;
}

const setErrorStyles = (e) => {
    const parent = e.target ? e.target.parentNode : form[e].parentNode
    parent.classList.add("has-error")
}

const removeErrorStyles = (e) => {
    const parent = e.target ? e.target.parentNode : form[e].parentNode
    parent.classList.remove("has-error")
}

const isValid = (formItemName) => {
    const [email, name, message] = getFormFields()
    const formItem = form[formItemName]
    switch (formItemName) {
        case email.name:
            return validEmail(formItem)
        case name.name:
            return minLength(formItem, 5)
        case message.name:
            return minLength(formItem, 25)
        default:
            return false
    }
}

const handleValidate = (e) => {
    const name = e.target.name

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => (!isValid(name)) && setErrorStyles(e), 800)

    if (isValid(name)) removeErrorStyles(e)
}

const controlAllValid = () => {
    const fields = getFormFields()
    fields.forEach(field => {
        isValid(field.name) ? removeErrorStyles(field.name) : setErrorStyles(field.name)
    })
}

const successfulComment = () => {
    const status = document.querySelector(".form-status-message")

    status.innerHTML = "Your comment was successfully added!"
    status.classList.add("success")

    setTimeout(() => {
        status.classList.remove("success")
        status.classList.remove("has-error")
    }, 5000)

    populateComments()
}

const failedComment = (json) => {
    const status = document.querySelector(".form-status-message")

    status.classList.add("has-error")
    status.innerHTML = json.message

    controlAllValid()

    setTimeout(() => {
        status.classList.remove("success")
        status.classList.remove("has-error")
    }, 5000)
}

const addComment = async (e) => {
    const [email, name, message] = getFormFields()
    const data = JSON.stringify({
        post: ID,
        author_email: email.value,
        author_name: name.value,
        content: message.value,
    });

    const options = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: data,
    }

    const valid = validForm(form)
    if (!valid) return controlAllValid()

    button.innerHTML = "Posting... <div class='preloader-button'></div>"

    try {
        const res = await fetch(COMMENTS, options)
        button.innerHTML = "Post"
        if (res.ok) return successfulComment()
    } catch(err) {
        const json = await res.json()
        failedComment(json)
        button.innerHTML = "Post"
        return json;
    }
}

const showTooltip = () => tooltip.classList.add("show")
const hideTooltip = () => tooltip.classList.remove("show")


populateComments()

form.addEventListener("input", handleValidate)

button.addEventListener("mouseover", showTooltip)
button.addEventListener("mouseout", hideTooltip)
button.addEventListener("click", addComment)