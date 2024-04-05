if(!token){
    window.location.href = './login.html'
}

const userInfo = decodeJWT(token)

if(!userInfo.isAdmin){
    window.location.href = './index.html'
}

const leftLinks = document.getElementsByClassName("left-link")
const url = "https://my-brand-karenzi-backend.onrender.com"

pageLocation = window.location.href.split("/")
page = pageLocation[pageLocation.length - 1]

console.log(page)


for(let item of leftLinks){
    let list = item.firstElementChild.href.split('/')
    if(list[list.length-1] === page){
        item.firstElementChild.style.borderBottom = "1.5px solid #DF5F17"
    }
}

(async () => {
    const resp = await fetch(`${url}/queries/get_queries`,{
        method:"GET",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    let response = await resp.json()
    console.log(response)

    if(resp.ok){
        const adminHeader = document.getElementsByClassName("admin-header")[0]
        adminHeader.textContent = `${response.queryList.length} results`
        const adminContainer = document.getElementsByClassName("admin-container")[0]
        for(let query of response.queryList){
            // Create main container div
            const contactQueryDiv = document.createElement('div');
            contactQueryDiv.classList.add('contact-query');
            contactQueryDiv.id = query._id

            contactQueryDiv.onclick = function () {
                window.location.href = `./question.html?id=${query._id}`
            }

            // Create div for user ID
            const userIdDiv = document.createElement('div');
            userIdDiv.classList.add('query-userid');
            userIdDiv.textContent = query.username;

            // Create div for email
            const emailDiv = document.createElement('div');
            emailDiv.classList.add('query-email');
            emailDiv.textContent = query.email;

            // Create div for actual query
            const actualQueryDiv = document.createElement('div');
            actualQueryDiv.classList.add('actual-query');
            actualQueryDiv.textContent = query.query.slice(0,32)+'...';

            // Create div for timestamp
            const timestampDiv = document.createElement('div');
            timestampDiv.classList.add('timestamp');

            // Create h4 element for timestamp
            const timestampHeading = document.createElement('h4');

            const dateObject = new Date(query.createdAt)

            const formattedDate = dateObject.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            });
            
            timestampHeading.textContent = formattedDate;

            // Append h4 element to timestamp div
            timestampDiv.appendChild(timestampHeading);

            // Append all elements to the main container div
            contactQueryDiv.appendChild(userIdDiv);
            contactQueryDiv.appendChild(emailDiv);
            contactQueryDiv.appendChild(actualQueryDiv);
            contactQueryDiv.appendChild(timestampDiv);

            // Append the main container div to the document body (or any other parent element)
            adminContainer.appendChild(contactQueryDiv);
        }
    }else{
        alert(response.msg)
    }
})()