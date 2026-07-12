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
        name: "\u200b",
        value: [
          "**Leave your review here:**",
          "",
          "⭐ Performance : ../5",
          "⭐ Support : ../5",
          "⭐ Security : ../5",
          "⭐ Community : ../5",
          "",
          "*Replace the dots with your rating (1-5) and add any comments below!*",
        ].join("\n"),
      },
      {
        name: "\u200b",
        value: "\u200b",
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
