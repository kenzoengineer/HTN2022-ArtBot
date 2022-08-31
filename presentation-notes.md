# For those viewing this file on github
These are the notes I used to give my workshop, its a mix of complete sentences and pointform notes. If you missed something in the workshop, you might be able to find info about it here.


# Slide 1

- Workshop is about Discord Bots, using Discord.js
  - JS experience is not needed, but would of course be very helpful
- During all of this, we will touch on APIs and backend

# Slide 2

- First some introductions:
- 2B CE @ UW
- I like to draw, play video games and I'm a big fan of tech

# Slide 3

## Introduction:
- What are discord bots?
- Motivating factors: What you have to gain from this workshop, and why you should care

## Creating:
- Instantiate the application in the *Discord Developer Portal*
- Token, configure permissions, and the rest of the setup
- Where I will introduce the idea behind the bot we create today
- MAINLY SETUP

## Designing:
- When we will actually start coding, I will code the bot live for everyone
- I'll go through creating all the files and installing all the packages

## Deploying:
- There are many ways to deploy applications, let alone a discord bot
- I will go over some of the common ones:
  - Repl.it and AWS EC2

## Conclusion:
- Summarize everything, and leave room for questions

# Slide 4/5

- To summarize discord bots in one sentence:
  - Discord bots are assistants
  - They allow you to automate tasks that may be difficult, tedious or annoying
- If you are in a couple of discord servers, chances are you have seen a discord bot

# Slide 6

- Bots can moderate
  - Perform authentication/verification
  - Delete messages
  - Kick/Ban users

- Bots can play music
  - Simple and free way to listen to music with your friends

- Help out 
  - Perform other miscellaneous tasks
  - Giveaways for your community
  - Display the latest patch notes for your favorite video game
  - Bots can even be games, with currency systems, levels and game play

# Slide 7

- Really though, discord bots can do anything 
- This leads to my first motivating factor for learning about discord bots and that is it can be a great side project
- First reason for that: **Because bots can do anything, you have a lot of freedom, and with freedom comes passion**
  - By doing something that actually interests you, you can be motivated to finish and work hard on it
  - It will also be something you are excited about and will want to show people: Such as your interviewer for your internship
- Another reason is that **Discord bots are visual**
  - A philosophy I stand by is that people prefer visual things
  - Things will interest people if they can see things going on, think about sorting algorithms visualizations, or making an app
  - The great thing for us is Discord did most of the work for us, in creating a front end. 

# Slide 8
- Side projects are a great way to impress someone, but at the core the main motivation behind side projects is to learn
- Don't assume learning something like discord bots is niche and you won't apply this knowledge elsewhere
- At the core, discord bots are basically back ends
  - They are apps which receive information, transform it and send it back to our interface. 
  - Discord bots were my first exposure into node and apis and I learned a lot creating my first bot
- On the topic of APIs, we learn about how to interface with APIs and use the data they send
  - We will be dealing with JSON, but other APIs may send data back in XML
  - Your discord bot can take advantage of these universal data languages to send and receive data easily
  - If you don't know what APIs or JSON are, I will explain them from a beginner level when I program my bot
- Finally we are coding in javascript and using node
  - So of course we are getting practice in these technologies
  - Writing good code
  - Below is an example of a line of code from my first discord bot, happy to say that I have improved since then and no longer write code that looks like that

# Slide 9 

- Now that we've got the introduction sorted out, lets get started creating the bot

# Slide 10

- Now is a good time to intro what we are building today
- The Art Institute of Chicago has a public API which lets us access data about their artworks, artists, departments and a couple more things
- I am going to use this API to create a bot which displays art either randomly, by id or by a search query
- (look at image)

# Open the developer portal

- So, lets create our bot then
- Open up the discord developer portal, we're gonna have 4 tabs
   - First tab is applications, this is where your bots will be and the tab we care about
   - Teams lets you work on applications with other people
   - Final tab has the documentation for the offical discord API
     - You won't need to refer to this that often, because we will be using discord.js, an API that works on top of the discord api, but it could still be useful
