const { Schema, model } = require('mongoose')

const mute = new Schema({
        User: String,///////esto guardala la id del usuario 
        Guild : String,//////Esto la id del server (por si quieres q el warn q se gane por usuario sea por cada server)
        Rol: String
    });

          
module.exports = model('mute', mute)