const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed , MessageAttachment } = require('discord.js');
const { readdirSync } = require("fs");
const { MessageActionRow, MessageButton } = require('discord.js');
const emo = require("../../commands/help/emoji.json");
let color = "#00ccff";

module.exports = {

	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('help command'),
	async execute(interaction , client, args, Discord) {
		
          let categories = [];
    
          let ignored = [
            "dev",
            "configuration",
            "utils",
            "reportadd",
          ];
    
          readdirSync("./src/commands/").forEach((dir) => {
            if (ignored.includes(dir.toLowerCase())) return;
            const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;
            let cats = new Object();
    
            cats = {
              name: name,
              value: `\`${dir.toLowerCase()}\``,
              inline: true,
            };
    
            categories.push(cats);
            //cots.push(dir.toLowerCase());
          });

          const user = interaction.member.user
          const member = interaction.member
          let avatar = member.displayAvatarURL()

      const embed = new MessageEmbed()
      .setTitle("Our full help menu!")
      .setAuthor(`${user.username}`, avatar )
      .setDescription( `\`\`\`js\nPrefix: Slash commands\n\nExtra information: <> If you see any error or any kind of bug please report to us\n\nSupport Server:- https://discord.gg/Ecy6WpEZsD !\`\`\`\n\n> To check out a category, click on the respective buttons below\n\n`)
      .addFields(categories)
      .setFooter(client.user.tag , client.user.displayAvatarURL())
      .setTimestamp()
      .setImage("https://media.discordapp.net/attachments/912537423160942593/913322763446542376/IMG_7116.png?width=1188&height=389")
      .setThumbnail(avatar)
      .setColor(color);

      const info = new MessageEmbed()
      .setTitle("Info command!")
      .setAuthor(`${user.username}`, avatar )
      .addFields(
        {name: `\u200B`, value: "`\ ping \` , `\ info user \` , `\ info server \`", inline: true},
      )
      .setFooter(client.user.tag , client.user.displayAvatarURL())
      .setTimestamp()
      .setImage("https://media.discordapp.net/attachments/912537423160942593/913322763446542376/IMG_7116.png?width=1188&height=389")
      .setThumbnail(avatar)
      .setColor(color);
      
      const affection = new MessageEmbed()
      .setTitle("Affection commands!")
      .setAuthor(`${user.username}`, avatar)
      .addFields(
        {name: `\u200B`, value: "`\ kiss \` , `\ boop \` , `\ hug \` , `\ kill \` , `\ pat \`", inline: true},
      )
      .setFooter(client.user.tag , client.user.displayAvatarURL())
      .setTimestamp()
      .setImage("https://media.discordapp.net/attachments/912537423160942593/913322763446542376/IMG_7116.png?width=1188&height=389")
      .setThumbnail(avatar)
      .setColor(color);

      const row = new MessageActionRow().addComponents(
          new MessageButton()
              .setCustomId('base')
              .setLabel('Help')
              .setStyle('PRIMARY'),
          new MessageButton()
              .setCustomId('info')
              .setLabel('Info')
              .setStyle('SECONDARY'),
          new MessageButton()
              .setCustomId('affection')
              .setLabel('Affection')
              .setStyle('SECONDARY'),
          );

          await interaction.reply({ embeds: [embed], components: [row] })

          const filter = i => i.customId === 'base' && i.user.id === interaction.member.user.id;

          const collectorHelp = interaction.channel.createMessageComponentCollector({ filter, time: 50000 });
          
          collectorHelp.on('collect', async i => {
            if (i.customId === 'base') {
              await i.deferUpdate()
              await i.editReply({ embeds: [embed], components: [row] });
            }
          });

          const filter1 = i => i.customId === 'info' && i.user.id === interaction.member.user.id;

          const collectorInfo = interaction.channel.createMessageComponentCollector({ filter1, time: 50000 });
          
          collectorInfo.on('collect', async i => {
            if (i.customId === 'info') {
              await i.deferUpdate()
              await i.editReply({ embeds: [info], components: [row] });
            }
          });

          const filter2 = i => i.customId === 'affection' && i.user.id === interaction.member.user.id;

          const collectorMod = interaction.channel.createMessageComponentCollector({ filter2, time: 50000 });
          
          collectorMod.on('collect', async i => {
            if (i.customId === 'affection') {
              await i.deferUpdate()
              await i.editReply({ embeds: [affection], components: [row] });
            }
          });
	},
};
