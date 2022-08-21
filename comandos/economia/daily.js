const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

let cooldown = new Set();

module.exports = {
  name: "daily",
  alias: [],

  async  execute(client, message, args) {



    let datos = await economia.findOne({ guildID: message.guild.id, userID: message.author.id })
    if (!datos) {
      let datosnuevos = new economia({
        guildID: message.guild.id,
        userID: message.author.id,
        dinero: 500,
        dinerobanco: 0
      })
      await datosnuevos.save()
      return message.reply({ content: "<a:charging:919033854398972004> Tus datos estan siendo guardados, vuelve a usar el comando" })
    }



const ms = require("ms")
const pr = require("pretty-ms")

const dbe = require("quick.db")



let user = message.author;
 

  
  let tiempo = ms("24h") 


  let daily = dbe.fetch(`time_${message.author.id}`)

  if(Date.now() < daily) {
    
    let restante = daily  - Date.now()
    let r = pr(restante, {verbose: true}).replace("hours", "Horas").replace("minutes", "Minutos y").replace("seconds", "Segundos"). replace("hour ", "Hora ")
    .replace("minute ", "Minuto ")
    message.channel.send({ content: `Aun no puedes usar este comando. **Tiempo Restante: ${r}**` })
   return; 
    
  }

  dbe.delete(`time_${message.author.id}`) 
  dbe.add(`time_${message.author.id}`, Date.now() + tiempo) 
    let dinerototal = datos.dinero

    let random = Math.floor(Math.random() * 1000) + 1000

    const embed = new Discord.MessageEmbed()

      .setTitle("Recompensa")
      .setDescription(`**${message.author.tag}** has recamado tu recompensa diaria ganaste **${random}**<:PicaFresa:952777149234970677>`)
      .setColor("GREEN")

    await economia.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinero: dinerototal + Number(random) })

    message.channel.send({ embeds: [embed] })



  }
}