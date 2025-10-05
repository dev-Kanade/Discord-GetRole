const { Client, GatewayIntentBits, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');


const config = require("./config.json")


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});


client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);


    const channel = await client.channels.fetch(config.channel);
    if (!channel) {
        console.error('指定されたチャンネルが見つかりません。');
        return;
    }

   
    const embed = new EmbedBuilder()
        .setTitle('ロール選択')
        .setDescription('以下のドロップダウンから選択してロールを選択してください。')
        .setColor('#0099ff');


    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('role_select')
        .setPlaceholder('ロールを選択してください')
        .addOptions(
            Object.entries(config.mapping).map(([key, roleId]) => (
                new StringSelectMenuOptionBuilder()
                    .setLabel(key)
                    .setValue(roleId)
                    .setDescription(`${key} ロールを付与/剥奪します`)
            ))
        );


    const row = new ActionRowBuilder().addComponents(selectMenu);

    await channel.send({ embeds: [embed], components: [row] });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'role_select') {
        const selectedRoleId = interaction.values[0]; 
        const member = interaction.member;


        const role = interaction.guild.roles.cache.get(selectedRoleId);
        if (!role) {
            await interaction.reply({ content: '指定されたロールが見つかりません。', ephemeral: true });
            return;
        }

        try {
         
            if (member.roles.cache.has(selectedRoleId)) {
             
                await member.roles.remove(role);
                await interaction.reply({ content: `${role.name} ロールを剥奪しました！`, ephemeral: true });
            } else {
            
                await member.roles.add(role);
                await interaction.reply({ content: `${role.name} ロールを付与しました！`, ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'ロールの操作に失敗しました。ボットの権限を確認してください。', ephemeral: true });
        }
    }
});


client.login(config.token);
