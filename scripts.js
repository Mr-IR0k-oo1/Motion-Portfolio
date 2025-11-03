// Utility functions for responsiveness and performance
const isMobile = () => window.innerWidth <= 768;
const isTablet = () => window.innerWidth > 768 && window.innerWidth <= 1024;

// Throttle function to limit event firing
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// RequestAnimationFrame wrapper for smooth animations
function animate(callback) {
    if (window.requestAnimationFrame) {
        requestAnimationFrame(callback);
    } else {
        setTimeout(callback, 16); // Fallback for older browsers
    }
}

// Smooth scrolling for navigation links
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

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinksMobile = document.querySelector('.nav-links');

if (hamburger && navLinksMobile) {
    hamburger.addEventListener('click', () => {
        navLinksMobile.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksMobile.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header background change on scroll (optimized with RAF)
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        animate(() => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Form submission handling (old version removed)

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Typing effect for hero text
const heroText = document.querySelector('#hero h2');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Skill bars animation
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('li');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transform = 'translateX(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    const lis = item.querySelectorAll('li');
    lis.forEach(li => {
        li.style.transform = 'translateX(-20px)';
        li.style.transition = 'transform 0.5s ease';
    });
    skillObserver.observe(item);
});

// Project cards hover effect with enhanced 3D animation
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateY(15deg) rotateX(5deg) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0deg) rotateX(0deg) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.2)';
    });
});

// Video play button animation (for future video embeds)
document.querySelectorAll('.project-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1)';
        icon.style.transition = 'transform 0.3s ease';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero section (subtle, optimized and responsive)
let parallaxTicking = false;
window.addEventListener('scroll', () => {
    if (!parallaxTicking && !isMobile()) {
        animate(() => {
            const hero = document.querySelector('#hero');
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

// 3D Tilt effect for skill items (responsive, disabled on mobile)
document.querySelectorAll('.skill-item').forEach(item => {
    if (!isMobile()) {
        item.addEventListener('mousemove', throttle((e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            item.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }, 16));

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
        });
    }
});

// Enhanced navigation with 3D depth
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateZ(10px) scale(1.05)';
        link.style.textShadow = '0 0 10px rgba(255, 107, 53, 0.5)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateZ(0) scale(1)';
        link.style.textShadow = 'none';
    });
});

// Dynamic year in footer
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');

    // Update icon
    if (isLightMode) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }

    // Add smooth transition effect
    document.documentElement.style.setProperty('--transition-duration', '0.3s');
    setTimeout(() => {
        document.documentElement.style.setProperty('--transition-duration', '0s');
    }, 300);
});

// Scroll Progress Indicator (optimized with RAF)
let progressTicking = false;
window.addEventListener('scroll', () => {
    if (!progressTicking) {
        animate(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            const progressBar = document.querySelector('.scroll-progress-bar');
            if (progressBar) {
                progressBar.style.width = scrollPercent + '%';
            }
            progressTicking = false;
        });
        progressTicking = true;
    }
});

// Animated Counters
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;

            const time = value / speed;
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value;
            }
        };
        animate();
    });
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        counterObserver.observe(statsContainer);
    }
});

// Project Modal Functionality
const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalClient = document.getElementById('modal-client');
const modalDuration = document.getElementById('modal-duration');
const modalTools = document.getElementById('modal-tools');

const projectData = {
    1: {
        title: 'Music Video - "Electric Dreams"',
        description: 'A high-energy music video with complex motion graphics and visual effects. This project involved intricate particle systems, dynamic camera movements, and seamless integration of live-action footage with 3D elements.',
        client: 'Electric Records',
        duration: '3 months',
        tools: 'After Effects, Cinema 4D, Premiere Pro'
    },
    2: {
        title: 'Corporate Brand Video',
        description: 'Professional corporate video with custom animations and storytelling. Created a compelling narrative that showcased the company\'s values and services through elegant motion graphics.',
        client: 'TechCorp Solutions',
        duration: '2 months',
        tools: 'After Effects, Premiere Pro, Illustrator'
    },
    3: {
        title: 'Commercial Spot',
        description: 'Compelling commercial advertisement with motion graphics and effects. Developed a high-impact 30-second spot that effectively communicated the product benefits.',
        client: 'BrandX Marketing',
        duration: '6 weeks',
        tools: 'After Effects, Premiere Pro, DaVinci Resolve'
    }
};

document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        const data = projectData[projectId];

        if (data) {
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modalClient.textContent = data.client;
            modalDuration.textContent = data.duration;
            modalTools.textContent = data.tools;

            projectModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Enhanced Testimonials Animation
document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('stagger-fade-in');
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId + '-error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
};

const hideError = (elementId) => {
    const errorElement = document.getElementById(elementId + '-error');
    errorElement.classList.remove('show');
};

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate name
    if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long.');
        isValid = false;
    } else {
        hideError('name');
    }

    // Validate email
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
    } else {
        hideError('email');
    }

    // Validate subject
    if (subject.length < 5) {
        showError('subject', 'Subject must be at least 5 characters long.');
        isValid = false;
    } else {
        hideError('subject');
    }

    // Validate message
    if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long.');
        isValid = false;
    } else {
        hideError('message');
    }

    if (isValid) {
        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));

            formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
            formStatus.className = 'form-status success show';
            contactForm.reset();
        } catch (error) {
            formStatus.textContent = 'Sorry, there was an error sending your message. Please try again.';
            formStatus.className = 'form-status error show';
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
});

// Back to Top Button (optimized with RAF)
const backToTopBtn = document.getElementById('back-to-top');
let backToTopTicking = false;

window.addEventListener('scroll', () => {
    if (!backToTopTicking) {
        animate(() => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
            backToTopTicking = false;
        });
        backToTopTicking = true;
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Social Links Animation
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) rotate(5deg) scale(1.1)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) rotate(0deg) scale(1)';
    });
});

// Stagger Animations for Skills
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('stagger-fade-in');
    });

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('stagger-fade-in');
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add('stagger-fade-in');
    });
});

// Loading animation (optimized, shorter on mobile)
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--bg-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    loader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--accent-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    document.body.appendChild(loader);

    const loadTime = isMobile() ? 1000 : 1500; // Shorter load on mobile
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, loadTime);
});

// Add keyframes for loading animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
