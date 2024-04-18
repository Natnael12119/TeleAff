const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const chatId = '@YOUR_CHANNEL_ID'; // Replace with your channel ID

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
