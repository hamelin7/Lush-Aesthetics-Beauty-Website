// Custom Keyword Chatbot Logic for Lush Aesthetics & Beauty

const chatbotData = [
    {
        keywords: ["hour", "open", "close", "time", "schedule", "availability", "when"],
        response: "We are open Tuesday 3PM–7PM, Wednesday & Thursday 9AM–4:30PM, Friday by appointment only, and Saturday 9AM–2PM. We are closed Sundays and Mondays."
    },
    {
        keywords: ["location", "where", "address", "find", "directions", "located", "map"],
        response: "We are located at 94 North Elm Street, Suite 301G, Westfield, MA 01085."
    },
    {
        keywords: ["phone", "call", "phone number", "give us a call", "dial"],
        response: "Our phone number is (413) 580-6040. You can call us directly by tapping the button below:",
        action: "call"
    },
    {
        keywords: ["text", "sms", "message us", "text us", "send a text"],
        response: "You can text us at (413) 580-6040. Tap the button below to start a text message:",
        action: "text"
    },
    {
        keywords: ["email", "email address", "send an email", "email us", "mail"],
        response: "Our email address is bookings@lushaesthetics.com. Tap below to send us an email:",
        action: "email"
    },
    {
        keywords: ["contact", "reach", "get in touch", "touch", "reach out"],
        response: "You can reach us by phone at (413) 580-6040 or email at bookings@lushaesthetics.com. Choose an option below:",
        action: "contact"
    },
    {
        keywords: ["book", "appointment", "schedule", "reserve", "sign up"],
        response: "Absolutely! You can book an appointment for any of our luxury services right here:",
        action: "book"
    },
    {
        keywords: ["cancel", "reschedule", "policy", "late", "no show", "missed"],
        response: "We kindly ask that you reschedule or cancel at least 24 hours before your appointment. If you do not arrive for your scheduled appointment, a charge of 50% of the service fee will apply."
    },
    {
        keywords: ["service", "menu", "offer", "do you do", "treatments", "what do you", "options"],
        response: "We offer a full range of luxury services including Facial Aesthetics, Luxury Nail Care, Lash Extensions, Lash & Brow treatments, Makeup Artistry, and Hair Removal. Would you like to learn more about a specific service?",
        action: "services"
    },
    {
        keywords: ["price", "cost", "how much", "charge", "rate", "pricing", "fee", "expensive", "affordable"],
        response: "Our pricing varies by service. Facials start at $100, Nail Care starts at $35, and Lash Extensions begin at $70. You can view full pricing details on each service page or on our Booking page."
    },
    {
        keywords: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"],
        response: "Hello! Welcome to Lush Aesthetics & Beauty. How can I help you today?",
        followUp: false
    },
    {
        keywords: ["thank", "thanks", "appreciate", "awesome", "great", "perfect"],
        response: "You're very welcome! We're happy to help.",
        followUp: false
    },

    // ─── Service-Specific Routes ────────────────────────
    {
        keywords: ["facial", "facials", "skin", "skincare", "dermaplaning", "microcurrent", "chemical peel", "peel", "hydration", "anti-aging", "acne", "nano", "needling"],
        response: "We offer a beautiful selection of facial treatments including our signature Hello Hydration Facial, Anti-Aging Facial, Advanced Microcurrent, Crystal Clear Acne Facial, and more. Explore our full facial menu here:",
        action: "link",
        link: "facial-aesthetics.html",
        linkText: "View Facial Aesthetics"
    },
    {
        keywords: ["nail", "nails", "manicure", "pedicure", "gel", "gel-x", "polish", "nail art", "mani", "pedi"],
        response: "Our Luxury Nail Care services include structured Gel-X manicures, relaxing pedicures, and stunning custom nail art. Take a look at our full nail menu:",
        action: "link",
        link: "luxury-nail-care.html",
        linkText: "View Luxury Nail Care"
    },
    {
        keywords: ["lash extension", "lash extensions", "classic lash", "hybrid lash", "volume lash", "full set", "lash fill", "lash set"],
        response: "We specialize in Classic, Hybrid, and Volume lash extension sets, as well as fills and professional removal. Check out our full lash extension offerings here:",
        action: "link",
        link: "lash-extensions.html",
        linkText: "View Lash Extensions"
    },
    {
        keywords: ["lash lift", "lash tint", "brow", "brows", "lamination", "brow wax", "brow tint", "eyebrow"],
        response: "Our Lash & Brow services include lash lifts, lash tints, brow lamination, waxing, and tinting — perfect for defining your natural features. See all our options:",
        action: "link",
        link: "lash-and-brow.html",
        linkText: "View Lash & Brow"
    },
    {
        keywords: ["makeup", "bridal", "wedding", "make up", "glam", "prom", "special occasion", "event makeup"],
        response: "Our Makeup Artistry services include flawless bridal makeup, bridal trial sessions, and special occasion glam. Discover what we offer:",
        action: "link",
        link: "makeup-artistry.html",
        linkText: "View Makeup Artistry"
    },
    {
        keywords: ["wax", "waxing", "hair removal", "lip wax", "chin wax", "face wax", "sideburn"],
        response: "We offer gentle, precise facial waxing including full face, eyebrow, lip, chin, and sideburn waxing. See our hair removal services:",
        action: "link",
        link: "hair-removal.html",
        linkText: "View Hair Removal"
    }
];

