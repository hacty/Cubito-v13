const { Schema, model } = require("mongoose");

const votos = new Schema({
  messageId: {
    type: String
  },

  author: {
    type: String
  },

  si: {
    type: Array,
    default: []
  },

  no: {
    type: Array,
    default: []
  }
})

module.exports = model("VotosSchema", votos)