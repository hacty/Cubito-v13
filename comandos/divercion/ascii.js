const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const figlet = require("figlet")

module.exports = {
  name: "ascii",
  alias: [],

async execute (client, message, args){
  
 let text = args.join(" ");
 if (!text) return message.channel.send("Pon un texto al ascii");
 if (text.length > 25) return message.channel.send("El ascii no puede tener mas de 25 palabras");
 if (text.length < 2) return message.channel.send("El ascii debe de contener más de 2 palabras.");
          figlet.text(args.join(" "), {
              font: "",
          }, async(err, data) => {
              message.channel.send(`\`\`\`${data}\`\`\``)
          });

}
}