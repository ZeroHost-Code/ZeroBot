const config = require("../config");
const buildReviewEmbed = require("../reviewEmbed");

module.exports = async function handleReviewMessage(message) {
  if (message.author.bot) return;
  if (message.channel.id !== config.reviewChannelId) return;

  try {
    await message.delete();
  } catch (error) {
    console.error("Failed to delete review message:", error);
    return;
  }

  try {
    const messages = await message.channel.messages.fetch({ limit: 10 });
    const botEmbed = messages.find((m) => m.author.id === message.client.user.id && m.embeds.length > 0);
    if (botEmbed) {
      await botEmbed.delete();
    }
    await message.channel.send({ embeds: [buildReviewEmbed()] });
  } catch (error) {
    console.error("Failed to refresh review embed:", error);
  }
};
