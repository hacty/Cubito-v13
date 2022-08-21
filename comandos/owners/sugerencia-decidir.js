const Discord = require("discord.js")
const sug = require(`../../Schema/SugerenciasSchema`)

module.exports = {
  name: "sugerencia-decidir",
  alias: ["decidir-sugerencia", "sugerenciadecidir"],

async execute(client, message, args) {

 /* if(!message.member.permissions.has("ADMINISTRATOR"))
    return message.reply({ content: `No puedes hacer esto` })*/

  const decision = args[0]
  if(!decision) return message.reply({ content: `Debes escribir la decesion\n\`aceptar\` \`denegar\`` })
//  const comentario = args[1]//args.slice(1).join(" ");//args[1]
//  if(!comentario) return message.reply({ content: `Debes escribir un comentario` })

    let Options = ["aceptar", "denegar"]

  if(!Options.includes(args[0].toLowerCase())) return message.channel.send(":x: Opcion incorrecta!")
  
  const id = args[1]
  if(!id) return message.reply({ content: `Debes escribir la id de el mensaje de la sugerencia` })
  let comentario = args.slice(2).join(" ")//args.slice(1).join(" ");//args[1]
  if(!comentario) return message.reply({ content: `Debes escribir un comentario` })

  let data = await sug.findOne({ guildId: message.guild.id })
  if(!data) return message.reply({ content: "No hay un canal de sugerencias en este servidor." })

    try {

      let mensaje = await message.guild.channels.cache.get(`${data.channelId}`).messages.fetch(`${id}`)

      if(decision === "aceptar"){

        if(mensaje.author.id !== client.user.id) return message.reply({ content: "¡No especificaste una id valida!", ephemeral: true })
        mensaje.embeds[0].setColor("GREEN")
        
        mensaje.embeds[0].addField(`✅ Sugerencia aceptada por ${message.author.tag}`, `${comentario}`)

        mensaje.components[0].components[0].setDisabled(true)
        mensaje.components[0].components[1].setDisabled(true)

        await mensaje.edit({ embeds: [mensaje.embeds[0]], components: [mensaje.components[0]] })

        message.reply({ content: "¡Sugerencia aceptada con exito!", ephemeral: true })
      }

       if(decision === "denegar"){

        if(mensaje.author.id !== client.user.id) return message.reply({ content: "¡No especificaste una id valida!", ephemeral: true })
        mensaje.embeds[0].setColor("RED")
        
        mensaje.embeds[0].addField(`❌ Sugerencia rechazada por ${message.author.tag}`, `${comentario}`)

        mensaje.components[0].components[0].setDisabled(true)
        mensaje.components[0].components[1].setDisabled(true)

        await mensaje.edit({ embeds: [mensaje.embeds[0]], components: [mensaje.components[0]] })

        message.reply({ content: "¡Sugerencia rechaza con exito!", ephemeral: true })
      }
    } catch(e){
      return message.reply(`${e}`)
      //return message.reply({ content: "Ocurrió un error. Puede que no hayas introducido una id válida." })
    }
}
}