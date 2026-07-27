// Custom Keyword Chatbot Logic for Lush Aesthetics & Beauty

const BUSINESS_DATA = {
    phone: "(413) 580-6040",
    phoneHref: "+14135806040",
    email: "bookings@lushaesthetics.com",
    address: "94 North Elm Street, Suite 301G, Westfield, MA 01085",
    instagram: "@lushaestheticsbeauty",
    instagramUrl: "https://www.instagram.com/lushaestheticsbeauty"
};

const chatbotData = [
    {
        keywords: ["hour", "open", "close", "time", "schedule", "availability", "when"],
        response: "We are open Tuesday 3PM–7PM, Wednesday & Thursday 9AM–4:30PM, Friday by appointment only, and Saturday 9AM–2PM. We are closed Sundays and Mondays."
    },
    {
        keywords: ["location", "where", "address", "find", "directions", "located", "map"],
        response: "We are located at 94 North Elm Street, Suite 301G, Westfield, MA 01085. We'd love to see you!"
    },
    {
        keywords: ["phone", "call", "phone number", "give us a call", "dial"],
        response: "Our phone number is (413) 580-6040. Tap below to call us directly:",
        action: "call"
    },
    {
        keywords: ["text", "sms", "message us", "text us", "send a text"],
        response: "You can text us at (413) 580-6040. Tap below to start a text message:",
        action: "text"
    },
    {
        keywords: ["email", "email address", "send an email", "email us", "mail"],
        response: "Our email address is bookings@lushaesthetics.com. Tap below to email us:",
        action: "email"
    },
    {
        keywords: ["contact", "reach", "get in touch", "touch", "reach out", "help", "support", "talk", "speak"],
        response: "We'd love to help you! You can reach us by phone, text, email, or schedule an appointment online:",
        action: "contact"
    },
    {
        keywords: ["book", "appointment", "schedule", "reserve", "sign up", "booking", "slot", "date", "calendar"],
        response: "We would love to host you! You can view availability and book an appointment for any of our luxury services online:",
        action: "book"
    },
    {
        keywords: ["cancel", "reschedule", "policy", "late", "no show", "missed"],
        response: "We kindly ask that you reschedule or cancel at least 24 hours before your appointment. If you do not arrive for your scheduled appointment, a charge of 50% of the service fee will apply."
    },
    {
        keywords: ["service", "menu", "offer", "do you do", "treatments", "what do you", "options", "list", "info"],
        response: "We offer a full range of luxury services. Select a service below to view descriptions and details, or book an appointment online:",
        action: "services"
    },
    {
        keywords: ["price", "cost", "how much", "charge", "rate", "pricing", "fee", "expensive", "affordable"],
        response: "Our pricing varies by service. Facials start at $100, Nail Care starts at $35, and Lash Extensions begin at $70. Select a service menu below to view detailed pricing, or check our booking schedule:"
    },
    {
        keywords: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"],
        response: "Hello! Welcome to Lush Aesthetics & Beauty. How can I help you today?",
        followUp: false
    },
    {
        keywords: ["thank", "thanks", "appreciate", "awesome", "great", "perfect"],
        response: "You're very welcome! We look forward to seeing you at Lush.",
        followUp: false
    },

    // ─── Service-Specific Routes ────────────────────────
    {
        keywords: ["facial", "facials", "skin", "skincare", "dermaplaning", "microcurrent", "chemical peel", "peel", "hydration", "anti-aging", "acne", "nano", "needling"],
        response: "We offer custom facial treatments including our signature Hello Hydration Facial, Anti-Aging Facial, Microcurrent, Acne Facials, Dermaplaning, and Chemical Peels. Learn more or book a spot below:",
        action: "link",
        link: "facial-aesthetics.html",
        linkText: "Learn More about Facials"
    },
    {
        keywords: ["nail", "nails", "manicure", "pedicure", "gel", "gel-x", "polish", "nail art", "mani", "pedi"],
        response: "Our Luxury Nail Care services include structured Gel-X manicures, signature pedicures, and custom nail art. Learn more or book a spot below:",
        action: "link",
        link: "luxury-nail-care.html",
        linkText: "Learn More about Nails"
    },
    {
        keywords: ["lash extension", "lash extensions", "classic lash", "hybrid lash", "volume lash", "full set", "lash fill", "lash set"],
        response: "We specialize in Classic, Hybrid, and Volume lash extension sets, custom fills, and professional removal. Learn more or book a spot below:",
        action: "link",
        link: "lash-extensions.html",
        linkText: "Learn More about Lashes"
    },
    {
        keywords: ["lash lift", "lash tint", "brow", "brows", "lamination", "brow wax", "brow tint", "eyebrow"],
        response: "Our Lash & Brow services include lash lifts, lash tints, brow lamination, shaping, and custom tinting. Learn more or book a spot below:",
        action: "link",
        link: "lash-and-brow.html",
        linkText: "Learn More about Lash & Brow"
    },
    {
        keywords: ["makeup", "bridal", "wedding", "make up", "glam", "prom", "special occasion", "event makeup"],
        response: "Our Makeup Artistry services include bridal makeup, trial sessions, and special occasion glam. Learn more or book a spot below:",
        action: "link",
        link: "makeup-artistry.html",
        linkText: "Learn More about Makeup"
    },
    {
        keywords: ["wax", "waxing", "hair removal", "lip wax", "chin wax", "face wax", "sideburn"],
        response: "We offer gentle, precise facial waxing including eyebrows, lip, chin, sideburns, or full face. Learn more or book a spot below:",
        action: "link",
        link: "hair-removal.html",
        linkText: "Learn More about Waxing"
    }
];

