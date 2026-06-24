const { Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = new Collection();

const commandFiles = fs.readdirSync(__dirname).filter((file) => file !== "index.js" && file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, file));
  if (command.data && command.execute) {
    commands.set(command.data.name, command);
  }
}

module.exports = commands;
