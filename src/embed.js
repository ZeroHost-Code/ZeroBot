const { EmbedBuilder } = require("discord.js");

const IMAGE_URL = "https://img.zero-host.org/assets/logo.png";

module.exports = function buildRulesEmbed() {
  const embed = new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle("ZeroHost - Server Rules")
    .setDescription("\u200b")
    .addFields(
      { name: "1. Be respectful", value: "Treat everyone with respect. No harassment, insults, discrimination, or toxic behavior.\nZeroHost is a friendly community." },
      { name: "2. No spam", value: "Do not spam messages, emojis, reactions, pings, or DMs.\nThis includes spam in tickets, channels, or to staff." },
      { name: "3. English only", value: "To keep support clear and organized, please speak English in all main channels and tickets." },
      { name: "4. No NSFW content", value: "No sexual, violent, disturbing, or inappropriate content.\nThis includes images, videos, links, and usernames." },
      { name: "5. No advertising", value: "Do not promote other hosting services, Discord servers, websites, or products without permission." },
      { name: "6. Follow Discord's ToS", value: "You must follow Discord's Terms of Service and Community Guidelines at all times." },
      { name: "7. Respect staff decisions", value: "Moderators and admins have the final say.\nIf staff asks you to stop something, stop." },
      { name: "8. Use channels correctly", value: "Post in the correct channels.\nSupport questions go in tickets, not in general chat." },
      { name: "9. No ticket abuse", value: "Do not open tickets for jokes, testing, or chatting.\nOne ticket per issue." },
      { name: "10. Protect your data", value: "Do not share passwords, tokens, or sensitive information publicly." },
      { name: "11. Breaking rules = consequences", value: "Depending on severity, staff may issue:\n• warnings\n• mutes\n• kicks\n• bans\n• service suspension" },
    );

  try {
    new URL(IMAGE_URL);
    embed.setImage(IMAGE_URL);
  } catch {
    console.warn("Invalid image URL configured, skipping image.");
  }

  return embed;
};
