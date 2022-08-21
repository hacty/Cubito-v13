const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

let cooldown = new Set()

module.exports = {
  name: "mine",
  alias: [],

async  execute (client, message, args){

    let datos = await economia.findOne({ guildID: message.guild.id, userID: message.author.id })
if(!datos){
  let datosnuevos = new economia({
    guildID: message.guild.id,
    userID: message.author.id,
    dinero: 500,
    dinerobanco: 0,
    pico: 0,
    caña: 0
  })
    
  await datosnuevos.save()
  return message.reply({ content: "<a:charging:919033854398972004> Tus datos estan siendo guardados, vuelve a usar el comando" })
}
    let dinerototal = datos.dinero
    let picowo = datos.pico 

    let user = message.author;
 /*
if(cooldown.has(message.author.id)){
  message.channel.send({ content:`espera 3 minutos  para volver a usar este comando`})

  return;
}


cooldown.add(message.author.id);

setTimeout(() => {
  cooldown.delete(message.author.id);
}, 18000);
  */


let random = Math.floor(Math.random() *200) * 3
    let aña = Math.floor(Math.random() * 2) + 1



let trabajo = ["Nether", "Profundidades cabernales", "Cueva", "Caverna mistica","Penunbra","Cueva Spagueti"]
let randomtrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]




const embed = new Discord.MessageEmbed()

.setTitle("Mina")
.setDescription(`**${message.author.tag}** ha minado en **${randomtrabajo}** y gano **${random}** <:PicaFresa:952777149234970677> Ademas tu pico avanzo a nivel **${picowo + aña}**`)
.setColor("#f6ff00")

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal + Number(random) , pico: picowo + Number(aña) })

message.channel.send({ embeds: [embed] })



}
}