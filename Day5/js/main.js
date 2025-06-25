let btnSearch = document.querySelector('.search-box_button');
let searchBox = document.querySelector('.search-box');
let searchInput = document.querySelector('.search-box input');

btnSearch.addEventListener('click', () => {
    searchBox.classList.toggle('open');
    
    if (searchBox.classList.contains('open')) {
        // Focus vào input khi mở
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    }
});

// Đóng search box khi click ra ngoài
document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target)) {
        searchBox.classList.remove('open');
    }
});

// Đóng search box khi nhấn Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchBox.classList.remove('open');
    }
});


