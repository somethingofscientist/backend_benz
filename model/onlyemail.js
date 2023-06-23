const mongoose = require("mongoose");

const onlyEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const OnlyEmail = mongoose.model("only_emails", onlyEmailSchema);

module.exports = OnlyEmail;
