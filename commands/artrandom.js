const { SlashCommandBuilder } = require("discord.js");
// we need to import fetch for our version of node (16.17.0), higher versions have fetch built-in
const { fetch } = require("undici");
const { getArtById } = require("../utils/artEmbed.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("artrandom")
		.setDescription("Show a random art piece"),
	async execute(interaction) {
		fetch(`https://api.artic.edu/api/v1/artworks/search?fields=id&limit=1`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					boost: false,
					// An elasticsearch query. We use function_score to replace the score with random_score
					query: {
						function_score: {
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
	},
};
