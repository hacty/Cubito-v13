const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

let cooldown = new Set()

module.exports = {
  name: "roulette",
  alias: [],

async execute (client, message, args){


    let color = args[1]
    if(!color) return message.channel.send("Debes decidir un color! (`Red` o `Black` deben estar escritos igual a lo anunciado)")

    let cantidad = args[2]
    if(!cantidad) return message.channel.send("Debes decidir una cantidad!")

    
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
 


 const porcentaje = Math.floor(Math.random()*101)

let colores = ["Red", "Black"]
var link = colores[Math.floor(Math.random() * colores.length)]


    let resultado;


if(link === colores){
    resultado = "Ganaste"
}else{
    resultado = "Perdiste"
}
    return resultado;

const embed = new Discord.MessageEmbed()

.setTitle("Roullete")
.setDescription(`**${message.author.tag}** has apostado. y el color que salio fue :${link}.\nHas ${resultado}`)
.setColor("GREEN")

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal + Number(random) })

message.channel.send({ embeds: [embed] })


  }

}

