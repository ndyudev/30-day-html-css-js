// Lấy các elements cần thiết
const searchInput = document.getElementById('search');
const content = document.querySelector('.content');
const tagsList = document.querySelector('.tags-list');
const removeAllBtn = document.querySelector('.remove-all');

// Mảng lưu trữ các tag
let tags = ['Toán', 'Văn'];

// Hàm render lại tất cả tags
function renderTags() {
    tagsList.innerHTML = '';
    
    tags.forEach(tag => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${tag}
            <i class="fa-solid fa-xmark"></i>
        `;
        
        // Thêm event listener cho nút xóa
        const removeBtn = li.querySelector('i');
        removeBtn.addEventListener('click', () => {
            removeTag(tag);
        });
        
        tagsList.appendChild(li);
    });
}

// Hàm thêm tag mới
function addTag(tag) {
    if (tag.trim() !== '' && !tags.includes(tag.trim())) {
        tags.push(tag.trim());
        renderTags();
    }
}

// Hàm xóa tag
function removeTag(tagToRemove) {
    tags = tags.filter(tag => tag !== tagToRemove);
    renderTags();
}

// Hàm xóa tất cả tags
function removeAllTags() {
    tags = [];
    renderTags();
}

// Event listener cho input
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTag(searchInput.value);
        searchInput.value = '';
    }
});

// Event listener cho nút Remove All
removeAllBtn.addEventListener('click', removeAllTags);

// Khởi tạo tags ban đầu
renderTags();
