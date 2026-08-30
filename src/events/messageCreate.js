const { getReply } = require('../utils/chatbot');
const storage = require('../utils/storage');
const config = require('../config/config');

// Strips leading/trailing mention tokens so the chatbot doesn't see raw <@id> noise.
function cleanContent(message) {
  return message.content
    .replace(new RegExp(`<@!?${message.client.user.id}>`, 'g'), '')
    .trim();
}

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;
    if (!message.guild) return; // keep it server-only; DMs are out of scope for this bot

    const settings = storage.getGuild(message.guild.id, config.defaultLanguage);
    if (!settings.chatEnabled) return;

    const mentioned = message.mentions.has(message.client.user.id);
    const repliedToBot =
      message.reference &&
      (await message.fetchReference().catch(() => null))?.author?.id === message.client.user.id;

    if (!mentioned && !repliedToBot) return;

    const content = cleanContent(message);
    if (!content) return;

    await message.channel.sendTyping();

    try {
      const reply = await getReply(content, message.author.id, settings.language);
      storage.incrementMessageCount(message.guild.id, config.defaultLanguage);
      await message.reply({ content: reply, allowedMentions: { repliedUser: false } });
    } catch (err) {
      console.error('[Miku AI] Failed to generate reply:', err);
      await message.reply({
        content: `⚠️ ${err.message}`,
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
