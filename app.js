const express = require("express");
const contactRoutes = require("./routes/contactRoutes.js");
const { initializeDatabase } = require("./models/contactModel.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


initializeDatabase();


app.use("/api/contacts", contactRoutes);


app.get("/", (req, res) => {
    res.send("API is working!");
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Something went wrong!" });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
