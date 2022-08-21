const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    guildID: String,
    channelID: String,
})

const model = mongoose.model("logs", logSchema);

module.exports = model;