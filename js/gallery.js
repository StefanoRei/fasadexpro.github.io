function enlargeImage(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("enlargedImage");
    
    modal.style.display = "block";
    modalImg.src = img.src;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    modal.onclick = function() {
        closeModal()
    }
    
    modalImg.onclick = function(e) {
        e.stopPropagation();
    }
}

function closeModal() {

    const scrollY = document.body.style.top;

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);

    document.getElementById("imageModal").style.display = "none";
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

document.getElementById("closeModal").addEventListener("click", function(event) {
    closeModal();
    event.stopPropagation();
})