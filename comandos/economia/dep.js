const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "dep",
  alias: [],

 async execute (client, message, args){




let datos = await economia.findOne({ guildID: message.guild.id, userID: message.author.id })
if(!datos){
  let datosnuevos = new economia({
    guildID: message.guild.id,
    userID: message.author.id,
    dinero: 500,
    dinerobanco: 0
  })
  await datosnuevos.save()
  return message.reply({ content:"<a:charging:919033854398972004> Tus datos estan siendo guardados, vuelve a usar el comando" })
}
let dinerototal = datos.dinero
let dinerobancototal = datos.dinerobanco

let cantidad = args[0]
if(!cantidad) return message.reply({ content: "Debes decir una cantidad de <:PicaFresa:952777149234970677>" })

if(cantidad === 'all'){
  await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinero: 0 })
  await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinerobanco: dinerobancototal + Number(dinerototal) })
  return message.reply({ content: `Has guardado **${dinerototal}**<:PicaFresa:952777149234970677> en el banco` })

}

if(cantidad !== 'all'){
  if(isNaN(cantidad)) return message.reply({ content:"Debes poner una cantidad valida" })
  if(cantidad < '1' ) return message.reply({ content:"La cantidad debe ser mayor a 0" })
  if(cantidad > dinerototal) return message.reply({ content:"No puedes guardar mas <:PicaFresa:952777149234970677> de las que tienes" })

    await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinero: dinerototal - Number(cantidad) })
  await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinerobanco: dinerobancototal + Number(cantidad) })

  return message.reply({ content:`Has guardado **${cantidad}**<:PicaFresa:952777149234970677> en el banco` })
}

  }

}
