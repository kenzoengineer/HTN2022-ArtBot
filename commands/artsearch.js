const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
// we need to import fetch for our version of node (16.17.0), higher versions have fetch built-in
const { fetch } = require("undici");
const { getArtById } = require("../utils/artEmbed.js");

const TRUNCATION = 30;

/**
 * /artsearch <query>
 * 
 * Given a query, we use the api to search their artworks. We then return max 10 in an
 * embed and let the user select which artwork they want. When the user responds, we output
 * the corresponding artwork.
 */

module.exports = {
	// create a new slash command with a string option for the search query
	data: new SlashCommandBuilder()
		.setName("artsearch")
		.setDescription("Search for an art piece")
		.addStringOption(option => option.setName("search").setDescription("Search query").setRequired(true)),
	async execute(interaction) {
		// get the query
		const q = interaction.options.getString("search");
		// search using the API, returning a maximum of 10
		fetch(`https://api.artic.edu/api/v1/artworks/search?fields=id,title,artist_title&limit=10&q=${q}`, {
				headers: { "Content-Type": "application/json" },
			}
		)
		.then(res => res.json())
		.then((res) => {
			// our search results embed will have 3 columns:
			// an index so the user can select it later (0, 1, 2...)
			const indices = [];
			// the title of the artwork
			const titles = [];
			// the artist of the artwork
			const artists = [];
			// we don't display this to the user, but we keep track of the art id so we can easily output it later
			const ids = [];
			// for every search result:
            res.data.map((curr, index) => {
				// push the corresponding data to the arrays
				indices.push(index);
				// we don't want a very long title to mess up our formatting, so we truncate the text if its longer than TRUNCATION (default: 30)
				titles.push(`**${curr.title.substring(0,TRUNCATION)}${curr.title.length >= TRUNCATION ? "..." : ""}**`);
				artists.push(curr.artist_title ?? "Unknown");
				ids.push(curr.id);
			});

			// output the search results embed
            const embed = new EmbedBuilder()
                .setTitle("Search Results")
                .addFields(
					{name: "Index", value: indices.join("\n"), inline: true},
					{name: "Title", value: titles.join("\n"), inline: true},
					{name: "Artist", value: artists.join("\n"), inline: true}
				)
				.setFooter({text: "Type an index to show an art piece - This will expire in 10 seconds"});
            interaction.reply({ embeds: [embed] });
			
			/**
			 * We will use a MessageCollector to get user input.
			 * 
			 * It takes in 3 parameters:
			 * filter: a function to filter the messages we don't want
			 * max: the max number of mesage to collect
			 * time: how long we should collect messages for (in milliseconds)
			 */

			// we only want to collect messages that:
			// - Are numbers
			// - Are numbers that are between 0 and max(9, number of results)
			// - From the slash command author
			const filter = m => {
				return !isNaN(parseInt(m.content)) && parseInt(m.content) >= 0 && parseInt(m.content) <= Math.min(9, indices.length) && m.author.id === interaction.user.id;
			};

			// create the collector
			const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 10000 });

			// an event; when we collect a valid message we will output the art based on the id
			collector.on("collect", m => {
				getArtById(ids[m.content]).then(res => {
					interaction.followUp({embeds: [res]});
				});
			});
			
			// when the collector closes we will output an error if nothing was collected
			collector.on("end", collected => {
				if (collected.size === 0) {
					interaction.followUp("Did not receive a response, please try again.");
				}
			});
        });
	},
};
