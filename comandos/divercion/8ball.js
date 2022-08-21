const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
  name: "8ball",
  description: "",
  alias: ["bola8"],
  async execute (client, message, args){
      var razon = args.slice(0).join(" ")
    if(!razon) return message.reply("Preguntame algo antes :D");
    const respuestas = [ "Si", "No", "Probablemente","Tal Vez", "No Se", "Prefiero no decir nada", "No estoy seguro","Claro","Obvio","Sip, mayami me lo confirmo <:sunglass:766505159600898059>" ]; 
     let randomrta = respuestas[Math.floor(Math.random() * respuestas.length)]
    const embed = new Discord.MessageEmbed()
      .setTitle('8ball')
      .setColor("#f6ff00")
      .setDescription(`Tu pregunta: **${razon}**\nRespuesta: **${randomrta}**`)
      .setThumbnail()
      .setTimestamp()
      .setURL('');
    message.channel.sendTyping()
      setTimeout(() => message.channel.send({embeds:[embed]}), 1000/*max duracion*/) 
  }
}