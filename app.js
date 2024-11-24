const express = require("express");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());


app.get("/", (_, res) => {
  res.status(200).send("Working");
});

app.use("/", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
