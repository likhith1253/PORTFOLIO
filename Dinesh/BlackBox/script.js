// Load the script after the page is loaded
const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });

        const downloadButton = document.getElementById('download-cv');
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            downloadButton.innerText = 'Downloading...';
            setTimeout(() => {
                window.location.href = downloadButton.href;
            }, 1000); // Delay for animation
        });