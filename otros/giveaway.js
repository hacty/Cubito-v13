const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const ms = require ('ms')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });


module.exports = {
  name: "giveaway",
  alias: [],

async execute (client, message, args){

  let winners = args[0]
  



  if (!winners) return message.channel.send("Debes especificar cuantos ganadores")

    let time = args[1]
  if(!time) return message.channel.send("Debes decidir un tiempo!")
  let timer = ms(time)

  let prize = args.slice(2).join(" ")


  if (!prize) return message.channel.send("Debes especificar premio")


  const embed = new MessageEmbed()
  .setTitle("🎉|Sorteo|🎉")
  .setDescription(`Reacciona 🎉 para 
   participar.\nPremio:**${prize}**\nDuracion:**${time}**`)
  .setColor("#f6ff00")

  const m = await message.channel.send({ embeds: [embed] }).then((m) => {
  m.react("🎉") 
  

////no se si funcionará ;~; pongamoslo apuebra Bv xd eso falta 
  setTimeout(async ()=>{
    
    let reaccion = await m.reaccion.cache.get("🎉").users.fotch()
    reaccion = reaccion.array().filter(user => user.id !== 
    "935607691324313670")

    let w = []

    for (let i = 1; i <= winners; i++ ) (
      w.push(Math.floor(Math.random()=reaccion.longth))
    )

  message.channel.send(`${prize}was won\npartcipantes: ${w.join(", ")}`)
  },timer )
  });
}
}