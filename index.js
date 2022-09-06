const { REST } = require("@discordjs/rest");
const fs = require("fs");
const { Client, Routes, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("./config.json");

// Client setup

// We need to configure to client to have certain permissions
// We need access to servers (guilds), access to the messages in servers (guilds),
// and finally the content of messages
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

/*
 * We want the ability to load commands and events dynamically. This will make adding and removing 
 * commands/events seamless. We do this by making separate folders, then use fs to read all the files.
 * After reading the files, we import ( require() ) the contents, save the commands and create the events
*/

// Command setup
// First we create a collection (map) to contain the commands. We save this as a property on our client
// so we can access it easier from other files
client.commands = new Collection();
// We load all the files in the ./commands directory
const commandFiles = fs.readdirSync("./commands");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// event setup
const eventFiles = fs.readdirSync("./events");
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args));
}

// slash command REST API setup
const CLIENT_ID = "1010008197257502740";
const GUILD_ID = "595102402168750081";
client.rest = new REST({ version: "10" }).setToken(token);

const main = async () =>{
    try {
        await client.rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: [...client.commands.values()].map(x => x = x.data)
        });
    } catch (err) {
        console.error(err);
    }
    client.login(token);
}

main();