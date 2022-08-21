const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
  name: "snipe",
  alias: [],

 async execute (client, message, args){

    const channel = message.mentions.channels.first() || message.channel;

    const snipes = client.snipes.get(channel.id)

    if(!snipes) return message.channel.send("No se a borrado ningun mensage").then(a => setTimeout(() => a.delete(), 5000))

     const snipe = args[0] - 1 || 0;
     const target = snipes[snipe];
     if(!target) return message.reply(`Esto solo es valido ${snipes.lenght} mensajes!`)

     const { msg, time, image} = target;
     
        const embed = new Discord.MessageEmbed()

        .setTitle("Snipe:")
        .setAuthor(`Mensaje escrito de Usuario ${msg.author.tag}`,msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setImage(image)
        .setColor("#f6ff00")
        .setFooter(
            ` ${snipe + 1} / ${snipes.length}`
        )


        message.channel.send({embeds:[embed]})
      
    }

  };


//NOMBRE DEL BOT: client.user.username
    //AVALAR DE BOT: client.user.avatarURL()
    //NOMBRE DE USUARIO: message.member.displayName
    //AVATAR DE USUARIO: message.author.avatarURL()
 