const fallbackResponses = [
    "I appreciate you reaching out! That's a great question — unfortunately, it's a bit outside of what I can help with here. Please feel free to get in touch with our team directly for personalized assistance:",
    "Thank you for your message! I'm not quite able to help with that specific request, but our team would love to assist you personally. You can reach us through any of the options below:",
    "That's a wonderful question! I want to make sure you get the best answer possible, so I'd recommend reaching out to our team directly:"
];

document.addEventListener("DOMContentLoaded", () => {
    // Dynamic path prefixing based on subdirectory
    const pathPrefix = window.location.pathname.includes('/articles/') ? '../' : '';

    // Verify/Inject chatbot container
    let chatContainer = document.getElementById("chatbot-container");
    if (!chatContainer) {
        chatContainer = document.createElement("div");
        chatContainer.id = "chatbot-container";
        chatContainer.className = "chatbot-container";
        document.body.appendChild(chatContainer);
    }

    // Standardize internal markup
    chatContainer.innerHTML = `
        <button class="chatbot-toggler" id="chatbot-toggler" aria-label="Toggle chat">
            <svg class="chatbot-toggler-icon" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            <svg class="chatbot-close-icon" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
            </svg>
        </button>
        <div class="chatbot-window">
            <div class="chatbot-header">
                <div class="chatbot-header-avatar">L</div>
                <div class="chatbot-header-info">
                    <h3>Lush Concierge</h3>
                    <div class="chatbot-header-status">
                        <span class="chatbot-status-dot"></span> Online Now
                    </div>
                </div>
            </div>
            <div class="chatbot-body" id="chatbot-body">
                <div class="chat-message bot">Hello! Welcome to Lush Aesthetics & Beauty. How can I help you today?</div>
            </div>
            <div class="chatbot-input-area">
                <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Type a message..." aria-label="Type message">
                <button id="chatbot-send" class="chatbot-send" aria-label="Send">
                    <svg viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    `;

    const toggler = document.getElementById("chatbot-toggler");
    const chatBody = document.getElementById("chatbot-body");
    const inputField = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("chatbot-send");

    if (!toggler || !chatBody || !inputField || !sendBtn) return;

    // Toggle window
    toggler.addEventListener("click", () => {
        chatContainer.classList.toggle("open");
        if (chatContainer.classList.contains("open")) {
            inputField.focus();
        }
    });

    // Show typing indicator (animated dots)
    function showTypingIndicator() {
        const indicator = document.createElement("div");
        indicator.className = "chat-message bot typing-indicator";
        indicator.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        indicator.id = "typing-indicator";
        chatBody.appendChild(indicator);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById("typing-indicator");
        if (indicator) indicator.remove();
    }

    // Helper to add messages and action buttons
    function appendMessage(text, sender, actionType = null, linkData = null) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);

        if (actionType === "fallback" || actionType === "contact") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="tel:${BUSINESS_DATA.phoneHref}" class="chatbot-action-btn">Call (413) 580-6040</a>
                <a href="sms:${BUSINESS_DATA.phoneHref}" class="chatbot-action-btn">Text (413) 580-6040</a>
                <a href="mailto:${BUSINESS_DATA.email}" class="chatbot-action-btn">Email Us</a>
                <a href="${pathPrefix}booking.html" class="chatbot-action-btn primary">Book Online Now</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "call") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="tel:${BUSINESS_DATA.phoneHref}" class="chatbot-action-btn">Call Us: (413) 580-6040</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "text") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="sms:${BUSINESS_DATA.phoneHref}" class="chatbot-action-btn">Text Us: (413) 580-6040</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "email") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="mailto:${BUSINESS_DATA.email}" class="chatbot-action-btn">Email Us: bookings@lushaesthetics.com</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "book") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="${pathPrefix}booking.html" class="chatbot-action-btn primary">Book Online Now</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "link" && linkData) {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="${pathPrefix}${linkData.link}" class="chatbot-action-btn">${linkData.linkText}</a>
                <a href="${pathPrefix}booking.html" class="chatbot-action-btn primary">Book Online Now</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "services") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions chatbot-services-grid";
            actionsDiv.innerHTML = `
                <a href="${pathPrefix}facial-aesthetics.html" class="chatbot-action-btn">Facial Aesthetics</a>
                <a href="${pathPrefix}luxury-nail-care.html" class="chatbot-action-btn">Nail Care</a>
                <a href="${pathPrefix}lash-extensions.html" class="chatbot-action-btn">Lash Extensions</a>
                <a href="${pathPrefix}lash-and-brow.html" class="chatbot-action-btn">Lash & Brow</a>
                <a href="${pathPrefix}makeup-artistry.html" class="chatbot-action-btn">Makeup Artistry</a>
                <a href="${pathPrefix}hair-removal.html" class="chatbot-action-btn">Hair Removal</a>
            `;
            chatBody.appendChild(actionsDiv);

            // Add clear Booking call-to-action button
            const bookDiv = document.createElement("div");
            bookDiv.className = "chatbot-actions";
            bookDiv.innerHTML = `<a href="${pathPrefix}booking.html" class="chatbot-action-btn primary">Book Online Now</a>`;
            chatBody.appendChild(bookDiv);
        }

        // Auto scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Keyword matching logic
    function getBotResponse(userMessage) {
        let lowerMsg = userMessage.toLowerCase();

        let bestMatch = null;
        let highestScore = 0;

        for (let rule of chatbotData) {
            let score = 0;
            for (let kw of rule.keywords) {
                if (lowerMsg.includes(kw)) {
                    score += kw.split(" ").length;
                }
            }
            if (score > highestScore) {
                highestScore = score;
                bestMatch = rule;
            }
        }

        return bestMatch;
    }

    function handleSend() {
        const text = inputField.value.trim();
        if (!text) return;

        // Display user message
        appendMessage(text, "user");
        inputField.value = "";

        // Show typing indicator
        showTypingIndicator();

        // Simulate natural typing delay (800–1600ms)
        const typingDelay = 800 + Math.random() * 800;

        setTimeout(() => {
            removeTypingIndicator();

            const match = getBotResponse(text);
            if (match) {
                const followUps = [
                    " Please let me know if there is anything else I can assist you with.",
                    " Let me know if you have any other questions!",
                    " Is there anything else I can help you find?",
                    " Can I help with anything else today?",
                    " Let me know if there's anything else you need.",
                    ""
                ];
                let followUp = "";
                if (match.followUp !== false) {
                    followUp = followUps[Math.floor(Math.random() * followUps.length)];
                }
                const linkData = match.link ? { link: match.link, linkText: match.linkText } : null;
                appendMessage(match.response + followUp, "bot", match.action || null, linkData);
            } else {
                const fallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
                appendMessage(fallback, "bot", "fallback");
            }
        }, typingDelay);
    }

    // Send on button click
    sendBtn.addEventListener("click", handleSend);

    // Send on Enter key
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    });
});
