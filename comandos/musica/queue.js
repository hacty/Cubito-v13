const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const { fullQueue } = require("../../global/music");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  name: "queue",
  description: "Ver lista de reproduccion",
  async execute(client, message, args, discord) {
    const pvc = getVoiceConnection(message.guild.id);
    if (!pvc) return message.reply("No se esta reproduciendo musica");

    const player = getVoiceConnection(message.guild.id).state.subscription
      .player;

    // console.log(player.state.resource.metadata.title);

    const songs = fullQueue(message.guild.id);

    const embed = {
      author: {
        name: "Cubo bot sound",
        icon_url:
          "https://images-ext-1.discordapp.net/external/EBZ0UYldbTce11ZF6Kst8U_ObB92iTJ3i9G1faoCfDI/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/903313861833277520/5160020ae1ccefeeaac1cec217c92444.webp",
      },
      title: "Lista de reproduccion",
      description: "Lista de reproduccion:\n\n" + songs.join(""),
      color: "RED",
    };

    message.reply({ embeds: [embed] });
  },
};