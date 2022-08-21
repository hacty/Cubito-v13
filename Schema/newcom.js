const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newcomand = new Schema({
    guildID: {
        type: 'string'
    },
    sufijo: {
        type: 'string'
    },
    mensaje: {
        type: 'string'
    }
})

module.exports = mongoose.model('newcomand', newcomand)