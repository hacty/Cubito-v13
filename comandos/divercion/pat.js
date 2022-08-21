const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const pat = new db.crearDB('pats')

module.exports = {
  name: "pat", 
  alias: [],

execute (client, message, args){

  const user = message.author || message.mentions.members.first()

  let mentioned = message.mentions.users.first() 
  if(!mentioned) return message.channel.send(":x: || Debes mencionar a alguien-nya");

  if (!pat.tiene(`${user.id}`))
    pat.establecer(`${user.id}`, 0)

  let random = Math.floor(Math.random() * 1) + 1

  pat.sumar(`${user.id}`, random)

let gif = [`https://i.gifer.com/H69F.gif`, `https://c.tenor.com/8w4TYd2tsKcAAAAC/anime-pat.gif`, `https://c.tenor.com/OUSrLXimAq8AAAAC/head-pat-anime.gif`, `https://c.tenor.com/4PIWT36zHo0AAAAC/anime-pat.gif`, `https://c.tenor.com/AnxesEqY2RwAAAAC/pat-anime.gif`, `https://c.tenor.com/3PjRNS8paykAAAAC/pat-pat-head.gif`, `https://c.tenor.com/1dO-1j18C-sAAAAC/pet-pat.gif`, `https://c.tenor.com/SONjh216O60AAAAC/pat-head-anime.gif`, `https://c.tenor.com/Z-28SFKJaIsAAAAC/anime-pat.gif`, `https://c.tenor.com/jEfC8cztigIAAAAC/anime-pat.gif`, `https://c.tenor.com/E6fMkQRZBdIAAAAC/kanna-kamui-pat.gif`,`https://media.tenor.com/images/44f1cabddf55bc4b4884f352248f704e/tenor.gif`]

var link = gif[Math.floor(Math.random() * gif.length)]

  const embed = new Discord.MessageEmbed()
        .setTitle(`${user.tag} acarició tiernamente a ${mentioned.tag} `)
        .setColor('#f6ff00')
        .setImage(link)
        .setTimestamp()
        .setFooter(`• Hecho por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

    message.channel.send({embeds:[embed]});

    return;

if(message.deletable) message.delete()
 }

}


