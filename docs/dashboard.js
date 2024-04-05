if(!token){
    window.location.href = './login.html'
}

const userInfo = decodeJWT(token)

if(!userInfo.isAdmin){
    window.location.href = './index.html'
}

(async () => {
    const url = "https://my-brand-karenzi-backend.onrender.com"
    try{
        const resp = await fetch(`${url}/dashboard/get_counts`,{
            method: "GET",
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        let response = await resp.json()

        if(resp.ok){
            const circularDivs = document.getElementsByClassName("circular")
            circularDivs[0].textContent = response.userCount
            circularDivs[1].textContent = response.blogCount
            circularDivs[2].textContent = response.queryCount
        }else{
            alert(response.msg)
        }
    }catch(err){
        alert(err.message)
    }
})()

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