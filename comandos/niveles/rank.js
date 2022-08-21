const Discord = require("discord.js");
const { Client, MessageEmbed, MessageAttachment, Intents, MessageActionRow, MessageSelectMenu,
Message} = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const levels = require('../../Schema/levels')
const canvacord = require('canvacord')
const { Rank } = require('canvacord')


module.exports = {
  name: "rank",
  alias: [],
/**
* @param { Message } message
*/
  async execute (client, message, args){
console.log("aquu")
      const member = message.mentions.members.first() || message.member;
      
      const data = await levels.findOne({userID: member.id, guildID: message.guild.id})
      if(!data) return message.channel.send({content: "El usuario no tiene progreso!"})

      let dataGlobal = await levels.find({guildID: message.guild.id}).sort([["xp", "descending"]]).exec();
      if(!dataGlobal) return message.reply("No hay xp en este servidor.")

      let gif = ["https://media.discordapp.net/attachments/900912691462430751/973710014789349376/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710015041011762/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710015271690300/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710015607218246/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710015871467540/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710016186023968/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710016479658004/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710016769040504/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710017050054676/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710017293320262/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710170855178311/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710171152977940/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710171471753256/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710171887001600/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710172205764648/unknown.png", "https://media.discordapp.net/attachments/900912691462430751/973710172423852052/unknown.png"]

      var link = gif[Math.floor(Math.random() * gif.length)]
      
      const rankCard = new Rank()
         .setAvatar(member.user.displayAvatarURL({size: 2048, format: "png"}))
         .setCurrentXP(data.xp)
         .setRequiredXP(data.limit)//
         .setLevel(data.level)
         .setRank(dataGlobal.findIndex(dataUser => dataUser.userID === message.member.user.id) + 1)
         .setStatus(member.presence ? member.presence.status : "offline")
         .setProgressBar("#f6ff00", "COLOR")
         .setBackground("IMAGE", link)
         .setUsername(member.user.username)
         .setDiscriminator(member.user.discriminator)

      rankCard.build()
          .then(data =>{
              const attachment = new MessageAttachment(data, 'rank.png')

               message.channel.send({ files: [attachment]})

          })

 

  }

}