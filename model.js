const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model("vote", voteSchema, "votes");
