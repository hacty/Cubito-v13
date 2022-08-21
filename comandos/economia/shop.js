const Discord = require('discord.js')
const { Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "shop",
  alias: [],

async  execute (client, message, args){


  const embedshop = new Discord.MessageEmbed()

  .setTitle('SoyCubo Store')
  .setDescription("Para comprar usa el comando `buy <name>`")
  .addField('<:PicaFresa:952777149234970677>5,000 - Lechero', 'Lechero: Oficio antiguo de los repartidores de leche, así como de los encargados de su venta.')
    .addField('<:PicaFresa:952777149234970677>10,000 - Taquero', 'Taquero: Persona que prepara o vende tacos')
    .addField('<:PicaFresa:952777149234970677>15,000 - Panadero', 'El panadero con el pan, el panadero con el pan, el panadero con el pan, el panadero con el pan.')
      .addField('<:PicaFresa:952777149234970677>25,000 - Ciclista', 'Ciclista: Persona que monta en bicicleta o que practica el ciclismo.')
      .addField('<:PicaFresa:952777149234970677>50,000 - Abogado', 'Abogado: Persona legalmente autorizada para asesorar y defender los derechos e intereses de otra persona en materia jurídica y representarla en un pleito.')
      .addField('<:PicaFresa:952777149234970677>75,000 - Doctor', 'Doctor: Persona que se dedica a curar o prevenir las enfermedades.')
        .addField('<:PicaFresa:952777149234970677>100,000 - Biólogo', 'Biólogo: Se dedica a estudiar los organismos vivos, bien sea animales, plantas y el resto del mundo que les rodea.')
        .addField('<:PicaFresa:952777149234970677>150,000 - Comerciante', '.')
        .addField('<:PicaFresa:952777149234970677>800,000 - VIP', 'VIP: (Very Important Person), traducido al Español ¨Persona Muy Importante¨. Tendra acceso a canales privados y le estara dando dinero el rol.')
        .addField('<:PicaFresa:952777149234970677>1,000,000 - Millonario', 'Millonario...')
.setColor('BLUE')

  message.channel.send({ embeds: [embedshop] })

}
}