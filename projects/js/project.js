// Мобильное меню
document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.mobile-menu').classList.toggle('active');
});

// Галерея изображений
let currentScale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;
let clickStartTime = 0;
let clickStartX = 0;
let clickStartY = 0;
const CLICK_MAX_DISTANCE = 5;
const CLICK_MAX_DURATION = 200;

function enlargeImage(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("enlargedImage");
    modalImg.src = img.getAttribute("data-large-src");
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Сброс масштаба и позиции при открытии нового изображения
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
}

function closeImageModal() {
    const modal = document.getElementById("imageModal");
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

function updateImageTransform() {
    const modalImg = document.getElementById("enlargedImage");
    modalImg.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${currentScale})`;
}

function handleZoom(e) {
    e.stopPropagation();
    
    // Циклическое переключение между уровнями масштаба
    if (currentScale === 1) {
        currentScale = 2;
    } else if (currentScale === 2) {
        currentScale = 3;
    } else {
        currentScale = 1;
        translateX = 0;
        translateY = 0;
    }
    
    updateImageTransform();
}

// Обработчики для модального окна
document.getElementById("closeModal").addEventListener('click', function(e) {
    e.stopPropagation();
    closeImageModal();
});

document.getElementById("imageModal").addEventListener('click', function(e) {
    if (e.target === this) {
        closeImageModal();
    }
});

// Начало взаимодействия
document.getElementById("enlargedImage").addEventListener('mousedown', function(e) {
    clickStartTime = Date.now();
    clickStartX = e.clientX;
    clickStartY = e.clientY;
    
    e.preventDefault();
    isDragging = true;
    this.classList.add('grabbing');
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
});

document.getElementById("enlargedImage").addEventListener('touchstart', function(e) {
    clickStartTime = Date.now();
    clickStartX = e.touches[0].clientX;
    clickStartY = e.touches[0].clientY;
    
    e.preventDefault();
    isDragging = true;
    this.classList.add('grabbing');
    startX = e.touches[0].clientX - translateX;
    startY = e.touches[0].clientY - translateY;
});

// Окончание взаимодействия
document.getElementById("enlargedImage").addEventListener('mouseup', function(e) {
    const endX = e.clientX;
    const endY = e.clientY;
    
    if (isDragging) {
        const distance = Math.sqrt(
            Math.pow(endX - clickStartX, 2) + 
            Math.pow(endY - clickStartY, 2)
        );
        
        // Если движение было небольшим и коротким - это клик
        if (distance <= CLICK_MAX_DISTANCE && Date.now() - clickStartTime <= CLICK_MAX_DURATION) {
            handleZoom(e);
        }
        
        isDragging = false;
        this.classList.remove('grabbing');
        return;
    }
});

document.getElementById("enlargedImage").addEventListener('touchend', function(e) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    if (isDragging) {
        const distance = Math.sqrt(
            Math.pow(endX - clickStartX, 2) + 
            Math.pow(endY - clickStartY, 2)
        );
        
        // Если движение было небольшим и коротким - это тап
        if (distance <= CLICK_MAX_DISTANCE && Date.now() - clickStartTime <= CLICK_MAX_DURATION) {
            handleZoom(e);
        }
        
        isDragging = false;
        this.classList.remove('grabbing');
        return;
    }
});

// Перемещение изображения
document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateImageTransform();
});

document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    translateX = e.touches[0].clientX - startX;
    translateY = e.touches[0].clientY - startY;
    updateImageTransform();
});

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape" && document.getElementById("imageModal").classList.contains('active')) {
        closeImageModal();
    }
});

// Предзагрузка изображений
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image-gallery img, .image-content img, .image-protection img');
    console.log(images)
    images.forEach(img => {
        img.onload = () => img.classList.add('loaded');
        // const imgObj = new Image();
        // imgObj.src = img.src;
        // imgObj.onload = function() {
        //     img.classList.add('loaded');
        // };
        // if (img.complete) img.classList.add('loaded');
    });
});