const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });


module.exports = {
  name: "mcserver",
  alias: [],

async execute (client, message, args){
let { status } = require("minecraft-server-util") //npm i minecraft-server-util
let servidor_ip = args.join(" "); //IP DEL SERVIDOR
let descReplace = /§\w/g; //para remplazar el caracter "§" de la descripcion del servidor.
if (!servidor_ip) return message.channel.send("Necesitas poner la ip del servidor!"); //Si el usuario no ha ingresado una IP
status(servidor_ip).then(async (m) => {
    let jugadores_activos = m.players.online //jugadores activos que tiene el servidor
    let jugadores_maximos = m.players.max //jugadores maximos del servidor
    let version = m.version.name //version del servidor
    let descripcion = m.motd.clean //Obtenemos la descripcion y remplazamos el caracter "§"
    
    const embed = new Discord.MessageEmbed(); //Creamos el embed.
    embed.setColor("#f6ff00"); //Color del embed (Verde en este caso).
    embed.setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${servidor_ip}`); //Foto del servidor
    embed.setDescription(`
Informacion del servidor **${servidor_ip}** 

**IP:** ${servidor_ip}
**Jugadores:** ${jugadores_activos.toLocaleString()} de ${jugadores_maximos.toLocaleString()}
**Version:** ${version}

**${descripcion}**`); //DESCRIPCION DEL EMBED
    return message.channel.send({ embeds: [embed] }); //enviamos el embed.
}).catch(err => {
    console.log(err)
    let embed_error = new Discord.MessageEmbed(); //embed de error
    embed_error.setColor("#f6ff00");
    embed_error.setDescription("No se pudo obtener la informacion del servidor **" + servidor_ip + "**");
    return message.channel.send({ embeds: [embed_error] }); //enviamos el embed
});
}
}