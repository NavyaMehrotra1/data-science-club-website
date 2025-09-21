# Hopkins Data Science Club

**Project Overview**  
The Data Science Club website is a modern, interactive web platform designed for Johns Hopkins University's premier student-led data science initiative. The site serves as the primary hub for recruiting members, showcasing events, and providing information about the club's activities.

---

## Development Guidelines

### Adding New Events
1. Duplicate the `carousel-item` structure  
2. Update the date values in `card-day` and `card-month`  
3. Modify time, location, and description in respective `card-info` children  
4. Ensure consistent styling with existing events  

### Updating FAQ Content
1. Locate the appropriate `faq-item` container  
2. Modify the `faq-question` heading text  
3. Update the `faq-answer` paragraph content  
*Note: Several FAQ items currently show "To be answered" placeholders*

### Form Customization
1. **Email Validation**: Modify the `pattern` attribute to change domain requirements  
2. **Database Fields**: Ensure form field names match MongoDB collection schema  
3. **Styling**: Form appearance is controlled via CSS classes in `style.css`  

---

## Features

- **Responsive Design**: Fully mobile-compatible and works on desktop, tablet, and mobile devices
- **Interactive Elements**: Animated particles, hover effects, and smooth transitions
- **Form Submission**: Join the club through our signup form (with serverless backend)
- **FAQ Section**: Expandable questions and answers
- **Event Carousel**: Showcase upcoming events
- **Team Profiles**: Meet the club leadership
- **Vercel Ready**: Optimized for deployment on Vercel

## Technologies Used

- HTML5
- CSS3 (with custom animations and responsive design)
- JavaScript (ES6+)
- Vercel Serverless Functions
- MongoDB (optional - for form submissions)

## Deployment on Vercel

### Quick Deploy
1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import this project in Vercel
4. Deploy!

### Manual Setup
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Clone and setup:
   ```bash
   git clone https://github.com/NavyaMehrotra1/data-science-club-website.git
   cd data-science-club-website
   npm install
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. (Optional) Add MongoDB connection:
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add environment variable: `MONGO_URI=your_mongodb_connection_string`

### Local Development
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Start local development server
vercel dev
```

## Mobile Compatibility

The website is fully responsive and includes:
- Mobile-first CSS design
- Touch-friendly navigation
- Optimized layouts for screens from 320px to 1200px+
- Responsive typography and spacing
- Mobile-optimized forms and interactions

## Project Structure

```
├── index.html          # Main homepage
├── events.html         # Events page
├── team.html          # Team page
├── contact.html       # Contact page
├── style.css          # Main stylesheet with responsive design
├── script.js          # Frontend JavaScript
├── api/
│   └── submit-form.js # Serverless function for form submission
├── vercel.json        # Vercel configuration
└── package.json       # Dependencies and scripts
```

## Environment Variables

- `MONGO_URI` (optional): MongoDB connection string for form submissions

If no MongoDB URI is provided, the form will still work but submissions will only be logged to the console.

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

---

## Database Schema

**Member Registration Collection**

```javascript
{
  _id: ObjectId,
  name: String,           // From form input[name="name"]
  email: String,          // From form input[name="email"] 
  timestamp: Date,        // Auto-generated submission time
  status: String          // Processing status
}
