const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const Distube = require("distube")


module.exports = {
  name: "leave",
  alias: [],

async execute (client, message, args){


     if(!message.member.voice.channel) return message.channel.send({ content: `Debes estar en un canal de voz` })
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ content: `Debes estar en el mismo canal de voz que yo` })



   
      await client.distube.voices.get(message)?.leave()
      const embed = new MessageEmbed()
    .setDescription(`🎵 Me retire del canal`)
    .setColor("#f6ff00")
      message.channel.send({ embeds: [embed] })
    } 

  }
