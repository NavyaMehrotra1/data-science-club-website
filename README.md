# Hopkins Data Science Club

Project Overview
The Data Science Club website is a modern, interactive web platform designed for Johns Hopkins University's premier student-led data science initiative. The site serves as the primary hub for recruiting members, showcasing events, and providing information about the club's activities.

Development Guidelines
Adding New Events

Duplicate the carousel-item structure
Update the date values in card-day and card-month
Modify time, location, and description in respective card-info children
Ensure consistent styling with existing events

Updating FAQ Content

Locate the appropriate faq-item container
Modify the faq-question heading text
Update the faq-answer paragraph content
Note: Several FAQ items currently show "To be answered" placeholders

Form Customization

Email Validation: Modify the pattern attribute to change domain requirements
Database Fields: Ensure form field names match MongoDB collection schema
Styling: Form appearance controlled via CSS classes in style.css

Database Schema
Member Registration Collection
javascript{
  _id: ObjectId,
  name: String,           // From form input[name="name"]
  email: String,          // From form input[name="email"] 
  timestamp: Date,        // Auto-generated submission time
  status: String          // Processing status
}
