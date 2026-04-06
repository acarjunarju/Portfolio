// Theme Toggle

(function() {
    emailjs.init("yWUV3Q51JOYuYjEEg"); // paste your public key
})();
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Typing Effect for Hero Title
const heroTitle = document.querySelector('.hero-title');
const text = "Web Developer & Graphic Designer";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        heroTitle.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    heroTitle.textContent = '';
    typeWriter();
});

// Smooth Scrolling for Navigation Links
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

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize project cards with animation
projectCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.progress');

function animateProgressBars() {
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 50) {
            bar.style.width = bar.getAttribute('style').split(':')[1].trim();
        }
    });
}

// Trigger animation on scroll
window.addEventListener('scroll', animateProgressBars);

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const subject = document.querySelector('input[name="subject"]').value;
        const message = document.querySelector('textarea[name="message"]').value;

        emailjs.send("service_v788zpd", "template_wiv4zr8", {
            name: name,
            email: email,
            subject: subject,
            message: message
        }).then(() => {
            // Success - Replace form with success message
            const successHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <div style="font-size: 60px; margin-bottom: 20px; animation: scaleUp 0.5s ease-out;">✅</div>
                    <h3 style="color: #4CAF50; font-size: 24px; margin-bottom: 10px; font-weight: 600;">Message Sent Successfully!</h3>
                    <p style="color: #666; font-size: 16px; margin-bottom: 30px; line-height: 1.6;">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    <button onclick="location.reload()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-size: 16px; font-weight: 500; transition: transform 0.3s ease;">Send Another Message</button>
                </div>
                <style>
                    @keyframes scaleUp {
                        from { transform: scale(0); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                </style>
            `;
            contactForm.innerHTML = successHTML;
        }, function(error) {
            // Error - Show error message
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            const errorHTML = `
                <div style="background: #ffebee; border-left: 4px solid #f44336; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <p style="color: #c62828; margin: 0; font-weight: 500;">❌ Failed to send message. Please try again later.</p>
                </div>
            `;
            contactForm.insertAdjacentHTML('beforeend', errorHTML);
            console.log(error);
        });
    });
}

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        if (body.classList.contains('light-mode')) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.9)';
        if (body.classList.contains('light-mode')) {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    }
});

// Add some CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate {
        animation: fadeInUp 0.6s ease-out;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .project-card {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .project-card.animate {
        opacity: 1;
        transform: scale(1);
    }
`;
document.head.appendChild(style);

// Trigger animations on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('animate');
        });
    }, 500);
});

// Parallax effect for hero section (optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Mobile menu toggle (if needed for very small screens)
const navMenu = document.querySelector('.nav-menu');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'rgba(15, 15, 35, 0.95)';
        navMenu.style.padding = '20px';
        navMenu.style.borderRadius = '0 0 10px 10px';
    } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'row';
        navMenu.style.position = 'static';
        navMenu.style.background = 'transparent';
        navMenu.style.padding = '0';
    }
}

// Add hamburger menu for mobile (if screen width < 768px)
if (window.innerWidth < 768) {
    const hamburger = document.createElement('div');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.style.cursor = 'pointer';
    hamburger.style.fontSize = '1.2rem';
    hamburger.style.color = '#fff';
    hamburger.addEventListener('click', toggleMenu);
    document.querySelector('.nav-container').appendChild(hamburger);
}
