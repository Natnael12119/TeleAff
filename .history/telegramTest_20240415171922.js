const TelegramBot = require('node-telegram-bot-api');

const token = '6898970993:AAHVaPN_IM6OOjcNEHmx2bhY8xlJ73WJ5eQ';
const chatId = '1002144470463';

const bot = new TelegramBot(token);

bot.on('message', (message) => {
	console.log(message.text);
});

bot
	.sendMessage(chatId, 'Test message from TeleAff Bot')
	.then(() => {
		console.log('Message sent to Telegram channel');
	})
	.catch((error) => {
		console.error('Error sending message to Telegram:', error);
	});
