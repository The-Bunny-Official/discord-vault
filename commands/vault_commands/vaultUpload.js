const { EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction, Client, Embed } = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports = {
    name: "upload",
    data: new SlashCommandBuilder()
    .setName("upload")
    .setDescription("Upload to the vault.")
    .addStringOption(option => option.setName("password").setDescription("Vault password").setRequired(true))
    .addAttachmentOption(option => option.setName("item").setDescription("Item to upload").setRequired(true))
    .addStringOption(option => option.setName("rename").setDescription("Rename the object")),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const Attachment = interaction.options.getAttachment("item");
        const password = interaction.options.getString("password");
        const rename = interaction.options.getString("rename");

        await interaction.deferReply({ ephemeral: true });

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

        const response = await fetch(Attachment.url);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        fs.createWriteStream(`./vault/${rename || Attachment.name}`).write(buffer);

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Successfully added to vault");

        await interaction.editReply({ embeds: [embed], ephemeral: true });
    }
}