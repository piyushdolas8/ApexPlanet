/* ===================================
   NAVBAR SCROLL EFFECT
   =================================== */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ===================================
   MOBILE NAVIGATION TOGGLE
   =================================== */

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

/* ===================================
   SMOOTH SCROLLING FOR ANCHOR LINKS
   =================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===================================
   SCROLL-BASED ANIMATIONS
   =================================== */

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = `${entry.target.dataset.animation || 'fadeUp'} 0.8s ease forwards`;
            
            // Apply delay if specified
            if (entry.target.classList.contains('delay-1')) {
                entry.target.style.animationDelay = '0.2s';
            } else if (entry.target.classList.contains('delay-2')) {
                entry.target.style.animationDelay = '0.4s';
            } else if (entry.target.classList.contains('delay-3')) {
                entry.target.style.animationDelay = '0.6s';
            } else if (entry.target.classList.contains('delay-4')) {
                entry.target.style.animationDelay = '0.8s';
            }
            
            // Unobserve after animation
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-slide-left, .animate-slide-right');
animatedElements.forEach(el => {
    // Store animation type
    if (el.classList.contains('animate-slide-left')) {
        el.dataset.animation = 'slideLeft';
    } else if (el.classList.contains('animate-slide-right')) {
        el.dataset.animation = 'slideRight';
    } else {
        el.dataset.animation = 'fadeUp';
    }
    
    animateOnScroll.observe(el);
});

/* ===================================
   MENU ITEM HOVER EFFECTS
   =================================== */

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

/* ===================================
   FEATURED ITEMS PARALLAX EFFECT
   =================================== */

const featuredItems = document.querySelectorAll('.featured-item');

featuredItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        const img = item.querySelector('.featured-image img');
        img.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    item.addEventListener('mouseleave', () => {
        const img = item.querySelector('.featured-image img');
        img.style.transform = 'scale(1)';
    });
});

/* ===================================
   CARD HOVER EFFECTS
   =================================== */

const cards = document.querySelectorAll('.wwd-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.borderColor = 'var(--primary-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.borderColor = 'var(--border-color)';
    });
});

/* ===================================
   ACTIVE NAV LINK HIGHLIGHT
   =================================== */

function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = navbar.offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

/* ===================================
   BUTTON RIPPLE EFFECT
   =================================== */

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ===================================
   PARALLAX EFFECT ON HERO
   =================================== */

const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

/* ===================================
   LAZY LOADING IMAGES
   =================================== */

const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src; // Trigger load
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

/* ===================================
   STAT COUNTER ANIMATION
   =================================== */

function animateCounter(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Animate stats when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            animateCounter(entry.target, number, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

/* ===================================
   PRELOADER (OPTIONAL)
   =================================== */

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove animation classes initially
    animatedElements.forEach(el => {
        el.style.opacity = '0';
    });
});

/* ===================================
   CONSOLE MESSAGE
   =================================== */

console.log('%c🍔 Premium Sliders - Crafted with passion', 'color: #d4a574; font-size: 16px; font-weight: bold;');
console.log('%cWebsite by: Senior Front-End Developer', 'color: #888; font-size: 12px;');