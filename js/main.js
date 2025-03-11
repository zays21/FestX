// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => {
                span.classList.remove('active');
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add scroll animation for features
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".scroll-text");

    function revealOnScroll() {
        elements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                element.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run once on load
});

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
});

// Auto-slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}, 5000);


/* ESTER EGG */

document.addEventListener('DOMContentLoaded', () => {
    const codeInput = document.getElementById('code-input');
    const submitBtn = document.getElementById('submit-code');
    const unlockMessage = document.getElementById('unlock-message');
    const secretCode = 'festx2025'; // Simple code for users to guess or input

    // Check code on button click
    submitBtn.addEventListener('click', () => {
        if (codeInput.value.toLowerCase() === secretCode) {
            unlockCode();
        } else {
            codeInput.style.borderColor = 'red';
            codeInput.value = '';
            codeInput.placeholder = 'Wrong code! Try again...';
            setTimeout(() => {
                codeInput.style.borderColor = 'var(--primary)';
                codeInput.placeholder = 'Enter code here...';
            }, 2000);
        }
    });

    // Check code on Enter key
    codeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && codeInput.value.toLowerCase() === secretCode) {
            unlockCode();
        }
    });

    // Easter Egg: Konami Code alternative
    let keysPressed = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    document.addEventListener('keydown', (e) => {
        keysPressed.push(e.key);
        keysPressed = keysPressed.slice(-konamiCode.length);
        if (keysPressed.join('') === konamiCode.join('')) {
            unlockCode();
        }
    });

    function unlockCode() {
        unlockMessage.style.display = 'block';
        codeInput.style.display = 'none';
        submitBtn.style.display = 'none';
        document.querySelector('.code-challenge p').textContent = 'Code Cracked!';
        
        // Funky animation
        document.body.style.background = 'linear-gradient(45deg, #2563eb, #1d4ed8, #000)';
        setTimeout(() => {
            document.body.style.background = 'black';
        }, 3000);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const spaceship = document.getElementById("spaceship");
    let lastScrollY = window.scrollY;
    let lastScrollTop = 0;

    // Initial position setup
    spaceship.style.position = "fixed";
    spaceship.style.left = "45%";
    spaceship.style.bottom = "50px";
    spaceship.style.transform = "translateX(-50%)";

    window.addEventListener("scroll", () => {
        let scrollY = window.scrollY;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let windowHeight = window.innerHeight;
        let documentHeight = document.documentElement.scrollHeight;

        // Calculate spaceship position dynamically
        let maxBottom = documentHeight - windowHeight - 100; 
        let newBottom = (scrollTop / (documentHeight - windowHeight)) * maxBottom;
        newBottom = Math.max(50, Math.min(newBottom, maxBottom - 50));

        // Apply smooth up and down movement
        let movement = scrollY * 0.3; 
        spaceship.style.transform = `translate(-50%, -${movement}px)`;

        // Tilt spaceship based on scroll direction
        if (scrollTop > lastScrollTop) {
            spaceship.style.transform += " rotate(-10deg)"; // Tilt left when moving up
        } else {
            spaceship.style.transform += " rotate(10deg)"; // Tilt right when moving down
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        lastScrollY = scrollY;
    });

    // Handle window resize
    window.addEventListener("resize", () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let windowHeight = window.innerHeight;
        let documentHeight = document.documentElement.scrollHeight;
        let maxBottom = documentHeight - windowHeight - 100;
        let newBottom = (scrollTop / (documentHeight - windowHeight)) * maxBottom;
        newBottom = Math.max(50, Math.min(newBottom, maxBottom - 50));
        spaceship.style.bottom = `${newBottom}px`;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const calendarIcon = document.querySelector(".calendar-icon");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close");

    // Initially hide the modal properly
    modal.style.display = "none";

    // Open modal when user hovers over the calendar icon
    calendarIcon.addEventListener("mouseenter", function () {
        modal.style.display = "flex"; // Use flex to center the image properly
        modalImg.src = "asset/TECHNEX.png"; // Ensure correct image path
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when mouse leaves the modal area
    modal.addEventListener("mouseleave", function () {
        modal.style.display = "none";
    });

    // Prevent modal from opening automatically on page load
    window.addEventListener("load", function () {
        modal.style.display = "none";
    });
});

