const { Schema, model } = require('mongoose')

const nivel = new Schema({
        User: String,///////esto guardala la id del usuario 
        Guild : String,//////Esto la id del server (por si quieres q el warn q se gane por usuario sea por cada server)
        nivel: {
     type: Number,
    default: 0/////////esto guardala los warns 
      }    
    });

          
module.exports = model('nivel', nivel)