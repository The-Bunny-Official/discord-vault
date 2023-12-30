const Discord = require("discord.js");
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ModalBuilder, ChatInputCommandInteraction, Client, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = {
    name: "view",
    data: new SlashCommandBuilder()
    .setName("view")
    .setDescription("View an item in the vault"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        if(interaction.user.id == client.config.owner){
            const modal = new ModalBuilder()
            .setTitle("Input Password")
            .setCustomId("PasswordModal");

            const passwordInput = new TextInputBuilder()
            .setLabel("Password")
            .setCustomId("password")
            .setStyle(TextInputStyle.Short);

            const itemInput = new TextInputBuilder()
            .setLabel("Vault Item")
            .setCustomId("item")
            .setStyle(TextInputStyle.Short);

            const ActionRow = new ActionRowBuilder().addComponents(passwordInput);
            const ActionRow1 = new ActionRowBuilder().addComponents(itemInput);

            modal.addComponents(ActionRow, ActionRow1);

            await interaction.showModal(modal);
        } else {
            const Embed = new EmbedBuilder()
            .setTitle("You are not my owner")
            .setDescription("You cannot use this command because you are not the owner of this bot")
            .setColor(Discord.Colors.Red);

            await interaction.reply({ embeds: [Embed], ephemeral: true });
        }
    }
}