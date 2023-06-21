const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

require("./db/conn");

const app = express();
app.use(cors());
app.use(express.json());

app.use(require("./routes/mailer"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
