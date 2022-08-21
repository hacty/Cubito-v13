const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const sugerencias = require("../../Schema/SugerenciasSchema")
const votosSchema = require("../../Schema/VotosSchema")

module.exports = {
  name: "sugerencia",
  alias: ["suggest"],
  
	async execute(client, message, args) {

    const contenido = args.join(" ")
    if(!contenido) return message.reply({ content: "Debes escribir una sugerencia!" })

    let data = await sugerencias.findOne({ guildId: message.guild.id, })

    if(!data) return message.reply({ content: "¡No hay un canal de sugerencias especificado en este servidor!" })

    const embed = new Discord.MessageEmbed()
    //.setAuthor({ name: `Sugerido por ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setTitle(`Nueva sugerencia!`)
    .setDescription(`Sugerido por: ${message.author}`)
    .addField("Sugerencia:", `${contenido}`)
    //.setDescription(`**Sugerencia**:\n${contenido}`)
    .setFooter({ text: `Hora` })
    .setTimestamp()
    .setColor("#f6ff00")

    let botones = new Discord.MessageActionRow().addComponents([

      new Discord.MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("✅").setCustomId("votar_si"),

      new Discord.MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("❌").setCustomId("votar_no"),

      new Discord.MessageButton().setStyle("PRIMARY").setLabel("¿Quién ha votado?").setEmoji("❓").setCustomId("ver_votos"),
    ])

    message.reply({ content: "¡Sugerencia mandada con exito!" })

    let m = await client.channels.cache.get(data.channelId).send({ embeds: [embed], components: [botones] })

    let data_msg = new votosSchema({
      messageId: m.id,
      author: message.author.id,
    })

    await data_msg.save()
	},
};
