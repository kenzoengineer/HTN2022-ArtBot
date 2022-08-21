const { REST } = require("@discordjs/rest");
const fs = require("fs");
const { Client, Routes, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("./config.json");

// client setup
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// command setup
client.commands = new Collection();
const initialCommands = [];
const commandFiles = fs.readdirSync("./commands");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    initialCommands.push(command.data);
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
            body: initialCommands
        });
    } catch (err) {
        console.error(err);
    }
    client.login(token);
}

main();