- Lets go back to the applications tab
  - Start off by clicking **New Application**
  - Make a name for it, and just like that our application has been created
  - Right now its not a bot yet, you can use applications to create rich presence (the status things e.g. spotify games etc) or authentication (Log in with discord)
    - We want a bot however


- So lets click the bot tab and click **Add Bot**
  - Can make a name, give image

### Privileged Gateway Intents
- Sounds complicated, but its a form of permission
  - We need to turn on Message content intent
  - Save changes
- Go to OAuth2
  - **APPLICATION.COMMANDS** AND **BOT**
  - Select some permissions [send messages, use slash commands]
  - copy paste it
  - And there you go, the bot is added to your server
- It doesn't do anything yet, however, because we haven't told it what to do
- 
# Slide 11

- So the next part is, the part where we tell it to do something
- As with every good project, the first step of coding is to not code
  - And by that I mean it is to plan.

# Slide 12

- So here is how the data flow and be processed by our bot
- We start off with the user inputting data in discord
  - They will use one of these 3 commands
- Our bot will then see we typed this command and then get some data from the ARTIC API
  - For the random search, it will get a random artwork ID from the list of all artworks
    - The reason why we shouldn't just generate a random number using `Math.rand` or something similar is because theres no guarantee that every ID between 1 and 11 thousand whatever will be a valid artwork. They could have skipped numbers for any number of reasons, so we want to actually poll the API
  - For the query search, we use the APIs built in search function and get the ID of the artwork.
- After both of these we are left with an ID which feed back into the API to give us the full data we want
- We then output this to the user

# Slide 13
- All this talk about APIs, what is an API anyways? 
- API stands for Application Programming Interface
- APIs serve as middlemen who let two software applications communicate with eachother
- In other words, it lets Applications Interface with eachother (Programatically) 

# Slide 14

- My go-to analogy for APIs is a resturant
  - You are seated at a resturant and want to order something
  - The kitchen is waiting for orders in order to make food and let it be served
  - However, you cannot directly go get the food, and the kitchen doesn't know what you want to order
  - Thus we have an intermediary, the waiter/waitress to serve as the connection between you and the kitchen
  - The waiter/waitress takes your order, gives it to the kitchen, the kitchen makes your food and the waiter/waitress brings it back to you
- In this case
  - You are the client, the person asking for and receiving the data
  - The kitchen is like the servers where the data is stored
  - The waiter/waitress is the API, talking between the two
- So we can apply this to the 2 APIs we will be using
  - Discord.js is an API that connects discord with our bot
  - The ARTIC API connects the ARTIC servers with our bot

# Slide 15

- We can now setup our bot, I will be coding this live so feel free to follow along
  - Remember you will need node (16.9.0+)
  - I will be using VSCode
  - We will have to install some packages
    - `npm install discord.js @discordjs/rest undici nodemon`

# Slide 16
- First, we will do some file structure setup
- We will create these 9 files
  - These two in the root directory, the other seven in their respective folders 

# Open VSCode
### Root

- `config.json`
  - This is where we will put our bot token, which is like a password for the bot
- `index.js`
  - This is the main bot file, where we log in and set everything up

### Events
- Discord.js follows an event based architecture. This means the bot only does something when an event happens. Just like you only light fireworks when there is an event, the bot only wakes up when it recieves an event. We have two events
- `ready.js`
  - The "ready" event is emitted when the api and everything in the background has finished loading, and is thus ready to recieve commands
- `interactionCreate.js`
  - The "interactionCreate" event is emitted when a user interacts with the bot. One example of an interaction is a slash command, which is what we want to capture
### Commands
- Speaking of commands, we have 3 commands we want to implement
- `artid.js`
- `artrandom.js`
- `artsearch.js`

