// Защита от скачивания изображений - только правая кнопка
document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        showSaveMessage();
        return false;
    }
});

// Запрет перетаскивания изображений
document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// Защита от клавиш Print Screen и других
document.addEventListener('keydown', function (e) {
    // Print Screen, Ctrl+P, Ctrl+S
    if (e.key === 'PrintScreen' || (e.ctrlKey && (e.key === 'p' || e.key === 's'))) {
        e.preventDefault();
        showSaveMessage();
        return false;
    }
});

function showSaveMessage() {
    const message = document.getElementById('saveMessage');
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 2000);
}