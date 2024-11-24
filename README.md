# fixing-Doc-s-iq


### Description of Key Files:
- **`config/db.js`**: Contains database connection logic.
- **`controllers/contactController.js`**: Handles logic for contact-related operations.
- **`models/contactModel.js`**: Defines the schema and model for contact data.
- **`routes/contactRoutes.js`**: Defines the API routes for contact operations.
- **`app.js`**: Entry point of the application.
- **`package.json`**: Contains project metadata and dependencies.
- **`readme.md`**: Documentation for the project.


## How to Test the API

1. **Open Postman** (or any API testing tool).
2. **Send a POST request** to the following URL: https://fixing-doc-s-iq.onrender.com/identify

3. **Set the request body** to:

```json
{
    "email": "test@gmail.com",
    "phoneNumber": "123456"
}



