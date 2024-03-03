const signupForm = document.getElementById("signup-submit")


signupForm.addEventListener('submit', (e) => {
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
    let passRegex = /\w{8,}[A-Z]{1,}\d{1,}/
    let emailRegex = /^\w{1,}@\w{1,}\.\w{1,}$/

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
})
