const { MessageFlags, Collection } = require("discord.js");
const config = require("../config");

const cooldowns = new Collection();

async function safeReply(interaction, options) {
  try {
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(options);
    } else {
      await interaction.reply(options);
    }
  } catch (error) {
    console.error("Failed to reply to interaction:", error);
  }
}

const commands = require("../commands");

module.exports = async function handleInteraction(interaction) {
  if (interaction.isChatInputCommand()) {
    const command = commands.get(interaction.commandName);
    if (!command) {
      return safeReply(interaction, {
        content: "Command not found.",
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing command ${interaction.commandName}:`, error);
      await safeReply(interaction, {
        content: "An error occurred while executing this command.",
        flags: MessageFlags.Ephemeral,
      });
    }
    return;
  }

  if (!interaction.isButton()) return;

  if (cooldowns.has(interaction.user.id)) {
    return safeReply(interaction, {
      content: "Please wait before using another button.",
      flags: MessageFlags.Ephemeral,
    });
  }

  cooldowns.set(interaction.user.id, Date.now());
  setTimeout(() => cooldowns.delete(interaction.user.id), 3000);

  if (interaction.customId === "accept_rules" && interaction.channelId !== config.rulesChannelId) {
    return safeReply(interaction, {
      content: "This button can only be used in the rules channel.", flags: MessageFlags.Ephemeral });
  }

  if (
    (interaction.customId === "ping_down_maintenance" || interaction.customId === "ping_web_update" || interaction.customId === "unsubscribe_all") &&
    interaction.channelId !== config.pingChannelId
  ) {
    return safeReply(interaction, { content: "This button can only be used in the ping channel.", flags: MessageFlags.Ephemeral });
  }

  if (!interaction.member || !interaction.inGuild()) {
    return safeReply(interaction, {
      content: "This interaction can only be used inside a server.",
      flags: MessageFlags.Ephemeral,
    });
  }

  if (interaction.customId === "accept_rules") {
    try {
      await interaction.member.roles.add(config.acceptRoleId);
      await safeReply(interaction, {
        content: "You accepted the rules. The role has been assigned to you!",
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error("Error adding role:", error);
      await safeReply(interaction, {
        content: "An error occurred while assigning the role.",
        flags: MessageFlags.Ephemeral,
      });
    }
  } else if (interaction.customId === "ping_down_maintenance") {
    try {
      await interaction.member.roles.add(config.pingRoleId);
      await safeReply(interaction, {
        content: "You will now be pinged for Down or Maintenance announcements!",
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error("Error adding role:", error);
      await safeReply(interaction, {
        content: "An error occurred while assigning the role.",
        flags: MessageFlags.Ephemeral,
      });
    }
  } else if (interaction.customId === "ping_web_update") {
    try {
      await interaction.member.roles.add(config.webUpdateRoleId);
      await safeReply(interaction, {
        content: "You will now be pinged for Web Update announcements!",
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error("Error adding role:", error);
      await safeReply(interaction, {
        content: "An error occurred while assigning the role.",
        flags: MessageFlags.Ephemeral,
      });
    }
  } else if (interaction.customId === "unsubscribe_all") {
    try {
      await interaction.member.roles.remove([config.pingRoleId, config.webUpdateRoleId]);
      await safeReply(interaction, {
        content: "You have been unsubscribed from all ping roles.",
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error("Error removing roles:", error);
      await safeReply(interaction, {
        content: "An error occurred while removing the roles.",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
};