- By putting events and commands in their own folders we can dynamically add and remove events very easily, and you will see how soon

### Utils
- Finally we have a utility file that connects to the api with an id, retrives an art piece and formats it so it looks nice. All the commands will take advantage of this file 
- `artEmbed.js`

To start off, lets complete our `config.json`
- We need to get a token, a token is a like a password that lets discord which bot are are
  - It is really important to keep this token secret, because anyone with this token can be your bot and do nasty things on behalf of you
  - So going back to the discord developer portal, we want to click reset and then copy the token
  - Then let's open `config.json` and create a new json object with it
    - JSON is file format that uses plain text to store and sned data which is universally readable
    - Our APIs will also send data back in JSON format because it is widely readable

- So with our token stored, let's import some packages into our `index.js`

```js
// this will be used for slash commands later
const { REST } = require("@discordjs/rest");
// this is a file reading package, we will use this for commands/events
const fs = require("fs");
// these are various packages needed for discord.js
const { Client, Routes, GatewayIntentBits, Collection } = require("discord.js");
// this is the token we are importing
const { token } = require("./config.json");
```

In case the object destructuring notation is new to you, 
```js
const { x } = myObject;
// is the same as
const x = myObject.x;

const {a, b} = myObject;
// is the same as
const a = myObject.a;
const b = myObject.b;
```

We create a client, which is another word for our bot.
Then we have to set what intents, or permissions it has access to. In this case, we need Guilds, GuildMessages, MessageContent. Discord.js calls servers Guilds.

Then we login.
```js
// client setup
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.login(token);
```

Now we can see the bot goes online!

Remember that our bot needs to be able to respond to events, and it also needs a list of commands to respond to. Thus, we want a way to dynamically add and remove events and commands, with very little change to the code.

The way discord.js recommends we do this is by putting all events/commands in one folder - like we did - and then use fs to read the files.

So the `fs` module means "file system", and we will use it to read the event folder and the commands folder. Then for each file, we will add their code to our list of commands and events

## Commands
First lets do commands
- Our command will have two parts
  - `data:` Which is information about the command, such as its name, description, what parameters it has
    - Things that aren't really code/logic, but mainly identifying properties
  - `Function` Then we need a function to execute when our command is called
    - This will be the part where we bring up an artwork and then display it to the user

HOW WE WILL READ IT
```js
// we give our bot a new property called "commands" and make it a COLLECTION a collection is a utility class given to us by discord.js, its the same thing as a map or dictionary but with some extra features
client.commands = new Collection();
// then we read directory "synchronously" of .commands to get all the files
const commandFiles = fs.readdirSync("./commands");
// for every file in the directory
for (const file of commandFiles) {
    // we read the data with require() function
    const command = require(`./commands/${file}`);
    // add it to our collection. Key: it's name, Value: the command itself
    client.commands.set(command.data.name, command);
}
```

so now `client.commands` has a map of commands, ready to be read when an event happens.

Speaking of events, lets see how events are coded in discord.js

```js
// events are created in this format, with a string paramter and a function parameter
client.on(string, Function);
// the string is the name of the event, and the callback is what we want it to do when the event is called
client.on(eventName, callback);
// here is an example
client.on("ready", (client) => {
  console.log("Hello! I am " + client.user.tag);
});
```

So our event will have 2 parts as well:
- `name:` is the name of the event
- `Function` the function to exectute when the event happens

## IN READY.js and INTERACTIONCREATE.js
- So we need an event name, and a function to execute
```js
module.exports = {
    name: "ready",
    execute(client) {
        console.log(`Ready! ${client.user.tag}`);
        client.user.setActivity("/art...");
    }  
};
```

```js
module.exports = {
    // get its name
    name: "interactionCreate",
    // run this function
    async execute(interaction) {
        // if its not a slash command, we dont care
        if (!interaction.isChatInputCommand()) return;
        // equiv to: interaction.client.commands["interaction.commandName"];
        const command = interaction.client.commands.get(interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction);
            } catch (err) {
                console.log(err);
                await interaction.reply({content: "Error: Could not execute command", ephemeral: true});
            }
        }
    }
}
```

