import { Markup } from 'telegraf';
import screenshot from 'screenshot-desktop'
import {publicIpv4} from 'public-ip'
import CMD from 'node-cmd'
import { NodeAudioVolumeMixer } from "node-audio-volume-mixer";

export const _loadMenu = async (ctx) => {
	let id = ctx.message.chat.id
	if (id === 189721519) {
		ctx.reply('Привет, панель PC-CONTROLLER загружена!', Markup
		.keyboard([
			['💣 Заблокировать доступ', '📸 Скриншот'], // Row1 with 2 buttons
			['🔇 Выключить звук', '🔈 Включить звук'],
			['🛑 Перезапустить PC','📟 Показать IP','♻️ Выключить PC'], // Row2 with 2 buttons
		])
		.placeholder()
		.resize()
	)
	}
}
export const _handlerCommands = async(ctx, messageCommand) => {
    switch (messageCommand) {
        case '💣 Заблокировать доступ':
            CMD.run('tsdiscon')
            ctx.reply(`Успешно вышли с пользователя!`)
            break;
    //////////////////////////////////////////////////////
        case '🔇 Выключить звук':
            NodeAudioVolumeMixer.setMasterVolumeLevelScalar(0);
            ctx.reply(`Звук выключен!`)
            break;
    //////////////////////////////////////////////////////       
        case '📸 Скриншот':
            console.log(1)
            screenshot.listDisplays().then((displays) => {
                // displays: [{ id, name }, { id, name }]
                screenshot({ screen: displays[displays.length - 1].id })
                .then((img) => {
                  let imgbase = Buffer.from(img, 'base64');
                  ctx.replyWithPhoto({ source: imgbase }, { caption: "Экран 2" });
                });
              })
              screenshot.listDisplays().then((displays) => {
                // displays: [{ id, name }, { id, name }]
                screenshot({ screen: displays[displays.length - 2].id })
                  .then((img) => {
                    let imgbase = Buffer.from(img, 'base64');
                    ctx.replyWithPhoto({ source: imgbase }, { caption: "Экран 1" });
                  });
              })

            break;
    //////////////////////////////////////////////////////
        case '🔈 Включить звук':
            NodeAudioVolumeMixer.setMasterVolumeLevelScalar(1);
            ctx.reply(`Звук включен!`)
            break;
    //////////////////////////////////////////////////////
        case '🛑 Перезапустить PC':
            CMD.run(`shutdown /r 00"`, function(err, data, stderr) {
            });
            ctx.reply(`Компьютер перезапускается!`)
            break;
    //////////////////////////////////////////////////////
        case '📟 Показать IP':
            let networkInterfaces = await publicIpv4();
            return ctx.reply(`IP адресс ПК - ${networkInterfaces}`)
            break;
    //////////////////////////////////////////////////////
        case '♻️ Выключить PC':
            CMD.run(`shutdown -s -t 00"`, function(err, data, stderr) {
            });
            ctx.reply(`Компьютер выключен!`)
            break;
    //////////////////////////////////////////////////////
        default:
            break;
    }
}

export default { _handlerCommands, _loadMenu }