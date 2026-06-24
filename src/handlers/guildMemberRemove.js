const { EmbedBuilder } = require("discord.js");

module.exports = async function handleGuildMemberRemove(member) {
  try {
    const channel = member.guild.channels.cache.find(
      (ch) => ch.isTextBased() && ch.name.includes("welcome"),
    );

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(0x992222)
      .setTitle("Goodbye!")
      .setDescription(`${member.user.tag} has left the server.`)
      .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
      .setFooter({ text: `Member count: ${member.guild.memberCount}` })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error("Error sending goodbye message:", error);
  }
};
