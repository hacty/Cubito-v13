const { readdirSync } = require("fs");
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.js');


const ascii = require("ascii-table");


let table = new ascii("Commands");
table.setHeading("Command", "Load status");
const slashes = [];


const slashFolders = fs.readdirSync('./slashes');
for (const folder of slashFolders) {
const slashFiles = fs.readdirSync(`./slashes/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of slashFiles) {
		const command = require(`./slashes/${folder}/${file}`);
  slashes.push(command.data.toJSON())
}
}






const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
    console.log('Empezando a actuliazar comandos de barra.');
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: slashes },
		);

		console.log('Comandos de barra listos!');
	} catch (error) {
		console.error(error);
	}
})();