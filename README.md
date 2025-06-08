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
