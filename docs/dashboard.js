if(!token){
    window.location.href = './login.html'
}

const userInfo = decodeJWT(token)

if(!userInfo.isAdmin){
    window.location.href = './index.html'
}

(async () => {
    const loaderbig = document.getElementsByClassName("loader-big")[0]
    loaderbig.style.display = "flex"
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
        console.log(response)

        loaderbig.style.display = "none"
        if(resp.ok){
            const circularDivs = document.getElementsByClassName("circular")
            circularDivs[0].textContent = response.userCount
            circularDivs[1].textContent = response.blogCount
            circularDivs[2].textContent = response.queryCount

            for(let notification of response.notificationList){
                const outerDiv = document.createElement('div');
                outerDiv.classList.add('notification');
    
                const innerDiv = document.createElement('div');
                innerDiv.classList.add('inner-not');
                const imageContainer = document.createElement("div")
                imageContainer.classList.add("blog-profile")
    
    
                const image = document.createElement('img');
                image.src = notification.imageUrl;
                imageContainer.appendChild(image)
    
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('actual-not');
                if(notification.notificationType === "like"){
                    commentDiv.textContent = `${notification.username} liked your blog: blogId-${notification.featureId}`
                }else if(notification.notificationType === "dislike"){
                    commentDiv.textContent = `${notification.username} disliked your blog: blogId-${notification.featureId}`
                }else if(notification.notificationType === "comment"){
                    commentDiv.textContent = `${notification.username} commented on your blog: blogId-${notification.featureId}`;
                }else if(notification.notificationType === "query"){
                    commentDiv.textContent = `New message from ${notification.username}`
                }
                
                innerDiv.appendChild(imageContainer);
                innerDiv.appendChild(commentDiv);

                const dateObject = new Date(notification.createdAt)
                const formattedDate = dateObject.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                });
    
                const timeHeading = document.createElement('h3');
                timeHeading.textContent = formattedDate;
    
                outerDiv.appendChild(innerDiv);
                outerDiv.appendChild(timeHeading);
    
                const notificationContainer = document.getElementsByClassName("big-notifications")[0]
                notificationContainer.appendChild(outerDiv);
            }
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