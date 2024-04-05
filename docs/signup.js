const signupForm = document.getElementById("signup-submit")
const url = "https://my-brand-karenzi-backend.onrender.com"

const loader = document.getElementsByClassName("loader")[0]

const signUp = async (formData) => {
    loader.style.display = "flex"
    try{
        const resp = await fetch(`${url}/auth/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },        
            body: JSON.stringify(formData)
        })
    
        console.log(resp)
        let response = await resp.json()

        loader.style.display = "none"
    
        if(resp.status === 201){
            alert(response.msg)
            window.location.href = './login.html'
        }else{
            alert(response.msg)
        }
    }catch(err){
        console.log(err.message)
        alert("Error")
    }     
}


signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()
    const email = document.getElementById("email").value.trim()
    const errorUsername = document.getElementById('error-username')
    const errorPassword = document.getElementById('error-password')
    const errorEmail = document.getElementById("error-email")

    errorUsername.textContent = ""
    errorPassword.textContent = ""
    errorEmail.textContent = ""

    let userRegex = /[A-Za-z]{5,}/
    let passRegex = /^[A-Za-z0-9]{8,}$/
    let emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/

    if(!email) {
        errorEmail.textContent = "Email is required"
    }else{
        if(!emailRegex.test(email)){
            errorEmail.textContent = "Invalid email format"
        }
    }

    if(!username) {
        errorUsername.textContent = "Username is required"
    }else{
        if(!userRegex.test(username)){
            errorUsername.textContent = "Username must be atleast 5 letters long"
        }
    }

    if(!password) {
        errorPassword.textContent = "Password is required"
    }else{
        if(!passRegex.test(password)){
            errorPassword.textContent = "Password must be atleast 8 characters long and contain atleast one uppercase letter and one number"
        }
    }

    if(!(errorUsername.textContent && errorPassword.textContent && errorEmail.textContent)){
        console.log("accessed")
        const formData = {
            username,
            password,
            email
        }

        signUp(formData)
    }   
})