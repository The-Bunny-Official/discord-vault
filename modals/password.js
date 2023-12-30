const Discord = require("discord.js");
const { ModalSubmitInteraction, Client, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
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

                let DeleteButton = new ButtonBuilder()
                .setCustomId("Delete")
                .setLabel("Delete File")
                .setStyle(ButtonStyle.Danger)
                .setEmoji("🗑️");

                const row = new ActionRowBuilder()
                .setComponents(DeleteButton);

                const response = await interaction.editReply({ files: [attachment], ephemeral: true, components: [row] });

                const collectorFilter = i => i.user.id === interaction.user.id;
                try {
                    const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

                    fs.unlinkSync(`./vault/${item}`);

                    await confirmation.update({ content: "File deleted.", files: [], components: [] });
                } catch (e) {
                    DeleteButton.setDisabled(true);
                    await interaction.editReply({ components: [row] });
                }

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