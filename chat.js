/**
 * Lush Aesthetics & Beauty — Chat Widget
 * Keyword-matched local responses with realistic typing delay.
 * No backend required. All business data is sourced from the website.
 */

// ─── Accurate Business Data (matches website) ───
const BUSINESS = {
    name: 'Lush Aesthetics & Beauty',
    address: '94 North Elm Street, Suite 301G, Westfield, MA 01085',
    phone: '(413) 580-6040',
    phoneHref: '+14135806040',
    email: 'bookings@lushaesthetics.com',
    instagram: '@lushaestheticsbeauty',
    instagramUrl: 'https://www.instagram.com/lushaestheticsbeauty',
    facebook: 'https://www.facebook.com/profile.php?id=61582901035978',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=94+North+Elm+Street+Suite+301+G+Westfield+MA+01085',
    bookingUrl: 'booking.html',
    hours: {
        monday:    'Closed',
        tuesday:   '3:00 PM – 7:00 PM',
        wednesday: '9:00 AM – 4:30 PM',
        thursday:  '9:00 AM – 4:30 PM',
        friday:    'By Appointment Only',
        saturday:  '9:00 AM – 2:00 PM',
        sunday:    'Closed'
    },
    services: [
        { name: 'Facial Aesthetics',  price: '$100', keywords: ['facial', 'face', 'skin', 'skincare', 'nanoneedling', 'microcurrent', 'chemical peel', 'anti-aging', 'peel'] },
        { name: 'Luxury Nail Care',   price: '$35',  keywords: ['nail', 'manicure', 'pedicure', 'gel', 'nail art'] },
        { name: 'Lash Extensions',    price: '$70',  keywords: ['lash extension', 'extensions', 'volume lash', 'classic lash'] },
        { name: 'Lash & Brow',        price: '$30',  keywords: ['lash lift', 'lash tint', 'brow', 'brow shaping', 'brow tint'] },
        { name: 'Makeup Artistry',    price: '$125', keywords: ['makeup', 'make up', 'bridal', 'wedding makeup', 'photo shoot'] },
        { name: 'Hair Removal',       price: '$18',  keywords: ['wax', 'waxing', 'hair removal'] },
    ],
    owner: 'Katie',
    ownerExperience: '11+ years in aesthetics and dermatology'
};

