const config = require("../config");

module.exports = async function handleReviewMessage(message) {
  if (message.author.bot) return;
  if (message.channel.id !== config.reviewChannelId) return;

  const content = message.content;
  const attachments = message.attachments;

  try {
    await message.delete();
  } catch (error) {
    console.error("Failed to delete review message:", error);
    return;
  }

  try {
    const payload = { content };
    if (attachments.size > 0) {
      payload.files = [...attachments.values()].map((a) => a.url);
    }
    await message.channel.send(payload);
  } catch (error) {
    console.error("Failed to re-send review message:", error);
  }
};
