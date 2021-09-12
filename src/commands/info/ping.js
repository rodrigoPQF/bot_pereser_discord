const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Mostra o pingo do bot.'
        })
    }

    run = (interaction) => {
        interaction.reply({
            content: `O ping do bot e \`${this.client.ws.ping}\`ms.`,
            ephemeral: true
        })
    }
}