```js
// event setup
const eventFiles = fs.readdirSync("./events");
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args));
}
```

If we save now, the bot should log in!

1. We don't have any commands yet
2. Discord wouldn't know anyways because of the fun way they implemented slash commands which is a little strange but not that complicated

- There are two types of commands. Guild commands and Global commands
  - Guild commands are restricted to specific servers. You can use this if you had to pay for some features for your bot, for example
  - Global commands are available for all servers, including your bots dms
- The thing is though, for testing and development purposes, we want to make all our commands **guild commands** right now. This is because we need to send the list of commands to discord, and discord only updates global commands once a day or something like that. Guild commands are updated instantly, however, so thats great for development.

The way we send a command to discord is through a REST API. A REST API is an API that follows a certain standard. What you need to know is that REST APIs send data through URLs called endpoints. Just like we use URLs to access sites like youtube and linked, REST APIs send and recieve data through URLs called endpoints.

The way we differentiate between sending and recieving data is through a **VERB**. There are a couple REST verbs, but we care about only one right now: **PUT**. We will be "putting" data into the discord servers. 

```js
// first we need both a client ID and guild ID
// we need to tell discord who our bot is
// and what guild we want this command active in
const CLIENT_ID = "1010008197257502740";
const GUILD_ID = "595102402168750081";
// then we create a new property called "rest" to initialize our rest api package
client.rest = new REST({ version: "10" }).setToken(token);

// now lets put this all in a function
const main = async () =>{
    try {
      // we will try to PUT our commands
        await client.rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: [...client.commands.values()].map(x => x = x.data)
        });
    } catch (err) {
      // error if for some reason we cannot
        console.error(err);
    }
    // then we login
    client.login(token);
}

// and then actually run it
main();
```


## THE API

Now before we start coding our commands, lets work on the utility file we have to create: `artEmbed.js`

All three commands will give us a single ARTIC ID, and we will use the ARTIC API to grab the data about the artwork based on the ID

So lets create a function called `getArtById(id)`
We will take an ID and input it into the API. [GO TO THE API DOCS RN](https://api.artic.edu/docs/)

```js
// we will use `fetch` from the undici module we installed earlier
const { fetch } = require("undici");

module.exports = {
  // first we create a function
  // make it asynchronous, because we don't know how long it will take for the API to return data, and sometimes it may take a while. Doing it this way means the program will be able to wait for this data to be received
    async getArtById(id) {
      // we will then FETCH the data from this API. The verb this time is "GET", as we are just getting data and not changing anything. GET is the default
      let result = fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=title,artist_title,image_id,id,color`)
      // we then want to convert this data to json
      .then(res => res.json())
      // and then just for testing, lets console.log it.
      .then(res => {
        // we will do something with this data
      });
    }
}
```

We can test the API right now. So lets copy paste the URL into chrome with an ID, for example `111628`

[https://api.artic.edu/api/v1/artworks/111628?fields=title,artist_title,image_id,id,color](https://api.artic.edu/api/v1/artworks/111628?fields=title,artist_title,image_id,id,color)

We get this big block of text. I have a chrome extension that autoformats this, but lets use a website like JSONFormatter.

- You can see we got back data from the API, and its in the JSON format. This is great, because now we can do whatever we want with this data.

We will format this data as an EMBED.
- If you have seen bots, it is almost guaranteed you have seen embeds before.
- All an embed is is a nicely formatted window-like message.
- Using discord.js, we can build it using something called EmbedBuilder.
  - It's a nice utility class that simplifies building embeds

```js
const { EmbedBuilder } = require("discord.js");
```

```js
// all the data is contained within the data property
res = res.data;
// if we didn't get valid data, then error
if (!res) return new EmbedBuilder().setTitle(`Error: Could not find artwork with id **${id}**`);
// otherwise we build an embed
// with title, description, etc.
const embed = new EmbedBuilder()
    .setTitle(res.title)
    .setDescription(res.artist_title ?? "Unknown")
    .setImage(`https://www.artic.edu/iiif/2/${res.image_id}/full/843,/0/default.jpg`)
    .setFooter({ text: `ARTIC ID: ${res.id}` })
    // we also want to change the embed's color. It's given to us in HSL, so we will convert it with the HSL code
    .setColor(res.color ? HSLToRGB(res.color.h, res.color.s, res.color.l) : [0, 0, 0]);
