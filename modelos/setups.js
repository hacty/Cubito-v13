const mongoose = require('mongoose');

const setupSchema = new mongoose.Schema({
    guildID: String,
    sugerencias: {type: String, default: ""},
  bienvenida: { type: Object, default: { canal: "", mensaje: "", imagen: "" } },
  
})

const model = mongoose.model("Configuraciones", setupSchema);

module.exports = model;