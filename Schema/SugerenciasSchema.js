const { Schema, model } = require("mongoose")

const sugs = new Schema({
  guildId: {
    type: String
  },
  channelId: {
    type: String
  }
})

module.exports = model("SugerenciasSchema", sugs)