return embed;

// });
return result;
```

```js
// shamelessly stolen from https://www.30secondsofcode.org/js/s/hsl-to-rgb
const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [
        Math.floor(255 * f(0)),
        Math.floor(255 * f(8)),
        Math.floor(255 * f(4)),
    ];
}
```

Now if we want, lets test it. In `index.js`

```js
const { getArtById } = require("./utils/artEmbed.js");
client.on("messageCreate", (msg) => {
  msg.channel.send({embeds: [getArtById(msg.content)]});
});
```

So we type an ID and it does something!

So we managed to poll the API and get the data we wanted. However, we haven't taken advantage of slash commands yet. Thus, let's do it and make our first command.

## Create `artid.js`

So our first command will be /artid. We will supply to bot with an id, and then it will output the embed we saw earlier. Most of the heavy lifting has already been done by the `artEmbed.js` file, so this file will be relatively small

Recall our commands need 2 properties:
- `data` is info about the slash command: name, description, paramters, etc.
- `execute` is what function will be executed when the command is enterered

So we make this export:

```js
module.exports = {
  data:,
  execute() {
  } 
}
```

Our data will be info about the slash command. Discord's API wants this in JSON format, but instead of typing raw json out manually, we can use another builder: SlashCommandBuilder:

```js
const { SlashCommandBuilder } = require("discord.js");

// create a new slash command builder
data: new SlashCommandBuilder()
// set the name of the command as artid
.setName("artid")
// set its description
.setDescription("Show an artwork by ARTIC ID")
// then we want to add a parameter, discord.js calls these options. It's an integer and its required
.addIntegerOption(option => 
    option.setName("id").setDescription("ARTIC ID").setRequired(true)
),
```

If we save and go back to discord now, we can see our slash command shows up when we type. It won't do anything yet, however, so let's tell it to do something.

```js
async execute(interaction) {
  // we will get the id parameter
  const id = interaction.options.getInteger("id");
  // then call the getArtById function chained with a then
  getArtById(id).then(res => {
      // and reply to our slash command
      interaction.reply({embeds: [res]});
  });
}
```

Now typing our slash command and inputting our ID shows our artwork.

## Great! One command down, two to go.

So now lets work on our `artrandom.js` command

We will generate a random ID and then input that into the `getArtById` command.

Instead of generating a random number, however, we will get a list of ALL the artworks, but ordered randomly, then we will grab the first one. While this sounds slow and inefficent, this is actually the correct way to do it
  - Number 1, we are guaranteed to get an artwork, whereas generating a random number may not yield an artwork if that id doesn't correspond to an artwork
  - In the background, ARTIC's server perform pagination so the amount of data being sent over is small
  - Also, we will limit the fields to only `id`, lowering the amount of data even more


So again, we import the slashcommandbuilder and getartbyid. We also need to import fetch because we will be accessing the API
```js
const { SlashCommandBuilder } = require("discord.js");
// we need to import fetch for mode version of node (16.17.0), higher versions have fetch built-in
const { fetch } = require("undici");
const { getArtById } = require("../utils/artEmbed.js");
```

Let's first set the name and description of the command
```js
module.exports = {
	data: new SlashCommandBuilder()
		.setName("artrandom")
		.setDescription("Show a random art piece"),
}
```

Then let's create the fetch. This is going to be a big code block so bear with me

```js
	async execute(interaction) {
		fetch(`https://api.artic.edu/api/v1/search`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					resources: "artworks",
					fields: [
						"id"
					],
					boost: false,
					limit: 1,
					// an elasticsearch query to get a random artwork
					query: {
						function_score: {
							query: {
								bool: {
									filter: [
										{
											exists: {
												field: "image_id",
											},
										},
									],
								},
							},
							boost_mode: "replace",
							random_score: {
								field: "id",
								seed: Date.now(),
							}
						},
					},
				})
			}
		)
    .then(res => res.json())
		.then((res) => {
            res = res.data[0];
            getArtById(res.id).then(res => {
                interaction.reply({embeds: [res]});
            });
        });
  }
