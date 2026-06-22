const { EmbedBuilder } = require("discord.js");

module.exports = function buildPingEmbed() {
  return new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle("ZeroHost - Notification Roles")
    .setDescription(
      "Click a button below to get pinged for specific announcements.\n\n" +
      "**🔔 Down / Maintenance**\nGet notified when services are down or under maintenance.\n\n" +
      "**🌐 Web Update**\nGet notified when the website or panel receives an update."
    );
};
