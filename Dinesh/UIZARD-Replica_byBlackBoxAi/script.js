// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation and Page Switching
    const navLinks = document.querySelectorAll('.nav-links a, .nav-links-small a');
    const mainSections = document.querySelectorAll('main > section');
    const profilePage = document.getElementById('profile');
    const projectsPage = document.getElementById('projects-page');
    const contactPage = document.getElementById('contact-page');
    const homeSections = document.querySelectorAll('.hero, .possibilities, .features, .customization, .testimonials');
    
    // Buttons
    const profileButton = document.querySelector('.profile');
    const themeToggleButton = document.querySelector('.theme-toggle');
    const tabButtons = document.querySelectorAll('.tab-button');
    const exploreButtons = document.querySelectorAll('.card-button, .explore-button');
    
    // Handle Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            
            // Hide all sections first
            mainSections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show appropriate section
            switch(target) {
                case 'home':
                    homeSections.forEach(section => {
                        section.classList.remove('hidden');
                    });
                    break;
                case 'profile':
                case 'portfolio':
                    profilePage.classList.remove('hidden');
                    break;
                case 'projects':
                    projectsPage.classList.remove('hidden');
                    break;
                case 'contact':
                case 'contact-me':
                    contactPage.classList.remove('hidden');
                    break;
                default:
                    // For other links, just show home content
                    homeSections.forEach(section => {
                        section.classList.remove('hidden');
                    });
            }
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Handle Profile Button
    if (profileButton) {
        profileButton.addEventListener('click', function() {
            // Hide all sections
            mainSections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show profile page
            profilePage.classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Theme Toggle
    themeToggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });
    
    // Tab Buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter cards based on tab (can be enhanced for actual filtering)
            const filter = this.textContent.toLowerCase();
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                    if (cardTitle.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Explore/Card Buttons
    exploreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get parent card or testimonial
            const parentCard = this.closest('.card') || this.closest('.testimonial');
            
            if (parentCard) {
                const title = parentCard.querySelector('h3')?.textContent || 'Project';
                alert(`You're exploring: ${title}`);
                
                // If it's a specific card, we could navigate to a detailed view
                if (title.includes('Profile')) {
                    // Hide all sections
                    mainSections.forEach(section => {
                        section.classList.add('hidden');
                    });
                    
                    // Show profile page
                    profilePage.classList.remove('hidden');
                } else if (title.includes('Contact')) {
                    // Hide all sections
                    mainSections.forEach(section => {
                        section.classList.add('hidden');
                    });
                    
                    // Show contact page
                    contactPage.classList.remove('hidden');
                }
            } else {
                // This is the main explore button in testimonials
                // Hide all sections
                mainSections.forEach(section => {
                    section.classList.add('hidden');
                });
                
                // Show projects page
                projectsPage.classList.remove('hidden');
            }
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Animation Effects
    // Add simple fade-in animation for elements as they come into view
    const animatedElements = document.querySelectorAll('.hero-content, .laptop-preview, .feature-item, .card');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
        element.style.transform = "translateY(20px)";
        fadeInObserver.observe(element);
    });
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your message has been sent! We will get back to you soon.');
            this.reset();
        });
    }
    
    // View All Projects button
    const viewAllProjects = document.querySelector('.view-all-projects');
    if (viewAllProjects) {
        viewAllProjects.addEventListener('click', function() {
            // Hide all sections
            mainSections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show projects page
            projectsPage.classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // View All button in features section
    const viewAll = document.querySelector('.view-all');
    if (viewAll) {
        viewAll.addEventListener('click', function() {
            // Hide all sections
            mainSections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show projects page
            projectsPage.classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize - show home sections by default
    mainSections.forEach(section => {
        section.classList.add('hidden');
    });
    
    homeSections.forEach(section => {
        section.classList.remove('hidden');
    });
});