const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const ms = require ('ms')

module.exports = {
  name: "timeout",
  alias: [],

async execute (client, message, args){

    var perms = message.member.permissions.has("MODERATE_MEMBERS")
    if(!perms) return message.channel.send("No tienes permisos de Moderar miembros")

    let mencionado = message.mentions.members.first()
    if(!mencionado) return message.channel.send("Debes mencionar a alguien!")

    let time = args[1]
    if(!time) return message.channel.send("Debes decidir un tiempo!")
    let timer = ms(time)

    var razon = args.slice(2).join(" ")
    if(!razon){
      razon = 'No especificado'
    }

 
    await mencionado.timeout(timer, razon)

        const embed = new MessageEmbed()

    .setTitle(`<:warn:967609139377369138>Has sido aislado por el moderador ${message.member.displayName}<:warn:967609139377369138>`)
    .setColor("RED")
    .setDescription(`El usuario: ${mencionado} se ha aislado.\nModerador${message.member}\nRazon: ${razon}`)

    message.reply({embeds: [embed]})

}
}