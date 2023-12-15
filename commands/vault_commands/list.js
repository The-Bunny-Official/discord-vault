const { EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction, Client } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "list",
    data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("List all files")
    .addStringOption(option => option.setName("password").setDescription("Vault password").setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const password = interaction.options.getString("password");

        await interaction.deferReply({ ephemeral: true })

        if(interaction.user.id != client.config.owner){
            const embed = new EmbedBuilder()
            .setTitle("You are not the owner.")
            .setColor("Red");

            return await interaction.editReply({ embeds: [embed], ephemeral: true });
        }

        if(password != client.config.password){
            const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Incorrect password");

            return await interaction.editReply({ embeds: [embed], ephemeral: true });
        }

        let list = fs.readdirSync("./vault") || "No Files";
        let compiledList = "";

        list.forEach((item) => {
            compiledList += `${item}\n`;
        });

        try {
            await interaction.editReply({ content: compiledList, ephemeral: true });
        } catch (error) {
            await interaction.editReply({ content: `No files found.`, ephemeral: true });
        }
    }   
}