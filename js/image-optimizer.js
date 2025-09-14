document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-img-name]');
    
    images.forEach(img => {
        const imgName = img.getAttribute('data-img-name');
        const basePath = 'images';
        const sizes = ['320px', '640px', '1024px', '4096px'];
        
        // Build srcset string
        const srcset = sizes.map(size => {
            return `${basePath}/${size}/${imgName} ${size.replace('px', '')}w`;
        }).join(', ');
        
        // Set attributes
        img.setAttribute('srcset', srcset);
        img.setAttribute("sizes", "(max-width: 640px) 100vw, (max-width: 2048px) 640px, 1024px");
        img.setAttribute('data-large-src', `${basePath}/original/${imgName}`);
        img.setAttribute('src', `${basePath}/${sizes[1]}/${imgName}`); 
    });
});