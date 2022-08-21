const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
  name: "ban",
  alias: ["banear"],
  permisos: ["BAN_MEMBERS"],
  execute (client, message, args) {

    //if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(`No tienes el permiso "BAN_MEMBERS"`)

    let user = message.mentions.members.first()
    if(!user)return message.channel.send("Falto especificar: **usuario** + razon")
      
    var razon = args.slice(1).join(" ")
    if(!razon)return message.channel.send("Falto especificar: ~~**usuario**~~ + **razon**")
   
     
    if(message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.channel.send("No puedes banear a una persona de igual o mayor poder que tu!")

    if(user === message.author) return message.channel.send("No te puedes banear a ti mismo XD!")

    if(message.deletable) message.delete()
    user.ban({ reason:razon})
      const embed = new MessageEmbed()
     .setTitle(`<:warn:967609139377369138>Has sido baneado por el moderador ${message.member.displayName}<:warn:967609139377369138>`)
     .setColor("RED")
     .setDescription(`**Staff** \n${message.member}\n**Razon**\n${razon}\n**Usuario**\n${user}`)
     .setThumbnail("https://images-ext-1.discordapp.net/external/pL3HmMhMmGrOmr1EQE7m3QPLNX2OE7K4IB0s37cMHXM/https/cdn.discordapp.com/icons/702009979217117195/d13c64007d029a6d55662ed8b92e24a2.png")
    user.send(`Has sido baneado del servidor **${message.guild.name}**\nRazon: **${razon}**`)




  }

}