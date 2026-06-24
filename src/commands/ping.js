const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the bot's latency"),

  async execute(interaction) {
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });

    const roundtrip = sent.createdTimestamp - interaction.createdTimestamp;

    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle("Pong!")
      .addFields(
        { name: "Roundtrip Latency", value: `${roundtrip}ms`, inline: true },
        { name: "Websocket Heartbeat", value: `${interaction.client.ws.ping}ms`, inline: true },
      )
      .setTimestamp();

    await interaction.editReply({ content: null, embeds: [embed] });
  },
};
