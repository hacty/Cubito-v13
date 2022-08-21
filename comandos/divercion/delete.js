const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const Canvas = require("canvas")


module.exports = {
  name: "borrar",
  alias: ["borrar"],

 async execute (client, message, args){

   let usuario = message.mentions.members.first() || message.member

   let emoji;

  {
   emoji = 'https://media.discordapp.net/attachments/771593043118915584/942957555523661884/unknown.png?width=706&height=335'

  }

   const{createCanvas, loadImage} = require('canvas')

   const lienzo = Canvas.createCanvas(748, 356)
   const ctx = lienzo.getContext('2d')

   const avatar1 = usuario.user.displayAvatarURL({ size: 1024, format: 'png' })

   const emoji2 = await Canvas.loadImage(emoji)

   const img1 = await Canvas.loadImage(avatar1)


     
     ctx.drawImage(emoji2, 25, 25, 730, 330)
     ctx.drawImage(img1, 135, 135, 200, 200)

     var text = ctx.measureText('Awesome!')

  


  
  const attachment = new Discord.MessageAttachment(lienzo.toBuffer());
  message.channel.send({files:[attachment]})

  }
///https://i.pinimg.com/originals/2a/d9/0b/2ad90bf63e5414c9ecf7ae8419cb02ed.png
}
