# Hopkins Data Science Club

**Project Overview**  
The Data Science Club website is a modern, interactive web platform designed for Johns Hopkins University's premier student-led data science initiative. The site serves as the primary hub for recruiting members, showcasing events, and providing information about the club's activities.

---

## Development Guidelines

### Adding an event
1. Update the ticket in `public/index.html` and `public/events.html`
2. Keep the date, time, and RSVP link in both places
3. If the room is unknown, leave the dashed Placeholder note instead of inventing a location

### Updating FAQ content
1. Edit the matching `faq-item` in `public/index.html`
2. Keep unknown answers inside a `placeholder` note

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
- **Events**: Upcoming session with an RSVP link, plus the semester format
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
npm install
npm start
```

`npm start` serves `public/` at http://localhost:3000 and routes `/api/submit-form` to the same handler Vercel uses. `npm run dev` still runs `vercel dev` when you want the Vercel runtime.

## Mobile Compatibility

The website is fully responsive and includes:
- Mobile-first CSS design
- Touch-friendly navigation
- Optimized layouts for screens from 320px to 1200px+
- Responsive typography and spacing
- Mobile-optimized forms and interactions

## Project Structure

```
├── public/
│   ├── index.html     # Homepage
│   ├── events.html    # Events
│   ├── team.html      # Board
│   ├── contact.html   # Partner and join
│   ├── style.css
│   ├── script.js
│   └── team_members/
├── api/
│   ├── submit-form.js # Signup handler
│   └── health.js
├── dev-server.js      # Local static server plus API
├── vercel.json
└── package.json
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
