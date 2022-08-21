const { Schema, model } = require("mongoose")

const economia = new Schema({

userID: String,
guildID: String,
dinero: {
type: Number,
default: 50
},
dinerobanco: {
  type: Number,
  default: 0
},
caña: {
type: Number,
default: 0
},
pico: {
  type: Number,
  default: 0
},
tale: {
  type: Number,
  default: 0
},
inventario: {
  type: Object
},
palos: {
  type: Number,
  default: 0
},
mesa: {
  type: Number
}
});

module.exports = model('economia', economia)