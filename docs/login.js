const loginForm = document.getElementById("login-submit")
const url = "https://my-brand-karenzi-backend.onrender.com"

const loader = document.getElementsByClassName("loader")[0]

const decodeJWT = (token) => {
    const parts = token.split('.');
    const payload = parts[1];

    const decodedPayload = atob(payload);

    const jsonPayload = JSON.parse(decodedPayload);

    return jsonPayload.user;
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()
    const errorUsername = document.getElementById("error-username")
    const errorPassword = document.getElementById("error-password")

    errorUsername.textContent = ""
    errorPassword.textContent = ""

    if(!username){
        errorUsername.textContent = "Username is required"
    }

    if(!password){
        errorPassword.textContent = "Password is required"
    }

    if(!(errorUsername.textContent && errorPassword.textContent)){
        loader.style.display = "flex"
        const formData = {
            username,
            password
        }
    
        try{
            const resp = await fetch(`${url}/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },        
                body: JSON.stringify(formData)
            })

            let response = await resp.json()

            loader.style.display = "none"
        
            if(resp.status === 200){
                localStorage.setItem("token", response.token)    
                const userInfo = decodeJWT(response.token)
                alert(response.msg)
                if(userInfo.isAdmin){
                    window.location.href = './dashboard.html'
                }else{
                    window.location.href = './index.html'
                }
                
            }else{
                alert(response.msg)
            }   
        }catch(err){
            console.log(err.message)
            alert("Error")
        }  
    }
})