const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "buy",
  alias: [],

async  execute (client, message, args){

const opcion = args[0]

  let datos = await economia.findOne({ guildID: message.guild.id, userID: message.author.id })
if(!datos){
  let datosnuevos = new economia({
    guildID: message.guild.id,
    userID: message.author.id,
    dinero: 0,
    dinerobanco: 0
  })
  await datosnuevos.save()
  return message.reply("<a:charging:919033854398972004> Tus datos estan siendo guardados, vuelve a usar el comando")
}
let dinerototal = datos.dinero

if(opcion === 'Lechero'){

if(message.guild.id !== "702009979217117195") return message.reply("Para usar este comando necesitas entrar en mi servidor [oficial](https://discord.gg/bDcyYmv8Hw) ")
let user = message.member

if(dinerototal < 5000) return message.reply("No puedes comprar esto, no tienes sufriciente dinero")



let rolleche = ("<@&897947752170930207>")



const buyleche = new Discord.MessageEmbed()

.setTitle('Gracias por comprar el rol **lechero**')
.setDescription(`Compraste el rol <@&897947752170930207> por 5000<:PicaFresa:952777149234970677>\n\n Dinero restante: **${dinerototal - 5000}**<:PicaFresa:952777149234970677>`)
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())

user.roles.add("897947752170930207").catch((e) => message.reply('Ocurrio un **error**')).then(() => {
    message.channel.send({ embeds: [buyleche] })
  });

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - 5000 })


  }
if(opcion === 'Taquero'){

if(message.guild.id !== "702009979217117195") return message.reply("Para usar este comando necesitas entrar en mi servidor [oficial](https://discord.gg/bDcyYmv8Hw) ")
let user = message.member

if(dinerototal < 10000) return message.reply("No puedes comprar esto, no tienes sufriciente dinero")



let roltaquero = ("<@&897945089249255475>")



const buy100 = new Discord.MessageEmbed()

.setTitle('Gracias por comprar el rol **Taquero**')
.setDescription(`Compraste el rol <@&897945089249255475> por 10000<:PicaFresa:952777149234970677>\n\n Dinero restante: **${dinerototal - 10000}**<:PicaFresa:952777149234970677>`)
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())

user.roles.add("897945089249255475").catch((e) => message.reply('Ocurrio un **error**')).then(() => {
    message.channel.send({ embeds: [buy100] })
  });

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - 10000 })


  }
  if(opcion === 'Panadero'){

if(message.guild.id !== "702009979217117195") return message.reply("Para usar este comando necesitas entrar en mi servidor [oficial](https://discord.gg/bDcyYmv8Hw) ")
let user = message.member

if(dinerototal < 15000) return message.reply("No puedes comprar esto, no tienes sufriciente dinero")







const panadero = new Discord.MessageEmbed()

.setTitle('Gracias por comprar el rol **Panadero**')
.setDescription(`Compraste el rol <@&897948027577331712> por 15000<:PicaFresa:952777149234970677>\n\n Dinero restante: **${dinerototal - 15000}**<:PicaFresa:952777149234970677>`)
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())

user.roles.add("897948027577331712").catch((e) => message.reply('Ocurrio un **error**')).then(() => {
    message.channel.send({ embeds: [panadero] })
  });

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - 15000 })


  }
                          if(opcion === 'Ciclista'){

if(message.guild.id !== "702009979217117195") return message.reply("Para usar este comando necesitas entrar en mi servidor [oficial](https://discord.gg/bDcyYmv8Hw) ")
let user = message.member

if(dinerototal < 25000) return message.reply("No puedes comprar esto, no tienes sufriciente dinero")





const Ciclista = new Discord.MessageEmbed()

.setTitle('Gracias por comprar el rol **Ciclista**')
.setDescription(`Compraste el rol <@&897948506109644871> por 25000<:PicaFresa:952777149234970677>\n\n Dinero restante: **${dinerototal - 25000}**<:PicaFresa:952777149234970677>`)
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())

user.roles.add("897948506109644871").catch((e) => message.reply('Ocurrio un **error**')).then(() => {
    message.channel.send({ embeds: [Ciclista] })
  });

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - 25000 })


  }
                            if(opcion === 'Abogado'){

if(message.guild.id !== "702009979217117195") return message.reply("Para usar este comando necesitas entrar en mi servidor [oficial](https://discord.gg/bDcyYmv8Hw) ")
let user = message.member

if(dinerototal < 50000) return message.reply("No puedes comprar esto, no tienes sufriciente dinero")





const Abogado = new Discord.MessageEmbed()

.setTitle('Gracias por comprar el rol **Abogado**')
.setDescription(`Compraste el rol <@&897945369831419944> por 50000<:PicaFresa:952777149234970677>\n\n Dinero restante: **${dinerototal - 50000}**<:PicaFresa:952777149234970677>`)
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())

