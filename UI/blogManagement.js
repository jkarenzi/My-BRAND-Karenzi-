const queries = document.getElementsByClassName("sm-header-link")[0]
const blogs = document.getElementsByClassName("sm-header-link")[1]
pageLocation = window.location.href.split("/")
page = pageLocation[pageLocation.length - 1]

console.log(page)

if(page === "admin.html"){
    queries.style.borderBottom = "1.5px solid #DF5F17"
}else if(page === "blogManagement.html") {
    blogs.style.borderBottom = "1.5px solid #DF5F17"
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
    blogOverlayBig.style.display = 'none';
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const titleInput = document.getElementById('blog-title').value.trim();
    const blogInput = document.getElementById('blog-blog').value.trim();
    const coverImage = document.getElementById("blog-image").value
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

    if(!coverImage) {
        errorImage.textContent = "Cover Image is required"
    }
    
    if(titleInput && blogInput && coverImage){
        const blogData = { titleInput, blogInput };
        localStorage.setItem('blogData', JSON.stringify(blogData));
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





