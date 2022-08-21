const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "bal",
  alias: ["balance"],

 async execute (client, message, args){



  let user = message.mentions.members.first() || message.member;
  if(!user) return message.reply({ content: "Tienes de mencionar un usuario " })

let datos = await economia.findOne({ guildID: message.guild.id, userID: message.author.id })
if(!datos){
  let datosnuevos = new economia({
    guildID: message.guild.id,
    userID: user.id,
    dinero: 500,
    dinerobanco: 0
  })
  await datosnuevos.save()
  return message.reply({ content: "<a:charging:919033854398972004> Los datos estan siendo guardados, vuelve a usar el comando" })

}
let datos2 = await economia.findOne({ guildID: message.guild.id, userID: user.id })
if(!datos2){
  let datosnuevos2 = new economia({
    guildID: message.guild.id,
    userID: user.id,
    dinero: 500,
    dinerobanco: 0
  })
  await datosnuevos2.save()
  return message.reply({ content: `<a:charging:919033854398972004> Los datos de **${user.user.tag}** estan siendo guardadas, vuelve a usar el comando` })
}

let dinerototal = datos2.dinero
let dinerobancototal = datos2.dinerobanco

const embed = new Discord.MessageEmbed()

.setTitle(`Bal de ${user.user.tag}`)
.setDescription(`Dinero: **${dinerototal}**<:PicaFresa:952777149234970677> \nDinero en el banco: **${dinerobancototal}**<:PicaFresa:952777149234970677> \nDinero en total: **${dinerototal + dinerobancototal}**<:PicaFresa:952777149234970677>`)
.setColor("BLUE")
.setThumbnail(user.user.avatarURL())

message.channel.send({ embeds: [embed] })
  }

}