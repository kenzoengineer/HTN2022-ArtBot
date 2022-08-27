const { EmbedBuilder } = require("discord.js");
const { fetch } = require("undici");

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

module.exports = {
    async getArtById(id) {
        let result = fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=title,artist_title,image_id,id,color`, {
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(res => {
            res = res.data;
            if (!res) return new EmbedBuilder().setTitle(`Error: Could not find artwork with id **${id}**`);
            const embed = new EmbedBuilder()
                .setTitle(res.title)
                .setDescription(res.artist_title ?? "Unknown")
                .setImage(`https://www.artic.edu/iiif/2/${res.image_id}/full/843,/0/default.jpg`)
                .setFooter({ text: `ARTIC ID: ${res.id}` })
                .setColor(res.color ? HSLToRGB(res.color.h, res.color.s, res.color.l) : [0, 0, 0]);
            return embed;
        });
        return result;
    }
}