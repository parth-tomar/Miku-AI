const { SlashCommandBuilder } = require('discord.js');
const { getReply } = require('../utils/chatbot');
const storage = require('../utils/storage');
const config = require('../config/config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Talk to Miku directly')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('What do you want to say to Miku?')
        .setRequired(true),
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const settings = storage.getGuild(interaction.guildId ?? interaction.user.id, config.defaultLanguage);
    const userMessage = interaction.options.getString('message', true);

    try {
      const reply = await getReply(userMessage, interaction.user.id, settings.language);
      storage.incrementMessageCount(interaction.guildId ?? interaction.user.id, config.defaultLanguage);
      await interaction.editReply(reply);
    } catch (err) {
      await interaction.editReply(`⚠️ ${err.message}`);
    }
  },
};
