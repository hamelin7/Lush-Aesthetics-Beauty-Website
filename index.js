
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

    // Cookie consent behavior — Consent Mode v2
    (function(){
        var banner = document.getElementById('cookie-consent');
        var accept = document.getElementById('cc-accept');
        var decline = document.getElementById('cc-decline');

        function hideBanner(){ if(banner) banner.style.display = 'none'; }
        function showBanner(){ if(banner) banner.style.display = 'flex'; }

        try{
            var consent = localStorage.getItem('cookie_consent');
            if(!consent){
                // show banner after a tiny delay so it doesn't block inline rendering
                window.addEventListener('load', function(){ setTimeout(showBanner, 300); });
            }
        }catch(e){ /* ignore storage errors */ }

        accept && accept.addEventListener('click', function(){
            try{ localStorage.setItem('cookie_consent', 'accepted'); }catch(e){}
            // Upgrade consent — GA will now set cookies and collect demographics
            if(typeof gtag === 'function'){
                gtag('consent', 'update', {
                    'analytics_storage':    'granted',
                    'ad_storage':           'granted',
                    'ad_user_data':         'granted',
                    'ad_personalization':   'granted'
                });
            }
            hideBanner();
        });

        decline && decline.addEventListener('click', function(){
            try{ localStorage.setItem('cookie_consent', 'denied'); }catch(e){}
            // Explicitly deny — GA continues in cookieless/anonymous mode
            if(typeof gtag === 'function'){
                gtag('consent', 'update', {
                    'analytics_storage':    'denied',
                    'ad_storage':           'denied',
                    'ad_user_data':         'denied',
                    'ad_personalization':   'denied'
                });
            }
            hideBanner();
        });
    })();

    // ========================= //
    // Testimonials Carousel      //
    // ========================= //
    (function() {
        const cards = document.querySelectorAll('.testimonials-carousel .testimonial-card');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        if (!cards.length) return;

        let current = 0;
        let autoTimer;

        function showSlide(index) {
            cards.forEach(c => c.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            cards[index].classList.add('active');
            dots[index].classList.add('active');
            current = index;
        }

        function nextSlide() {
            showSlide((current + 1) % cards.length);
        }

        function startAuto() {
            autoTimer = setInterval(nextSlide, 6000);
        }

        // Dot click — jump to that review
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                clearInterval(autoTimer);
                startAuto(); // restart timer
            });
        });

        startAuto();
    })();