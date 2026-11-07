/* ==========================================
   NOKO INTERIORS - JAVASCRIPT FUNCTIONALITY
   Modern, Luxurious Interior Design Website
   ========================================== */

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const navHamburger = document.getElementById('navHamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navHamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navHamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navHamburger.classList.remove('active');
    });
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ==========================================

function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ==========================================
// GALLERY LIGHTBOX
// ==========================================

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
const galleryImages = [];

// Collect all gallery images
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    galleryImages.push({
        src: img.src,
        alt: img.alt
    });

    // Open lightbox on click
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

// Open lightbox
function openLightbox() {
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Update lightbox image
function updateLightboxImage() {
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
}

// Close button
lightboxClose.addEventListener('click', closeLightbox);

// Previous button
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
});

// Next button
lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
});

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }
});

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next image
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous image
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }
}

// ==========================================
// WHATSAPP ENQUIRY FORM
// ==========================================

const enquiryForm = document.getElementById('enquiryForm');

enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const service = document.getElementById('service').value;
    const projectDescription = document.getElementById('projectDescription').value.trim();
    const contactNumber = document.getElementById('contactNumber').value.trim();

    // Validate form
    if (!fullName || !service || !projectDescription || !contactNumber) {
        alert('Please fill in all required fields.');
        return;
    }

    // Create WhatsApp message
    const message = `Hello Noko Interiors,

I would like to request a quotation for the following:

*Name:* ${fullName}
*Service Required:* ${service}
*Project Description:* ${projectDescription}
*Contact Number:* ${contactNumber}

Please assist me with more information and pricing.

Thank you!`;

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp URL
    const whatsappURL = `https://wa.me/27727874863?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form
    enquiryForm.reset();
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const animateElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(element => {
    observer.observe(element);
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// AUTOMATIC COPYRIGHT YEAR
// ==========================================

const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;

// ==========================================
// LAZY LOAD IMAGES
// ==========================================

if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================
// VIDEO PLAYER FUNCTIONALITY
// ==========================================

const video = document.querySelector('.gallery-video video');

if (video) {
    // Play/pause on click
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // Pause when scrolled out of view
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && !video.paused) {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(video);
}

// ==========================================
// NAVBAR BACKGROUND ON SCROLL
// ==========================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(17, 17, 17, 0.98)';
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce scroll events for better performance
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(setActiveLink, 50));

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c✨ NOKO INTERIORS ✨', 'color: #C9A45C; font-size: 24px; font-weight: bold;');
console.log('%cWhere Quality Meets Elegance.', 'color: #111111; font-size: 14px; font-style: italic;');
console.log('%cWebsite designed with precision and care.', 'color: #666; font-size: 12px;');

// ==========================================
// PREVENT CONTEXT MENU ON IMAGES (OPTIONAL)
// ==========================================

// Uncomment if you want to prevent right-click on images
// document.querySelectorAll('img').forEach(img => {
//     img.addEventListener('contextmenu', (e) => {
//         e.preventDefault();
//     });
// });
