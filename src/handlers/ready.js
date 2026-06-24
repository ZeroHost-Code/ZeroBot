const config = require("../config");
const buildRulesEmbed = require("../embed");
const buildPingEmbed = require("../pingEmbed");
const { buildRulesButtons, buildPingButtons } = require("../button");

function embedSignature(embed) {
  const fields = (embed.fields || []).map((f) => `${f.name}|${f.value}`).join("\n");
  return `${embed.title}|${embed.description}|${embed.color}|${fields}|${embed.image?.url || ""}|${embed.footer?.text || ""}|${embed.timestamp || ""}`;
}

function componentsSignature(row) {
  const comps = row.components || [];
  return comps
    .map((c) => {
      const id = c.custom_id || c.customId || "";
      const label = c.label || "";
      const style = c.style ?? "";
      const emoji = c.emoji?.name || "";
      return `${id}|${label}|${style}|${emoji}`;
    })
    .join("|");
}

function messageSignature(msg) {
  const embeds = msg.embeds.map(embedSignature).join("||");
  const components = (msg.components || []).map(componentsSignature).join("||");
  return `${embeds}||${components}`;
}

function freshSignature(embed, row) {
  const e = embed.toJSON();
  const eStr = embedSignature(e);
  const cStr = componentsSignature(row.toJSON());
  return `${eStr}||${cStr}`;
}

async function syncChannel(channelId, embed, row, client) {
  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      console.warn(`Channel ${channelId} not found or not text-based, skipping.`);
      return;
    }

    const messages = await channel.messages.fetch({ limit: 10 });
    const botMsg = messages.find((m) => m.author.id === client.user.id && m.embeds.length > 0);

    if (botMsg) {
      const existing = messageSignature(botMsg);
      const fresh = freshSignature(embed, row);

      if (existing === fresh) {
        console.log(`No changes in ${channelId}, skipping.`);
        return;
      }

      await botMsg.edit({ embeds: [embed], components: [row] });
      console.log(`Message edited in ${channelId}.`);
    } else {
      await channel.send({ embeds: [embed], components: [row] });
      console.log(`Message sent in ${channelId}.`);
    }
  } catch (error) {
    console.error(`Error syncing channel ${channelId}:`, error);
  }
}

module.exports = async function handleReady(client) {
  console.log(`Logged in as ${client.user.tag}`);

  client.user.setPresence({
    activities: [{ name: "🛠 In dev...", type: 0 }],
    status: "online",
  });

  await syncChannel(config.rulesChannelId, buildRulesEmbed(), buildRulesButtons(), client);
  await syncChannel(config.pingChannelId, buildPingEmbed(), buildPingButtons(), client);
};
