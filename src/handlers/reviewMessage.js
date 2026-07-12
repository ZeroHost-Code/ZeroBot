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
    await message.channel.send({ embeds: [buildReviewEmbed()] });
  } catch (error) {
    console.error("Failed to re-send review embed:", error);
  }
};
