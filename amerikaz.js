const { Bot } = require('grammy');

const bot = new Bot('6617882519:AAH2dcfaGVCMx0VnUqK7dQTEjB-u2nJsxpI');

const GROUP_ID = '-1001943931837';

// Variável para armazenar o link
const link = 'https://seu-link-aqui.com';

const userActivation = new Map();

bot.on('message', async (ctx) => {
    const userId = ctx.from.id;

    if (ctx.chat.type === 'private' && ctx.message.text) {
        if (ctx.message.text === '/codigosecreto123') {
            userActivation.set(userId, true);
            await ctx.reply('Bot ativado!');
            return;
        }

        if (userActivation.get(userId)) {
            // Divida a mensagem com base no emoji "💸"
            const textParts = ctx.message.text.split('💸');

            // Verifique se há algum texto após o emoji "💸"
            if (textParts.length > 1 && textParts[1].trim() !== '') {
                // Adicione o link ao texto que segue o emoji "💸" usando formatação HTML
                textParts[1] = `<a href="${link}">${textParts[1].trim()}</a>`;
            }

            // Junte as partes de volta em uma mensagem completa
            const messageText = textParts.join('💸');

            // Envie a mensagem final para o grupo com formatação HTML
            await ctx.api.sendMessage(GROUP_ID, messageText, { parse_mode: 'HTML' });
        }
    }
});

bot.catch((err) => {
    console.error('Error: ', err);
});

bot.start();