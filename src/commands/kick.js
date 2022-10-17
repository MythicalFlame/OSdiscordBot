const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks the user specified.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to kick.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for the kick.')
        .setRequired(false)),
	async execute (interaction) {
    const { PermissionsBitField } = require('discord.js');
    const index = require('../index.js');
    const user = interaction.options.getUser('target');
    const member = interaction.guild.members.cache.get(user.id);
    const client = index.botClient;
    const reason = interaction.options.getString('reason');
    //code
    if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers, true)) {
      switch (member.id) {
        case (interaction.member.id):
          return interaction.reply('You cannot kick yourself!');
        case (client.user.id):
          return interaction.reply('You cannot kick the bot!');
        default:
          if (!member.kickable) {
            await interaction.reply('I cannot kick this user!');
          } else if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            await interaction.reply('You cannot kick someone higher than or equal to you in the role hierarchy!')
          } else {
            await interaction.reply(`${member} has been kicked from the server for ${reason}`);
            await member.kick({reason: `${interaction.user} has stated the reason: ${reason}`});
          }
          break;
      }
    } else {
      await interaction.reply('You do not have kick permissions!');
    }
	},
};