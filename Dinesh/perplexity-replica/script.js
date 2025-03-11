document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const downloadButton = document.getElementById('download-cv');
    const skillsContainer = document.querySelector('.skills-container');
    const contactButton = document.getElementById('contact-button');
    const contactForm = document.getElementById('contact-form');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Theme toggle
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    } else if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        let theme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Animated download button
    downloadButton.addEventListener('click', (e) => {
        e.preventDefault();
        downloadButton.textContent = 'Downloading...';
        downloadButton.disabled = true;

        setTimeout(() => {
            downloadButton.textContent = 'Downloaded!';
            setTimeout(() => {
                downloadButton.textContent = 'Download CV';
                downloadButton.disabled = false;
            }, 2000);
        }, 2000);

        // Actual download logic would go here
        console.log('CV download started');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact button scroll
    contactButton.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Contact form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        console.log('Form submitted with data:', Object.fromEntries(formData));
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Animated skills (on smaller screens)
    if (window.innerWidth <= 768) {
        let isScrolling = false;
        const scrollSpeed = 1;
        const scrollStep = () => {
            if (!isScrolling) return;
            skillsContainer.scrollLeft += scrollSpeed;
            if (skillsContainer.scrollLeft >= skillsContainer.scrollWidth - skillsContainer.clientWidth) {
                skillsContainer.scrollLeft = 0;
            }
            requestAnimationFrame(scrollStep);
        };

        skillsContainer.addEventListener('mouseenter', () => {
            isScrolling = true;
            scrollStep();
        });

        skillsContainer.addEventListener('mouseleave', () => {
            isScrolling = false;
        });
    }

    // Lazy loading for project images (if any)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});
