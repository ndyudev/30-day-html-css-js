var modal = document.querySelector('.modal')
let btnOpen = document.querySelector('.open_modal_btn')
let iconClose = document.querySelector('.modal_header i')
let btnClose = document.querySelector('.close_modal_btn')

function toggleModal() {
    modal.classList.toggle('hide')
}

btnOpen.addEventListener('click', toggleModal)
iconClose.addEventListener('click', toggleModal)
btnClose.addEventListener('click', toggleModal)



