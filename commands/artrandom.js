const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
// we need to import fetch for mode version of node (16.17.0), higher versions have fetch built-in
const { fetch } = require("undici");
const { HSLToRGB } = require("../utils/apiUtils.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("artrandom")
		.setDescription("Get a random art piece"),
	async execute(interaction) {
		URI = `https://api.artic.edu/api/v1/search`;
		fetch(URI, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					resources: "artworks",
					fields: [
						"id",
						"title",
						"artist_title",
						"image_id",
						"color",
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
										{
											term: {
												is_public_domain: true,
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
            const embed = new EmbedBuilder()
                .setTitle(res.title)
                .setDescription(res.artist_title)
                .setImage(`https://www.artic.edu/iiif/2/${res.image_id}/full/843,/0/default.jpg`)
                .setFooter({ text: `ARTIC ID: ${res.id}` })
                .setColor(res.color ? HSLToRGB(res.color.h, res.color.s, res.color.l) : [0, 0, 0]);
            interaction.reply({ embeds: [embed] });
        });
	},
};
