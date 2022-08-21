const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
  name: "facha",
  alias: [],

  execute (client, message, args){

    let emoji;

      
    let mention = message.mentions.members.first() || message.member 



    

     const porcentaje = Math.floor(Math.random()*101)

    if(porcentaje <= 50){
      emoji = "😧"
    }
    if(porcentaje > 50){
      emoji = "😎"
    }
   
message.channel.sendTyping()//En la version 13 de discord.js se usa este metodo, el bot "escribe" hasta que se envie un mensaje o una duracion max de 10 segundos
setTimeout(() =>  

message.channel.send(`**${mention.user}** es un **${porcentaje}%** de facha ${emoji}`), 2000/*max duracion*/) 


//😧
  }

}