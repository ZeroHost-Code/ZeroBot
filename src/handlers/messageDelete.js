const { EmbedBuilder } = require("discord.js");

module.exports = async function handleMessageDelete(message) {
  if (message.partial) {
    try {
      await message.fetch();
    } catch {
      return;
    }
  }

  if (message.author?.bot) return;
  if (!message.content && message.attachments.size === 0) return;

  try {
    const channel = message.guild?.channels.cache.find(
      (ch) => ch.isTextBased() && ch.name.includes("log"),
    );

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(0x992222)
      .setTitle("Message Deleted")
      .setDescription(`Message by ${message.author.tag} was deleted in <#${message.channelId}>`)
      .addFields(
        { name: "Content", value: message.content || "*No text content*" },
        { name: "Channel", value: `<#${message.channelId}>`, inline: true },
        { name: "Author", value: message.author.tag, inline: true },
      )
      .setTimestamp();

    if (message.attachments.size > 0) {
      embed.addFields({
        name: "Attachments",
        value: message.attachments.map((a) => a.url).join("\n"),
      });
    }

    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error("Error logging deleted message:", error);
  }
};
