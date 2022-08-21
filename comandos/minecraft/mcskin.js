const Discord = require("discord.js");
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('megadb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });


module.exports = {
  name: "mcskin",
  alias: [],

async execute (client, message, args){



const request = require("request"); //npm i request
const nombre = args.join(" ");
if (!nombre) {
    let e = new MessageEmbed();
    e.setColor("#f6ff00");
    e.setDescription("Necesitast ingresar el nombre de un jugador premium!");
    return message.channel.send({ embeds: [e] });
}
if (nombre.length > 16) {
    let e = new MessageEmbed();
    e.setColor("#f6ff00");
    e.setDescription("Los nombres de los jugadores de minecraft no contienen mas de 16 caracteres.");
    return message.channel.send({ embeds: [e] });
}
let mojang_player_api = `https://api.mojang.com/users/profiles/minecraft/${nombre}`;
request(mojang_player_api, function(err, resp, body) {
    if (err) {
        let e = new MessageEmbed();
        e.setColor("#f6ff00");
        e.setDescription(`El usuario **${nombre}** no es un jugador premium!`);
        return message.channel.send({ embeds: [e] });
    }
    try {
        body = JSON.parse(body);
        let player_id = nombre;
        let render = `https://mc-heads.net/body/${nombre}/128.png`;
        let skin = `https://crafatar.com/skins/${nombre}.png`;
        let avatar = `https://mc-heads.net/avatar/${nombre}.png`;
        let embed = new MessageEmbed();
        embed.setColor("#f6ff00");
        embed.setDescription(`[Skin del jugador ${nombre}](${skin})`);
        embed.setImage(render);
        embed.setThumbnail(avatar);
        return message.channel.send({ embeds: [embed] });
    } catch (err) {
        let embed_error = new MessageEmbed();
        embed_error.setColor("#f6ff00");
        embed_error.setDescription(`El usuario **${nombre}** no es un jugador premium!`);
        return message.channel.send({ embeds: [embed_error] });
    }
});
}
}