const url = "https://my-brand-karenzi-backend.onrender.com"
const leftLinks = document.getElementsByClassName("left-link")

pageLocation = window.location.href.split("/")
page = pageLocation[pageLocation.length - 1]

for(let item of leftLinks){
    let list = item.firstElementChild.href.split('/')
    if(list[list.length-1] === page){
        item.firstElementChild.style.borderBottom = "1.5px solid #DF5F17"
    }
}

(async () => {
    const loaderbig = document.getElementsByClassName("loader-big")[0]
    loaderbig.style.display = "flex"
    try{
        const pathList = window.location.href.split('?')
        const queryId = pathList[pathList.length-1].split("=")[1]
        
        const resp = await fetch(`${url}/queries/get_query/${queryId}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    
        let response = await resp.json()
        loaderbig.style.display = "none"
        if(resp.ok){
            const adminContainer = document.getElementsByClassName("admin-container1")[0]
                // Create admin-header1 div
            const adminHeaderDiv = document.createElement('div');
            adminHeaderDiv.classList.add('admin-header1');

            // Create back-circular div
            const backCircularDiv = document.createElement('div');
            backCircularDiv.classList.add('back-circular');

            // Create img element for back button
            const backButtonImg = document.createElement('img');
            backButtonImg.src = './images/back.png';
            backButtonImg.width = '15';
            backButtonImg.height = '15';

            // Append img element to back-circular div
            backCircularDiv.appendChild(backButtonImg);

            backCircularDiv.onclick = function () {
                window.location.href = './admin.html'
            }

            // Append back-circular div to admin-header1 div
            adminHeaderDiv.appendChild(backCircularDiv);

            // Create contact-query1 div
            const contactQueryDiv = document.createElement('div');
            contactQueryDiv.classList.add('contact-query1');

            // Create blog-identity div
            const blogIdentityDiv = document.createElement('div');
            blogIdentityDiv.classList.add('blog-identity');

            // Create blog-profile div
            const blogProfileDiv = document.createElement('div');
            blogProfileDiv.classList.add('blog-profile');

            // Create img element for profile picture
            const profileImg = document.createElement('img');
            profileImg.src = response.query.imageUrl;

            // Append img element to blog-profile div
            blogProfileDiv.appendChild(profileImg);

            // Create blog-owner div
            const blogOwnerDiv = document.createElement('div');
            blogOwnerDiv.classList.add('blog-owner');

            // Create h3 elements for owner name and date
            const ownerNameHeading = document.createElement('h3');
            ownerNameHeading.textContent = response.query.username;

            const dateHeading = document.createElement('h3');
            const dateObject = new Date(response.query.createdAt)

            const formattedDate = dateObject.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            });
            dateHeading.textContent = formattedDate;

            // Append h3 elements to blog-owner div
            blogOwnerDiv.appendChild(ownerNameHeading);
            blogOwnerDiv.appendChild(dateHeading);

            // Append blog-profile and blog-owner divs to blog-identity div
            blogIdentityDiv.appendChild(blogProfileDiv);
            blogIdentityDiv.appendChild(blogOwnerDiv);

            // Create question-long div
            const questionLongDiv = document.createElement('div');
            questionLongDiv.classList.add('question-long');
            questionLongDiv.textContent = response.query.query

            // Append blog-identity and question-long divs to contact-query1 div
            contactQueryDiv.appendChild(blogIdentityDiv);
            contactQueryDiv.appendChild(questionLongDiv);

            // Append admin-header1 and contact-query1 divs to the document body (or any other parent element)
            adminContainer.appendChild(adminHeaderDiv);
            adminContainer.appendChild(contactQueryDiv);
        }
    }catch(err){
        alert(err.message)
    }   
})()
