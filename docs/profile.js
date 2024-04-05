if(!token){
    window.location.href = './login.html'
}

const userInfo = decodeJWT(token)

const username = document.getElementsByClassName("change")[0].firstElementChild
const email = document.getElementsByClassName("change")[1].firstElementChild
const profileHeader = document.getElementsByClassName("profile-header")[0]
const profileImgContainer = document.getElementsByClassName("user-box6")[0]


const profileImg = document.createElement("img")
profileHeader.textContent = `${userInfo.username}'s Profile settings`
username.textContent = `Username: ${userInfo.username}`
email.textContent = `Email: ${userInfo.email}`
profileImg.src = userInfo.imageUrl
profileImgContainer.appendChild(profileImg)


const usernameOverlayBig = document.getElementsByClassName("usermgt-overlay-big-u")[0]
const passwordOverlayBig = document.getElementsByClassName("usermgt-overlay-big-p")[0]
const emailOverlayBig = document.getElementsByClassName("usermgt-overlay-big-e")[0]
const profileOverlayBig = document.getElementsByClassName("usermgt-overlay-big-pr")[0]

const closerU = document.getElementById("close-update-u")
const closerP = document.getElementById("close-update-p")
const closerE = document.getElementById("close-update-e")
const closerPR = document.getElementById("close-update-pr")

const editUsername = document.getElementById("edit-username")
const editPassword = document.getElementById("edit-password")
const editEmail = document.getElementById("edit-email")
const editProfileImg = document.getElementsByClassName("camera")[0]

const usernameForm = document.getElementById("usermgt-form-u")
const passwordForm = document.getElementById("usermgt-form-p")
const emailForm = document.getElementById("usermgt-form-e")
const profileImgForm = document.getElementById("usermgt-form-pr")
const loaders = document.getElementsByClassName("loader")


const url = "https://my-brand-karenzi-backend.onrender.com"

closerU.addEventListener("click", () => {
    usernameOverlayBig.style.display = "none"
})

closerP.addEventListener("click", () => {
    passwordOverlayBig.style.display = "none"
})

closerE.addEventListener("click", () => {
    emailOverlayBig.style.display = "none"
})

closerPR.addEventListener("click", () => {
    profileOverlayBig.style.display = "none"
})

editUsername.addEventListener("click", () => {
    usernameOverlayBig.style.display = "flex"
})

editPassword.addEventListener("click", () => {
    passwordOverlayBig.style.display = "flex"
})

editEmail.addEventListener("click", () => {
    emailOverlayBig.style.display = "flex"
})

editProfileImg.addEventListener("click", () => {
    profileOverlayBig.style.display = "flex"
})

usernameForm.addEventListener("submit", async(e) => {
    e.preventDefault()
    loaders[0].style.display = "flex"
    const password = document.getElementById("password-u").value.trim()
    const newUsername = document.getElementById("new-username").value.trim()

    const formData = {
        id: decodeJWT(token)._id,
        password,
        newUsername
    }

    console.log(formData)
    try{
        const resp = await fetch(`${url}/usermgt/update_username`,{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
    
        let response = await resp.json()
        loaders[0].style.display = "none"
        alert(response.msg)
    }catch(err){
        alert(err.message)
    }
})

passwordForm.addEventListener("submit", async(e) => {
    e.preventDefault()
    loaders[1].style.display = "flex"
    const oldPassword = document.getElementById("old-password").value.trim()
    const newPassword = document.getElementById("new-password").value.trim()

    const formData = {
        id: decodeJWT(token)._id,
        oldPassword,
        newPassword
    }

    try{
        const resp = await fetch(`${url}/usermgt/update_password`,{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
    
        let response = await resp.json()
        loaders[1].style.display = "none"
        alert(response.msg)
    }catch(err){
        alert(err.message)
    }
})

emailForm.addEventListener("submit", async(e) => {
    e.preventDefault()
    loaders[2].style.display = "flex"
    const password = document.getElementById("password-e").value.trim()
    const newEmail = document.getElementById("new-email").value.trim()

    try{
        const formData = {
            id: decodeJWT(token)._id,
            password,
            newEmail
        }
    
        const resp = await fetch(`${url}/usermgt/update_email`,{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
    
        let response = await resp.json()
        loaders[2].style.display = "none"
        alert(response.msg)
    }catch(err){
        alert(err.message)
    }
})

profileImgForm.addEventListener("submit", async(e) => {
    e.preventDefault()
    loaders[3].style.display = "flex"

    const password = document.getElementById("password-pr").value.trim()
    const newImage = document.getElementById("new-image")

    const formData = new FormData()
    formData.append("id", decodeJWT(token)._id)
    formData.append("password", password)
    formData.append("image", newImage.files[0])

    try{
        const resp = await fetch(`${url}/usermgt/update_profile_img`,{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        })
    
        let response = await resp.json()
        loaders[3].style.display = "none"
        alert(response.msg)
    }catch(err){
        alert(err.message)
    }
})