user.roles.add("897945369831419944").catch((e) => message.reply('Ocurrio un **error**')).then(() => {
    message.channel.send({ embeds: [Abogado] })
  });

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - 50000 })


  }
                             if(opcion === 'Doctor'){

if(message.guild.id !== "702009979217117195") return message.reply("Para usar este comando necesitas entrar en mi servidor [oficial](https://discord.gg/bDcyYmv8Hw) ")
let user = message.member

if(dinerototal < 75000) return message.reply("No puedes comprar esto, no tienes sufriciente dinero")





const Doctor = new Discord.MessageEmbed()

.setTitle('Gracias por comprar el rol **Doctor**')
.setDescription(`Compraste el rol <@&897946244750659654> por 75000<:PicaFresa:952777149234970677>\n\n Dinero restante: **${dinerototal - 75000}**<:PicaFresa:952777149234970677>`)
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())

user.roles.add("897946244750659654").catch((e) => message.reply('Ocurrio un **error**')).then(() => {
    message.channel.send({ embeds: [Doctor] })
  });

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - 75000 })


  }
                             if(opcion === 'Biologo'){

if(message.guild.id !== "702009979217117195") return message.reply("Para usar este comando necesitas entrar en mi servidor [oficial](https://discord.gg/bDcyYmv8Hw) ")
let user = message.member

if(dinerototal < 100000) return message.reply("No puedes comprar esto, no tienes sufriciente dinero")





const Biologo = new Discord.MessageEmbed()

.setTitle('Gracias por comprar el rol **Biologo**')
.setDescription(`Compraste el rol <@&897947532691374100> por 100000<:PicaFresa:952777149234970677>\n\n Dinero restante: **${dinerototal - 100000}**<:PicaFresa:952777149234970677>`)
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())

user.roles.add("897947532691374100").catch((e) => message.reply('Ocurrio un **error**')).then(() => {
    message.channel.send({ embeds: [Biologo] })
  });

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - 100000 })


  }
                             if(opcion === 'Comerciante'){

if(message.guild.id !== "702009979217117195") return message.reply("Para usar este comando necesitas entrar en mi servidor [oficial](https://discord.gg/bDcyYmv8Hw) ")
let user = message.member

if(dinerototal < 150000) return message.reply("No puedes comprar esto, no tienes sufriciente dinero")





const Comerciante = new Discord.MessageEmbed()

.setTitle('Gracias por comprar el rol **Comerciante**')
.setDescription(`Compraste el rol <@&897945570856042557> por 150000<:PicaFresa:952777149234970677>\n\n Dinero restante: **${dinerototal - 150000}**<:PicaFresa:952777149234970677>`)
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())

user.roles.add("897945570856042557").catch((e) => message.reply('Ocurrio un **error**')).then(() => {
    message.channel.send({ embeds: [Comerciante] })
  });

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - 150000 })


  }
                             if(opcion === 'VIP'){

if(message.guild.id !== "702009979217117195") return message.reply("Para usar este comando necesitas entrar en mi servidor [oficial](https://discord.gg/bDcyYmv8Hw) ")
let user = message.member

if(dinerototal < 800000) return message.reply("No puedes comprar esto, no tienes sufriciente dinero")





const VIP = new Discord.MessageEmbed()

.setTitle('Gracias por comprar el rol **VIP**')
.setDescription(`Compraste el rol <@&796802052327735357> por 800000<:PicaFresa:952777149234970677>\n\n Dinero restante: **${dinerototal - 800000}**<:PicaFresa:952777149234970677>`)
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())

user.roles.add("796802052327735357").catch((e) => message.reply('Ocurrio un **error**')).then(() => {
    message.channel.send({ embeds: [VIP] })
  });

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - 800000 })


  }
                                                         if(opcion === 'Millonario'){


let user = message.member

if(dinerototal < 1000000) return message.reply("No puedes comprar esto, no tienes sufriciente dinero")





const Millonario = new Discord.MessageEmbed()

.setTitle('Gracias por comprar el rol **Millonario**')
.setDescription(`Compraste el rol <@&897945895281258496> por 1000000<:PicaFresa:952777149234970677>\n\n Dinero restante: **${dinerototal - 1000000}**<:PicaFresa:952777149234970677>`)
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())

user.roles.add("897945895281258496").catch((e) => message.reply('Ocurrio un **error**')).then(() => {
    message.channel.send({ embeds: [Millonario] })
  });

await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - 1000000 })


  }
}
}