const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "addmoney",
  alias: [],

async  execute (client, message, args){

  const ids = ["720698487896801342", "808581171809222706", "719711919690481694", "821258555180318720"]
if(!ids.includes(message.author.id)) return  message.reply({ content: "no puedes hacer esto!"})

  

 let user = message.mentions.members.first() 
  if(!user) return message.reply({ content:"Tienes de mencionar un usuario " })

const cantidad = Number(args[1])
if(!cantidad) return message.reply({ content: "Debes decir una cantidad" })


let datos = await economia.findOne({ guildID: message.guild.id, userID: user.id })
if(!datos) {
  let datosnuevos = new economia({
    guildID: message.guild.id,
    userID: user.id,
    dinero: 500,
    dinerobanco: 0
  })
  await datosnuevos.save()
  return message.reply({ content: `<a:charging:919033854398972004> Los datos de **${user.tag}** estan siendo guardados, vuelve a usar el comando` })
}

await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinero: datos.dinero + cantidad })

const embed = new Discord.MessageEmbed()

.setTitle("Dinero añadido")
.setDescription(`Le has añadido **${cantidad}**<:PicaFresa:952777149234970677> a **${user.user.username}** `)
.setColor('BLUE')

message.channel.send({ embeds: [embed] })
}
}