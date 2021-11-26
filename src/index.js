const { Client , Intents , Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: 32767});

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolder = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }

    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolder, "./src/commands");
    client.login(process.env.TOKEN);
})();

client.on('ready', () => {
    console.log('Status is ready!');
    client.user.setStatus('idle');
    let index = 0;
    setInterval(() => {
      const arrayOfStatus = [
        `${client.guilds.cache.size} servers`,
        `${client.channels.cache.size} channels`,
        `${client.users.cache.size} users`,
        ];
        if(index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        //console.log(status);
        client.user.setActivity(status, { type: "WATCHING"})
        index++;
    }, 5000);
})