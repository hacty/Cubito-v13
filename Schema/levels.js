const { Schema, model } = require("mongoose")

const levels = new Schema({

  guildID: String,
  userID: String,
  xp: {
    type: Number,
    default: 0
 },
  level: {
    type: Number,
    default:0
 },
  limit: {
    type: Number,
    default: 100
 }
});


module.exports = model('levels', levels)