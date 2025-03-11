/*
 * Frame & Album Co.
 * Main JavaScript File
 * Version: 1.0
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS Animation Library
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  // Navigation Menu Toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  mobileMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a nav-link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Sticky Navigation
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("sticky", window.scrollY > 50);

    // Scroll to Top Button
    const scrollTop = document.getElementById("scrollTop");
    if (scrollTop) {
      scrollTop.classList.toggle("active", window.scrollY > 500);
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Testimonial Carousel
  const testimonialCarousel = document.getElementById("testimonialCarousel");
  if (testimonialCarousel) {
    const testimonials =
      testimonialCarousel.querySelectorAll(".testimonial-slide");
    let currentIndex = 0;
    let interval;
    let isHovered = false;

    // Set first testimonial as active
    testimonials[0].classList.add("active");

    // Function to show next testimonial
    function showNextTestimonial() {
      if (isHovered) return;

      testimonials[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % testimonials.length;
      testimonials[currentIndex].classList.add("active");
    }

    // Start automatic rotation
    function startAutoRotation() {
      interval = setInterval(showNextTestimonial, 5000);
    }

    // Stop rotation on hover
    testimonialCarousel.addEventListener("mouseenter", function () {
      isHovered = true;
      clearInterval(interval);
    });

    // Resume rotation on mouse leave
    testimonialCarousel.addEventListener("mouseleave", function () {
      isHovered = false;
      startAutoRotation();
    });

    // Initialize the carousel
    startAutoRotation();

    // Create visual carousel effect with jQuery
    $(testimonialCarousel).slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      arrows: false,
      pauseOnHover: true,
      pauseOnFocus: false,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: "linear",
    });
  }

  // Product Filtering System
  const filterButtons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(".product-item");

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        // Show/hide products based on category
        products.forEach((product) => {
          if (filterValue === "all") {
            product.style.display = "block";
          } else if (product.classList.contains(filterValue)) {
            product.style.display = "block";
          } else {
            product.style.display = "none";
          }
        });
      });
    });
  }

  // Product Gallery Lightbox
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (galleryItems.length > 0) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", function () {
        const imgSrc = this.querySelector("img").getAttribute("src");
        const imgTitle = this.querySelector("img").getAttribute("alt");

        // Create lightbox
        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="close-lightbox">&times;</span>
                        <img src="${imgSrc}" alt="${imgTitle}">
                        <div class="lightbox-caption">${imgTitle}</div>
                    </div>
                `;

        // Append to body
        document.body.appendChild(lightbox);

        // Prevent scrolling when lightbox is open
        document.body.style.overflow = "hidden";

        // Close lightbox when clicking on close button or outside the image
        lightbox.addEventListener("click", function (e) {
          if (
            e.target === lightbox ||
            e.target.classList.contains("close-lightbox")
          ) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = "auto";
          }
        });
      });
    });
  }

  // Custom Frame Builder
  const frameBuilder = document.getElementById("frameBuilder");
  if (frameBuilder) {
    const frameOptions = frameBuilder.querySelectorAll(".frame-option");
    const framePreview = document.getElementById("framePreview");
    const framePrice = document.getElementById("framePrice");
    let totalPrice = 59.99; // Base price

    // Update preview and price when selecting options
    frameOptions.forEach((option) => {
      option.addEventListener("change", function () {
        const optionType = this.getAttribute("data-type");
        const optionValue = this.value;
        const optionPrice = parseFloat(
          this.options[this.selectedIndex].getAttribute("data-price")
        );

        // Update preview based on selection
        if (optionType === "material") {
          framePreview.setAttribute("data-material", optionValue);
        } else if (optionType === "size") {
          framePreview.setAttribute("data-size", optionValue);
        } else if (optionType === "color") {
          framePreview.setAttribute("data-color", optionValue);
        }

        // Calculate new price
        totalPrice = 59.99; // Reset to base price
        frameOptions.forEach((opt) => {
          const selectedPrice =
            parseFloat(
              opt.options[opt.selectedIndex].getAttribute("data-price")
            ) || 0;
          totalPrice += selectedPrice;
        });

        // Update price display
        framePrice.textContent = "$" + totalPrice.toFixed(2);
      });
    });

    // Add to cart functionality
    const addToCartBtn = document.getElementById("addToCartBtn");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", function () {
        // Get all selected options
        const material = document.querySelector('[data-type="material"]').value;
        const size = document.querySelector('[data-type="size"]').value;
        const color = document.querySelector('[data-type="color"]').value;

        // Create item object
        const item = {
          id: generateUniqueId(),
          type: "custom-frame",
          material: material,
          size: size,
          color: color,
          price: totalPrice,
        };

        // Add to cart (localStorage)
        addItemToCart(item);

        // Show confirmation message
        showNotification("Custom frame added to cart!");
      });
    }

    // Helper function to generate ID
    function generateUniqueId() {
      return "frame_" + Math.random().toString(36).substr(2, 9);
    }

    // Helper function to add item to cart
    function addItemToCart(item) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart counter
      updateCartCounter();
    }

    // Helper function to update cart counter
    function updateCartCounter() {
      const cartCounter = document.getElementById("cartCounter");
      if (cartCounter) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCounter.textContent = cart.length;

        if (cart.length > 0) {
          cartCounter.style.display = "block";
        } else {
          cartCounter.style.display = "none";
        }
      }
    }

    // Initialize cart counter on page load
    updateCartCounter();
  }

  // Contact Form Validation and Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      let isValid = true;
      const formFields = this.querySelectorAll(".required");

      formFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }

        // Email validation
        if (field.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            isValid = false;
            field.classList.add("error");
          }
        }
      });

      if (isValid) {
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        // Simulate AJAX request
        setTimeout(() => {
          // Reset form
          contactForm.reset();

          // Show success message
          showNotification(
            "Message sent successfully! We'll get back to you soon."
          );

          // Reset button
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 1500);
      } else {
        showNotification("Please fill all required fields correctly", "error");
      }
    });
  }

  // Newsletter Subscription
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        emailInput.classList.add("error");
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Simulate subscription
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = "Subscribing...";

      // Simulate AJAX request
      setTimeout(() => {
        // Reset form
        newsletterForm.reset();

        // Show success message
        showNotification("Thank you for subscribing to our newsletter!");

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }

  // Helper function to show notifications
  function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="close-notification">&times;</button>
            </div>
        `;

    // Append to body
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.add("hide");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);

    // Close on button click
    notification
      .querySelector(".close-notification")
      .addEventListener("click", function () {
        notification.classList.add("hide");
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      });
  }
});