```

## Finally the last command: `artsearch.js`

First import our packages

```js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
// we need to import fetch for mode version of node (16.17.0), higher versions have fetch built-in
const { fetch } = require("undici");
const { getArtById } = require("../utils/artEmbed.js");
```

Then we will name our command
```js
module.exports = {
	data: new SlashCommandBuilder()
		.setName("artsearch")
		.setDescription("Search for an art piece")
		.addStringOption(option => option.setName("search").setDescription("Search query").setRequired(true)),
}
```

And then after we need to tell the command what to do.
- First we will get a list of a couple matching art pieces
- Then we will ask the user for input
- Then we will take the input, retrive the corresponding ID and use `artEmbed.js` to output the emded

```js
// create execute function
	async execute(interaction) {
    // retrieve parameter
		const q = interaction.options.getString("search");
    // fetch from the search rest api
    // only get the id, title, artist, and limit it to **10 RESULTS**
		fetch(`https://api.artic.edu/api/v1/artworks/search?fields=id,title,artist_title&limit=10&q=${q}`, {
				method: "POST",
        // we will receive JSON
				headers: { "Content-Type": "application/json" },
			}
		)
  }
  ```

Then parse as JSON
```js
		.then(res => res.json())
```

** Definitely show a diagram here **

```js
    const TRUNCATION = 30;

  //[...]

		.then((res) => {
      // get a list of the index, titles, artists, and IDs (don't show IDs)
			const indices = [];
			const titles = [];
			const artists = [];
			const ids = [];
      // now for every result we get back...
      res.data.map((curr, index) => {
        // we increment our indices (1, 2, 3...)
				indices.push(index);
        // we add the tile, but truncate it to a certain length (e.g. 3)
				titles.push(`**${curr.title.substring(0,TRUNCATION)}${curr.title.length >= TRUNCATION ? "..." : ""}**`);
        // then add the artists and ids
				artists.push(curr.artist_title ?? "Unknown");
				ids.push(curr.id);
			});
      // now we create the embed and display it
            const embed = new EmbedBuilder()
                .setTitle("Search Results")
                .addFields(
					{name: "Index", value: indices.join("\n"), inline: true},
					{name: "Title", value: titles.join("\n"), inline: true},
					{name: "Artist", value: artists.join("\n"), inline: true}
				)
				.setFooter({text: "Type an index to show an art piece - This will expire in 10 seconds"});
            interaction.reply({ embeds: [embed] });
    });
```

So we will display this to the user, but how do we know which one the user selects?
- We will use a filter and a **colector**
  - A collector "collects" messages. We will wait for 1 valid response for a max of 10 seconds
```js
      // we create our filter
			const filter = m => {
				return !isNaN(parseInt(m.content)) && parseInt(m.content) >= 0 && parseInt(m.content) <= Math.min(9, indices.length) && m.author.id === interaction.user.id;
			};
      // create our collector
			const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 10000 });

      // heres another event! this will happen whenever the collector finds a valid message to collect
			collector.on('collect', m => {
        // we will out put the ID!
				getArtById(ids[m.content]).then(res => {
					interaction.followUp({embeds: [res]});
				});
			});
			
      // another event! when it ends, we have to see if it found something. If not, lets followup with a message.
			collector.on('end', collected => {
				if (collected.size === 0) {
					interaction.followUp("Did not receive a response, please try again.");
				}
			});
