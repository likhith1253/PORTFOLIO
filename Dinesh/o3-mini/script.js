document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    themeToggle.classList.toggle('dark');
    });
    
    // Download CV Button Action
    const downloadButton = document.getElementById('downloadCV');
    downloadButton.addEventListener('click', (e) => {
    e.preventDefault();
    downloadButton.classList.add('clicked');
    // After a brief animation pause, open the CV (update the URL as needed)
    setTimeout(() => {
    window.open('path-to-your-cv.pdf', '_blank');
    }, 500);
    // Remove the animation class after it finishes
    setTimeout(() => {
    downloadButton.classList.remove('clicked');
    }, 1000);
    });
    });