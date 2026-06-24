const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Display information about this server"),

  async execute(interaction) {
    const { guild } = interaction;

    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ size: 256 }))
      .addFields(
        { name: "Owner", value: `<@${guild.ownerId}>`, inline: true },
        { name: "Members", value: `${guild.memberCount}`, inline: true },
        { name: "Channels", value: `${guild.channels.cache.size}`, inline: true },
        { name: "Roles", value: `${guild.roles.cache.size}`, inline: true },
        { name: "Boosts", value: `${guild.premiumSubscriptionCount || 0}`, inline: true },
        { name: "Created", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
