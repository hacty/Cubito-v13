const Discord = require('discord.js');
const logSchema = require(`${process.cwd()}/Schema/logs.js`);
module.exports = async (client, channel) => {
    let cl = await logSchema.findOne({ guildID: channel.guild.id })
    if (!cl) return;
    const entry = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(audit => audit.entries.first())
    let user = entry.executor;

    const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}` })
        .setColor("#f6ff00")
        .setDescription(`📘 **${channel.type}** Eliminado: <#${channel.id}>`)
        .addField(`Categoria`, `${channel.parent}`)
        .addField(`Nombre`, `${channel.name}`)
        .addField(`ID`, `\`\`\`ini\n Usuario = ${user.id}\n Canal = ${channel.id}\`\`\``)
        .setFooter({ text: `${client.user.username} Logger`, iconURL: `${client.user.displayAvatarURL()}` })
        .setTimestamp();

    client.channels.cache.get(cl.channelID).send({ embeds: [embed] }).catch((err) => console.log(err));
}