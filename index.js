// REST module to help us work with offical discord API endpoints
const { REST } = require("@discordjs/rest");
// A file reader module to let us read the contents of folders
const fs = require("fs");
// Import some important classes from discord.js
const { Client, Routes, GatewayIntentBits, Collection } = require("discord.js");
// Get our bot's token from our config file
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
// For every command:
for (const file of commandFiles) {
    // Import the data
    const command = require(`./commands/${file}`);
    // Add it to our map
    //  key: Name of the command (e.g. artid)
    //  value: Everything about the command (name, description, what to do when called)
    client.commands.set(command.data.name, command);
}

// Event setup
// Same as commands, we read the entire directory and add it to a variable
const eventFiles = fs.readdirSync("./events");
// For every event:
for (const file of eventFiles) {
    // Import the data
    const event = require(`./events/${file}`);
    // Register an event handler using the on() function (https://stackoverflow.com/q/17379050)
    // When the client gets an event of the name `event.name`
    //   we will execute the command with the proper parameters
    client.on(event.name, (...args) => event.execute(...args));
}

/*
 * Discord has 2 types of slash commands. Guild commands and Global Commands
 * Global commands will be usable across all servers, and guild commands will be
 * restricted to certain servers (useful for testing servers or maybe premium features).
 * 
 * While you will most likely want to create *global* commands, the way discord implements
 * their API makes it so that global commands are only updated around once a day. So for 
 * development/testing purposes, we should use *guild* commands and then switch it to 
 * global commands when we finally release the bot.
*/

// Slash command REST API setup
// MAKE SURE TO EDIT THESE VALUES
// The bot's ID
const CLIENT_ID = "1010008197257502740";
// The server's ID
const GUILD_ID = "595102402168750081";

// We create a REST API handler, and set it as a property on our client
// We need to tell discord what slash commands we have, and we do that by using
// their REST API. This helper module will handle things like authentication for us.
client.rest = new REST({ version: "10" }).setToken(token);

// We create a main function that runs when this file is run
// Make it asynchronous! Any time we interface with HTTP (e.g. REST API) we should be doing
// it async because we do not know how long it will take. 
const main = async () =>{
    // Handle an error
    try {
        // Perform a PUT on the guild command URL with our client/guild IDs as parameters
        // In our PUT body, we will spread in all of our commands
        await client.rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            // This line takes our map, extracts only our values, then takes only the data property
            body: [...client.commands.values()].map(x => x = x.data)
        });
    } catch (err) {
        console.error(err);
    }
    // Finally, let's log in as the bot
    client.login(token);
}

// Run the main function
main();