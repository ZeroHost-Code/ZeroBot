const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./src/config");
const handleReady = require("./src/handlers/ready");
const handleInteraction = require("./src/handlers/interactionCreate");
const handleMessage = require("./src/handlers/messageCreate");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

process.on("unhandledRejection", (error) => {
  console.error("[FATAL] Unhandled promise rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error("[FATAL] Uncaught exception:", error);
});

client.once("ready", () => handleReady(client));
client.on("interactionCreate", handleInteraction);
client.on("messageCreate", handleMessage);

client.login(config.token);
