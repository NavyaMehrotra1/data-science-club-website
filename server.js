const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- Required if frontend is on a different port
const app = express();

// Middleware
app.use(cors());             // Allow cross-origin requests
app.use(express.json());     // Parse incoming JSON requests

// Mongoose schema and model
const signupSchema = new mongoose.Schema({
    name: String,
    email: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Signup = mongoose.model('Signup', signupSchema);

// MongoDB connection
const uri = "mongodb+srv://dataScienceClub:82aqI6DCkJxY1P1b@data-science-club.hdsyvrx.mongodb.net/?retryWrites=true&w=majority&appName=data-science-club";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
}

// API route to handle form submission
app.post('/api/submit-form', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.json({ success: false, message: 'Name and email are required.' });
    }

    if (!email.endsWith('@jh.edu')) {
        return res.json({ success: false, message: 'Please use a JHU email (@jh.edu).' });
    }

    try {
        const newSignup = new Signup({ name, email });
        await newSignup.save();
        return res.json({ success: true, message: 'Thank you! Your application has been received.' });
    } catch (error) {
        console.error("❌ Error saving to MongoDB:", error);
        return res.json({ success: false, message: 'An error occurred. Please try again later.' });
    }
});

// Basic test route
app.get('/', (req, res) => {
    res.send('✅ Server is running! Ready to receive form submissions.');
});

// Start server
app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
});

connect();
