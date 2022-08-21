const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName("art")
		.setDescription("Show an art piece, random if no parameter is given")
		.addStringOption((option) =>
			option.setName("query").setDescription("Add search query")
		),
	async execute(interaction) {
		const query = interaction.options.getString("query");
		fetch(`https://api.artic.edu/api/v1/search?${query ? "q=" + query : ""}`,
			{
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
							boost_mode: query ? undefined : "replace",
							random_score: query ? undefined : {
										field: "id",
										seed: Date.now(),
							},
						},
					},
				}),
			}
		).then((res) => {
			return res.json();
		}).then((res) => {
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
