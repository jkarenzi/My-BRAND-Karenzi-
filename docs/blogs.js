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

for (let i = 0; i < localStorage.length; i++) {
    const blog = JSON.parse(localStorage.getItem(localStorage.key(i)))
    
    // Create the main div with class 'blog'
    const blogDiv = document.createElement('div');
    blogDiv.classList.add('blog');
    blogDiv.id = blog.uuid
    
    // Create the div with class 'blog-img' and append it to the main div
    const blogImgDiv = document.createElement('div');
    blogImgDiv.classList.add('blog-img');
    blogDiv.appendChild(blogImgDiv);
    
    // Create the img element and set its src attribute
    const img = document.createElement('img');
    img.src = './images/code.png';
    blogImgDiv.appendChild(img);
    
    // Create the div with class 'blog-part2' and append it to the main div
    const blogPart2Div = document.createElement('div');
    blogPart2Div.classList.add('blog-part2');
    blogDiv.appendChild(blogPart2Div);
    
    // Create the h3 elements for 'Game Development' and 'Nov 25, 2020' and append them to the 'blog-part2' div
    const h3Game = document.createElement('h3');
    h3Game.textContent = blog.titleInput;
    const h3Date = document.createElement('h3');
    h3Date.textContent = 'Nov 25, 2020';
    blogPart2Div.appendChild(h3Game);
    
    h3Game.onclick = function () {
        window.location.href = `./blogpage.html?id=${blog.uuid}`
    }

    blogPart2Div.appendChild(h3Date);
    
    // Append the main 'blog' div to the body or any other parent element
    document.getElementsByClassName('blog-inner-container')[0].appendChild(blogDiv);
}