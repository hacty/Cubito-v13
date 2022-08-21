const mongoose = require("mongoose");
const logsSchema = require(`${process.cwd()}/Schema/logs.js`);
const Discord = require('discord.js');

module.exports = {
  name: "setlogs",
  alias: ["setuplogs", "logs-setup", "logs", "establecerlogs", "setup-logs"],

async execute(client, message, args, prefix) {

          let channel = message.mentions.channels.first()
        if (!channel) {
            return message.channel.send('**Debes mencionar un canal del servidor.**')
        }
        let establecer = await logsSchema.findOne({ guildID: message.guild.id }).exec()
        if (establecer) {
            await establecer.updateOne({ guildID: message.guild.id, channelID: channel.id })
            message.channel.send(':white_check_mark: **|** El Canal logs es <#' + channel.id + '>.')
        } else {
            let establecido = new logsSchema({ guildID: message.guild.id, channelID: channel.id })
            await establecido.save()
            message.channel.send(':white_check_mark: **|** El Canal de logs es <#' + channel.id + '>.')
        }
        let ewe = await logsSchema.findOne({ guildID: message.guild.id })
        if (!ewe) {
            return message.channel.send('No hay ningun canal configurado.')
        }
        let channel2 = message.guild.channels.cache.get(ewe.channelID)
        channel2.send(":white_check_mark: **|** Este es el nuevo canal de logs.")
  
}
}