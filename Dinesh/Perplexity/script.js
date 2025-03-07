document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const downloadButton = document.getElementById('downloadCV');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        themeToggle.classList.toggle('dark');
    });

    downloadButton.addEventListener('click', (e) => {
        e.preventDefault();
        downloadButton.classList.add('clicked');
        
        setTimeout(() => {
            window.open('path-to-your-cv.pdf', '_blank');
        }, 500);

        setTimeout(() => {
            downloadButton.classList.remove('clicked');
        }, 1000);
    });
});
