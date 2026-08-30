const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show what Miku can do'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x9c6bd6)
      .setTitle('✨ Miku AI — Help')
      .setDescription(
        'Mention me or reply to one of my messages and I\'ll chat back. ' +
        'I can also reply in your language of choice!',
      )
      .addFields(
        { name: '/chat <message>', value: 'Talk to Miku directly, no mention needed.' },
        { name: '/setlanguage <code>', value: 'Set the reply language for this server (needs Manage Server).' },
        { name: '/togglechat <enabled>', value: 'Turn mention/reply auto-responses on or off (needs Manage Server).' },
        { name: '/stats', value: "See this server's Miku stats." },
        { name: '/ping', value: "Check Miku's latency." },
      )
      .setFooter({ text: 'Powered by SmartestChatBot · github.com/Lebyy/SmartestChatBot' });

    await interaction.reply({ embeds: [embed] });
  },
};
