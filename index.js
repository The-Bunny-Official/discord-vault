const { Client, GatewayIntentBits, Partials } = require("discord.js");
const Discord = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Message
    ]
});

client.config = require("./config.json");
client.commands = new Discord.Collection();

const { loadEvents } = require("./handlers/events");
const { loadCommands } = require("./handlers/interactions");

module.exports = client;

client
.login(client.config.token)
.then(() => {
    loadCommands(client);
    loadEvents(client);
});