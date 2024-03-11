const pathList = window.location.href.split('?')
const blogId = pathList[pathList.length-1].split("=")[1]

const blog = JSON.parse(localStorage.getItem(blogId))

// Create blog page header
const blogPageHeader = document.createElement('div');
blogPageHeader.classList.add('blogpage-header');

const h1 = document.createElement('h1');
h1.textContent = blog.titleInput

const blogPageHeader2 = document.createElement('div');
blogPageHeader2.classList.add('blogpage-header2');

const blogPageHeader2Left = document.createElement('div');
blogPageHeader2Left.classList.add('blogpage-header2-left');

const blogProfile = document.createElement('div');
blogProfile.classList.add('blog-profile');

const img = document.createElement('img');
img.src = './images/profile.jpg';
blogProfile.appendChild(img);

const h4Author = document.createElement('h4');
h4Author.textContent = 'Joslyn Manzi Karenzi';
blogPageHeader2Left.appendChild(blogProfile);
blogPageHeader2Left.appendChild(h4Author);

const h4Published = document.createElement('h4');
h4Published.textContent = 'Published: April 28, 2023';
blogPageHeader2.appendChild(blogPageHeader2Left);
blogPageHeader2.appendChild(h4Published);

blogPageHeader.appendChild(h1);
blogPageHeader.appendChild(blogPageHeader2);

// Create blog content
const blogPageBlog = document.createElement('div');
blogPageBlog.classList.add('blogpage-blog');

blogPageBlog.textContent = blog.blogInput

const blogPageContainer = document.getElementsByClassName('blogpage-container')[0]

// Prepend elements to the document
blogPageContainer.prepend(blogPageBlog);
blogPageContainer.prepend(blogPageHeader);