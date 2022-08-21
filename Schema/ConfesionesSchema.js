const { Schema, model } = require("mongoose")

const conf = new Schema({
  guildId: {
    type: String
  },
  channelId: {
    type: String
  }
})

module.exports = model("ConfesionesSchema", conf)