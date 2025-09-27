const fetch = require('node-fetch');

const GITHUB_FILES = {
    ACCOUNTS: 'https://raw.githubusercontent.com/your-username/your-repo/main/Crunchyaccount.txt',
    SUSPICIOUS: 'https://raw.githubusercontent.com/your-username/your-repo/main/Crunchysuspecious.txt',
    DEAD: 'https://raw.githubusercontent.com/your-username/your-repo/main/Crunchydead.txt',
    VERIFIED: 'https://raw.githubusercontent.com/your-username/your-repo/main/Crunchyverified.txt',
    GENERATION_LOG: 'https://raw.githubusercontent.com/your-username/your-repo/main/Crunchygenerationbyusers.txt',
    USERS: 'https://raw.githubusercontent.com/your-username/your-repo/main/botuser.txt'
};

exports.handler = async (event) => {
    try {
        const stats = await calculateStats();
        
        return {
            statusCode: 200,
            body: JSON.stringify(stats)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

async function calculateStats() {
    const [
        mainAccounts,
        susAccounts,
        deadAccounts,
        verifiedAccounts,
        generationLog,
        users
    ] = await Promise.all([
        fetchFile(GITHUB_FILES.ACCOUNTS),
        fetchFile(GITHUB_FILES.SUSPICIOUS),
        fetchFile(GITHUB_FILES.DEAD),
        fetchFile(GITHUB_FILES.VERIFIED),
        fetchFile(GITHUB_FILES.GENERATION_LOG),
        fetchFile(GITHUB_FILES.USERS)
    ]);

    const today = new Date().toISOString().split('T')[0];
    const todayGenerations = generationLog.filter(line => 
        line.includes(today)
    ).length;

    const uniqueUsers = new Set(users.map(line => line.split(',')[0])).size;

    return {
        totalAccounts: mainAccounts.length + susAccounts.length,
        workingAccounts: verifiedAccounts.length,
        todayGenerations: todayGenerations,
        userGenerations: 0, // Will be calculated per user
        totalUsers: uniqueUsers
    };
}

async function fetchFile(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        return text.split('\n').filter(line => line.trim());
    } catch (error) {
        return [];
    }
}
