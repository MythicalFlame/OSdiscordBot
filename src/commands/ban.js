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
    const user = interaction.options.getUser('target');
    const member = interaction.guild.members.cache.get(user.id);
    const reason = interaction.options.getString('reason');
    //code
    if (interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      switch (member.id) {
        case (interaction.member.id):
          return interaction.reply('You cannot ban yourself!');
        case (!member.bannable):
          return interaction.reply('I cannot ban this user!');
        case (bot.user.id):
          return interaction.reply('You cannot ban the bot!');
        case (member.roles.highest.position >= interaction.member.roles.highest.position):
          return interaction.reply('You cannot ban someone higher in the role hierarchy!');
        default:
          await interaction.reply(`${member} has been banned from the server for ${reason}`);
          await member.ban({reason: `${interaction.user} has stated the reason: ${reason}`});
          break;
      }
    }
	},
};