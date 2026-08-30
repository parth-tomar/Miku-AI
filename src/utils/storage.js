const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'guildSettings.json');

/**
 * Lightweight JSON-file store for per-guild Miku AI settings.
 * Keyed by guild ID. No external DB required, good enough for a
 * single-process bot. Swap this out for Sqlite/Mongo if you scale up.
 */
class Storage {
  constructor() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2));
    this.cache = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }

  _persist() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.cache, null, 2));
  }

  _defaults(defaultLanguage) {
    return {
      language: defaultLanguage,
      chatEnabled: true,
      messageCount: 0,
    };
  }

  getGuild(guildId, defaultLanguage) {
    if (!this.cache[guildId]) {
      this.cache[guildId] = this._defaults(defaultLanguage);
      this._persist();
    }
    return this.cache[guildId];
  }

  setLanguage(guildId, languageCode, defaultLanguage) {
    const settings = this.getGuild(guildId, defaultLanguage);
    settings.language = languageCode;
    this._persist();
    return settings;
  }

  setChatEnabled(guildId, enabled, defaultLanguage) {
    const settings = this.getGuild(guildId, defaultLanguage);
    settings.chatEnabled = enabled;
    this._persist();
    return settings;
  }

  incrementMessageCount(guildId, defaultLanguage) {
    const settings = this.getGuild(guildId, defaultLanguage);
    settings.messageCount += 1;
    this._persist();
    return settings.messageCount;
  }
}

module.exports = new Storage();
