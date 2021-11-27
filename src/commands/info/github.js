const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed , MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('github')
		.setDescription('github command usage and information!')
        .addSubcommand(subcommand => 
            subcommand
            .setName("username")
            .setDescription("Github information")
            .addStringOption(option => option.setName("username").setDescription("The github username")))

        .addSubcommand(subcommand => 
            subcommand
            .setName("info")
            .setDescription("Get github command info")),

	async execute(interaction, client) {

        const githubName = interaction.options.getString('username');

		if (interaction.options.getSubcommand() === "username"){
            if (githubName){

                fetch(`https://api.github.com/users/${githubName}`)
                .then(response => response.json())
                .then(data => {
                    let avatar = data.avatar_url.toLocaleString()
                    let type = data.type.toLocaleString()
                    let username = data.name.toLocaleString()
                    let public_repos = data.public_repos.toLocaleString()
                    let public_gists = data.public_gists.toLocaleString()
                    let created_at = data.created_at.toLocaleString()
                    let updated_at = data.updated_at.toLocaleString()
                    let followers = data.followers.toLocaleString()
                    let following= data.following.toLocaleString()
                    
                const userEmbed = new MessageEmbed()
                    .setTitle(`${username}'s Github profile!`)
                    .setAuthor(`${interaction.guild.name}`, client.user.displayAvatarURL())
                    .setDescription(`${githubName}'s github profile info and starts'`)
                    .addFields(
                        {name: `Username`, value: `${username}`, inline: true},
                        {name: `\u200B`, value: `\u200B`, inline: true},
                        {name: `Type`, value: `${type}`, inline: true},
                        {name: `Followers`, value: `${followers}`, inline: true},
                        {name: `\u200B`, value: `\u200B`, inline: true},
                        {name: `Following`, value: `${following}`, inline: true},
                        {name: `Public Repo`, value: `${public_repos}`, inline: true},
                        {name: `\u200B`, value: `\u200B`, inline: true},
                        {name: `Public Gists`, value: `${public_gists}`, inline: true},
                        {name: `Created At`, value: `${created_at}`, inline: true},
                        {name: `\u200B`, value: `\u200B`, inline: true},
                        {name: `Updated At`, value: `${updated_at}`, inline: true},
                    )
                    .setThumbnail(avatar)
                    .setFooter("For more commands do /help")
                    .setTimestamp()
    
                interaction.reply({ embeds: [userEmbed]})})
            } else {
                const userEmbed1 = new MessageEmbed()
                    .setTitle("Github command")
                    .setDescription("To use the command do /github user {github_username}")
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(":)");
                await interaction.reply({ embeds: [userEmbed1]})
            }
        } else if (interaction.options.getSubcommand() === "info"){
            const githubinfo = new MessageEmbed()
                .setTitle("github command")
                .setDescription("github command usage and informaion")
                .addFields(
                    {name: `Usage`, value: "`\/github\`", inline: true},
                    {name: `\u200B`, value: `\u200B`, inline: true},
                    {name: `Usage`, value: "`\/github username {github_username}\`", inline: true},
                )
                .setAuthor(`${interaction.guild.name}`, client.user.displayAvatarURL())
                .setThumbnail(interaction.guild.iconURL())
                .setImage("https://media.discordapp.net/attachments/912047994713550928/913488457110794260/unknown.png?width=490&height=376")
                .setTimestamp()
                .setColor("RANDOM")
                .setFooter("For info of all command do /help");
               
            await interaction.reply({ embeds: [githubinfo] })
        } else {
            await interaction.reply("No sub command was used");
        }
	},
};