class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messageCount = 0;
        this.teaserTimer = null;
        this.init();
    }

    init() {
        this.injectHTML();
        this.bindEvents();
        this.scheduleTeaserGreeting();
    }

    // ─── Build HTML ───
    injectHTML() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <!-- Teaser Greeting Bubble -->
            <div id="chat-teaser" class="chat-teaser">
                Hi! ✨ Need help booking?
                <button class="chat-teaser-close" aria-label="Dismiss">&times;</button>
            </div>

            <!-- Chat Widget -->
            <div id="chat-widget" class="chat-widget">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="chat-header-avatar">L</div>
                        <div class="chat-header-text">
                            <h3>Lush Beauty Concierge</h3>
                            <div class="chat-header-status"><span class="status-dot"></span> Online now</div>
                        </div>
                    </div>
                    <button id="chat-close" class="chat-close" aria-label="Close chat">
                        <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor"/></svg>
                    </button>
                </div>

                <div id="chat-messages" class="chat-messages">
                    <div class="chat-message bot-message">
                        <p>Hi there! 👋 Welcome to Lush Aesthetics & Beauty. How can I help you today?</p>
                    </div>
                </div>

                <div id="contact-options" class="contact-options" style="display:none;">
                    <p>Reach us directly</p>
                    <div class="contact-buttons">
                        <a href="tel:${BUSINESS.phoneHref}" class="contact-btn">📞 Call</a>
                        <a href="sms:${BUSINESS.phoneHref}" class="contact-btn">💬 Text</a>
                        <a href="mailto:${BUSINESS.email}" class="contact-btn">✉️ Email</a>
                        <a href="${BUSINESS.bookingUrl}" class="contact-btn">📅 Book</a>
                    </div>
                </div>

                <div class="chat-input-area">
                    <input type="text" id="chat-input" class="chat-input" placeholder="Ask us anything..." aria-label="Chat message">
                    <button id="chat-send" class="chat-send" aria-label="Send message">
                        <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                    </button>
                </div>
            </div>

            <!-- Floating Toggle Button -->
            <button id="chat-toggle" class="chat-toggle" aria-label="Open chat" title="Chat with us">
                <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
            </button>
        `;

        while (wrapper.firstChild) {
            document.body.appendChild(wrapper.firstChild);
        }
    }

    // ─── Event Listeners ───
    bindEvents() {
        document.getElementById('chat-toggle').addEventListener('click', () => this.openChat());
        document.getElementById('chat-close').addEventListener('click', () => this.closeChat());
        document.getElementById('chat-send').addEventListener('click', () => this.sendMessage());
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendMessage(); }
        });

        // Teaser interactions
        const teaser = document.getElementById('chat-teaser');
        teaser.addEventListener('click', (e) => {
            if (!e.target.classList.contains('chat-teaser-close')) {
                this.dismissTeaser();
                this.openChat();
            }
        });
        teaser.querySelector('.chat-teaser-close').addEventListener('click', (e) => {
            e.stopPropagation();
            this.dismissTeaser();
        });
    }

    // ─── Teaser Greeting ───
    scheduleTeaserGreeting() {
        const isMobile = window.innerWidth <= 600;
        const delay = isMobile ? 10000 : 5000;

        this.teaserTimer = setTimeout(() => {
            if (!this.isOpen) {
                document.getElementById('chat-teaser').classList.add('visible');
                // Auto-hide after 8 seconds
                setTimeout(() => this.dismissTeaser(), 8000);
            }
        }, delay);
    }

    dismissTeaser() {
        const teaser = document.getElementById('chat-teaser');
        if (teaser) teaser.classList.remove('visible');
        if (this.teaserTimer) clearTimeout(this.teaserTimer);
    }

    // ─── Open / Close ───
    openChat() {
        this.isOpen = true;
        document.getElementById('chat-widget').classList.add('active');
        document.getElementById('chat-input').focus();
        this.dismissTeaser();
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chat-widget').classList.remove('active');
    }

    // ─── Send Message Flow ───
    async sendMessage() {
        const input = document.getElementById('chat-input');
        const msg = input.value.trim();
        if (!msg) return;

        const sendBtn = document.getElementById('chat-send');
        sendBtn.disabled = true;
        input.disabled = true;

        // Show user message
        this.addMessage(msg, 'user');
        input.value = '';

        // Show typing indicator
        const typingEl = this.showTyping();

        // Random human-like delay (1–3 seconds)
        const delay = 1000 + Math.random() * 2000;
        await new Promise(resolve => setTimeout(resolve, delay));

        // Remove typing and show response
        typingEl.remove();
        const response = this.getResponse(msg);
        this.addMessage(response, 'bot');

        // Track message count; show contact options after 3 exchanges
        this.messageCount++;
        if (this.messageCount >= 3) this.showContactOptions();

        sendBtn.disabled = false;
        input.disabled = false;
        input.focus();
    }

    // ─── Typing Indicator ───
    showTyping() {
        const container = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = 'chat-message bot-message';
        div.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        return div;
    }

    // ─── Response Logic ───
    getResponse(userMessage) {
        const msg = userMessage.toLowerCase();

        // ── Service matching ──
        for (const svc of BUSINESS.services) {
            for (const kw of svc.keywords) {
                if (msg.includes(kw)) {
                    return `Our ${svc.name} service starts at ${svc.price}. Would you like to book an appointment? You can book online or call us at ${BUSINESS.phone} 💕`;
                }
            }
        }

        // ── Pricing / cost ──
        if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('pricing')) {
            return `Our services start at $18 for Hair Removal, $30 for Lash & Brow, $35 for Nail Care, $70 for Lash Extensions, $100 for Facials, and $125 for Makeup Artistry. Would you like details on a specific service?`;
        }

        // ── Hours ──
        if (msg.includes('hour') || msg.includes('open') || msg.includes('close') || msg.includes('when') || msg.includes('time') || msg.includes('schedule')) {
            return `Our hours are:\n• Tue: 3:00 PM – 7:00 PM\n• Wed & Thu: 9:00 AM – 4:30 PM\n• Fri: By Appointment Only\n• Sat: 9:00 AM – 2:00 PM\n• Mon & Sun: Closed\nWould you like to book a time?`;
        }

        // ── Location / address ──
        if (msg.includes('address') || msg.includes('location') || msg.includes('where') || msg.includes('directions') || msg.includes('find you') || msg.includes('located')) {
            return `We're located at ${BUSINESS.address}. You can call us at ${BUSINESS.phone} if you need directions — we'd love to see you! 📍`;
        }

        // ── Booking ──
        if (msg.includes('book') || msg.includes('appointment') || msg.includes('reserve') || msg.includes('availability')) {
            return `You can book directly through our online scheduler or give us a call at ${BUSINESS.phone}. We look forward to seeing you! 📅`;
        }

        // ── Contact info ──
        if (msg.includes('phone') || msg.includes('call') || msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('text')) {
            return `You can reach us at:\n📞 ${BUSINESS.phone}\n✉️ ${BUSINESS.email}\nWe're always happy to help!`;
        }

        // ── Owner / about ──
        if (msg.includes('katie') || msg.includes('owner') || msg.includes('who') || msg.includes('about') || msg.includes('founded')) {
            return `Lush was founded by Katie, who brings ${BUSINESS.ownerExperience} to every treatment. She's passionate about helping each client feel confident and beautiful 💖`;
        }

        // ── Social media ──
        if (msg.includes('instagram') || msg.includes('social') || msg.includes('follow') || msg.includes('facebook')) {
            return `Follow us on Instagram ${BUSINESS.instagram} for inspiration, behind-the-scenes, and special offers! We'd love to connect with you 📸`;
        }

        // ── Greetings ──
        if (msg.match(/^(hi|hey|hello|good morning|good afternoon|good evening|sup|yo|howdy)/)) {
            const greetings = [
                `Hi there! 😊 How can I help you today? I can tell you about our services, hours, pricing, or help you book an appointment!`,
                `Hello! 💕 Welcome to Lush Aesthetics & Beauty. What can I assist you with?`,
                `Hey! ✨ Great to hear from you. Are you looking to learn about our services or book an appointment?`
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        // ── Thank you ──
        if (msg.includes('thank') || msg.includes('thanks') || msg.includes('appreciate')) {
            return `You're welcome! If you have any other questions, feel free to ask. We hope to see you soon at Lush! 💕`;
        }

        // ── Fallback — gracefully redirect ──
        const fallbacks = [
            `That's a great question! For the best answer, I'd recommend reaching out to us directly at ${BUSINESS.phone} or ${BUSINESS.email} — our team would love to help! 😊`,
            `I want to make sure you get the most accurate info! Feel free to call us at ${BUSINESS.phone} or send us a message at ${BUSINESS.email} and we'll get right back to you.`,
            `I appreciate your question! For more details, our team can help you directly — call ${BUSINESS.phone} or email ${BUSINESS.email}. Is there anything else I can help with?`
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    // ─── Add Message to Chat ───
    addMessage(text, sender = 'bot') {
        const container = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = `chat-message ${sender}-message`;

        // Convert \n to <br> for multi-line bot responses
        const escaped = this.escapeHtml(text);
        const formatted = escaped.replace(/\n/g, '<br>');
        div.innerHTML = `<p>${formatted}</p>`;

        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    // ─── Show Contact Options ───
    showContactOptions() {
        const el = document.getElementById('contact-options');
        if (el && el.style.display === 'none') {
            el.style.display = 'block';
        }
    }

    // ─── Escape HTML ───
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ─── Initialize ───
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ChatWidget());
} else {
    new ChatWidget();
}
