const pathList = window.location.href.split('?')
const blogId = pathList[pathList.length-1].split("=")[1]
const blogOptions = document.getElementsByClassName("blog-options-small")
const url = "https://my-brand-karenzi-backend.onrender.com"
const loader = document.getElementsByClassName("loader")[0]

const deleteComment = async (id) => {
    try{
        const resp = await fetch(`${url}/comments/delete_comment/${id}`,{
            method:"DELETE",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })

        if(resp.status === 204){
            alert("Comment deleted successfully")

        }else{
            let response = await resp.json()
            alert(response.msg)
        }

    }catch(err){
        alert(err.message)
    }
}

const updateComment = async (formData) => {
    loader.style.display = "flex"
    try{
        const resp = await fetch(`${url}/comments/update_comment`,{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        let response = await resp.json()

        loader.style.display = "none"

        alert(response.msg)
    }catch(err){
        alert(err.message)
    }
}

const commentOverlay = document.getElementsByClassName("comment-overlay-big")[0]
const updateInput = document.getElementById("update-comment-form").firstElementChild
const updateForm = document.getElementById("update-comment-form")


const getBlog = async () => {
    try{
        const resp = await fetch(`${url}/blogs/get_blog/${blogId}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
    
        let response = await resp.json()
    
        if(resp.ok){
            let blog = response.blog
            const blogPageHeader = document.createElement('div');
            blogPageHeader.classList.add('blogpage-header');
    
            const h1 = document.createElement('h1');
            h1.textContent = blog.title
    
            const blogPageHeader2 = document.createElement('div');
            blogPageHeader2.classList.add('blogpage-header2');
    
            const blogPageHeader2Left = document.createElement('div');
            blogPageHeader2Left.classList.add('blogpage-header2-left');
    
            const blogProfile = document.createElement('div');
            blogProfile.classList.add('blog-profile');
    
            const img = document.createElement('img');
            img.src = './images/profile.jpg';
            blogProfile.appendChild(img);
    
            const h4Author = document.createElement('h4');
            h4Author.textContent = 'Joslyn Manzi Karenzi';
            blogPageHeader2Left.appendChild(blogProfile);
            blogPageHeader2Left.appendChild(h4Author);
    
            const h4Published = document.createElement('h4');
            const dateObject = new Date(blog.createdAt)

            const formattedDate = dateObject.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            });
            
            h4Published.textContent = `Published: ${formattedDate}`;
            blogPageHeader2.appendChild(blogPageHeader2Left);
            blogPageHeader2.appendChild(h4Published);
    
            blogPageHeader.appendChild(h1);
            blogPageHeader.appendChild(blogPageHeader2);
    
            // Create blog content
            const blogPageBlog = document.createElement('div');
            blogPageBlog.classList.add('blogpage-blog');
    
            blogPageBlog.textContent = blog.content
    
            const blogPageContainer = document.getElementsByClassName('blogpage-container')[0]
    
            // Prepend elements to the document
            blogPageContainer.prepend(blogPageBlog);
            blogPageContainer.prepend(blogPageHeader);

            blogOptions[0].lastElementChild.textContent = blog.likes
            blogOptions[1].lastElementChild.textContent = blog.dislikes
        }
    }catch(err) {
        alert(err.message)
    }
}

const getComments = async () => {
    try{
        const resp = await fetch(`${url}/comments/get_comments/${blogId}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
    
        let response = await resp.json()
    
        if(resp.ok){
            for(let comment of response.commentList){
                                // Create comment div
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');

                // Create big-comment-header div
                const bigCommentHeaderDiv = document.createElement('div')
                bigCommentHeaderDiv.classList.add("big-comment-header")

                // Create comment-header div
                const commentHeaderDiv = document.createElement('div');
                commentHeaderDiv.classList.add('comment-header');

                // Create blog-profile div
                const blogProfileDiv = document.createElement('div');
                blogProfileDiv.classList.add('blog-profile');

                // Create img element for profile picture
                const profileImg = document.createElement('img');
                profileImg.src = comment.imageUrl;

                // Append img element to blog-profile div
                blogProfileDiv.appendChild(profileImg);

                const commentProfileDiv = document.getElementsByClassName("blog-profile")[1]
                const commentImg = document.createElement("img")
                commentImg.src = decodeJWT(token).imageUrl


                // Create comment-owner div
                const commentOwnerDiv = document.createElement('div');
                commentOwnerDiv.classList.add('comment-owner');

                // Create h3 elements for owner name and date
                const ownerNameHeading = document.createElement('h3');
                ownerNameHeading.textContent = comment.username;

                const dateHeading = document.createElement('h3');
                const dateObject = new Date(comment.createdAt)

                const formattedDate = dateObject.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                });

                dateHeading.textContent = formattedDate;

                // Append h3 elements to comment-owner div
                commentOwnerDiv.appendChild(ownerNameHeading);
                commentOwnerDiv.appendChild(dateHeading);

                // Append blog-profile and comment-owner divs to comment-header div
                commentHeaderDiv.appendChild(blogProfileDiv);
                commentHeaderDiv.appendChild(commentOwnerDiv);

                // Create img element for options
                const optionsImg = document.createElement('img');
                optionsImg.src = './images/dots.png';
                optionsImg.width = 20
                optionsImg.height = 20

                optionsImg.onclick = function () {
                    optionsMenu.style.display = "flex"
                }

                const optionsMenu = document.createElement("div")
                optionsMenu.classList.add("options-menu")

                const optionsMenuHeader = document.createElement("div")
                optionsMenuHeader.classList.add("options-menu-header")
                const optionsCloser = document.createElement("img")
                optionsCloser.src = './images/close.png'
                optionsCloser.width = 12
                optionsCloser.height = 12

                optionsCloser.onclick = function () {
                    optionsMenu.style.display = "none"
                }

                const updateBtn = document.createElement("button")
                updateBtn.classList.add("update-btn")
                updateBtn.textContent = "Update Comment"
                updateBtn.onclick = function () {
                    optionsMenu.style.display = "none"
                    updateInput.id = comment._id
                    commentOverlay.style.display = "flex"
                }

                const deleteBtn = document.createElement("button")
                deleteBtn.textContent = "Delete Comment"
                deleteBtn.classList.add("delete-btn")

                deleteBtn.onclick = async function () {
                    await deleteComment(comment._id)
                }
 
                optionsMenuHeader.appendChild(optionsCloser)
                optionsMenu.appendChild(optionsMenuHeader)
                optionsMenu.appendChild(updateBtn)
                optionsMenu.appendChild(deleteBtn)

                optionsImg.onClick = function () {

                }

                commentDiv.appendChild(optionsMenu)


                // Create comment-text div
                const commentTextDiv = document.createElement('div');
                commentTextDiv.classList.add('comment-text');
                commentTextDiv.textContent = comment.comment;

                // Append comment-header and comment-text divs to comment div
                bigCommentHeaderDiv.appendChild(commentHeaderDiv)
                bigCommentHeaderDiv.appendChild(optionsImg)
                commentDiv.appendChild(bigCommentHeaderDiv);
                commentDiv.appendChild(commentTextDiv);

                const commentContainer = document.getElementsByClassName("comment-container")[0]

                // Append comment div to the document body (or any other parent element)
                commentContainer.appendChild(commentDiv);
            }
        }
    }catch(err){
        alert(err.message)
    }
}

(async () => {
    await getBlog()
    await getComments()
})()



const commentTextArea = document.getElementById("update-comment")
const closer = document.getElementsByClassName('closeComment')[0]

closer.addEventListener("click", () => {
    commentTextArea.value = ""
    commentOverlay.style.display = "none"
})

const commentInput = document.getElementById("comment-field")

commentInput.addEventListener("keydown", async (e) => {
    if(e.key === 'Enter'){

        if(!token){
            alert("Please login")
            return;
        }

        e.preventDefault()

        const userData = decodeJWT(token)

        const formData = {
            userId: userData._id,
            blogId,
            comment: commentInput.value.trim()
        }

        const resp = await fetch(`${url}/comments/create_comment`,{
            method: "POST",
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        let response = await resp.json()
        alert(response.msg)
    }
})

updateForm.addEventListener("submit", async (e) => {
    if(!token){
        alert("Please login")
        return;
    }
    e.preventDefault()

    const formData = {
        id: updateInput.id,
        comment: commentTextArea.value
    }

    await updateComment(formData)
})

const likeBtn = document.getElementById("likebtn")
const dislikeBtn = document.getElementById("dislikebtn")

likeBtn.addEventListener("click", async (e) => {
    if(!token){
        alert("Please login")
        return;
    }
    const formData = {
        userId: decodeJWT(token)._id,
        blogId
    }
    try{
        const resp = await fetch(`${url}/blogs/like`,{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })


        if(resp.status === 201){
            const currentLikes = parseInt(blogOptions[0].lastElementChild.textContent)
            blogOptions[0].lastElementChild.textContent = currentLikes + 1
        }else if(resp.status === 204){
            const currentLikes = parseInt(blogOptions[0].lastElementChild.textContent)
            blogOptions[0].lastElementChild.textContent = currentLikes - 1
        }else{
            let response = await resp.json()
            alert(response.msg)
        }
    }catch(err){
        alert(err.message)
    }   
})

dislikeBtn.addEventListener("click", async (e) => {
    if(!token){
        alert("Please login")
        return;
    }

    const formData = {
        userId: decodeJWT(token)._id,
        blogId
    }
    try{
        const resp = await fetch(`${url}/blogs/dislike`,{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })


        if(resp.status === 201){
            const currentDislikes = parseInt(blogOptions[1].lastElementChild.textContent)
            blogOptions[1].lastElementChild.textContent = currentDislikes + 1
        }else if(resp.status === 204){
            const currentDislikes = parseInt(blogOptions[1].lastElementChild.textContent)
            blogOptions[1].lastElementChild.textContent = currentDislikes - 1
        }else{
            let response = await resp.json()
            alert(response.msg)
        }
    }catch(err){
        alert(err.message)
    }   
})