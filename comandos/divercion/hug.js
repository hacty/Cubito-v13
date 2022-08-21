const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const hug = new db.crearDB('hug')



module.exports = {
  name: "hug",
  alias: [],
execute (client, message, args){

  const user = message.author || message.mentions.members.first()

  let mentioned = message.mentions.users.first() 
  if(!mentioned) return message.channel.send(":x: || Debes mencionar a alguien");

  if (!hug.tiene(`${user.id}`))
    hug.establecer(`${user.id}`, 0)

  let random = Math.floor(Math.random() * 1) + 1

  hug.sumar(`${user.id}`, random)
    let gif = ["https://i.pinimg.com/originals/08/de/7a/08de7ad3dcac4e10d27b2c203841a99f.gif","https://images-ext-2.discordapp.net/external/jPfhLMLWt1mTbu_r2ixcriD-XvsykKceSH2d7fij0vg/https/imgur.com/9x8xYSx.gif"]

var link = gif[Math.floor(Math.random() * gif.length)]


  const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} abrazó tiernamente a ${mentioned.tag}`)
        .setColor('#f6ff00')
        .setImage(link)
        .setTimestamp()
        .setFooter(`• Solicitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

    message.channel.send({embeds:[embed]});

    return;

if(message.deletable) message.delete()
 }
//https://i.pinimg.com/originals/08/de/7a/08de7ad3dcac4e10d27b2c203841a99f.gif
}