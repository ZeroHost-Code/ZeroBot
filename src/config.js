require("dotenv").config();

const required = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

module.exports = {
  token: required("BOT_TOKEN"),
  rulesChannelId: required("RULES_CHANNEL_ID"),
  pingChannelId: required("PING_CHANNEL_ID"),
  thumbsUpChannelId: required("THUMBS_UP_CHANNEL_ID"),
  acceptRoleId: required("ACCEPT_ROLE_ID"),
  pingRoleId: required("PING_ROLE_ID"),
  webUpdateRoleId: required("WEB_UPDATE_ROLE_ID"),
};