// More professional, warm fallback
const fallbackResponses = [
    "I appreciate you reaching out! That's a great question — unfortunately, it's a bit outside of what I can help with here. Please feel free to get in touch with our team directly for personalized assistance:",
    "Thank you for your message! I'm not quite able to help with that specific request, but our team would love to assist you personally. You can reach us through any of the options below:",
    "That's a wonderful question! I want to make sure you get the best answer possible, so I'd recommend reaching out to our team directly:"
];

document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chatbot-container");
    const toggler = document.getElementById("chatbot-toggler");
    const chatBody = document.getElementById("chatbot-body");
    const inputField = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("chatbot-send");

    if (!chatContainer) return;

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

    // Helper to add messages
    function appendMessage(text, sender, actionType = null, linkData = null) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);

        if (actionType === "fallback" || actionType === "contact") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="tel:+14135806040" class="chatbot-action-btn">Call Us</a>
                <a href="sms:+14135806040" class="chatbot-action-btn">Text Us</a>
                <a href="mailto:bookings@lushaesthetics.com" class="chatbot-action-btn">Email Us</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "call") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="tel:+14135806040" class="chatbot-action-btn">Call (413) 580-6040</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "text") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="sms:+14135806040" class="chatbot-action-btn">Text (413) 580-6040</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "email") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="mailto:bookings@lushaesthetics.com" class="chatbot-action-btn">Email Us</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "book") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="booking.html" class="cta-nav" style="display: block; text-align: center; margin-top: 8px;">Book Now</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "link" && linkData) {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions";
            actionsDiv.innerHTML = `
                <a href="${linkData.link}" class="cta-nav" style="display: block; text-align: center; margin-top: 8px;">${linkData.linkText}</a>
            `;
            chatBody.appendChild(actionsDiv);
        } else if (actionType === "services") {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "chatbot-actions chatbot-services-grid";
            actionsDiv.innerHTML = `
                <a href="facial-aesthetics.html" class="chatbot-action-btn">Facial Aesthetics</a>
                <a href="luxury-nail-care.html" class="chatbot-action-btn">Nail Care</a>
                <a href="lash-extensions.html" class="chatbot-action-btn">Lash Extensions</a>
                <a href="lash-and-brow.html" class="chatbot-action-btn">Lash & Brow</a>
                <a href="makeup-artistry.html" class="chatbot-action-btn">Makeup Artistry</a>
                <a href="hair-removal.html" class="chatbot-action-btn">Hair Removal</a>
            `;
            chatBody.appendChild(actionsDiv);
        }

        // Auto scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Keyword matching logic — longer keyword phrases are matched first for accuracy
    function getBotResponse(userMessage) {
        let lowerMsg = userMessage.toLowerCase();

        // Sort rules: longer keywords first (multi-word phrases match before single words)
        let bestMatch = null;
        let highestScore = 0;

        for (let rule of chatbotData) {
            let score = 0;
            for (let kw of rule.keywords) {
                if (lowerMsg.includes(kw)) {
                    // Give more weight to longer keyword phrases
                    score += kw.split(" ").length;
                }
            }
            if (score > highestScore) {
                highestScore = score;
                bestMatch = rule;
            }
        }

        return bestMatch; // Returns null if no match
    }

    function handleSend() {
        const text = inputField.value.trim();
        if (!text) return;

        // Display user message
        appendMessage(text, "user");
        inputField.value = "";

        // Show typing indicator
        showTypingIndicator();

        // Simulate natural typing delay (800–1400ms)
        const typingDelay = 800 + Math.random() * 600;

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
                    "" // Sometimes just don't ask a follow-up to sound more natural
                ];
                let followUp = "";
                if (match.followUp !== false) {
                    followUp = followUps[Math.floor(Math.random() * followUps.length)];
                }
                const linkData = match.link ? { link: match.link, linkText: match.linkText } : null;
                appendMessage(match.response + followUp, "bot", match.action || null, linkData);
            } else {
                // Pick a random warm fallback
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
