const pool = require("../config/db.js");

const createTableQuery = `
  create table if not exists contact (
    id int auto_increment primary key,
    phoneNumber varchar(255),
    email varchar(255),
    linkedId int,
    linkPrecedence enum('primary', 'secondary') not null default 'primary',
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    deletedAt timestamp null,
    foreign key (linkedId) references contact(id)
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
}
initializeDatabase()
  
const executeQuery = async (query, params = []) => {
const connection = await pool.getConnection();
try {
    const [results] = await connection.query(query, params);
    return results;
} finally {
    connection.release();
}
};
  
const addContact = async (contact) => {
    const query = `
        insert into contact (email, phoneNumber, linkedId, linkPrecedence, createdAt, updatedAt)
        values (?, ?, ?, ?, now(), now());
    `;
    const linkPrecedence = contact.linkedId ? 'secondary' : 'primary';
    await executeQuery(query, [
        contact.email,
        contact.phoneNumber,
        contact.linkedId,
        linkPrecedence,
    ]);
};
  
const mergePrimaries = async (primaryId, secondaryId) => {
    const query = `
        update contact set linkedId = ?, linkPrecedence = 'secondary', updatedAt = now()
        where linkedId = ? or id = ?;`;
    await executeQuery(query, [primaryId, secondaryId, secondaryId]);
};
  
const getPrimaryViaEmail = async (email) => {
    const query1 = `select * from contact where email = ? limit 1;`;
    const anyEmailLinked = (await executeQuery(query1, [email]))[0];
    if (!anyEmailLinked) return null;
    if (!anyEmailLinked.linkedId) return anyEmailLinked;

    const query2 = `select * from contact where id = ? limit 1;`;
    return (await executeQuery(query2, [anyEmailLinked.linkedId]))[0] || null;
};
  
const getPrimaryViaPhoneNumber = async (phoneNumber) => {
    const query1 = `select * from contact where phoneNumber = ? limit 1;`;
    const anyPhoneLinked = (await executeQuery(query1, [phoneNumber]))[0];
    if (!anyPhoneLinked) return null;
  
    if (!anyPhoneLinked.linkedId) return anyPhoneLinked;
  
    const query2 = `select * from contact where id = ? limit 1;`;
    return (await executeQuery(query2, [anyPhoneLinked.linkedId]))[0] || null;
};
  
const getLinkedContacts = async (contactLike) => {
    const query1 = `select * from contact where email = ? or phoneNumber = ? limit 1;`;
    const anyLinked = (
      await executeQuery(query1, 
        [contactLike.email || "NO MATCH", 
        contactLike.phoneNumber || "NO MATCH"])
    )[0];
  
    if (!anyLinked) return [];
  
    const primaryId = anyLinked.linkedId || anyLinked.id;
  
    const query2 = `select * from contact where linkedId = ? or id = ? order by createdAt asc;`;
    return await executeQuery(query2, [primaryId, primaryId]);
};
  
module.exports = {
    initializeDatabase,
    addContact,
    mergePrimaries,
    getPrimaryViaEmail,
    getPrimaryViaPhoneNumber,
    getLinkedContacts,
};