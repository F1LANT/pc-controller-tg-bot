import { Telegraf, Markup } from 'telegraf'
import { _handlerCommands, _loadMenu } from './module/handler.js';

// config module
const token = ''

const bot = new Telegraf(token);


bot.start(async (ctx) => {
    _loadMenu(ctx)
});


bot.on('text', async (ctx) => {
    if (ctx.message.chat.id === 189721519) {
        await _handlerCommands(ctx, ctx.message.text)
    }
})


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));