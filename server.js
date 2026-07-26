/**
 * Backend Proxy Server for Lush Chat Widget
 * 
 * This is a simple Express server that proxies chat requests to OpenAI's API.
 * Deploy on Vercel, Render, Railway, or similar free services.
 * 
 * Installation:
 * 1. npm install express cors dotenv openai
 * 2. Create .env file with OPENAI_API_KEY=your_key_here
 * 3. Run: node server.js
 */

const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for the AI to understand its role
const SYSTEM_PROMPT = `You are a helpful customer service assistant for Lush Aesthetics & Beauty, a luxury beauty spa in Westfield, MA. 
You have expert knowledge about their services, pricing, hours, and policies.

Key information:
- Founded by Katie, with 11+ years of experience in aesthetics and dermatology
- Services: Facial Aesthetics, Luxury Nail Care, Lash Extensions, Lash & Brow, Makeup Artistry, Hair Removal
- Hours: Mon-Closed, Tue 3-7PM, Wed-Thu 9AM-4:30PM, Fri By Appointment, Sat 9AM-2PM, Sun-Closed
- Phone: +1-413-555-1234, Email: info@lushaestheticsbeauty.com
- Location: Westfield, MA

Your responses should be:
1. Friendly and professional
2. Accurate about services and pricing
3. Helpful in guiding customers to book or contact
4. If asked about something you're unsure about, suggest they call or email for details

Always maintain the brand voice: elegant, professional, and customer-focused.`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, context } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.OPENAI_API_KEY) {
            console.error('Missing OPENAI_API_KEY environment variable');
            return res.status(500).json({ 
                error: 'Server configuration error',
                reply: 'I apologize, but I\'m unable to respond right now. Please contact us directly at +1-413-555-1234.'
            });
        }

        // Create context string from website data
        let contextString = '';
        if (context) {
            contextString = `
Current visitor asking: "${message}"

Business Context:
${JSON.stringify(context, null, 2)}

Please answer based on the business information above. Keep responses concise (1-2 sentences unless more detail is needed).
            `;
        }

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_PROMPT + '\n\n' + contextString
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            max_tokens: 300,
            temperature: 0.7,
        });

        const reply = response.choices[0]?.message?.content || 'I apologize, I could not generate a response.';

        res.json({ reply });

    } catch (error) {
        console.error('Chat API Error:', error);
        
        // Return fallback response
        res.status(500).json({
            error: 'Failed to process chat request',
            reply: 'I apologize for the inconvenience. Please contact us directly:\n📞 +1-413-555-1234\n✉️ info@lushaestheticsbeauty.com'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Chat proxy server running on port ${PORT}`);
    console.log(`Make requests to: /api/chat`);
});
