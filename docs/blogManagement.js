if(!token){
    window.location.href = './login.html'
}

const userInfo = decodeJWT(token)
const loader = document.getElementsByClassName("loader")[0]

if(!userInfo.isAdmin){
    window.location.href = './index.html'
}


(async () => {
    try{
        const loaderbig = document.getElementsByClassName("loader-big")[0]
        loaderbig.style.display = "flex"
        const url = "https://my-brand-karenzi-backend.onrender.com"
        const resp = await fetch(`${url}/blogs/get_blogs`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
    
        let response = await resp.json()
    
        if(resp.ok){
            loaderbig.style.display = "none"
            for(let blog of response.blogList){
                const container = document.getElementsByClassName("bloglist-container")[0]

                const parentDiv = document.createElement('div');
                parentDiv.classList.add('blog-mgt-blog');
                parentDiv.id = `key-${blog._id}`

                // Create blog header div element with class "blog-mgt-blog-header"
                const headerDiv = document.createElement('div');
                headerDiv.classList.add('blog-mgt-blog-header');
                
                // Create title div element with class "blogmgt-title"
                const titleDiv = document.createElement('div');
                titleDiv.classList.add('blogmgt-title');
                titleDiv.textContent = blog.title

                // Create options div element with class "blogmgt-options"
                const optionsDiv = document.createElement('div');
                optionsDiv.classList.add('blogmgt-options');
                
                // Create "Down" image element
                const downImg = document.createElement('img');
                downImg.src = './images/down.png';
                downImg.width = '15';
                downImg.height = '15';
                downImg.classList.add('toggleDets');

                // Create "Edit" image element
                const editImg = document.createElement('img');
                editImg.src = './images/edit.png';
                editImg.width = '15';
                editImg.height = '15';

                const titleInput = document.getElementById('blog-title')
                const blogInput = document.getElementById('blog-blog')

                editImg.onclick = function() {
                    const header = document.getElementsByClassName('blog-overlay-header')[0].firstElementChild
                    header.textContent = "Edit Blog"
                    titleInput.value = blog.title
                    blogInput.value = blog.content
            
                    const hiddenInput = document.createElement("input")
                    hiddenInput.type = "hidden"
                    hiddenInput.value = blog._id
            
                    document.getElementsByClassName("form-blog")[0].prepend(hiddenInput)
            
                    blogOverlayBig.style.display = 'flex'
                }

                // Create "Delete" image element
                const deleteImg = document.createElement('img');
                deleteImg.src = './images/delete.png';
                deleteImg.width = '15';
                deleteImg.height = '15';

                deleteImg.onclick = async function () {
                    try {
                        const token = localStorage.getItem("token")
                        const resp = await fetch(`${url}/blogs/delete_blog/${blog._id}`,{
                            method:'DELETE',
                            headers:{
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        if(resp.status === 204){
                            container.removeChild(document.getElementById(`key-${blog._id}`))
                            alert("Blog deleted successfully")
                        }else{
                            let response = await resp.json()
                            alert(response.msg)
                        }  
                    }catch(err) {
                        alert(err.message)
                    }
                }

                // Append image elements to optionsDiv
                optionsDiv.appendChild(downImg);
                optionsDiv.appendChild(editImg);
                optionsDiv.appendChild(deleteImg);
                        
                // Append titleDiv and optionsDiv to headerDiv
                headerDiv.appendChild(titleDiv);
                headerDiv.appendChild(optionsDiv);
                
                // Create details div element with class "details-blogmgt"
                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('details-blogmgt');
                detailsDiv.id = blog._id

                const dateObject = new Date(blog.createdAt)

                const formattedDate = dateObject.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                });

                // Create list items for publication details
                const details = [`Published: ${formattedDate}`, `${blog.likes} Likes`, `${blog.dislikes} Dislikes`, `${blog.comments} Comments`];
                details.forEach(detail => {
                    const li = document.createElement('li');
                    li.textContent = detail;
                    detailsDiv.appendChild(li);
                });

                // Append headerDiv and detailsDiv to parentDiv
                parentDiv.appendChild(headerDiv);
                parentDiv.appendChild(detailsDiv);

                // Append headerDiv and detailsDiv to parentDiv
                parentDiv.appendChild(headerDiv);
                parentDiv.appendChild(detailsDiv);

                downImg.onclick = function() {
                    const details = document.getElementById(blog._id)
                    if(details.style.display === 'flex'){
                        details.style.display = 'none';
                    }else{
                        details.style.display = 'flex';
                    }
                }

                container.appendChild(parentDiv);
            }
        }    
    }catch(err){
        alert(err.message)
    }
})()

const url = "https://my-brand-karenzi-backend.onrender.com"

const leftLinks = document.getElementsByClassName("left-link")

pageLocation = window.location.href.split("/")
page = pageLocation[pageLocation.length - 1]

console.log(page)


for(let item of leftLinks){
    let list = item.firstElementChild.href.split('/')
    if(list[list.length-1] === page){
        item.firstElementChild.style.borderBottom = "1.5px solid #DF5F17"
    }
}

//form submit
const form = document.getElementById("blog-form")

const newBlog = document.getElementsByClassName('login-btn-blog')[0]
const blogOverlayBig = document.getElementsByClassName('blog-overlay-big')[0]
const closer = document.getElementsByClassName('closeBlog')[0]

newBlog.addEventListener('click', () => {
    blogOverlayBig.style.display = 'flex';
})

closer.addEventListener('click', () => {
    const titleInput = document.getElementById('blog-title')
    const blogInput = document.getElementById('blog-blog')
    const coverImage = document.getElementById("blog-image")

    titleInput.value = ""
    blogInput.value = ""
    coverImage.value == ""
    document.getElementsByClassName('blog-overlay-header')[0].firstElementChild.textContent = "New Blog"

    blogOverlayBig.style.display = 'none';
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()    
    const token = localStorage.getItem("token")
    const titleInput = document.getElementById('blog-title').value.trim();
    const blogInput = document.getElementById('blog-blog').value.trim();
    const coverImage = document.getElementById("blog-image")
    const errorTitle = document.getElementById('error-title')
    const errorBlog = document.getElementById('error-blog')
    const errorImage = document.getElementById("error-image")

    console.log(coverImage)
    console.log(errorImage)

    errorTitle.textContent = ""
    errorBlog.textContent = ""
    errorImage.textContent = ""

    if(!titleInput){
        errorTitle.textContent = "Blog title is required"
    }
    
    if(!blogInput) {
        errorBlog.textContent = "Blog text is required"
    }

    if(!coverImage.value) {
        errorImage.textContent = "Cover Image is required"
    }
    
    if(titleInput && blogInput && coverImage.value){
        loader.style.display = "flex"
        const header = document.getElementsByClassName('blog-overlay-header')[0].firstElementChild.textContent
        if(header === 'Edit Blog'){
            try{
                const blogId = document.getElementsByClassName("form-blog")[0].firstElementChild.value
                
                const formData = new FormData()
                formData.append("id", blogId)
                formData.append("title", titleInput)
                formData.append("content", blogInput)
                formData.append("image", coverImage.files[0])

                const resp = await fetch(`${url}/blogs/update_blog`,{
                    method:"POST",
                    headers:{
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                })

                const response = await resp.json()

                loader.style.display = "none"

                alert(response.msg)
                if(resp.ok){
                    window.location.reload()
                }
            }catch(err){
                alert(err.message)
            }
        }else{
            try{
                const formData = new FormData()
                formData.append("title", titleInput)
                formData.append("content", blogInput)
                formData.append("image", coverImage.files[0])

                const resp = await fetch(`${url}/blogs/create_blog`,{
                    method:"POST",
                    headers:{
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                })

                const response = await resp.json()

                loader.style.display = "none"

                alert(response.msg)
                if(resp.status === 201){
                    window.location.reload()
                }
            }catch(err) {
                alert(err.message)
            }
        }       
    }
})

const blogSearchSubmit = document.getElementsByClassName("blog-search")[0].firstElementChild

blogSearchSubmit.onclick = async function () {
    const blogSearchInput = document.getElementsByClassName("blog-search")[0].lastElementChild.value.trim()
    console.log(blogSearchInput)
    if(!blogSearchInput){
        return;
    }

    try{
        const loaderbig = document.getElementsByClassName("loader-big")[0]
        loaderbig.style.display = "flex"
        const resp = await fetch(`${url}/blogs/get_blogs?search_query=${blogSearchInput}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })

        let response = await resp.json()
        loaderbig.style.display = "none"
        if(resp.ok){
            if(response.blogList.length !== 0){
                for(let blog of response.blogList){
                    const container = document.getElementsByClassName("bloglist-container")[0]

                    while (container.firstChild) {
                        container.removeChild(container.firstChild);
                    }
    
                    const parentDiv = document.createElement('div');
                    parentDiv.classList.add('blog-mgt-blog');
                    parentDiv.id = `key-${blog._id}`
    
                    // Create blog header div element with class "blog-mgt-blog-header"
                    const headerDiv = document.createElement('div');
                    headerDiv.classList.add('blog-mgt-blog-header');
                    
                    // Create title div element with class "blogmgt-title"
                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('blogmgt-title');
                    titleDiv.textContent = blog.title
    
                    // Create options div element with class "blogmgt-options"
                    const optionsDiv = document.createElement('div');
                    optionsDiv.classList.add('blogmgt-options');
                    
                    // Create "Down" image element
                    const downImg = document.createElement('img');
                    downImg.src = './images/down.png';
                    downImg.width = '15';
                    downImg.height = '15';
                    downImg.classList.add('toggleDets');
    
                    // Create "Edit" image element
                    const editImg = document.createElement('img');
                    editImg.src = './images/edit.png';
                    editImg.width = '15';
                    editImg.height = '15';
    
                    const titleInput = document.getElementById('blog-title')
                    const blogInput = document.getElementById('blog-blog')
    
                    editImg.onclick = function() {
                        const header = document.getElementsByClassName('blog-overlay-header')[0].firstElementChild
                        header.textContent = "Edit Blog"
                        titleInput.value = blog.title
                        blogInput.value = blog.content
                
                        const hiddenInput = document.createElement("input")
                        hiddenInput.type = "hidden"
                        hiddenInput.value = blog._id
                
                        document.getElementsByClassName("form-blog")[0].prepend(hiddenInput)
                
                        blogOverlayBig.style.display = 'flex'
                    }
    
                    // Create "Delete" image element
                    const deleteImg = document.createElement('img');
                    deleteImg.src = './images/delete.png';
                    deleteImg.width = '15';
                    deleteImg.height = '15';
    
                    deleteImg.onclick = async function () {
                        try {
                            const token = localStorage.getItem("token")
                            const resp = await fetch(`${url}/blogs/delete_blog/${blog._id}`,{
                                method:'DELETE',
                                headers:{
                                    'Authorization': `Bearer ${token}`
                                }
                            })

                            if(resp.status === 204){
                                container.removeChild(document.getElementById(`key-${blog._id}`))
                                alert("Blog deleted successfully")
                            }else{
                                let response = await resp.json()
                                alert(response.msg)
                            }  
                        }catch(err) {
                            alert(err.message)
                        }
                    }
    
                    // Append image elements to optionsDiv
                    optionsDiv.appendChild(downImg);
                    optionsDiv.appendChild(editImg);
                    optionsDiv.appendChild(deleteImg);
                            
                    // Append titleDiv and optionsDiv to headerDiv
                    headerDiv.appendChild(titleDiv);
                    headerDiv.appendChild(optionsDiv);
                    
                    // Create details div element with class "details-blogmgt"
                    const detailsDiv = document.createElement('div');
                    detailsDiv.classList.add('details-blogmgt');
                    detailsDiv.id = blog._id
    
                    const dateObject = new Date(blog.createdAt)

                    const formattedDate = dateObject.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    });

                    // Create list items for publication details
                    const details = [`Published: ${formattedDate}`, `${blog.likes} Likes`, `${blog.dislikes} Dislikes`, `${blog.comments} Comments`];
                    details.forEach(detail => {
                        const li = document.createElement('li');
                        li.textContent = detail;
                        detailsDiv.appendChild(li);
                    });
    
                    // Append headerDiv and detailsDiv to parentDiv
                    parentDiv.appendChild(headerDiv);
                    parentDiv.appendChild(detailsDiv);
    
                    // Append headerDiv and detailsDiv to parentDiv
                    parentDiv.appendChild(headerDiv);
                    parentDiv.appendChild(detailsDiv);
    
                    downImg.onclick = function() {
                        const details = document.getElementById(blog._id)
                        if(details.style.display === 'flex'){
                            details.style.display = 'none';
                        }else{
                            details.style.display = 'flex';
                        }
                    }
    
                    container.appendChild(parentDiv);
                }
            }else{
                const container = document.getElementsByClassName("bloglist-container")[0]
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                container.textContent = "No matches found"
            }
        }else{
            alert(response.msg)
        }
    }catch(err){
        alert(err.message)
    }
}