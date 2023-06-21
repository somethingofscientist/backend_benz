const mongoose = require("mongoose");

const DB = process.env.DB;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection succesfull");
  })
  .catch((err) => {
    console.log(err);
  });
