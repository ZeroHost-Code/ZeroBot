const config = require("../config");

module.exports = async function handleMessage(message) {
  if (message.author.bot) return;
  if (message.channel.id !== config.thumbsUpChannelId) return;

  try {
    await message.react("👍");
  } catch (error) {
    console.error("Error adding thumbs up reaction:", error);
  }
};
