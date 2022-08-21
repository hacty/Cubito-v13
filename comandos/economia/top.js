const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "top",
  alias: ["leaderboard"],

 async execute (client, message, args){

const opcion = args[0] 
if(!opcion) return message.channel.send("Debes especificar si `cash` o `total`")

   
if(opcion === 'cash'){


   let dataGlobal = await economia.find({ guildID: message.guild.id }).sort([["dinero", "descending"]]).exec()

   dataGlobal = dataGlobal.slice(0, 10)
   if(!dataGlobal) return message.reply({ content: "Error, no pude encontrar los datos de dinero"})

   const puestoUsuario = dataGlobal.findIndex(dataUser => dataUser.userID === message.author.id ) + 1


  const embedtop = new Discord.MessageEmbed()
   .setTitle("Leaderboard Cash")
   .setThumbnail(message.guild.iconURL)
   .setDescription(`${dataGlobal.map((data, index) => `${index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}. **${client.users.cache.get(data.userID).tag}** - \`${data.dinero} Dinero\``).join("\n")}`)
   .setColor("GREEN")
   //.setFooter({ text: `Te encuentras en el puesto ${puestoUsuario}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
   .setFooter(`Te encuentras en el puesto ${puestoUsuario}`)
    .setTimestamp();

   message.channel.send({ embeds: [embedtop] })
  
}

if(opcion === 'total'){

   const dinerototal = economia.dinero + economia.dinerobanco
   
     let dataGlobal2 = await economia.find({ guildID: message.guild.id }).sort([["dinerototal", "descending"]]).exec()

   dataGlobal2 = dataGlobal2.slice(0, 10)
   if(!dataGlobal2) return message.reply({ content: "Error, no pude encontrar los datos de dinero"})

   const puestoUsuario2 = dataGlobal2.findIndex(dataUser => dataUser.userID === message.author.id ) + 1


  const embedtop2 = new Discord.MessageEmbed()
   .setTitle("Leaderboard ")
   .setThumbnail(message.guild.iconURL)
   .setDescription(`${dataGlobal2.map((data, index) => `${index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}. **${client.users.cache.get(data.userID).tag}** - \`${data.dinero} Dinero\``).join("\n")}`)
   .setColor("GREEN")
   //.setFooter({ text: `Te encuentras en el puesto ${puestoUsuario}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
   .setFooter(`Te encuentras en el puesto ${puestoUsuario2}`)
    .setTimestamp();

   message.channel.send({ embeds: [embedtop2] }) 
  
     }
  }

}