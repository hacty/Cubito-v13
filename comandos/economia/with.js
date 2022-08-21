const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "with",
  alias: [],

 async execute (client, message, args){

let datos = await economia.findOne({ guildID: message.guild.id, userID: message.author.id})
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

let dinerototal = datos.dinero
let dinerobancototal = datos.dinerobanco

let cantidad = args[0]
if(!cantidad) return message.reply({ content: "Debes decir una cantidad de <:PicaFresa:952777149234970677>" })

if(cantidad === 'all'){
  await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinerobanco: 0 })
  await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinero: dinerototal + Number(dinerobancototal) })
  return message.reply({ content: `Has sacado **${dinerobancototal}**<:PicaFresa:952777149234970677> del banco` })
  }

  if(cantidad !== 'all'){
  if(isNaN(cantidad)) return message.reply({ content: "Debes escribir una cantidad de <:PicaFresa:952777149234970677>" })
  if(cantidad < '1') return message.reply({ content: "La cantidad debe ser mayor que 1" })
  if(cantidad > dinerobancototal) return message.reply({ content: "No puedes sacar mas <:PicaFresa:952777149234970677> del que tienes" })

    await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, {dinero: dinerototal + Number(cantidad) })
  await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinerobanco: dinerobancototal - Number(cantidad) })
  return message.reply({ content:`Has sacado **${cantidad}**<:PicaFresa:952777149234970677> del banco` })
  }
  
  }

}
