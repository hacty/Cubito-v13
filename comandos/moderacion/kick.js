const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
  name: "kick",
  alias: ["expulsar"],
 
execute (client, message, args){
 
  var perms = message.member.permissions.has("KICK_MEMBERS")
  if(!perms) return message.channel.send("No puedes expulsar gente >:V")
 
  const user = message.mentions.members.first()
  if(!user) return message.channel.send("Debes mencionar a un miembro kick >>")
 
  if(user === message.author) return message.channel.send("No puedes expulsarte a ti mismo >>>")
 
  var razon = args.slice(1).join(' ')
  if(!razon){
    razon = 'No hay razon'
  }
 
  user.kick(razon);
 
     const embed = new MessageEmbed()
     .setTitle(`<:warn:967609139377369138>Has sido expulsado por el moderador ${message.member.displayName}<:warn:967609139377369138>`)
     .setColor("RED")
     .setDescription(`**Staff** \n${message.member}\n**Razon**\n${razon}\n**Usuario**\n${user}`)
     .setThumbnail("https://images-ext-1.discordapp.net/external/pL3HmMhMmGrOmr1EQE7m3QPLNX2OE7K4IB0s37cMHXM/https/cdn.discordapp.com/icons/702009979217117195/d13c64007d029a6d55662ed8b92e24a2.png")

    message.channel.send({embeds: [embed]})
    user.send(`Has sido expulsado por el moderador **${message.member}**\nServidor: ${message.guild.name}\nRazon: ${razon}`)

  }

}