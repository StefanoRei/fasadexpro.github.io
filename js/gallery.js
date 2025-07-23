function enlargeImage(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("enlargedImage");
    modal.style.display = "block"; // Показываем модальное окно
    modalImg.src = img.dataset.largeImg || img.src; // Устанавливаем источник изображения
    document.body.classList.add('modal-open'); // Блокируем прокрутку

    // Центрируем изображение относительно текущей позиции прокрутки
    const scrollY = window.scrollY || window.pageYOffset; // Получаем текущее положение прокрутки
}

// Закрытие модального окна по клику на любом месте
document.getElementById("imageModal").onclick = function() {
    this.style.display = "none"; // Скрываем модальное окно
    document.body.classList.remove('modal-open'); // Разблокируем прокрутку
};

// Закрытие модального окна по клику на кнопку закрытия
document.getElementById("closeModal").onclick = function(event) {
    event.stopPropagation(); // Останавливаем всплытие события
    document.getElementById("imageModal").style.display = "none"; // Скрываем модальное окно
    document.body.classList.remove('modal-open'); // Разблокируем прокрутку
};
