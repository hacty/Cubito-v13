const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed, Intents, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')//el nombre del slash (olbigatorio)
		.setDescription('Mi ping :D.'),//descripcion del slash (obligatorio)
	async execute(interaction) {

    const ping = new MessageEmbed()
.setAuthor(`¡Mi ping!`)
.setDescription("**🤖 `|` Bot**: "+ Math.floor(interaction.createdTimestamp - Date.now()) +"\n**🏐 `|` Api**: " + client.ws.ping)
.setColor('D978BC')
interaction.reply({ embeds: [ping] })
	},
};


