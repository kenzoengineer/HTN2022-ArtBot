const { EmbedBuilder } = require("discord.js");
const { fetch } = require("undici");
const { HSLToRGB } = require("./apiUtils.js");
module.exports = {
    async getArtById(id) {
        let result = fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
        .then(res => res.json())
        .then(res => {
            res = res.data;
            if (!res) return interaction.reply({content: `Error: Could not find artwork matching id **${id}**`, ephemeral: true});
            const embed = new EmbedBuilder()
                .setTitle(res.title)
                .setDescription(res.artist_title)
                .setImage(`https://www.artic.edu/iiif/2/${res.image_id}/full/843,/0/default.jpg`)
                .setFooter({ text: `ARTIC ID: ${res.id}` })
                .setColor(res.color ? HSLToRGB(res.color.h, res.color.s, res.color.l) : [0, 0, 0]);
            return embed;
        });
        return result;
    }
}