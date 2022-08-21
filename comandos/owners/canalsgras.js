const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const canalSug = require('../../Schema/sugerencia')

module.exports = {
  name: "setsuggest",
  alias: [],
    
async execute (client, message, args){
   

    var perms = message.member.permissions.has("ADMINISTRADOR")
    if(!perms) return message.channel.send("No tienes permisos de administrador!")

    const canal = message.mentions.channels.first(args[1])
    if(!canal) return message.channel.send("Debes mencionar un canal!")/// aca me salta el error por el .first
    

    message.channel.send(`Canal seleccionado exitosamente, las sugerencias se enviaran a <#${canal.id}>`)

     
    const data = await canalSug.findOne({ guildID: message.guild.id })

    if(!data){
    let datosnuevos = new canalSug({
    guildID: message.guild.id,
    canal: canal.id
  })
  await datosnuevos.save()
  }


    await canalSug.findOneAndUpdate({ canal: canal.id })



  }

}
