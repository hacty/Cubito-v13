const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')//el nombre del slash (olbigatorio)
		.setDescription('Elige o mira tu avatar')//descripcion del slash (obligatorio)
		.addUserOption(option => option
            .setName('usuario')
            .setDescription('Nombre del usuario')
                        ),
	async execute(interaction) {

        const usua = interaction.options.getUser('usuario');


    let user = usua || interaction.author;

        let png = user.avatarURL({ format: 'png', dynamic: true, size: 1024 })
        let jpg = user.avatarURL({ format: 'jpg', dynamic: true, size: 1024 })
        let webp = user.avatarURL({ format: 'webp', dynamic: true, size: 1024 })


        const avatar = new MessageEmbed()
            .setTitle('Cubo Bot | Avatar')
            .setColor("#f6ff00")
            .setAuthor({ name: "Avatar de " + user.tag })
            .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
           // .setColor("RANDOM")

        interaction.reply({ embeds: [avatar], components: [new MessageActionRow().addComponents(
            [
                new MessageButton().setStyle("LINK").setEmoji("999190066813481011").setLabel("PNG").setURL(`${png}`),
                new MessageButton().setStyle("LINK").setEmoji("999190066813481011").setLabel("JPG").setURL(`${jpg}`),
                new MessageButton().setStyle("LINK").setEmoji("999190066813481011").setLabel("WEBP").setURL(`${webp}`),
            ]
        )]})


    
	},
};