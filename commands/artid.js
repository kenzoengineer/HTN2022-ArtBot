const { SlashCommandBuilder } = require("discord.js");
const { getArtById } = require("../utils/artEmbed.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("artid")
    .setDescription("Show an artwork by ARTIC ID")
    .addIntegerOption(option => 
        option.setName("id").setDescription("ARTIC ID").setRequired(true)
    ),
    async execute(interaction) {
        const id = interaction.options.getInteger("id");
        getArtById(id).then(res => {
            interaction.reply({embeds: [res]});
        });
    }
}