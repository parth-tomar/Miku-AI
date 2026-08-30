const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const storage = require('../utils/storage');
const config = require('../config/config');
const languages = require('../config/languages');

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription("View Miku's stats for this server"),

  async execute(interaction) {
    const settings = storage.getGuild(interaction.guildId ?? interaction.user.id, config.defaultLanguage);

    const embed = new EmbedBuilder()
      .setColor(0x9c6bd6)
      .setTitle('📊 Miku AI Stats')
      .addFields(
        { name: 'Servers', value: `${interaction.client.guilds.cache.size}`, inline: true },
        { name: 'Uptime', value: formatUptime(process.uptime()), inline: true },
        { name: 'This server\'s language', value: `${languages[settings.language] ?? settings.language}`, inline: true },
        { name: 'Auto-chat', value: settings.chatEnabled ? 'Enabled' : 'Disabled', inline: true },
        { name: 'Messages replied to (this server)', value: `${settings.messageCount}`, inline: true },
      )
      .setFooter({ text: 'Powered by SmartestChatBot' });

    await interaction.reply({ embeds: [embed] });
  },
};
