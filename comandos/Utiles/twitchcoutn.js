const Discord = require("discord.js");

module.exports = {
  name: "twitchcount",
  alias: [],

async execute(client, message, args){

const easy = require("easymaty")

let canal = args.join(" ")

if(!canal) return message.reply(`Debes ingresar un canal a buscar`)

let dato = await easy.twitch(canal)

message.channel.send(`El canal de **${canal}** tiene **${dato}** seguidores!`)
 }

}