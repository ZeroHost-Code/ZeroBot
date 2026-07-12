const { EmbedBuilder } = require("discord.js");

const TRUSTPILOT_URL = "https://www.trustpilot.com/review/zero-host.org";
const IMAGE_URL = "https://img.zero-host.org/assets/logo.png";

module.exports = function buildReviewEmbed() {
  const embed = new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle("ZeroHost - Reviews")
    .setDescription("We'd love to hear your feedback! Please leave your review using the format below:")
    .addFields(
      {
        name: "Leave your review here",
        value: "Copy the format below, rate each category from 1 to 5, and add any comments you'd like!\n```\n⭐ Performance : ../5\n⭐ Support : ../5\n⭐ Security : ../5\n⭐ Community : ../5\n```",
      },
      {
        name: "Trustpilot",
        value: `If you have a moment, we'd really appreciate a review on **Trustpilot** as well!\n${TRUSTPILOT_URL}`,
      },
    );

  try {
    new URL(IMAGE_URL);
    embed.setImage(IMAGE_URL);
  } catch {
    console.warn("Invalid image URL configured, skipping image.");
  }

  return embed;
};
