const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
  name: "clear",
  alias: [],

  execute (client, message, args){

    let number = args[0]

    var perms = message.member.permissions.has("MANAGE_MESSAGES"); //Si el usuario tiene permisos
    if (!perms) return message.channel.send("No tienes Permisos necesarios");

    const purgeembed = new Discord.MessageEmbed()
      .setDescription(`He borrado ${number} mensajes!`)

    if (!args[0]) return message.channel.send(`Debes poner una cantidad del 1 al 100`)

    if (isNaN(number)) return message.channel.send(`Solo puedes escribir numeros`)
    number = parseInt(number)

    message.channel.bulkDelete(number).then(() => {
      message.channel.send(`Se borraron ${number}/100 mensajes correctamente`)
    }).catch((e) => {
      message.channel.send(e)
    })
  }




  }

