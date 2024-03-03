const form = document.getElementsByClassName("contact-form")[0]

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("hello")
    const username = document.getElementById('contact-username').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const content = document.getElementById('contact-textarea').value.trim();
    const errorUsername = document.getElementById('error-contact-usr')
    const errorEmail = document.getElementById('error-contact-email')
    const errorContent = document.getElementById('error-contact-textarea')

    errorUsername.textContent = ""
    errorEmail.textContent = ""
    errorContent.textContent = ""

    let userRegex = /[A-Za-z]{5,}/
    let contentRegex = /^\w+(\s+\w+){9,}[.,?!]?$/
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

    if(!content) {
        errorContent.textContent = "Body is required"
    }else{
        if(!contentRegex.test(content)){
            errorContent.textContent = "Minimum of 10 words required"
        }
    }
})