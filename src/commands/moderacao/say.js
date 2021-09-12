const Command = require('../../structures/Command')

const { MessageEmbed} = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'falar',
            description: 'Faz com que o bot diga alguma mensagem.',
            options: [
                {
                    name: 'canal',
                    type: 'CHANNEL',
                    description: 'Canal onde a mensagem sera enviada.',
                    required: true
                },
                {
                    name: 'mensagem',
                    type: 'STRING',
                    description: 'A mensagem que sera enviada no canal.',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {
        const canal = interaction.options.getChannel('canal')
        if(!['GUILD_TEXT', 'GUILD_ANNOUCEMENTS'].includes(canal.type)) return interaction.reply({content: 'ERRO | Informe um canal de texto ou de anuncios!', ephemeral: true})
        
        const text = interaction.options.getString('mensagem')

        const embed = new MessageEmbed()
            .setTitle(`Uma mensagem foi enviada neste canal.`)
            .setDescription(text)
            .setColor('#0000ff')
            .setTimestamp()

        canal.send({ embeds: [embed] })
            .then(() => interaction.reply({content: `Mensagem enviada com sucesso no canal \`${canal.name}\`,`, ephemeral: true}))
            .catch(() => interaction.reply({ content: `ERRO | Erro ao tentar enviar a mensagem no canal.`, ephemeral: true}))
    }
}
