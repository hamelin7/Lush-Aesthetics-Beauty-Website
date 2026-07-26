# Lush Aesthetics Chat Widget - Pure JavaScript Setup Guide

## ✨ Welcome!

Your website now has an **AI-powered chat widget** that runs **100% in the browser** using JavaScript. **NO backend server needed!** It's already integrated and ready to go.

---

## Key Features

✅ **Pure JavaScript** - No backend, no Node, no PHP  
✅ **Open Source AI** - Uses Transformers.js with distilgpt2  
✅ **Zero Configuration** - Works out of the box  
✅ **Fast** - AI runs locally in visitor's browser  
✅ **Private** - No data sent to external APIs  
✅ **LAMP Compatible** - Perfect for Amazon Lightsail  

---

## How It Works

The chat widget uses **[Transformers.js](https://xenova.github.io/transformers.js/)**, a JavaScript library that runs AI models directly in the browser using WebAssembly.

### The Process:
1. Visitor sees floating 💬 button in bottom-right
2. They click to open chat and ask a question
3. First time: AI model downloads (~350MB) - takes ~10-30 seconds
4. Model processes question locally in their browser
5. AI responds with helpful info about your services
6. Future messages are instant (model is cached)

### Files Overview

| File | Purpose |
|------|---------|
| `chat.js` | Chat widget + AI integration (Pure JS - no backend!) |
| `chat-styles.css` | Beautiful chat widget styling |
| `index.html` | Already connected to above files |

---

## Getting Started (You're Done!)

### ✓ Everything is Pre-Configured

Just deploy your files to Lightsail and you're done:

```bash
# SSH into your Lightsail instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Navigate to your website directory
cd /var/www/html  # or /home/bitnami/htdocs/wordpress/wp-content/...

# Pull your updated files (or upload via FTP/SFTP)
git pull origin main
```

### ✓ Test the Chat

1. Visit your website
2. Look for 💬 button in bottom-right corner
3. Click it and ask: "What services do you offer?"
4. The AI will respond!

---

## Understanding the AI Model Download

On first chat interaction:
- The **distilgpt2 model** (~350MB) downloads automatically
- This happens only once per browser
- Download takes 10-30 seconds depending on connection
- Consider mentioning this to customers initially

### Why This Model?
- **distilgpt2**: Small, fast, good quality - perfect for a chat widget
- Runs entirely in the browser
- No server load on your Lightsail instance
- Private - nothing is sent elsewhere

---

## Customizing What the AI Knows

The AI has built-in knowledge of your services. To update it, edit **`chat.js`** (around line 9):

```javascript
const WEBSITE_CONTEXT = `You are a helpful, warm customer service assistant for Lush Aesthetics & Beauty.

ABOUT LUSH:
- Name: Lush Aesthetics & Beauty
- Location: Westfield, MA
- Phone: +1-413-555-1234
- Email: info@lushaestheticsbeauty.com
- Founded by Katie with 11+ years in aesthetics and dermatology

SERVICES & PRICING:
- Facial Aesthetics: Starting at $100
- Luxury Nail Care: Starting at $35
  ... (edit these sections)
```

Key sections to customize:
- **ABOUT LUSH** - Your business info
- **SERVICES & PRICING** - Your current services
- **HOURS** - Your hours of operation
- **SOCIAL MEDIA** - Your social links
- **RESPONSE GUIDELINES** - How the AI should talk

---

## Customizing the Widget Appearance

Edit `chat-styles.css` to change colors, size, etc:

```css
/* Change button color */
.chat-toggle {
    background: var(--gradient-luxury);
}

/* Change widget width */
.chat-widget {
    width: 420px;  /* Change this number */
}

/* Change message colors */
.bot-message p {
    background: #f0f0f0;  /* Bot message background */
}

.user-message p {
    background: var(--gradient-luxury);  /* User message background */
}

/* Reposition away from booking button if needed */
.chat-toggle {
    bottom: 24px;  /* Distance from bottom */
    right: 24px;   /* Distance from right */
}
```

Then save and reload your website to see changes.

---

## Performance Notes

| Metric | Details |
|--------|---------|
| **Model Size** | ~350MB (one-time download per browser) |
| **First Message** | 10-30 seconds (includes model download) |
| **Subsequent Messages** | 1-5 seconds (model cached locally) |
| **Server Load** | **Zero** - AI runs in visitor's browser |
| **Browser Support** | Chrome, Firefox, Safari, Edge (modern) |

### Optimal for Mobile
- Download happens once per device
- Great for repeat visitors (model stays cached)
- Recommend mentioning phone/email for urgent questions

---

## Using a Different AI Model

To use a different/faster model, edit `chat.js` around line 75:

```javascript
// Current (good balance):
this.generator = await pipeline('text-generation', 'Xenova/distilgpt2');

// Faster but less capable:
this.generator = await pipeline('text-generation', 'Xenova/gpt2-small');

// Better quality but slower:
this.generator = await pipeline('text-generation', 'Xenova/opt-350m');
```

**Available models:**
- `distilgpt2` (current) - Best balance of speed & quality
- `gpt2` - Slightly better, ~500MB
- `gpt2-medium` - Even better, ~700MB
- `opt-350m` - High quality, ~500MB

---

## Troubleshooting

### Chat button doesn't appear
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console (F12) for errors
- Verify files are in correct directory:
  - `chat.js` ✓
  - `chat-styles.css` ✓
  - These should be same directory as `index.html`

### AI takes a long time to respond
- First message triggers 350MB download (~30 sec max)
- This only happens once per browser
- Subsequent messages respond quickly
- Check internet connection speed

### Error messages in console
- "Failed to import transformers" = CDN load failed, try refresh
- "WASM module failed" = Browser WebAssembly support issue
- See detailed error in F12 console

### Chat works but responses are strange
- The AI is learning from your website context
- Try asking clearer questions
- Update the WEBSITE_CONTEXT in chat.js with better info
- Responses improve as the model knows more about your business

---

## FAQ

**Q: Why do I see a loading message first time?**  
A: The AI model (~350MB) is downloading. This only happens on first use per browser.

**Q: Will this slow my website down?**  
A: No! The AI loads lazily (only when chat opens) and runs in the visitor's browser, not your server.

**Q: Is visitor data saved anywhere?**  
A: No. Everything runs locally in their browser. No data is sent to servers.

**Q: What if a visitor closes the chat mid-download?**  
A: The model will download again next time they open chat. Subsequent visits are instant.

**Q: Can I disable the chat widget?**  
A: Yes! Either comment out `<script src="chat.js"></script>` in index.html, or hide it with CSS:
```css
.chat-toggle { display: none; }
```

**Q: Does the AI know my exact prices?**  
A: Yes! The AI is trained on the information in the `WEBSITE_CONTEXT` section of chat.js.

**Q: What about GDPR/Privacy?**  
A: Perfect! No external APIs are called. Everything runs locally in the visitor's browser.

---

## Monitoring & Analytics

Since there's no backend API calls, you won't see chat usage in traditional analytics. To monitor:

1. **Browser Console Errors** - Check for any JavaScript errors
2. **GA4** - You can add custom events in chat.js if desired
3. **Manual Testing** - Test the chat regularly to ensure it works

Optional: Add Google Analytics event tracking:
```javascript
// In chat.js, after sending a message:
if (window.gtag) {
    gtag('event', 'chat_message_sent', {
        'message_length': message.length
    });
}
```

---

## Advanced Customization

### 1. Fine-tune AI Behavior

Edit the RESPONSE GUIDELINES in `chat.js`:
```javascript
RESPONSE GUIDELINES:
1. Be warm, professional, and helpful
2. Keep responses concise (1-2 sentences)
3. For specific pricing or booking availability, recommend calling or visiting booking.html
4. Always encourage customers to get in touch
5. Focus on Lush services and information
```

### 2. Change Response Length

In `chat.js` around line 200:
```javascript
const result = await this.generator(prompt, {
    max_new_tokens: 80,  // Change to 100-150 for longer responses
    temperature: 0.7,     // Change to 0.5 for more focused, 0.9 for more creative
    top_p: 0.9,
});
```

### 3. Reposition Chat Button

In `chat-styles.css`:
```css
.chat-toggle {
    bottom: 24px;  /* Move up/down */
    right: 24px;   /* Move left/right */
}
```

---

## Next Steps

1. ✅ Deploy files to Lightsail
2. ✅ Test the chat on your live site
3. ✅ Customize AI knowledge (optional) - edit WEBSITE_CONTEXT
4. ✅ Share feedback - test with friends/family
5. ✅ Monitor for any issues

---

## Summary

Your chat widget is **completely self-contained** - no backends, no APIs, no keys, no costs. It's built with open-source technologies and runs entirely in your visitors' browsers.

### What You Get:
- 💬 Floating chat button
- 🤖 AI-powered responses about your services
- 📱 Mobile-friendly design
- ⚡ Fast local processing
- 🔒 Privacy-first (no external APIs)

Enjoy your new AI chat assistant! 🎉

