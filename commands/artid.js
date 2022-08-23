const { SlashCommandBuilder } = require("discord.js");
// we need to import fetch for mode version of node (16.17.0), higher versions have fetch built-in
const { getArtById } = require("../utils/artEmbed.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("artid")
    .setDescription("Show an art piece randomly, by search or by ID")
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