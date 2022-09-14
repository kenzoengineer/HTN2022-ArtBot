const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
// we need to import fetch for mode version of node (16.17.0), higher versions have fetch built-in
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
			const indices = [];
			const titles = [];
			const artists = [];
			const ids = [];
            res.data.map((curr, index) => {
				indices.push(index);
				titles.push(`**${curr.title.substring(0,TRUNCATION)}${curr.title.length >= TRUNCATION ? "..." : ""}**`);
				artists.push(curr.artist_title ?? "Unknown");
				ids.push(curr.id);
			});
            const embed = new EmbedBuilder()
                .setTitle("Search Results")
                .addFields(
					{name: "Index", value: indices.join("\n"), inline: true},
					{name: "Title", value: titles.join("\n"), inline: true},
					{name: "Artist", value: artists.join("\n"), inline: true}
				)
				.setFooter({text: "Type an index to show an art piece - This will expire in 10 seconds"});
            interaction.reply({ embeds: [embed] });
			
			const filter = m => {
				return !isNaN(parseInt(m.content)) && parseInt(m.content) >= 0 && parseInt(m.content) <= Math.min(9, indices.length) && m.author.id === interaction.user.id;
			};
			const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 10000 });

			collector.on("collect", m => {
				getArtById(ids[m.content]).then(res => {
					interaction.followUp({embeds: [res]});
				});
			});
			
			collector.on("end", collected => {
				if (collected.size === 0) {
					interaction.followUp("Did not receive a response, please try again.");
				}
			});
        });
	},
};
