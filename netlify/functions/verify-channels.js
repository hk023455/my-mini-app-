const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN || '8236893425:AAFNPK6GnoTkxyjjSI4WgRYbhwZIf_zS-9w');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { userId } = JSON.parse(event.body);
        
        // Check if user is member of required channels
        const isMember = await checkChannelMembership(userId);
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                verified: isMember,
                userId: userId
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

async function checkChannelMembership(userId) {
    const requiredChannels = {
        '-1002649315259': "ʅσɠιƈ.."
    };

    try {
        for (const [channelId, channelName] of Object.entries(requiredChannels)) {
            const member = await bot.telegram.getChatMember(channelId, userId);
            if (member.status === 'left' || member.status === 'kicked') {
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error('Channel check error:', error);
        return false;
    }
}
