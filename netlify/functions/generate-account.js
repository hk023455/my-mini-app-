const fetch = require('node-fetch');

// Your GitHub raw file URLs (replace with your actual GitHub repo)
const GITHUB_FILES = {
    ACCOUNTS: 'https://raw.githubusercontent.com/your-username/your-repo/main/Crunchyaccount.txt',
    SUSPICIOUS: 'https://raw.githubusercontent.com/your-username/your-repo/main/Crunchysuspecious.txt',
    DEAD: 'https://raw.githubusercontent.com/your-username/your-repo/main/Crunchydead.txt',
    GENERATION_LOG: 'https://raw.githubusercontent.com/your-username/your-repo/main/Crunchygenerationbyusers.txt'
};

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { userId } = JSON.parse(event.body);
        
        // Check if user has reached daily limit
        const canGenerate = await checkDailyLimit(userId);
        if (!canGenerate) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: false,
                    error: 'Daily generation limit reached'
                })
            };
        }

        // Get available accounts
        const account = await getAvailableAccount(userId);
        
        if (!account) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: false,
                    error: 'No accounts available'
                })
            };
        }

        // Log the generation
        await logGeneration(userId, account);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                account: account
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

async function checkDailyLimit(userId) {
    try {
        const logResponse = await fetch(GITHUB_FILES.GENERATION_LOG);
        const logText = await logResponse.text();
        const today = new Date().toISOString().split('T')[0];
        
        const userGenerations = logText.split('\n').filter(line => {
            const parts = line.split(',');
            return parts[0] === userId && parts[3] === today;
        });
        
        return userGenerations.length < 5; // Daily limit
    } catch (error) {
        return true; // If can't check, allow generation
    }
}

async function getAvailableAccount(userId) {
    // Get all account lists
    const [mainAccounts, susAccounts, deadAccounts] = await Promise.all([
        fetchAccounts(GITHUB_FILES.ACCOUNTS),
        fetchAccounts(GITHUB_FILES.SUSPICIOUS),
        fetchAccounts(GITHUB_FILES.DEAD)
    ]);

    // Filter out dead accounts and user's previous generations
    const userGenerations = await getUserGenerations(userId);
    
    const availableMain = mainAccounts.filter(acc => 
        !deadAccounts.includes(acc) && !userGenerations.includes(acc)
    );
    
    const availableSus = susAccounts.filter(acc => 
        !deadAccounts.includes(acc) && !userGenerations.includes(acc)
    );

    // 80% chance for main accounts, 20% for suspicious
    let account = null;
    if (availableMain.length > 0 && (availableSus.length === 0 || Math.random() < 0.8)) {
        account = availableMain[0];
    } else if (availableSus.length > 0) {
        account = availableSus[0];
    }

    return account ? parseAccount(account) : null;
}

async function fetchAccounts(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        return text.split('\n').filter(line => line.trim()).map(line => line.trim());
    } catch (error) {
        return [];
    }
}

async function getUserGenerations(userId) {
    try {
        const response = await fetch(GITHUB_FILES.GENERATION_LOG);
        const text = await response.text();
        return text.split('\n')
            .filter(line => line.startsWith(userId + ','))
            .map(line => line.split(',')[1] + ':' + line.split(',')[2]);
    } catch (error) {
        return [];
    }
}

function parseAccount(accountStr) {
    const [email, password] = accountStr.split(':');
    return { email, password };
}

async function logGeneration(userId, account) {
    // This would need GitHub API to actually write to file
    // For now, just log to console
    console.log('Generation Log:', {
        userId,
        email: account.email,
        password: account.password,
        date: new Date().toISOString().split('T')[0]
    });
}
