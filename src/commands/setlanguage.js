const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const storage = require('../utils/storage');
const config = require('../config/config');
const languages = require('../config/languages');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setlanguage')
    .setDescription("Set the language Miku replies in for this server")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption((option) =>
      option
        .setName('code')
        .setDescription('Language code, e.g. en, ja, hi, es')
        .setRequired(true)
        .setAutocomplete(true),
    ),

  async autocomplete(interaction) {
    const focused = interaction.options.getFocused().toLowerCase();
    const matches = Object.entries(languages)
      .filter(([code, name]) => code.startsWith(focused) || name.toLowerCase().startsWith(focused))
      .slice(0, 25)
      .map(([code, name]) => ({ name: `${name} (${code})`, value: code }));
    await interaction.respond(matches);
  },

  async execute(interaction) {
    const code = interaction.options.getString('code', true).toLowerCase();

    if (!languages[code]) {
      await interaction.reply({
        content: `⚠️ Unknown language code \`${code}\`. Use the autocomplete list or check the README for supported codes.`,
        ephemeral: true,
      });
      return;
    }

    if (!interaction.guildId) {
      await interaction.reply({ content: 'This command only works inside a server.', ephemeral: true });
      return;
    }

    storage.setLanguage(interaction.guildId, code, config.defaultLanguage);

    const embed = new EmbedBuilder()
      .setColor(0x9c6bd6)
      .setDescription(`🌐 Miku will now reply in **${languages[code]}** (\`${code}\`) in this server.`);

    await interaction.reply({ embeds: [embed] });
  },
};
