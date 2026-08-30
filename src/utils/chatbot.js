const smartestchatbot = require('smartestchatbot');
const config = require('../config/config');
const persona = require('../config/persona');

const client = new smartestchatbot.Client(config.mikuApiToken);

/**
 * Sends a message to the API and returns Miku's reply.
 *
 * @param {string} message   The user's message content.
 * @param {string} userId    A stable numeric-ish ID for the speaker (Discord user ID works).
 * @param {string} language  Language code to reply in (see src/config/languages.js).
 * @returns {Promise<string>} The chatbot's reply text.
 */
async function getReply(message, userId, language = config.defaultLanguage) {
  try {
    const reply = await client.chat(
      {
        ...persona,
        message,
        owner: config.botOwnerName,
        master: config.botOwnerName,
        botmaster: config.botOwnerName,
        user: userId,
      },
      language,
    );
    return reply;
  } catch (err) {
    console.error('[Miku AI] API error:', err);
    throw new Error('Miku is having trouble thinking right now. Try again in a moment.');
  }
}

module.exports = { getReply };
