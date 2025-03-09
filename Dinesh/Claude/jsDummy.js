// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle functionality
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }

  themeToggle.addEventListener("click", function () {
    // Toggle dark theme class
    body.classList.toggle("dark-theme");

    // Save preference to localStorage
    const isDarkTheme = body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  });

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("show");

      // Change icon based on menu state
      const icon = this.querySelector("i");
      if (navLinks.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Skills slider functionality
  const skillsSlider = document.getElementById("skillsSlider");
  const prevSkillBtn = document.getElementById("prevSkill");
  const nextSkillBtn = document.getElementById("nextSkill");
  const timelineProgress = document.getElementById("timelineProgress");
  const timelineMarkers = document.getElementById("timelineMarkers");

  if (skillsSlider && prevSkillBtn && nextSkillBtn) {
    const cards = Array.from(skillsSlider.querySelectorAll(".skill-card"));
    const cardWidth = cards[0]?.offsetWidth + 30; // Card width + gap
    const maxScroll = skillsSlider.scrollWidth - skillsSlider.clientWidth;
    let currentIndex = 0;

    // Create timeline markers
    const totalVisibleCards = Math.floor(skillsSlider.clientWidth / cardWidth);
    const totalSteps =
      Math.ceil((cards.length - totalVisibleCards) / totalVisibleCards) + 1;

    // Create markers
    for (let i = 0; i < totalSteps; i++) {
      const marker = document.createElement("div");
      marker.classList.add("timeline-marker");
      if (i === 0) marker.classList.add("active");
      timelineMarkers.appendChild(marker);
    }

    const markers = Array.from(
      timelineMarkers.querySelectorAll(".timeline-marker")
    );

    // Update timeline based on scroll position
    function updateTimeline() {
      const scrollPercentage = (skillsSlider.scrollLeft / maxScroll) * 100;
      timelineProgress.style.width = `${scrollPercentage}%`;

      const activeIndex = Math.floor(
        scrollPercentage / (100 / (markers.length - 1))
      );
      markers.forEach((marker, index) => {
        marker.classList.toggle("active", index <= activeIndex);
      });

      // Enable/disable buttons based on scroll position
      prevSkillBtn.disabled = skillsSlider.scrollLeft <= 0;
      nextSkillBtn.disabled = skillsSlider.scrollLeft >= maxScroll - 10;
    }

    // Initialize buttons state
    updateTimeline();

    // Scroll events
    prevSkillBtn.addEventListener("click", function () {
      skillsSlider.scrollBy({
        left: -cardWidth * totalVisibleCards,
        behavior: "smooth",
      });
    });

    nextSkillBtn.addEventListener("click", function () {
      skillsSlider.scrollBy({
        left: cardWidth * totalVisibleCards,
        behavior: "smooth",
      });
    });

    skillsSlider.addEventListener("scroll", updateTimeline);

    // Update on resize
    window.addEventListener("resize", function () {
      // Recalculate values
      const cardWidth = cards[0].offsetWidth + 30;
      const maxScroll = skillsSlider.scrollWidth - skillsSlider.clientWidth;
      const totalVisibleCards = Math.floor(
        skillsSlider.clientWidth / cardWidth
      );

      updateTimeline();
    });
  }

  // Upload profile picture functionality
  const uploadProfileInput = document.getElementById("upload-profile");
  const profilePic = document.getElementById("profilePic");

  if (uploadProfileInput && profilePic) {
    uploadProfileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profilePic.src = e.target.result;
          // Save to localStorage to persist the image
          localStorage.setItem("profilePicture", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });

    // Check for saved profile picture
    const savedProfilePic = localStorage.getItem("profilePicture");
    if (savedProfilePic) {
      profilePic.src = savedProfilePic;
    }
  }

  // CV Download Modal
  const downloadCVBtn = document.getElementById("downloadCV");
  const cvModal = document.getElementById("cvModal");
  const closeModal = document.getElementById("closeModal");

  if (downloadCVBtn && cvModal && closeModal) {
    downloadCVBtn.addEventListener("click", function () {
      cvModal.classList.add("show");

      // Simulate download delay
      setTimeout(function () {
        // Create a fake download
        const link = document.createElement("a");
        link.href = "DineshYDK_CV.pdf"; // Replace with actual path to your CV
        link.download = "DineshYDK_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Hide modal after a delay
        setTimeout(function () {
          cvModal.classList.remove("show");
        }, 2000);
      }, 2000);
    });

    closeModal.addEventListener("click", function () {
      cvModal.classList.remove("show");
    });

    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
      if (event.target === cvModal) {
        cvModal.classList.remove("show");
      }
    });
  }

  // Contact form submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());

      // Here you would typically send this data to a server
      console.log("Form submitted:", formValues);

      // Show a success message
      alert("Thank you for your message! I'll get back to you soon.");

      // Clear the form
      contactForm.reset();
    });
  }

  // Smooth scrolling for navigation links
  const navLinksList = document.querySelectorAll(".nav-links a, .btn");

  navLinksList.forEach((link) => {
    link.addEventListener("click", function (event) {
      // Only process internal links
      if (this.getAttribute("href")?.startsWith("#")) {
        const targetId = this.getAttribute("href");

        // If it's a valid section link
        if (targetId && targetId !== "#") {
          event.preventDefault();

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains("show")) {
              navLinks.classList.remove("show");
              mobileMenuBtn.querySelector("i").classList.remove("fa-times");
              mobileMenuBtn.querySelector("i").classList.add("fa-bars");
            }

            // Smooth scroll to target
            const headerOffset = 70; // Account for fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      }
    });
  });

  // Intersection Observer for animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements to animate
  const animateElements = document.querySelectorAll(
    ".section-title, .skill-card, .project-card"
  );
  animateElements.forEach((element) => {
    observer.observe(element);
    element.classList.add("animate-on-scroll");
  });
});
