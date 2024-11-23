const pool = require("../config/db.js");

const createTableQuery = `
  create table if not exists contact (
    id int auto_increment primary key,
    phoneNumber varchar(255),
    email varchar(255),
    linkedId int,
    linkPrecedence varchar(50) NOT NULL,
    createdAt timestamp DEFAULT current_timestamp,
    updatedAt timestamp DEFAULT current_timestamp ON UPDATE current_timestamp,
    deletedAt timestamp NULL,
    FOREIGN KEY (linkedId) REFERENCES contact(id)
  );
`;

const initializeDatabase = async () => {
    try {
        const connection = await pool.getConnection();
        await connection.query(createTableQuery);
        console.log("Table 'contact' ensured to exist.");
        connection.release();
    } catch (error) {
        console.error("Error initializing the database:", error.message);
    }
};


const getAllContacts = async () => {
    const query = "SELECT * FROM contact WHERE deletedAt IS NULL";
    return pool.execute(query);
};

const createContact = async (data) => {
    const { phoneNumber, email, linkedId, linkPrecedence } = data;
    const query = `
        INSERT intO contact (phoneNumber, email, linkedId, linkPrecedence)
        VALUES (?, ?, ?, ?)
    `;
    return pool.execute(query, [phoneNumber, email, linkedId, linkPrecedence]);
};
module.exports = {
    initializeDatabase,
    getAllContacts,
    createContact,
};
