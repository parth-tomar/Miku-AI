# Miku AI

A multilingual Discord chatbot built on. Mention Miku or reply to one of her messages and she'll chat back in over 100 languages.

## Features

- 💬 Chat by mentioning the bot or replying to one of its messages
- 🌐 Per-server language selection (`/setlanguage`) across 100+ languages
- 🔇 Toggle auto-chat on/off per server (`/togglechat`)
- 🎤 A configurable "Miku" persona (see `src/config/persona.js`)
- 📊 Simple stats tracking per server
- No database required — settings persist to a local JSON file

## Setup

1. **Clone and install**

   ```bash
   git clone https://github.com/<your-username>/miku-ai.git
   cd miku-ai
   npm install
   ```

2. **Get your credentials**

   - Discord bot token + client ID: [Discord Developer Portal](https://discord.com/developers/applications) — create an application, add a bot, and enable the **Message Content Intent** under Bot settings.
   - SmartestChatBot API token: [api.lebyy.me/dashboard](https://api.lebyy.me/dashboard)

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in `DISCORD_TOKEN`, `CLIENT_ID`, and `MIKU_API_TOKEN` at minimum. `GUILD_ID` is optional — set it during development so slash commands register instantly to one server instead of waiting up to an hour for a global rollout.

4. **Deploy slash commands**

   ```bash
   npm run deploy
   ```

5. **Start the bot**

   ```bash
   npm start
   ```

## Commands

| Command | Description | Permission |
|---|---|---|
| `/chat <message>` | Talk to Miku directly | Everyone |
| `/setlanguage <code>` | Set Miku's reply language for this server | Manage Server |
| `/togglechat <enabled>` | Turn mention/reply auto-responses on or off | Manage Server |
| `/stats` | View this server's Miku stats | Everyone |
| `/ping` | Check latency | Everyone |
| `/help` | List all commands | Everyone |

You can also just **@mention Miku** or **reply to one of her messages** anywhere in a server to chat, without a slash command.

## Project structure

```
src/
├── commands/       # Slash commands (one file per command)
├── config/         # Env config, persona traits, supported language list
├── events/         # Discord.js event handlers (ready, messageCreate, interactionCreate)
├── utils/          # SmartestChatBot wrapper + JSON-backed guild settings storage
├── deploy-commands.js
└── index.js        # Entry point — loads commands/events and logs in
data/
└── guildSettings.json   # Auto-created; per-guild language/toggle/message-count
```

## Customizing Miku's personality

`src/config/persona.js` maps directly onto the optional persona fields SmartestChatBot accepts (favorite color, hobbies, appearance, etc). Edit that file to reshape how Miku talks about herself — no code changes needed elsewhere.

## Notes

- This bot is server-only (no DMs) by design; strip the guild check in `src/events/messageCreate.js` if you want DM support.
- Settings are stored in a flat `data/guildSettings.json` file. Fine for small-to-medium bots; swap in SQLite/Mongo in `src/utils/storage.js` if you outgrow it.
- Miku is an entertainment-purpose chatbot API, not a general-purpose LLM. Expect fun, personality-driven replies rather than factual accuracy.

## License

MIT — see [LICENSE](LICENSE).
