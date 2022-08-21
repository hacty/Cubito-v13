const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

let cooldown = new Set()

module.exports = {
  name: "work",
  alias: [],

async  execute (client, message, args){


let datos = await economia.findOne({ guildID: message.guild.id, userID: message.author.id })
if(!datos){
  let datosnuevos = new economia({
    guildID: message.guild.id,
    userID: message.author.id,
    dinero: 500,
    dinerobanco: 0
  })
  await datosnuevos.save()
  return message.reply({ content: "<a:charging:919033854398972004> Tus datos estan siendo guardados, vuelve a usar el comando" })
}


let dinerototal = datos.dinero

let user = message.author;
 
if(cooldown.has(message.author.id)){
  message.channel.send({ content:`espera 3 minutos  para volver a usar este comando`})

  return;
}


cooldown.add(message.author.id);

setTimeout(() => {
  cooldown.delete(message.author.id);
}, 18000);
  


let random = Math.floor(Math.random() *200) * 3


let trabajo = ["Policia", "Profesor", "Doctor", "Pescador","Veterinario","Nada solo soborno a SrMichi", "Sicario", "Payaso","Actor", "nada solo pidio prestado ","vendiendo pasteles","panadero"]
let randomtrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]




const embed = new Discord.MessageEmbed()

.setTitle("Trabajo")
.setDescription(`**${message.author.tag}** ha trabajado de **${randomtrabajo}** y gano **${random}** <:PicaFresa:952777149234970677>`)
.setColor("GREEN")

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal + Number(random) })

message.channel.send({ embeds: [embed] })


  }

}

