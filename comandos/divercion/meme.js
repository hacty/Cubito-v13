const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
  name: "meme",
  alias: [],

 async execute (client, message, args){

    let gif = [`https://media.discordapp.net/attachments/896945522856841287/909271324592066610/hola_peter.png?width=624&height=468`,`https://media.tenor.co/videos/95a78e6162bc4419c06dfae5c9d07f76/mp4`, `https://cdn.discordapp.com/attachments/896945522856841287/904855336500990023/5d81d249f28d6.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915317482124902450/unknown.png`, `https://cdn.discordapp.com/attachments/905131517334941718/915317635154059274/unknown.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915317804192899093/unknown.png`, `https://cdn.discordapp.com/attachments/905131517334941718/915317924955320360/unknown.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915312682943512616/meme-1-1024x576.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915312731165446184/f1280x720-6661_138336_5050.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915312794444914748/KOWYAXWNS5AUFKHZ52Q4ZLQU3Q.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915313137698349136/9k.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915313612166430750/maxresdefault.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915313873236676688/7bc734c4b4f4ffa1c8a16c9634483f7955ecd01dr1-726-720v2_uhq.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915313951301050498/9k.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915314063553224805/2b78e79eb7896c873800159ecdee8be6.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915314217438036058/9k.png`,`https://cdn.discordapp.com/attachments/905131517334941718/915314621991231568/maxresdefault.png`]
var link = gif[Math.floor(Math.random() * gif.length)]
     
    const embed = new Discord.MessageEmbed()
      .setColor("#f6ff00")
      .setDescription("Para que te rias un rato <:jijijija:916418863741141062>")
      .setImage(link)

    message.channel.send({embeds: [embed]})

  }




  }


