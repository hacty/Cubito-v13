const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embe')
		.setDescription('mando lo que quieras que diga!')
    .addStringOption(option => option.setName('titulo').setDescription('Ingresa un titulo').setRequired(true))
    .addStringOption(option => 
option.setName('mensaje').setDescription('Ingresa un mensage').setRequired(true)), //mas opciones para poner, visita: https://guia.aguacate.ml/interacciones/respondiendo-a-comandos-de-barra.html#opciones-de-comando
	async execute(interaction) {
const tuki = interaction.options.getString('titulo');
const say = interaction.options.getString('mensage');
const awa = new MessageEmbed()
.setAuthor(`😳 | ${tuki}`, interaction.user.displayAvatarURL({dynamic:true}))
.addField(interaction.user.tag + ' Quiere decir algo!', `**${say}**`)
.setColor(`RANDOM`)
interaction.reply({ content: `${awa}` })/////;3

	},
};