
    // Smooth scrolling for navigation links
    // Add click event to anchor links for smooth scroll
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

    // Intersection Observer for fade-in animations
    // Observer options for fade-in
    const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

    // Create observer for fade-in effect
    const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

    // Header scroll effect: add shadow on scroll
    window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(16, 16, 16, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(27, 59, 54, 0.1)';
            } else {
                header.style.background = 'rgba(16, 16, 16, 0.98)';
                header.style.boxShadow = 'none';
            }
        });
        
    // Floating elements animation enhancement: set delays/durations
    document.querySelectorAll('.floating-element').forEach((element, index) => {
            element.style.animationDelay = `${index * 2}s`;
            element.style.animationDuration = `${6 + index}s`;
        });