if(!token){
    window.location.href = './login.html'
}

const userInfo = decodeJWT(token)

if(!userInfo.isAdmin){
    window.location.href = './index.html'
}

const url = "https://my-brand-karenzi-backend.onrender.com"

(async () => {
    try{
        const url = "https://my-brand-karenzi-backend.onrender.com"
        const token = localStorage.getItem("token")

        const resp = await fetch(`${url}/usermgt/get_users`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    
        let response = await resp.json()
    
        if(resp.ok){
            for(let user of response.userList){
                const container = document.getElementsByClassName("userlist-container")[0]

                const parentDiv = document.createElement('div');
                parentDiv.classList.add('user-mgt-user');
                parentDiv.id = `key-${user._id}`

                // Create blog header div element with class "blog-mgt-blog-header"
                const headerDiv = document.createElement('div');
                headerDiv.classList.add('user-mgt-user-header');
                
                // Create title div element with class "blogmgt-title"
                const titleDiv = document.createElement('div');
                titleDiv.classList.add('usermgt-title');
                titleDiv.textContent = user.username

                // Create options div element with class "blogmgt-options"
                const optionsDiv = document.createElement('div');
                optionsDiv.classList.add('usermgt-options');
                
                // Create "Down" image element
                const downImg = document.createElement('img');
                downImg.src = './images/down.png';
                downImg.width = '15';
                downImg.height = '15';
                downImg.classList.add('toggleDets');

                // Create "Delete" image element
                const deleteImg = document.createElement('img');
                deleteImg.src = './images/delete.png';
                deleteImg.width = '15';
                deleteImg.height = '15';

                deleteImg.onclick = async function () {
                    try {
                        const resp = await fetch(`${url}/usermgt/delete_user/${user._id}`,{
                            method:'DELETE',
                            headers:{
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        if(resp.status === 204){
                            container.removeChild(document.getElementById(`key-${user._id}`))
                            alert("User deleted successfully")
                        }else{
                            let response = await resp.json()
                            alert(response.msg)
                        }  
                    }catch(err) {
                        alert(err.message)
                    }
                }

                // Append image elements to optionsDiv
                optionsDiv.appendChild(downImg);
                optionsDiv.appendChild(deleteImg);
                        
                // Append titleDiv and optionsDiv to headerDiv
                headerDiv.appendChild(titleDiv);
                headerDiv.appendChild(optionsDiv);
                
                // Create details div element with class "details-blogmgt"
                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('details-usermgt');
                detailsDiv.id = user._id

                const dateObject = new Date(user.createdAt)

                const formattedDate = dateObject.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                });

                // Create list items for publication details
                const details = [`Created at: ${formattedDate}`, `Email: ${user.email}`, `Profile image: ${user.imageUrl}`];
                details.forEach(detail => {
                    const li = document.createElement('li');
                    li.textContent = detail;
                    detailsDiv.appendChild(li);
                });

                // Append headerDiv and detailsDiv to parentDiv
                parentDiv.appendChild(headerDiv);
                parentDiv.appendChild(detailsDiv);

                // Append headerDiv and detailsDiv to parentDiv
                parentDiv.appendChild(headerDiv);
                parentDiv.appendChild(detailsDiv);

                downImg.onclick = function() {
                    const details = document.getElementById(user._id)
                    if(details.style.display === 'flex'){
                        details.style.display = 'none';
                    }else{
                        details.style.display = 'flex';
                    }
                }

                container.appendChild(parentDiv);
            }
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

const userSearchSubmit = document.getElementsByClassName("user-search")[0].firstElementChild

userSearchSubmit.onclick = async function () {
    const userSearhInput = document.getElementsByClassName("user-search")[0].lastElementChild.value.trim()
    if(!userSearhInput){
        return;
    }

    try{
        const resp = await fetch(`${url}/usermgt/get_users?search_query=${userSearhInput}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        let response = await resp.json()
    
        if(resp.ok){
            if(response.userList.length !== 0){
                for(let user of response.userList){
                    const container = document.getElementsByClassName("userlist-container")[0]

                    while (container.firstChild) {
                        container.removeChild(container.firstChild);
                    }
    
                    const parentDiv = document.createElement('div');
                    parentDiv.classList.add('user-mgt-user');
                    parentDiv.id = `key-${user._id}`
    
                    // Create blog header div element with class "blog-mgt-blog-header"
                    const headerDiv = document.createElement('div');
                    headerDiv.classList.add('user-mgt-user-header');
                    
                    // Create title div element with class "blogmgt-title"
                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('usermgt-title');
                    titleDiv.textContent = user.username
    
                    // Create options div element with class "blogmgt-options"
                    const optionsDiv = document.createElement('div');
                    optionsDiv.classList.add('usermgt-options');
                    
                    // Create "Down" image element
                    const downImg = document.createElement('img');
                    downImg.src = './images/down.png';
                    downImg.width = '15';
                    downImg.height = '15';
                    downImg.classList.add('toggleDets');
    
                    // Create "Delete" image element
                    const deleteImg = document.createElement('img');
                    deleteImg.src = './images/delete.png';
                    deleteImg.width = '15';
                    deleteImg.height = '15';
    
                    deleteImg.onclick = async function () {
                        try {
                            const resp = await fetch(`${url}/usermgt/delete_user/${user._id}`,{
                                method:'DELETE',
                                headers:{
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                            if(resp.status === 204){
                                container.removeChild(document.getElementById(`key-${user._id}`))
                                alert("User deleted successfully")
                            }else{
                                let response = await resp.json()
                                alert(response.msg)
                            }  
                        }catch(err) {
                            alert(err.message)
                        }
                    }
    
                    // Append image elements to optionsDiv
                    optionsDiv.appendChild(downImg);
                    optionsDiv.appendChild(deleteImg);
                            
                    // Append titleDiv and optionsDiv to headerDiv
                    headerDiv.appendChild(titleDiv);
                    headerDiv.appendChild(optionsDiv);
                    
                    // Create details div element with class "details-blogmgt"
                    const detailsDiv = document.createElement('div');
                    detailsDiv.classList.add('details-usermgt');
                    detailsDiv.id = user._id
    
                    const dateObject = new Date(user.createdAt)

                    const formattedDate = dateObject.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    });

                    // Create list items for publication details
                    const details = [`Created at: ${formattedDate}`, `Email: ${user.email}`, `Profile image: ${user.imageUrl}`];
                    details.forEach(detail => {
                        const li = document.createElement('li');
                        li.textContent = detail;
                        detailsDiv.appendChild(li);
                    });
    
                    // Append headerDiv and detailsDiv to parentDiv
                    parentDiv.appendChild(headerDiv);
                    parentDiv.appendChild(detailsDiv);
    
                    // Append headerDiv and detailsDiv to parentDiv
                    parentDiv.appendChild(headerDiv);
                    parentDiv.appendChild(detailsDiv);
    
                    downImg.onclick = function() {
                        const details = document.getElementById(user._id)
                        if(details.style.display === 'flex'){
                            details.style.display = 'none';
                        }else{
                            details.style.display = 'flex';
                        }
                    }
    
                    container.appendChild(parentDiv);
                }
            }else{
                const container = document.getElementsByClassName("userlist-container")[0]

                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                container.textContent = "No matches found"
            }
        }else{
            alert(response.msg)
        }
    }catch(err){
        alert(err.message)
    }
}