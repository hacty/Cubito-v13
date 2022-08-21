const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const akinator = require("discord.js-akinator")

module.exports = {
  name: "aki",
  alias: [],

async execute (client, message, args){
const language = "es";
const childMode = "false";
const gameType = "character";
const useButtons = "true";
const embedColor = "#f6ff00"


        akinator(message, {
            language: language,
            childMode: childMode,
            gameType: gameType,
            useButtons: useButtons,
            embedColor: embedColor
  
})

}
}