const dropdown = document.getElementsByClassName('dropdown')[0]
const hamburger = document.getElementsByClassName('ham')[0]
let pageLocation = window.location.href.split("/")
let page = pageLocation[pageLocation.length - 1]
const link = document.getElementById(page)

console.log(page)
if(link){
    link.style.borderBottom = "1.5px solid #DF5F17"
}

console.log(hamburger)

//header functions
hamburger.addEventListener('click', () => {
    if(dropdown.style.display === 'flex'){
        dropdown.style.display = 'none';
    }else{
        dropdown.style.display = 'flex';
    }
})


function toggleMenu () {
    const profileMenu = document.getElementsByClassName("dropdown1")[0]
    if(profileMenu.style.display === 'flex'){
        profileMenu.style.display = 'none'
    }else{
        profileMenu.style.display = 'flex'
    }
}