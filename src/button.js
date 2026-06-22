const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function buildRulesButtons() {
  const button = new ButtonBuilder()
    .setCustomId("accept_rules")
    .setLabel("I agree")
    .setEmoji({ name: "✅" })
    .setStyle(ButtonStyle.Success);

  return new ActionRowBuilder().addComponents(button);
}

function buildPingButtons() {
  const ping = new ButtonBuilder()
    .setCustomId("ping_down_maintenance")
    .setLabel("Down / Maintenance")
    .setEmoji({ name: "🔔" })
    .setStyle(ButtonStyle.Primary);

  const web = new ButtonBuilder()
    .setCustomId("ping_web_update")
    .setLabel("Web Update")
    .setEmoji({ name: "🌐" })
    .setStyle(ButtonStyle.Primary);

  const unsub = new ButtonBuilder()
    .setCustomId("unsubscribe_all")
    .setLabel("Unsubscribe to all")
    .setEmoji({ name: "🔕" })
    .setStyle(ButtonStyle.Danger);

  return new ActionRowBuilder().addComponents(ping, web, unsub);
}

module.exports = { buildRulesButtons, buildPingButtons };
