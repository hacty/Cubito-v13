const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const weather = require('weather-js')

module.exports = {
  name: "tiempo",
  alias: ["Tiempo", "Clima", "clima"],

  execute (client, message, args){

        if (!args[0]) {
            return message.reply('Debe ingresar una configuración regional para esto. Ejemplo: `!w tiempo méxico`')
        }
        weather.find({ search: args.join(' '), degreeType: 'C' }, function(err, result) {
            if (result[0] != undefined) {
                var current = result[0].current;
                var location = result[0].location;
                const tempEmbed = new Discord.MessageEmbed()
                    .setDescription(`**${current.skytext}**`)
                    .setAuthor({ name:`Clima actual en la region de: ${current.observationpoint}`, iconURL: ''})
                    .setThumbnail(current.imageUrl)
                    .setColor('#f6ff00')
                    .addField(`horario`, `UTC${location.timezone}`, true)
                    .addField(`Temperatura`, `${current.temperature} ${location.degreetype}º` , true)
                    .addField(`Sensación térmica`, `${current.feelslike} Cº`, true)
                    .addField(`Viento`, `${current.winddisplay}`, true)
                    .addField(`Humedad`, `${current.humidity}%`, true)
                    .addField("Fecha", current.day + " " + current.date, true)
                    message.channel.send({ embeds: [tempEmbed]})
            } else {
                message.reply({ content: ':x: | ¡Esta ubicación está fuera de mi alcance! Me disculpa.'})
            }
        })
  }

}
