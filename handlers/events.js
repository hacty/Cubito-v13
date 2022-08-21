const fs = require('fs');
require("colors")
const allevents = [];
module.exports = async (client) => {
    try {
        try {
            console.log("Cargando los eventos...".yellow)
        } catch {}
        let cantidad = 0;
        const cargar_dir = (dir) => {
            const archivos_eventos = fs.readdirSync(`./eventos/${dir}`).filter((file) => file.endsWith('.js'));
            for(const archivo of archivos_eventos){
                try {
                    const evento = require(`../eventos/${dir}/${archivo}`);
                    const nombre_evento = archivo.split(".")[0];
                    allevents.push(nombre_evento);
                    client.on(nombre_evento, evento.bind(null, client));
                    cantidad++
                } catch(e){
                    console.log(e)
                }
            }
        }
        await ["guild"].forEach(e => cargar_dir(e));
        console.log(`${cantidad} Eventos Cargados`.brightGreen);
        try {console.log(`Iniciando Sesión el Bot...`.yellow)} catch(e) {console.log(e)}
    } catch (e){
        console.log(e.bgRed)
    }
}