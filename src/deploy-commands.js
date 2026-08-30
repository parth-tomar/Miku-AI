const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const config = require('./config/config');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath).filter((f) => f.endsWith('.js'))) {
  const command = require(path.join(commandsPath, file));
  if (command?.data) commands.push(command.data.toJSON());
}

const rest = new REST().setToken(config.discordToken);

(async () => {
  try {
    console.log(`[Miku AI] Deploying ${commands.length} slash command(s)...`);

    const route = config.guildId
      ? Routes.applicationGuildCommands(config.clientId, config.guildId)
      : Routes.applicationCommands(config.clientId);

    await rest.put(route, { body: commands });

    console.log(
      config.guildId
        ? `[Miku AI] Commands deployed to guild ${config.guildId} (instant).`
        : '[Miku AI] Commands deployed globally (can take up to an hour to appear).',
    );
  } catch (err) {
    console.error('[Miku AI] Failed to deploy commands:', err);
    process.exitCode = 1;
  }
})();
