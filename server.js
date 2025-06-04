const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve your HTML/CSS/JS files from current directory
app.use(express.static('.'));

// Store form submissions in a JSON file (temporary solution)
const SUBMISSIONS_FILE = 'submissions.json';

// Initialize submissions file if it doesn't exist
if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, '[]');
}

// API endpoint for form submission
app.post('/api/submit-form', (req, res) => {
    try {
        console.log('Received form data:', req.body);
        
        // Validate JHU email
        if (!req.body.email || !req.body.email.endsWith('@jh.edu')) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please use your JHU email address (@jh.edu)' 
            });
        }

        // Read existing submissions
        const submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'));
        
        // Check for duplicate email
        const existingSubmission = submissions.find(sub => sub.email === req.body.email);
        if (existingSubmission) {
            return res.status(400).json({ 
                success: false, 
                message: 'This email is already registered!' 
            });
        }

        // Add new submission
        const newSubmission = {
            ...req.body,
            submittedAt: new Date().toISOString()
        };
        
        submissions.push(newSubmission);
        
        // Save to file
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
        
        console.log('Saved submission for:', req.body.email);

        res.json({ 
            success: true, 
            message: 'Welcome to JHU Data Science Club! You will receive a confirmation email shortly.' 
        });

    } catch (error) {
        console.error('Error processing form:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
});

// Get all submissions (for testing)
app.get('/api/submissions', (req, res) => {
    try {
        const submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'));
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error reading submissions' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Form submissions will be saved to submissions.json');
});