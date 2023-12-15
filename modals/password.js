const Discord = require("discord.js");
const { ModalSubmitInteraction, Client, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const password = interaction.fields.getField("password").value;
        const item = interaction.fields.getField("item").value;

        await interaction.deferReply({ ephemeral: true });

        if(password == client.config.password){
            if(fs.existsSync(`./vault/${item}`)){
                const attachment = new AttachmentBuilder()
                .setFile(fs.readFileSync(`./vault/${item}`))
                .setName(item);

                await interaction.editReply({ files: [attachment], ephemeral: true });
            } else {
                const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("File not found");

                await interaction.editReply({ embeds: [embed], ephemeral: true });
            }

        } else {
            const FailEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Incorrect password");

            await interaction.editReply({ embeds: [FailEmbed], ephemeral: true });
        }
    }
}