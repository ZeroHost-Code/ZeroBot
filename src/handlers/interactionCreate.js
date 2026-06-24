const { MessageFlags, Collection } = require("discord.js");
const config = require("../config");

const cooldowns = new Collection();

module.exports = async function handleInteraction(interaction) {
  if (!interaction.isButton()) return;

  if (cooldowns.has(interaction.user.id)) {
    return interaction.reply({
      content: "Please wait before using another button.",
      flags: MessageFlags.Ephemeral,
    });
  }

  cooldowns.set(interaction.user.id, Date.now());
  setTimeout(() => cooldowns.delete(interaction.user.id), 3000);

  if (interaction.customId === "accept_rules" && interaction.channelId !== config.rulesChannelId) {
    return interaction.reply({ content: "This button can only be used in the rules channel.", flags: MessageFlags.Ephemeral });
  }

  if (
    (interaction.customId === "ping_down_maintenance" || interaction.customId === "ping_web_update" || interaction.customId === "unsubscribe_all") &&
    interaction.channelId !== config.pingChannelId
  ) {
    return interaction.reply({ content: "This button can only be used in the ping channel.", flags: MessageFlags.Ephemeral });
  }

  if (interaction.customId === "accept_rules") {
    try {
      await interaction.member.roles.add(config.acceptRoleId);
      await interaction.reply({
        content: "You accepted the rules. The role has been assigned to you!",
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error("Error adding role:", error);
      await interaction.reply({
        content: "An error occurred while assigning the role.",
        flags: MessageFlags.Ephemeral,
      });
    }
  } else if (interaction.customId === "ping_down_maintenance") {
    try {
      await interaction.member.roles.add(config.pingRoleId);
      await interaction.reply({
        content: "You will now be pinged for Down or Maintenance announcements!",
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error("Error adding role:", error);
      await interaction.reply({
        content: "An error occurred while assigning the role.",
        flags: MessageFlags.Ephemeral,
      });
    }
  } else if (interaction.customId === "ping_web_update") {
    try {
      await interaction.member.roles.add(config.webUpdateRoleId);
      await interaction.reply({
        content: "You will now be pinged for Web Update announcements!",
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error("Error adding role:", error);
      await interaction.reply({
        content: "An error occurred while assigning the role.",
        flags: MessageFlags.Ephemeral,
      });
    }
  } else if (interaction.customId === "unsubscribe_all") {
    try {
      await interaction.member.roles.remove([config.pingRoleId, config.webUpdateRoleId]);
      await interaction.reply({
        content: "You have been unsubscribed from all ping roles.",
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error("Error removing roles:", error);
      await interaction.reply({
        content: "An error occurred while removing the roles.",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
};
