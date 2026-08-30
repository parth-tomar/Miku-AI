require('dotenv').config();

function required(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`[Miku AI] Missing required environment variable: ${name}`);
    console.error('[Miku AI] Copy .env.example to .env and fill in your credentials.');
    process.exit(1);
  }
  return value;
}

module.exports = {
  discordToken: required('DISCORD_TOKEN'),
  clientId: required('CLIENT_ID'),
  guildId: process.env.GUILD_ID || null,
  lebyyApiToken: required('MIKU_API_TOKEN'),
  botOwnerName: process.env.BOT_OWNER_NAME || 'Shady',
  defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
  botName: 'Miku AI',
};
