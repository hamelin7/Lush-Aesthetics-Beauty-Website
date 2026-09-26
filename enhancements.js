/* Lush Aesthetics & Beauty: site enhancements
 * 1. Hero video pause/play control, with reduced-motion support
 * 2. GA4 click events for booking, calls, email, directions and gift cards
 * Loaded with `defer` on every page except booking.html.
 */
(function () {
    'use strict';

    // ---------- 1. Hero video control ----------
    var video = document.querySelector('.hero-video');
    var toggle = document.querySelector('.hero-video-toggle');

    if (video && toggle) {
        var setState = function (paused) {
            toggle.setAttribute('data-state', paused ? 'paused' : 'playing');
            toggle.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
        };

        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reduceMotion && reduceMotion.matches) {
            video.removeAttribute('autoplay');
            video.pause();
        }

        setState(video.paused);

        toggle.addEventListener('click', function () {
            if (video.paused) {
                var playing = video.play();
                if (playing && playing.catch) { playing.catch(function () { setState(true); }); }
            } else {
                video.pause();
            }
        });
        video.addEventListener('play', function () { setState(false); });
        video.addEventListener('pause', function () { setState(true); });
    }

    // ---------- 2. GA4 click events ----------
    // Event names: book_click, call_click, text_click, email_click, directions_click, gift_card_click.
    // Add data-track="event_name" to any link to set its event explicitly.
    function eventFor(link) {
        var explicit = link.getAttribute('data-track');
        if (explicit) { return explicit; }
        var href = link.getAttribute('href') || '';
        if (href.indexOf('tel:') === 0) { return 'call_click'; }
        if (href.indexOf('sms:') === 0) { return 'text_click'; }
        if (href.indexOf('mailto:') === 0) { return 'email_click'; }
        if (/booking\.html|book\.squareup\.com|square\.site\/appointments/.test(href)) { return 'book_click'; }
        if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl/.test(href)) { return 'directions_click'; }
        if (/squareup\.com\/gift|square\.link|app\.squareup\.com\/gift/.test(href)) { return 'gift_card_click'; }
        return null;
    }

    function locationFor(link) {
        if (link.closest('.mobile-action-bar')) { return 'mobile_bar'; }
        if (link.closest('.chatbot-container')) { return 'chat_widget'; }
        if (link.closest('header')) { return 'header'; }
        if (link.closest('footer')) { return 'footer'; }
        var section = link.closest('section');
        if (section) { return section.id || (section.className || 'section').split(' ')[0]; }
        return 'page';
    }

    document.addEventListener('click', function (event) {
        var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
        if (!link) { return; }
        var name = eventFor(link);
        if (!name || typeof window.gtag !== 'function') { return; }
        window.gtag('event', name, {
            link_location: locationFor(link),
            link_text: (link.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
            link_url: link.href,
            transport_type: 'beacon'
        });
    }, true);
})();
