const mongoose = require("mongoose");

const DB = process.env.DB;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection succesful");
  })
  .catch((err) => {
    console.log(err);
  });
