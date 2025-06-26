let eKey = document.querySelector('.card.key p:last-child');
let eLocation = document.querySelector('.card.location p:last-child');
let eWhich = document.querySelector('.card.which p:last-child');
let eCode = document.querySelector('.card.code p:last-child');
let alert = document.querySelector('.alert');
let box = document.querySelector('.box');
let result = document.querySelector('.result');



document.addEventListener('keydown', (e) => {
    alert.classList.add('hide');
    box.classList.remove('hide');
    eKey.textContent = e.key;
    eLocation.textContent = e.location;
    eWhich.textContent = e.which;
    eCode.textContent = e.code;
    result.textContent = e.which;
});