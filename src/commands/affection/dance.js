const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed , MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dance')
		.setDescription('dance command usage and information!')
        .addSubcommand(subcommand => 
            subcommand
            .setName("user")
            .setDescription("dance a member")
            .addUserOption(option => option.setName("with").setDescription("The user mentioned")))

        .addSubcommand(subcommand => 
            subcommand
            .setName("info")
            .setDescription("Get dance command info")),

	async execute(interaction, client) {
		if (interaction.options.getSubcommand() === "user"){

            danceMixLinks = [ 'https://i.kym-cdn.com/photos/images/newsfeed/001/062/639/3fc.gif',
                'https://d2w9rnfcy7mm78.cloudfront.net/2145256/original_cd9c01187cead45cd791beafa78f7e08.gif?1525707539',
                'https://i2.wp.com/kakuchopurei.com/wp-content/uploads/2019/02/19carnivalphantasm.gif?resize=422%2C238&ssl=1',
                'https://64.media.tumblr.com/6d96d14077f04fdcdac6688e5a80a526/7f100653d5dd2f51-3e/s540x810/0bcc467120fc4aaf2bfbdc6c649dd3c7cb9872c2.gifv',
                'https://i2.wp.com/kakuchopurei.com/wp-content/uploads/2019/02/2harehareyukai.gif?resize=640%2C360&ssl=1' ]

            danceAloneLinks = [ 'https://giffiles.alphacoders.com/211/211791.gif',
                'https://c.tenor.com/15NLF1281h8AAAAM/anime-dance.gif',
                'https://tenor.com/view/copy-cat-vibe-dance-cute-sweet-gif-22026064',
                'https://tenor.com/view/paiyumi-anime-vibe-vtuber-anime-dance-paiyumi-dance-gif-22786428',
                'https://media.discordapp.net/attachments/883909391227691128/890522382375206942/idoly-pride-dance.gif',
                'https://media.discordapp.net/attachments/850224590092369970/871265966837870612/image0.gif' ]
            
            
            const randomNumMix = Math.floor(Math.random() * Math.floor(danceMixLinks.length))
            const randomNumAlone = Math.floor(Math.random() * Math.floor(danceAloneLinks.length))

            const user = interaction.options.getUser("with")
            const member = interaction.options.getMember("with") || interaction.member
            let avatar = member.displayAvatarURL()
            if (user){
                const userEmbed = new MessageEmbed()
                    .setTitle(`${interaction.user.username} danced with ${user.username} !`)
                    .setDescription("Amazing :D")
                    .setImage(danceMixLinks[randomNumMix])
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter("Nice !!");

                await interaction.reply({ embeds: [userEmbed]})
            } else {
                const userEmbed1 = new MessageEmbed()
                    .setTitle(`${interaction.user.username} danced alone :c`)
                    .setDescription("Nice moves !")
                    .setImage(danceAloneLinks[randomNumAlone])
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter("Next time dance with me :>");

                await interaction.reply({ embeds: [userEmbed1]})
            }
        } else if (interaction.options.getSubcommand() === "info"){
            const danceinfo = new MessageEmbed()
                .setTitle("dance command")
                .setDescription("dance command usage and informaion")
                .addFields(
                    {name: `Usage`, value: "`\/dance\`", inline: true},
                    {name: `\u200B`, value: `\u200B`, inline: true},
                    {name: `Usage`, value: "`\/dance @member\`", inline: true},
                )
                .setAuthor(`${interaction.guild.name}`, client.user.displayAvatarURL())
                .setThumbnail(interaction.guild.iconURL())
                .setImage("https://media.discordapp.net/attachments/912047994713550928/913854955398512670/unknown.png?width=489&height=399")
                .setTimestamp()
                .setColor("RANDOM")
                .setFooter("For info of all command do /help");
               
            await interaction.reply({ embeds: [danceinfo] })
        } else {
            await interaction.reply("No sub command was used");
        }
	},
};