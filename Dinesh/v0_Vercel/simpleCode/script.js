document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const downloadButton = document.getElementById('download-cv');
    const skillsContainer = document.querySelector('.skills-container');

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌓';
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
        // For demo, we'll just log to console
        console.log('CV download started');
    });

    // Animated skills
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
});