const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const storage = require('../utils/storage');
const config = require('../config/config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('togglechat')
    .setDescription('Turn Miku auto-replies (on mention/reply) on or off for this server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addBooleanOption((option) =>
      option.setName('enabled').setDescription('Should Miku respond when mentioned or replied to?').setRequired(true),
    ),

  async execute(interaction) {
    if (!interaction.guildId) {
      await interaction.reply({ content: 'This command only works inside a server.', ephemeral: true });
      return;
    }

    const enabled = interaction.options.getBoolean('enabled', true);
    storage.setChatEnabled(interaction.guildId, enabled, config.defaultLanguage);

    const embed = new EmbedBuilder()
      .setColor(0x9c6bd6)
      .setDescription(enabled ? '✅ Miku will now respond to mentions and replies.' : '🔇 Miku will stay quiet unless you use `/chat`.');

    await interaction.reply({ embeds: [embed] });
  },
};
