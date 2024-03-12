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