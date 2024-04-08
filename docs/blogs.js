const url = "https://my-brand-karenzi-backend.onrender.com"

function scrollLeft1() {
    let rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let container = document.getElementsByClassName('blog-inner-container')[0]
    let blog = document.getElementsByClassName('blog')[0]
    let containerDimensions = blog.getBoundingClientRect();
    let containerWidth = containerDimensions.width + rootFontSize;
    container.scrollLeft -= containerWidth;
}

function scrollRight1() {
    let rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let container = document.getElementsByClassName('blog-inner-container')[0]
    let blog = document.getElementsByClassName('blog')[0]
    let containerDimensions = blog.getBoundingClientRect();
    let containerWidth = containerDimensions.width + rootFontSize;
    container.scrollLeft += containerWidth;
}

(async () => {
    try{
        const loaderbig = document.getElementsByClassName("loader-big")[0]
        loaderbig.style.display = "flex"
        const resp = await fetch(`${url}/blogs/get_blogs`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
    
        let response = await resp.json()
        loaderbig.style.display = "none"
        if(resp.ok){
            for(let blog of response.blogList){
                const blogDiv = document.createElement('div');
                blogDiv.classList.add('blog');
                blogDiv.id = blog._id
    
                const blogImgDiv = document.createElement('div');
                blogImgDiv.classList.add('blog-img');
                blogDiv.appendChild(blogImgDiv);
    
                const img = document.createElement('img');
                img.src = blog.imageUrl
                blogImgDiv.appendChild(img);
    
                const blogPart2Div = document.createElement('div');
                blogPart2Div.classList.add('blog-part2');
                blogDiv.appendChild(blogPart2Div);
    
                const h3Game = document.createElement('h3');
                h3Game.textContent = blog.title;
                const h3Date = document.createElement('h3');
                const dateObject = new Date(blog.createdAt)

                const formattedDate = dateObject.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                });
                h3Date.textContent = formattedDate;
                blogPart2Div.appendChild(h3Game);
    
                h3Game.onclick = function () {
                    window.location.href = `./blogpage.html?id=${blog._id}`
                }
    
                blogPart2Div.appendChild(h3Date);
        
                document.getElementsByClassName('blog-inner-container')[0].appendChild(blogDiv);
            }
        }
    }catch(err){
        alert(err.message)
    }
   
})();