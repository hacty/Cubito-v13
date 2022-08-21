 const p = await client.prefix(message)

 if (!message.content.startsWith(p)) return;  //////SI NO USA ESE PREFIJO, NO RESPONDER
  if (message.author.bot) return;   //////NO BUCLE, NO RESPONDER A SI MISMO
  let usuario = message.mentions.members.first() ||  message.member; ////SE DEFINE USUARIO
  const args = message.content.slice(p.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let cmd = client. commands.find((c) => c.name === command ||  c.alias && c.alias.includes(command));
  if(cmd){
    cmd.execute(client, message, args)
  }
if(!cmd){

    if(message.content === p) return
  
  const embed = new MessageEmbed()

  .setDescription(`Error 404\n\nEl comando ${command} no existe\n\n Ve mis comandos con ${p}help <:okey:912749462345093160>`)
  .setColor("RED")

  message.channel.send({ embeds: [embed]})
}

module.exports;