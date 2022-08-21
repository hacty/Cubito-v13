const Discord = require("discord.js");
const {MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton} = require('discord.js');

module.exports = {
  name: "avatar",
  alias: ["av", "Avatar"],

execute(client, message, args){

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        let png = user.avatarURL({ format: 'png', dynamic: true, size: 1024 })
        let jpg = user.avatarURL({ format: 'jpg', dynamic: true, size: 1024 })
        let webp = user.avatarURL({ format: 'webp', dynamic: true, size: 1024 })


        const avatar = new Discord.MessageEmbed()
            .setTitle('Cubo Bot | Avatar')
            .setColor("#f6ff00")
            .setAuthor({ name: "Avatar de " + user.tag })
            .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
           // .setColor("RANDOM")

        message.channel.send({ embeds: [avatar], components: [new Discord.MessageActionRow().addComponents(
            [
                new Discord.MessageButton().setStyle("LINK").setEmoji("999190066813481011").setLabel("PNG").setURL(`${png}`),
                new Discord.MessageButton().setStyle("LINK").setEmoji("999190066813481011").setLabel("JPG").setURL(`${jpg}`),
                new Discord.MessageButton().setStyle("LINK").setEmoji("999190066813481011").setLabel("WEBP").setURL(`${webp}`),
            ]
        )]})
    }

 }

/*const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
  name: "avatar",
  alias: [],

  execute (client, message, args){

    let usuario = message.mentions.members.first() || message.member;

    const embed = new Discord.MessageEmbed()
      .setTitle('Cubo Bot | Avatar')
      .setColor("#f6ff00")
      .setDescription(`Avatar de: \n**${usuario.user.tag}**`)

      .setAuthor(client.user.username, client.user.avatarURL())
      .setThumbnail()
      .setImage(usuario.user.displayAvatarURL({dinamyc: true, size: 1024}))
      .setFooter('Solicitado por: ' + message.member.displayName, message.author.avatarURL())
      .setTimestamp()
      .setURL('');
    //NOMBRE DEL BOT: client.user.username
    //AVALAR DE BOT: client.user.avatarURL()
    //NOMBRE DE USUARIO: message.member.displayName
    //AVATAR DE USUARIO: message.author.avatarURL()
    message.channel.send({embeds: [embed]});




  }

}
*/