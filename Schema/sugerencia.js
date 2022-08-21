const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const canalSug = new Schema({
    guildID: {type: 'string'},
    canal: {
        type: 'string'
    }
})

module.exports = mongoose.model('canalSug', canalSug)