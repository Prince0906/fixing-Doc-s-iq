# Bitespeed: Identity Reconciliation

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
```
## API Documentation

### Endpoint: `/identify`

**Method**: `POST`

**Request Body**:  
Accepts either `email` or `phoneNumber` (or both).  
Example:

```json
{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}
```
**Response**:
Success (HTTP 200): Returns the consolidated contact details:(just an example, actual respose can vary)
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [23]
  }
}
```
**Error Handling**:

If both email and phoneNumber are missing in the request:
Error (HTTP 400): Occurs if neither email nor phoneNumber is provided:
json
```json
{
  "error": "Email or Phone number is required"
}
```
---

## Tech Stack

- **Backend Framework**: Node.js + Javascript + Express.js
- **Database**: MySQL

---

## Features

- Consolidates customer identities based on shared email or phone numbers.
- Creates new contact entries when no match is found.
- Links existing contacts under a primary contact for related entries.
- Dynamically updates contact precedence (primary or secondary) as required.
- Returns detailed responses, including all linked contact information.

---


##Database Behavior
New Contact Creation:

If no matching contact is found, a new Contact row is created with linkPrecedence: "primary".
Link Existing Contacts:

If an email or phoneNumber matches existing entries, the data is linked under the oldest "primary" contact.
Primary to Secondary Transition:

Updates the linkPrecedence of an existing primary contact to secondary if linking requires a new primary.

And More
## Database Schema

The application uses a single table named `contact`.

```mysql schema
model Contact {
    id int auto_increment primary key,
    phoneNumber varchar(255),
    email varchar(255),
    linkedId int,
    linkPrecedence enum('primary', 'secondary') not null default 'primary',
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    deletedAt timestamp null,
    foreign key (linkedId) references contact(id)
}
```




