const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const warns = require('../../Schema/warns')

  
module.exports = {
  name: "warn", 
  alias: ["avisar"], 

async execute (client, message, args){

 if(!message.member.roles.cache.has('899032680748961842'))
   return message.channel.send("No tienes suficientes permisos crack!")
  
  let persona = message.mentions.users.first()
  if(!persona) return message.channel.send("Debes mencionar a alguien")

  var razon = args.slice(1).join(" ")
  if(!razon){
    razon = 'No especificado'
  }

    let guild = await warns.findOne({ Guild: message.guild.id, User: message.author.id })
     const warneos = new warns({
           Guild: message.guild.id, 
           User: message.author.id,
           warn: 0
        })
     let warnsnum = warneos.warn
    if(!guild){

        let one = 1 


        const saveGuildConfig = new warns({
           Guild: message.guild.id, 
           User: message.author.id,
           warn: warnsnum + Number(one)
        })

    

       saveGuildConfig.save((err, db) => {
           if(err) console.log(err)
           console.log("sabe", db);
       })  
    
    } else {

        let one = 1 
 
      await warns.updateOne({Guild: message.guild.id}, {User: message.author.id} , {warn: warnsnum + Number(one)})
    }

   const embed = new Discord.MessageEmbed()
      .setTitle(`<:warn:967609139377369138>Has sido advertido por el moderador ${message.member.displayName}<:warn:967609139377369138>`)
      .setColor("RED")
      .setDescription(`**Staff** \n${message.member}\n**Razon**\n${razon}\n**Usuario**\n${persona}`)
      .setThumbnail("https://images-ext-1.discordapp.net/external/pL3HmMhMmGrOmr1EQE7m3QPLNX2OE7K4IB0s37cMHXM/https/cdn.discordapp.com/icons/702009979217117195/d13c64007d029a6d55662ed8b92e24a2.png")

    //NOMBRE DEL BOT: client.user.username
    //AVALAR DE BOT: client.user.avatarURL()
    //NOMBRE DE USUARIO: message.member.displayName
    //AVATAR DE USUARIO: message.author.avatarURL()
    message.channel.send({ embeds: [embed] });

    const xd = new  Discord.MessageEmbed()
    .setTitle(`Has sido sido advertido en el servidor: **${message.guild.name}**`)
    .setDescription(`Staff: ${message.member}\nRazon: **${razon}**`)

  persona.send({ embeds: [xd] })


    
      }
} 