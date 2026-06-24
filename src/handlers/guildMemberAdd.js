const { EmbedBuilder } = require("discord.js");
const config = require("../config");

module.exports = async function handleGuildMemberAdd(member) {
  try {
    const channel = member.guild.channels.cache.find(
      (ch) => ch.isTextBased() && ch.name.includes("welcome"),
    );

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle("Welcome to ZeroHost!")
      .setDescription(`Hey ${member}, welcome to the **ZeroHost** community!\n\nMake sure to read the rules in <#${config.rulesChannelId}> and choose your notification roles.`)
      .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
      .setFooter({ text: `Member #${member.guild.memberCount}` })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error("Error sending welcome message:", error);
  }
};
