const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const commands = require("./index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List all available commands"),

  async execute(interaction) {
    const list = commands.map(
      (cmd) => `**/${cmd.data.name}** — ${cmd.data.description}`,
    );

    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle("Available Commands")
      .setDescription(list.join("\n"))
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
