let images = document.querySelectorAll('.image');
let buttonPrev = document.querySelector('.prev');
let buttonNext = document.querySelector('.next');
let buttonClose = document.querySelector('.close');
let galleryImg = document.querySelector('.gallery-inner img');
let gallery = document.querySelector('.gallery');

var currentIndex = 0;

images.forEach((item, index) => {
    item.addEventListener('click', function() {
        currentIndex = index;
        galleryImg.src = item.querySelector('img').src;
        gallery.classList.add('show');
    })
})

buttonClose.addEventListener('click', function() {
    gallery.classList.remove('show');
});

buttonPrev.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    galleryImg.src = images[currentIndex].querySelector('img').src;
});

buttonNext.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % images.length;
    galleryImg.src = images[currentIndex].querySelector('img').src;
});

document.addEventListener('keydown', function(e) {
    if (e.keyCode == 27) {
        gallery.classList.remove('show');
    }
})