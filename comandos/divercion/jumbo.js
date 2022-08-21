const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });


module.exports = {
  name: "jumbo",
  alias: [],

async execute (client, message, args){

  if(!args[0]) return message.channel.send("Debes escribir un emoji")

  let emoji = message.guild.emojis.cache.find(x => x.name === args[0].split(":")[1])
  if(!emoji) return message.channel.send(`El emoji \`${args.join(" ")}\` No es valido o no lo encontre en el servidor`)

        const embed = new Discord.MessageEmbed()
        .setTitle("Emoji")
        .setImage(emoji.url)
        .setColor("RANDOM")
  message.channel.send({ embeds: [embed] })
  
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel("Descargar emoji")
            .setStyle("LINK")
            .setEmoji("<:image:980594211994865697>")
            .setURL(emoji.url)
            )
        message.channel.send({ components: [row] })
}
}