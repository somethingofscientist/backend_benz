const mongoose = require("mongoose");

const subscripitionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Subscription = mongoose.model("subscription", subscripitionSchema);

module.exports = Subscription;
