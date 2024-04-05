const dropdown = document.getElementsByClassName('dropdown')[0]
const hamburger = document.getElementsByClassName('ham')[0]
let pageLocation = window.location.href.split("/")
let page = pageLocation[pageLocation.length - 1]
const link = document.getElementById(page)
const token = localStorage.getItem("token")
const header = document.getElementsByTagName("header")[0]
const userbox1 = document.getElementsByClassName("user-box1")[0]

if(!token){
    
    const loginButton = document.createElement("button")
    loginButton.classList.add("header-btn")
    loginButton.textContent = "Login"
    loginButton.onclick = function () {
        window.location.href = './login.html'
    }
    header.removeChild(userbox1)
    header.appendChild(loginButton)
}

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

const logoutBtn = document.getElementsByClassName("dropdown1")[0].lastElementChild
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token")
    alert("successfully logged out")
    window.location.href = "./index.html"
})


function toggleMenu () {
    const profileMenu = document.getElementsByClassName("dropdown1")[0]
    if(profileMenu.style.display === 'flex'){
        profileMenu.style.display = 'none'
    }else{
        profileMenu.style.display = 'flex'
    }
}

const decodeJWT = (token) => {
    const parts = token.split('.');
    const payload = parts[1];

    const decodedPayload = atob(payload);

    const jsonPayload = JSON.parse(decodedPayload);

    return jsonPayload.user;
}

if(token){
    const profileHeaderContainer = document.getElementsByClassName("user-box2")[0]
    const profileHeaderImg = document.createElement("img")
    const userInfo = decodeJWT(token)
    profileHeaderImg.src = userInfo.imageUrl
    profileHeaderContainer.appendChild(profileHeaderImg)
}
