const greetings = [
  /\b(hello|hi|hey|yo|sup)\b/i,
  /\b(bonjour|salut|coucou|bjr)\b/i,
  /\b(good morning|good evening|good day|g'morning|gm)\b/i,
];

const responses = [
  "Hey there!",
  "Hello!",
  "Hi!",
  "Hey!",
  "Bonjour!",
];

module.exports = async function handleGreeting(message) {
  const content = message.content.trim();

  if (content.length > 50) return;

  const matched = greetings.some((pattern) => pattern.test(content));
  if (!matched) return;

  const response = responses[Math.floor(Math.random() * responses.length)];
  await message.channel.send(response);
};
