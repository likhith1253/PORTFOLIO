// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  
  // Save preference to localStorage
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Profile Picture Upload Functionality
const profilePic = document.getElementById('profilePic');
const uploadInput = document.getElementById('upload-profile');

uploadInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      profilePic.src = e.target.result;
      
      // Save the image to localStorage for persistence
      localStorage.setItem('profilePicture', e.target.result);
    };
    
    reader.readAsDataURL(file);
  }
});

// Check if there's a saved profile picture on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedPic = localStorage.getItem('profilePicture');
  if (savedPic) {
    profilePic.src = savedPic;
  }
});

// Skills Slider Functionality
const skillsSlider = document.getElementById('skillsSlider');
const prevSkillBtn = document.getElementById('prevSkill');
const nextSkillBtn = document.getElementById('nextSkill');
const timelineProgress = document.getElementById('timelineProgress');
const timelineMarkers = document.getElementById('timelineMarkers');

// Calculate the number of skills and setup timeline
const skillCards = skillsSlider.querySelectorAll('.skill-card');
const cardWidth = skillCards[0].offsetWidth + parseInt(getComputedStyle(skillCards[0]).marginLeft) * 2;
let currentSkill = 0;
const maxSkills = skillCards.length - Math.floor(skillsSlider.offsetWidth / cardWidth);

// Create timeline markers
for (let i = 0; i <= maxSkills; i++) {
  const marker = document.createElement('div');
  marker.classList.add('timeline-marker');
  if (i === 0) marker.classList.add('active');
  timelineMarkers.appendChild(marker);
}

// Update the skills slider
function updateSkillsSlider() {
  skillsSlider.scrollLeft = currentSkill * cardWidth;
  timelineProgress.style.width = (currentSkill / maxSkills * 100) + '%';
  
  // Update markers
  const markers = timelineMarkers.querySelectorAll('.timeline-marker');
  markers.forEach((marker, index) => {
    marker.classList.toggle('active', index === currentSkill);
  });
}

// Attach click listeners to buttons
prevSkillBtn.addEventListener('click', () => {
  if (currentSkill > 0) {
    currentSkill--;
    updateSkillsSlider();
  }
});

nextSkillBtn.addEventListener('click', () => {
  if (currentSkill < maxSkills) {
    currentSkill++;
    updateSkillsSlider();
  }
});

// Add touch swiping capability for mobile
let touchStartX = 0;
let touchEndX = 0;

skillsSlider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

skillsSlider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50 && currentSkill < maxSkills) {
    // Swipe left
    currentSkill++;
    updateSkillsSlider();
  } else if (touchEndX > touchStartX + 50 && currentSkill > 0) {
    // Swipe right
    currentSkill--;
    updateSkillsSlider();
  }
}

// Initialize timeline markers on window resize
window.addEventListener('resize', () => {
  const newMaxSkills = skillCards.length - Math.floor(skillsSlider.offsetWidth / cardWidth);
  
  if (newMaxSkills !== maxSkills) {
    maxSkills = Math.max(0, newMaxSkills);
    currentSkill = Math.min(currentSkill, maxSkills);
    
    // Recreate markers
    timelineMarkers.innerHTML = '';
    for (let i = 0; i <= maxSkills; i++) {
      const marker = document.createElement('div');
      marker.classList.add('timeline-marker');
      if (i === currentSkill) marker.classList.add('active');
      timelineMarkers.appendChild(marker);
    }
    
    updateSkillsSlider();
  }
});

// CV Download Button Functionality
const downloadCVBtn = document.getElementById('downloadCV');
const cvModal = document.getElementById('cvModal');
const closeModal = document.getElementById('closeModal');

downloadCVBtn.addEventListener('click', () => {
  // Show the modal with animation
  cvModal.classList.add('show');
  
  // Simulate preparing and downloading the CV
  setTimeout(() => {
    // Create a dummy download (in a real scenario, you'd want to replace this with a real download)
    const link = document.createElement('a');
    link.href = 'your-cv-file.pdf'; // Replace with the actual CV file path
    link.download = 'Your_Name_CV.pdf'; // Replace with your name
    link.click();
    
    // Hide the modal after a short delay
    setTimeout(() => {
      cvModal.classList.remove('show');
    }, 2000);
  }, 3000); // Wait 3 seconds to simulate preparation
});

// Close modal when clicking the close button
closeModal.addEventListener('click', () => {
  cvModal.classList.remove('show');
});

// Close modal when clicking outside the modal content
cvModal.addEventListener('click', (e) => {
  if (e.target === cvModal) {
    cvModal.classList.remove('show');
  }
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Calculate header height to adjust scroll position
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add scroll animations for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section:not(#home)').forEach(section => {
  observer.observe(section);
});

// Initialize sections with fade-in animation class
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section:not(#home)');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });

  // Add CSS for animated class
  const style = document.createElement('style');
  style.textContent = `
    .animated {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});

// Preload animation for the website
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Add preload animation styles
const preloadStyle = document.createElement('style');
preloadStyle.textContent = `
  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  body.loaded {
    opacity: 1;
  }
`;
document.head.appendChild(preloadStyle);