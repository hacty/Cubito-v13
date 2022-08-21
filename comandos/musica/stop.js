const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const { getVoiceConnection } = require("@discordjs/voice");
const { queue } = require("../../global/music");
module.exports = {
  name: "stop",
  description: "Para y desconecta el bot de musica",
  async execute(client, message, args, discord) {
    const mvc = message.member.voice.channel.id;
    const pvc = getVoiceConnection(message.guild.id);

    if (!pvc) return message.reply("No se esta reproduciendo musica");

    if (mvc != pvc.joinConfig.channelId) {
      return message.reply("Tienes que estar en el mismo canal de voz");
    }

    const player = getVoiceConnection(message.guild.id).state.subscription
      .player;

    queue.delete(message.guild.id);

    player.stop();
    pvc.destroy();
  },
};
