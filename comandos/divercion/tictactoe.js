const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });


module.exports = {
    name: 'ttt',
    category:"info",
    description: 'Make a ttt',
    usage: 'calculator',
    timeout: "2000",
async execute (client, message, args){
const simplydjs = require('simply-djs')

// message event
// tictactoe command
simplydjs.tictactoe(message)
}
}