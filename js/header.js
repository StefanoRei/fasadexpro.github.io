document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section.content');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Only prevent default if it's a local anchor link (starts with #)
      if (href && href.startsWith('#') && href !== '#') {
        try {
          const targetId = href.substring(1); // Remove the #
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
            e.preventDefault();
            window.scrollTo({
              top: targetSection.offsetTop - 100,
              behavior: 'smooth'
            });
          }
        } catch (err) {
          console.error('Error in smooth scroll:', err);
        }
      }
      // Otherwise, allow the browser to follow the link (including cross-page anchors like /en/#pro)
    });
  });

  window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  window.dispatchEvent(new Event('scroll'));
});

document.querySelector('.menu-toggle').addEventListener('click', function () {
  this.classList.toggle('active');
  document.querySelector('.mobile-menu').classList.toggle('active');
});