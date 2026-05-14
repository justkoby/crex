document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.getElementById('site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (menuToggle && mobileNavOverlay) {
        menuToggle.addEventListener('click', () => {
            const isActive = mobileNavOverlay.classList.contains('active');
            
            if (isActive) {
                mobileNavOverlay.classList.remove('active');
                // Optional: animate hamburger back to lines
                menuToggle.innerHTML = `
                    <span></span>
                    <span></span>
                    <span></span>
                `;
                document.body.style.overflow = ''; // Restore scrolling
            } else {
                mobileNavOverlay.classList.add('active');
                // Optional: animate hamburger to X
                menuToggle.innerHTML = `
                    <span style="transform: rotate(45deg) translate(5px, 5px);"></span>
                    <span style="opacity: 0;"></span>
                    <span style="transform: rotate(-45deg) translate(7px, -8px);"></span>
                `;
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                menuToggle.innerHTML = `
                    <span></span>
                    <span></span>
                    <span></span>
                `;
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Scroll Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('.feature-card, .trust-item, .split-content, .split-list, .split-image');
    
    // Add base class for animation
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
