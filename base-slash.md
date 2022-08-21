# Con esto podras hacer un comando de slash (base)

```js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('')//el nombre del slash (olbigatorio)
		.setDescription(''),//descripcion del slash (obligatorio)
	async execute(interaction) {

/*
aqui no se usas message, args o alguna otra cosa, aqui se usa "interaction"

ejemplo: funciones de usuario: interaction.user, interaction.user.id. interaction.user.tag, interaction.user.username, interaction.user.displayAvatarURl(), etc...
ejemplo del cliente: interaction.client.user, interaction.client.user.id, interaction.client.user.tag, interaction.client.user.displayAvatarURl(), etc...
*/
	},
};
```