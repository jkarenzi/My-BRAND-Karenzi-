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