```

# THE BOT IS DONE BEING CODED!!!

Now, let's move on to deployment:

We are lucky that deploying discord bots is a fairly easy and straightforward process.
- Our discord bot runs entirely through our node script, so as long as that app is open, the bot will be on
  - So technically speaking, we can host our discord bot for "free" by running the app and keeping our computer open
  - We can also use an npm package called `forever` to automatically turn our bot back on when it crashes
  - This may not be practical, because your computer has to be on all the time

So thus, I present to you 4 deployment solutions, with pros and cons to each
- Repl.it
- Raspberry Pi
- Heroku
- AWS (EC2)

I am not affiliated with any of these services

## Repl.it
- Repl.it is an online IDE and code sharing plaform
  - One of its key selling points is real time code collaboration
  - Its IDE has a debugger, key value database, secrets (env variables) and even github integration
  - All of the above features makes it very convinient to host your bot on repl.it, and best of all, it is free
  - Your repl.it's won't be on forever so we cheat to make it stay on
    - We abuse the fact that repl.it keeps web apps on for 2 hours of inactivity, so if we make a web server in our bot, then ping it every 2 hours our bot will stay on forever
    - To do this, we can use a uptime detection site like uptime-robot which will send a request to our server every 5 min

  - Some downsides would be
    - It's a little bit slow, especially if your codebase gets larger or if you need to serve many people
    - For a small server with your friends, its perfect, but for bigger apps you might want to look for an alternate solution

## Raspberry Pi
- An unconventional yet simple solution can be to host your bot on a raspberry pi
  - A Raspberry Pi is a small computer that runs Linux
  - People use raspberry pi's for things like media centers, smart home, and small servers like our bot
  - They are relatively inexpensive, starting at around $60 CAD for a model with 2GB of ram, more than enough for a discord bot.
  - This approach follows the "keeping your computer on 24/7" approach, as we will just open our discord bot on our rasp pi and keep it running with `forever`
  - The voltage draw from a rasp pi is fairly small, so this is a fairly economical solution, and you have a lot of control over the deployment

## Heroku
- Heroku is a is a PaaS (platform as a service) solution
  - It has many features at different price tiers, such as postgres/redis intergrations, github integrations, auto CI/CD, metrics, scalability, containerization and many more
  - Discord has a great resource for how to set up you discord bot with heroku in their [documentation](https://discord.com/developers/docs/tutorials/hosting-on-heroku#:~:text=To%20create%20your%20Discord%20app,the%20Client%20ID%20for%20later.)

## AWS (Lightsail, Beanstalk, EC2)
- AWS is amazons offering for web
  - It has over 200 different services, covering the entire web space
  - There are multiple ways to host discord bots on AWS but I will just mention w
    - Lightsail, Beanstalk and EC2

### Lightsail
- Lightsail is a newer AWS service, allowing for very simple deployment of web applications
- This type of small scale deployment is enough for discord bots, and a lot of the features included in higher tier, more complex AWS services won't be utilixed to their full potential

### EC2 and Beanstalk
- EC2 is a linux server just like a rasbperry pi, but more feature rich and more complicated to set up
  - You get a free year of their 1GB RAM instance, but you will have to pay for bonus resources and storage
    - If you are new to deployment and web services then I wouldn't recommend trying to create an EC2 instance, it may be a little too complex. There is an entire job position just dedicated to managing deployment and management of services on AWS after all
- This is why there is an easier alternative for EC2 and thats beanstalk
  - Beanstalk sets up a EC2 instance for you. It accepts a zip file of all your code and runs `npm start`. This could be the better solution for beginners
