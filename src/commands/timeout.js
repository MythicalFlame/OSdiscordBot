const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Sets and removes timeouts.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('set')
        .setDescription('Timeouts the user specified.')
        .addUserOption(option =>
          option.setName('target')
          .setDescription('The user to timeout.')
          .setRequired(true))
        .addIntegerOption(option =>
          option.setName('minutes')
          .setDescription('The amount of minutes to timeout.')
          .setRequired(true))
        .addStringOption(option =>
          option.setName('reason')
          .setDescription('The reason for the kick.')
          .setRequired(false)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Removes the timeout of the user specified.')
        .addUserOption(option =>
          option.setName('target')
          .setDescription('The user to have their timeout removed.')
          .setRequired(true))
        .addStringOption(option =>
          option.setName('reason')
          .setDescription('The reason for the timeout being removed.')
          .setRequired(false))),
  async execute (interaction) {
    /*
      Set timeout subcommand
    */
    if (interaction.options.getSubcommand() === 'set') {
      const { PermissionsBitField } = require('discord.js');
      const index = require('../index.js');
      const user = interaction.options.getUser('target');
      const member = interaction.guild.members.cache.get(user.id);
      const client = index.botClient;
      const reason = interaction.options.getString('reason');
      const minutes = interaction.options.getInteger('minutes');
      //code
      if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers, true)) {
        switch (member.id) {
          case (interaction.member.id):
            return interaction.reply('You cannot timeout yourself!');
          case (client.user.id):
            return interaction.reply('You cannot timeout the bot!');
          default:
            if (!member.moderatable) {
              await interaction.reply('I cannot timeout this user!');
            } else if (member.roles.highest.position >= interaction.member.roles.highest.position) {
              await interaction.reply('You cannot timeout someone higher than or equal to you in the role hierarchy!');
            } else if (member.communicationDisabledUntilTimestamp != null) {
              await interaction.reply('This member is already timed out!');
            } else {
              if (reason === null) {
                reason = "No reason supplied.";
              }
              await interaction.reply(`${member} has been timedout from the server for ${minutes}. The reason supplied was: ${reason}`);
              await member.timeout(minutes * 60 * 1000, `${interaction.user} has stated the reason: ${reason}`);
            }
            break;
        }
      } else {
        await interaction.reply('You do not have timeout permissions!'); 
      }
    /*
      Remove timeout subcommand
    */
    } else if (interaction.options.getSubcommand() === 'remove') {
      const { PermissionsBitField } = require('discord.js');
      const index = require('../index.js');
      const user = interaction.options.getUser('target');
      const member = interaction.guild.members.cache.get(user.id);
      const client = index.botClient;
      const reason = interaction.options.getString('reason');
      //code
      if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers, true)) {
        switch (member.id) {
          case (interaction.member.id):
            return interaction.reply('You cannot untimeout yourself!');
          case (client.user.id):
            return interaction.reply('You cannot untimeout the bot!');
          default:
            if (!member.moderatable) {
              await interaction.reply('I cannot untimeout this user!');
            } else if (member.roles.highest.position >= interaction.member.roles.highest.position) {
              await interaction.reply('You cannot untimeout someone higher than or equal to you in the role hierarchy!');
            } else if (member.communicationDisabledUntilTimestamp === null) {
              await interaction.reply('This member is not timed out!');
            } else {
              if (reason === null) {
                reason = "No reason supplied.";
              }
              
              await interaction.reply(`${member} has been untimedout from the server for the reason ${reason}`);
              await member.timeout(null, `${interaction.user} has stated the reason: ${reason}`);
            }
            break;
        }
      } else {
        await interaction.reply('You do not have timeout permissions!');
      }
    }
    /*const { PermissionsBitField } = require('discord.js');
    const index = require('../index.js');
    const user = interaction.options.getUser('target');
    const member = interaction.guild.members.cache.get(user.id);
    const client = index.botClient;
    const reason = interaction.options.getString('reason');
    const minutes = interaction.options.getInteger('minutes');
    //code
    if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers, true)) {
      switch (member.id) {
        case (interaction.member.id):
          return interaction.reply('You cannot timeout yourself!');
        case (client.user.id):
          return interaction.reply('You cannot timeout the bot!');
        default:
          if (!member.moderatable) {
            await interaction.reply('I cannot kick this user!');
          } else if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            await interaction.reply('You cannot timeout someone higher than or equal to you in the role hierarchy!')
          } else {
            if (reason === null) {
              reason = "No reason supplied.";
            }
            await interaction.reply(`${member} has been timedout from the server for ${minutes}. The reason supplied was: ${reason}`);
            await member.timeout(minutes * 60 * 1000, `${interaction.user} has stated the reason: ${reason}`);
          }
          break;
      }
    } else {
      await interaction.reply('You do not have timeout permissions!');
    }*/
	},
};