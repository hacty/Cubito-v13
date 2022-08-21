const Discord = require('discord.js');
const logSchema = require(`${process.cwd()}/Schema/logs.js`);

module.exports = async (client, oldMessage, newMessage) => {
    if(newMessage.author.bot) return;
    if(oldMessage.content === newMessage.content) return;

    let cl = await logSchema.findOne({guildID: newMessage.guild.id})
    if(!cl) return;
    const cuenta = 1950;
    const Original = oldMessage.content.slice(0, cuenta) + (oldMessage.content.length > 1950 ? " ..." : "");
    const Editado = newMessage.content.slice(0, cuenta) + (newMessage.content.length > 1950 ? " ..." : "");

    const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `${newMessage.author.tag}`, iconURL: `${newMessage.member.displayAvatarURL()}` })
        .setColor("#f6ff00")
        .setDescription(`📘 **${newMessage.author.tag}** Edito su mensaje en: ${newMessage.channel.name}.`)
        .addField(`Canal`, `${newMessage.channel}\n[Ir al Mensage](${newMessage.url})`)
        .addField(`Actual`, `${Editado}`)
        .addField(`Previo`, `${Original}`)
        .addField(`ID`, `\`\`\`ini\n Usuario = ${newMessage.author.id}\n Mensage = ${newMessage.id}\`\`\``)
        .setFooter({ text: `${client.user.username} Logger`, iconURL: `${client.user.displayAvatarURL()}` })
        .setTimestamp();

    client.channels.cache.get(cl.channelID).send({ embeds: [embed] }).catch((err) => console.log(err));
}