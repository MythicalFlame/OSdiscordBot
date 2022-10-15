const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans the user specified.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to ban.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for the ban.')
        .setRequired(false)),
	async execute (interaction) {
    const { PermissionsBitField } = require('discord.js');
    const index = require('../index.js');
    const user = interaction.options.getUser('target');
    const member = interaction.guild.members.cache.get(user.id);
    const client = index.botClient;
    const reason = interaction.options.getString('reason');
    //code
    if (interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers, true)) {
      switch (member.id) {
        case (interaction.member.id):
          return interaction.reply('You cannot ban yourself!');
        case (client.user.id):
          return interaction.reply('You cannot ban the bot!');
        default:
          if (!member.bannable) {
            await interaction.reply('I cannot ban this user!');
          } else if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            await interaction.reply('You cannot ban someone higher than or equal to you in the role hierarchy!')
          } else {
            await interaction.reply(`${member} has been banned from the server for ${reason}`);
            await member.ban({reason: `${interaction.user} has stated the reason: ${reason}`});
          }
          break;
      }
    } else {
      await interaction.reply('You do not have ban permissions!');
    }
	},
};