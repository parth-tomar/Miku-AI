const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Check Miku's latency"),

  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const roundtrip = sent.createdTimestamp - interaction.createdTimestamp;

    const embed = new EmbedBuilder()
      .setColor(0x9c6bd6)
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Roundtrip latency', value: `${roundtrip}ms`, inline: true },
        { name: 'WebSocket heartbeat', value: `${interaction.client.ws.ping}ms`, inline: true },
      );

    await interaction.editReply({ content: null, embeds: [embed] });
  },
};
