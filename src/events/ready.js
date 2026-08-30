const { ActivityType } = require('discord.js');

module.exports = {
  name: 'clientReady',
  once: true,
  execute(client) {
    console.log(`[Miku AI] Logged in as ${client.user.tag}`);
    console.log(`[Miku AI] Serving ${client.guilds.cache.size} server(s)`);

    client.user.setPresence({
      activities: [{ name: '/help · mention me to chat', type: ActivityType.Listening }],
      status: 'online',
    });
  },
};
