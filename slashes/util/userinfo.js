const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')//el nombre del slash (olbigatorio)
		.setDescription('Elige o mira la informacion de un usuario')//descripcion del slash (obligatorio)
		.addUserOption(option => option
            .setName('usuario')
            .setDescription('Nombre del usuario')
                        ),
	async execute(interaction) {

        const usua = interaction.options.getUser('usuario');


   
    
	},
};