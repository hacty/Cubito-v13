const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const warns = require('../../Schema/warns')

  
module.exports = {
  name: "warns", 
  alias: ["avisar"], 

async execute (client, message, args){

     let persona = message.mentions.users.first()
  if(!persona) return message.channel.send("Debes mencionar a alguien")


 let advertencias;

    const data = await warns.findOne({ Guild : message.guild.id, User: message.author.id })
    .catch(err => console.log(err))

    if(data) {
        advertencias = data.warn;
    } else {
        advertencias = 0;
    }
 


  const warnings = new Discord.MessageEmbed()
    .setTitle(`Advertencias`)
    .setDescription(`El usuario: ${persona} tiene ${advertencias} warns!`)
    .setColor(`RED`)
  
  

  message.channel.send({ embeds: [warnings] })



  
      }
} 