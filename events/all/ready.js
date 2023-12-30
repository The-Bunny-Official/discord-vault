const Discord = require("discord.js");
module.exports = {
    name: "ready",
    /**
     * @param {Discord.Client} client
     */
    async execute(client){
        const owner = await client.users.fetch(client.config.owner);
        console.log(`Owner detected as @${owner.username} (${owner.id})`);
    }
}