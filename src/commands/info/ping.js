const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed , MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {

	const ping = new MessageEmbed()
	.setTitle("Taiga's ping")
	.setDescription(`Pong! Taiga has \`${client.ws.ping}\` ms ping 🏓`)
	.setFooter(client.user.tag , client.user.displayAvatarURL())
	.setTimestamp()

	await interaction.reply({embeds: [ping]});
	},
};