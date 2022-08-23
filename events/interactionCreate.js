module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction);
            } catch (err) {
                console.log(err);
                await interaction.reply({content: "Error: Could not execute command", ephemeral: true});
            }
        }
    }
}