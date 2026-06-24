const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Display information about a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to get info about").setRequired(false),
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("user") || interaction.user;
    const member = await interaction.guild.members.fetch(target.id).catch(() => null);

    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle(target.tag)
      .setThumbnail(target.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: "ID", value: target.id, inline: true },
        { name: "Account Created", value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>`, inline: true },
        { name: "Bot", value: target.bot ? "Yes" : "No", inline: true },
      );

    if (member) {
      embed.addFields(
        { name: "Joined Server", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        {
          name: "Roles",
          value: member.roles.cache.size > 1
            ? member.roles.cache.filter((r) => r.id !== interaction.guild.id).map((r) => r.toString()).join(", ")
            : "None",
          inline: false,
        },
      );
    }

    await interaction.reply({ embeds: [embed] });
  },
};
