const { CommandInteraction, EmbedBuilder, DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {Discord.BaseInteraction} interaction 
     * @param {Discord.Client} client 
     * @returns 
     */
    async execute(interaction, client) {

        if(interaction.isModalSubmit()){
            require("../../modals/password").execute(interaction, client)
        }

        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName)

        if(!command) {
            return interaction.reply("This command is outdated")
        }

        command.execute(interaction, client);
    }
}