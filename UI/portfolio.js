//card slider functions
function scrollLeft2() {
    let rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let container = document.getElementsByClassName('project-inner-container')[0]
    let project = document.getElementsByClassName('actual-project')[0]
    let containerDimensions = project.getBoundingClientRect();
    let containerWidth = containerDimensions.width + rootFontSize;
    container.scrollLeft -= containerWidth;
}

function scrollRight2() {
    let rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let container = document.getElementsByClassName('project-inner-container')[0]
    let project = document.getElementsByClassName('actual-project')[0]
    let containerDimensions = project.getBoundingClientRect();
    let containerWidth = containerDimensions.width + rootFontSize;
    container.scrollLeft += containerWidth;
}