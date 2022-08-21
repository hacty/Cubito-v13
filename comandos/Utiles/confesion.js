const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const confesiones = require("../../Schema/ConfesionesSchema")

module.exports = {
  name: "confesion",
  alias: ["confession"],
  
	async execute(client, message, args) {
    message.delete()

    let prv = args[0]
    if(!prv) return message.reply({ content: `Debes indicar si la confesion sera privada o no\n \`false\` \`true\`` }).then(msg => {
            setTimeout(() => msg.delete(), 4000)
})

  let Options = ["false", "true"]

  if(!Options.includes(args[0].toLowerCase())) return message.channel.send(":x: Opcion incorrecta!")

    
  let con = args.slice(1).join(" ")
  if(!con) return message.reply({ content: `Debes escribir un comentario` }).then(msg => {
            setTimeout(() => msg.delete(), 4000)
})

    let data = await confesiones.findOne({ guildId: message.guild.id, })

    if(!data) return message.reply({ content: "¡No hay un canal de confesiones especificado en el servidor!", ephemeral: true })
    
    if(prv === "false"){
      let prvf = new MessageEmbed()
      //.setAuthor({ name: `Confesion de ${message.author.tag}`/*, iconURL: message.user.displayAvatarURL({ dynamic: true }) */})
      .setTitle(`Nueva confesion!`)
      .setDescription(`Confesion por: ${message.author}`)
      //.setDescription(con)
      .addField("Confesion:", `${con}`)
      .setTimestamp()
      .setColor("#f6ff00")
      
      message.channel.send({ embeds: 
        [new MessageEmbed()
         .setDescription(`Su confesion se ha enviado a <#${data.channelId}>.`)
         .setColor("#f6ff00")], ephemeral: true })

      var publico = await client.channels.cache.get(data.channelId).send({ embeds: [prvf] })
     publico.react("🤫");
    } else if(prv === "true"){
      let prvt = new MessageEmbed()
      .setTitle("Nueva confesion anónima!")
      .setDescription(`Confesion por: ???`)
      .addField("Confesion:", `${con}`)
      //.setDescription(con)
      .setColor("#f6ff00")
      .setTimestamp()
       
      message.channel.send({ embeds: 
        [new MessageEmbed()
         .setDescription(`Su confesion se ha enviado a <#${data.channelId}>.`)
         .setColor("#f6ff00")], ephemeral: true })

       var anonimo = await client.channels.cache.get(data.channelId).send({ embeds: [prvt] })
       anonimo.react("🤫");
    }

	}
}
