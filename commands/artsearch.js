const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
// we need to import fetch for mode version of node (16.17.0), higher versions have fetch built-in
const { fetch } = require("undici");
const { getArtById } = require("../utils/artEmbed.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("artsearch")
		.setDescription("Search for an art piece")
		.addStringOption(option => option.setName("search").setDescription("Search query").setRequired(true)),
	async execute(interaction) {
		const q = interaction.options.getString("search");
		const URI = `https://api.artic.edu/api/v1/search?q=${q}`;
		fetch(URI, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					resources: "artworks",
					fields: [
						"id",
						"title",
						"artist_title",
					],
					boost: false,
					limit: 10,
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
						},
					},
				})
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
				titles.push(`**${curr.title.substring(0,20)}${curr.title.length >= 20 ? "..." : ""}**`);
				artists.push(curr.artist_title);
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
				return !isNaN(parseInt(m.content)) && parseInt(m.content) >= 0 && parseInt(m.content) <= 9 && m.author.id === interaction.user.id;
			};
			const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 10000 });

			collector.on('collect', m => {
				getArtById(ids[m.content]).then(res => {
					interaction.followUp({embeds: [res]});
				});
			});
			
			collector.on('end', collected => {
				if (collected.size === 0) {
					interaction.followUp("Did not receive a response, please try again.");
				}
			});
        });
	},
};
