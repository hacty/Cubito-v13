const Discord = require('discord.js');
const setupSchema = require(`${process.cwd()}/modelos/setups.js`);

module.exports = {
    name: "setup-welcome",
    alias: ["bienvenida-setup", "setup-bienvenidas", "setup-welcomes"],
   async execute(client, message, args){
        let uso = `\n**Uso:** \`setup-welcome <CANAL> <IMAGEN> <Texto de Bienvenida>\``
        if(!args.length) return message.reply("❌ **Tienes que especificar el canal de sugerencias!**" + uso)
        const channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();
        if(!channel || channel.type !== "GUILD_TEXT") return message.reply("❌ **El canal de bienvenida que has mencionado no existe o no es un   canal válido!**"+ uso);
        if(!args[1]) return message.reply(`❌ **No has mencionado una imagen de bienvenida!**\nAsegúrate que sea una imagen https valida de imgur!\n*https://imgur.com/upload*`);
        if(!args[2]) return message.reply(`❌ **No has especificado un mensaje de bienvenida válido!**${uso}`)
        await setupSchema.findOneAndUpdate({guildID: message.guild.id}, {
            bienvenida: {
                canal: channel.id,
                imagen: args[1],
                mensaje: args.slice(2).join(" "),
            }
        })
        return message.reply({
            embeds: [new Discord.MessageEmbed()
            .setTitle(`✅ Establecido el canal de bienvenidas a \`${channel.name}\``)
            .setDescription(`*Cada vez que una persona se una al servidor, enviaré en ${channel} su bienvenida!*`)
            .setColor(client.color)
            ]
        })
    }
}