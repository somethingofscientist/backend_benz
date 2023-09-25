const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require('express-fileupload');
dotenv.config({ path: "./.env" });

require("./db/conn");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/mailer"));



app.get(('/'), (req, res) => {
  res.send({
    message: "hi backend server"
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
