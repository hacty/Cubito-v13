const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const { Calculator } = require('weky');

module.exports = {
  name: "math",
  alias: ["calculadora"],

async execute (client, message, args){
  
    await Calculator({
            message: message,
            embed: {
                title: 'Calculadora',
                color: "BLUE",
        footer: message.guild.name,
                timestamp: false,
            },
            disabledQuery: 'La calculadora se ha desactivado!',
            invalidQuery: 'La ecuación no es válida!',
            othersMessage: 'Solo <@{{author}}> puede usar los botones!',
        });

}
}