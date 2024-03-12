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
        const header = document.getElementsByClassName('blog-overlay-header')[0].firstElementChild.textContent
        if(header === 'Edit Blog'){
            try{
                const blogId = document.getElementsByClassName("form-blog")[0].firstElementChild.value
                localStorage.removeItem(blogId)
                const blogData = { uuid: blogId, titleInput, blogInput };
                localStorage.setItem(blogId, JSON.stringify(blogData))
                alert("Blog successfully updated!")
            }catch(err){
                alert(err.message)
            }
        }else{
            try{
                const uuid = crypto.randomUUID()
        
                const blogData = { uuid, titleInput, blogInput };
                localStorage.setItem(uuid, JSON.stringify(blogData));
                alert("Blog saved successfully!")
            }catch(err) {
                alert(err.message)
            }
        }
        
    }
})

//toggle details
//const downArrow = document.getElementsByClassName('toggleDets')
//const details = document.getElementsByClassName('details-blogmgt')[0]

//downArrow.addEventListener('click', () => {
    //if(details.style.display === 'flex'){
        //details.style.display = 'none';
    //}else{
        //details.style.display = 'flex';
    //}
//})

//displaying all blogs on admin
// Create parent div element with class "blog-mgt-blog"
for (let i = 0; i < localStorage.length; i++) {
    const blog = JSON.parse(localStorage.getItem(localStorage.key(i)))
    const container = document.getElementsByClassName("bloglist-container")[0]

    const parentDiv = document.createElement('div');
    parentDiv.classList.add('blog-mgt-blog');
    parentDiv.id = `key-${blog.uuid}`
    
    // Create blog header div element with class "blog-mgt-blog-header"
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('blog-mgt-blog-header');
    
    // Create title div element with class "blogmgt-title"
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('blogmgt-title');
    titleDiv.textContent = blog.titleInput
    
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
        titleInput.value = blog.titleInput
        blogInput.value = blog.blogInput

        const hiddenInput = document.createElement("input")
        hiddenInput.type = "hidden"
        hiddenInput.value = blog.uuid

        document.getElementsByClassName("form-blog")[0].prepend(hiddenInput)

        blogOverlayBig.style.display = 'flex'
    }

    
    // Create "Delete" image element
    const deleteImg = document.createElement('img');
    deleteImg.src = './images/delete.png';
    deleteImg.width = '15';
    deleteImg.height = '15';

    deleteImg.onclick = function() {
        try {
            localStorage.removeItem(blog.uuid)
            container.removeChild(document.getElementById(`key-${blog.uuid}`))
            alert("Blog deleted successfully")
        }catch(err) {
            console.log(err.message)
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
    detailsDiv.id = blog.uuid

    // Create list items for publication details
    const details = ['Published on 19 Feb 2024', '15 Likes', '25 Dislikes', '13K Comments'];
    details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailsDiv.appendChild(li);
    });

    // Append headerDiv and detailsDiv to parentDiv
    parentDiv.appendChild(headerDiv);
    parentDiv.appendChild(detailsDiv);

    downImg.onclick = function() {
        const details = document.getElementById(blog.uuid)
        if(details.style.display === 'flex'){
            details.style.display = 'none';
        }else{
            details.style.display = 'flex';
        }
    }

    container.appendChild(parentDiv);
}