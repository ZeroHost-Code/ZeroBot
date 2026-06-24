const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Bulk delete messages in the current channel (admin only)")
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("Number of messages to delete (1-100)").setRequired(true).setMinValue(1).setMaxValue(100),
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.reply({
        content: "You need the `Manage Messages` permission to use this command.",
        flags: 64,
      });
    }

    await interaction.deferReply({ flags: 64 });

    const messages = await interaction.channel.bulkDelete(amount, true);
    const deleted = messages.size;

    const reply = await interaction.editReply({
      content: `Deleted ${deleted} message${deleted !== 1 ? "s" : ""}.`,
    });

    setTimeout(() => reply.delete().catch(() => {}), 5000);
  },
};
