const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')
module.exports = {
  name: "rob",
  alias: [],

async  execute (client, message, args){

let user = message.mentions.users.first()
if(!user) message.reply({ content: "Debes mencionar a un usuario" })

let datos = await economia.findOne({ guildID: message.guild.id,  userID: message.author.id })
if(!datos){
  let datosnuevos = new economia({
    guildID: message.guild.id,
    userID: message.author.id,
    dinero: 500,
    dinerobanco: 0
  })
  await datosnuevos.save()
  return message.reply({ content: "<a:charging:919033854398972004> Tus datos estan siendo guardados, vuelve a usar el comando" })
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
  return message.reply({ content: `<a:charging:919033854398972004> Los datos de **${user.username}** estan siendo guardados, vuelve a usar el comando` })
}

let dineronuestro = datos.dinero
let dinerosuyo = datos2.dinero

if(dineronuestro < '500') return message.reply({ content: "Necesitas mas de 500 <:PicaFresa:952777149234970677> para robar a alguien" })
if(dinerosuyo < '500') return message.reply({ content: "No puedes robar a un usuario con menos de 500<:PicaFresa:952777149234970677>" })
let dinerorobar = Math.floor(Math.random() * 400) + 1
let probalidad = Math.floor(Math.random() * 200) + 1

if(dinerosuyo === '0') return message.reply({ content: `${user.username} no tiene dinero fuera del banco` })
if(dineronuestro < '0') return message.reply({ content: "No puedes robar a nadien, no te queda <:PicaFresa:952777149234970677>" })
if(user.id === message.author.id) return message.reply({ content: "No te puedes robar a ti mismo" })



if(probalidad < 100){
await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinero: dineronuestro - Number(dinerorobar) })
await economia.findOneAndUpdate({ guildID: message.guild.id, userID: user.id }, { dinero: dinerosuyo + Number(dinerorobar)})
return message.reply({ content: `Ibas a robar a **${user.username}** y te ha salido mal y has perdido **${dinerorobar}**` })

}
if(probalidad > 100){
await economia.findOneAndUpdate({ guildID: message.guild.id, userID: user.id }, { dinero: dinerosuyo - Number(dinerorobar) })
await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinero: dineronuestro + Number(dinerorobar)})
return message.reply({ content: `Has robado **${dinerorobar}** de **${user.username}**` })

}

}
}