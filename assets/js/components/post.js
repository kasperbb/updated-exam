const createPost = (post) => `
    <div class="post">
        <img
            src="${post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}"
            alt="${post._embedded["wp:featuredmedia"][0].alt_text}"
        />
        <div class="content">
            <a href="post.html?id=${post.id}">
                ${post.title.rendered}
            </a>
            <div class="byline">
                <p>By: ${post._embedded.author[0].name}</p>
                <p>&#183; ${formatDate(post.date)}</p>
            </div>
        </div>
    </div>
`

const createPostDetails = (post) => `
    <img
        src="${post._embedded["wp:featuredmedia"][0].source_url}"
        alt="${post._embedded["wp:featuredmedia"][0].alt_text}"
    />
    <h1>${post.title.rendered}</h1>
    <div class="byline">
        <p>${formatDate(post.date)} by ${post._embedded.author[0].name}</p>
    </div>
    <div class="content">
        ${post.content.rendered}
    </div>
`

const createComment = (comment) => `
    <div class="comment">
        <div class="user">
            <img src="${comment.author_avatar_urls[96]}" />
            <p class="name">${comment.author_name}</p>
            <p class="date">${comment.date.split("T")[1].substring(0, 5)} - ${formatDate(comment.date)}</p>
        </div>
        <p class="message">${comment.content.rendered}</p>
    </div>
`
