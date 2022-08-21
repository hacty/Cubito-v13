const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const ms = require ('ms')
const mute = require('../../Schema/mute')

module.exports = {
  name: "mute",
  alias: [],

 async execute (client, message, args){

    var perms = message.member.permissions.has("MANAGE_ROLES")
    if(!perms) return message.channel.send("No tienes permisos de administrador")

    let mencionado = message.mentions.members.first()
    if(!mencionado) return message.channel.send("Debes mencionar a alguien!")

    let time = args[1]
    if(!time) return message.channel.send("Debes decidir un tiempo!")
    let timer = ms(time)

    var razon = args.slice(2).join(" ")
    if(!razon){
      razon = 'No especificado'
    }
     console.log("4 esta bien hasta aca")

    let rol;

    const data = await mute.findOne({ Guild : message.guild.id })
    .catch(err => console.log(err))

    if(data) {
        rol = data.Rol;
    } 
 

    console.log("2 esta bien hasta aca")


    mencionado.roles.add(rol)

     console.log("1 esta bien hasta aca")

    mencionado.send(`Te han muteado en el servidor: **${message.guild.name}**\nStaff\n**${message.member.displayName}**\nRazon\n **${razon}**\n\n`)

    const embed = new Discord.MessageEmbed()
      .setTitle(`<:warn:967609139377369138>Has sido muteado por el moderador ${message.member.displayName}<:warn:967609139377369138>`)
      .setColor("RED")
      .setDescription(`**Staff** \n${message.member.displayName}\n**Razon**\n${razon}\n**Usuario**\n${mencionado}\n**Tiempo**\n${time}`)
      .setThumbnail("https://images-ext-1.discordapp.net/external/pL3HmMhMmGrOmr1EQE7m3QPLNX2OE7K4IB0s37cMHXM/https/cdn.discordapp.com/icons/702009979217117195/d13c64007d029a6d55662ed8b92e24a2.png")

    //NOMBRE DEL BOT: client.user.username
    //AVALAR DE BOT: client.user.avatarURL()
    //NOMBRE DE USUARIO: message.member.displayName
    //AVATAR DE USUARIO: message.author.avatarURL()
    message.channel.send({embeds: [embed]});

console.log("3 esta bien hasta aca")

    await setTimeout(async function(){
      await mencionado.roles.remove(rol)
      await mencionado.send(`Se te a acabado el mute, Recuerda seguir las reglas`)
      await message.channel.send(`Se te a acabado el mute,${mencionado} Recuerda seguir las reglas`)
      .catch(error => {
        message.channel.send(`Hubo un error inesperado! **${error}**`)
      })

    }, timer)




  }

}