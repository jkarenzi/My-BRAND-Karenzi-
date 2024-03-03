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