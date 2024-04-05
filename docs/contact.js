const form = document.getElementsByClassName("contact-form")[0]
const loader = document.getElementsByClassName("loader")[0]

const url = "https://my-brand-karenzi-backend.onrender.com"

const uploadQuery = async (formData) => {
    loader.style.display = "flex"
    const resp = await fetch(`${url}/queries/create_query`,{
        method:"POST",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    let response = await resp.json()
    loader.style.display = "none"
    alert(response.msg)
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    

    if(!token){
        alert("Please login")
    }

    const username = document.getElementById('contact-username').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const content = document.getElementById('contact-textarea').value.trim();
    const errorUsername = document.getElementById('error-contact-usr')
    const errorEmail = document.getElementById('error-contact-email')
    const errorContent = document.getElementById('error-contact-textarea')

    errorUsername.textContent = ""
    errorEmail.textContent = ""
    errorContent.textContent = ""

    let userRegex = /[A-Za-z0-9]/
    let contentRegex = /[A-Za-z0-9]/
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

    if(!content) {
        errorContent.textContent = "Body is required"
    }else{
        if(!contentRegex.test(content)){
            errorContent.textContent = "Minimum of 10 words required"
        }
    }

    if(!(errorUsername.textContent && errorEmail.textContent && errorContent.textContent)){
        const userData = decodeJWT(token)
        const formData = {
            userId: userData._id,
            query: content
        }

        uploadQuery(formData)
    }
})