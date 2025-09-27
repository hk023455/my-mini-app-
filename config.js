// ===== CRUNCHYROLL BOT CONFIGURATION =====
const CONFIG = {
    // Telegram Bot Settings
    BOT_TOKEN: '8236893425:AAFNPK6GnoTkxyjjSI4WgRYbhwZIf_zS-9w',
    
    // Required Channels (aapke bot wale channels)
    REQUIRED_CHANNELS: {
        '-1002649315259': "ʅσɠιƈ.."
    },
    
    // File Paths (aapke actual txt files)
    FILES: {
        ACCOUNTS: "Crunchyaccount.txt",
        SUSPICIOUS: "Crunchysuspecious.txt", 
        DEAD: "Crunchydead.txt",
        VERIFIED: "Crunchyverified.txt",
        GENERATION_LOG: "Crunchygenerationbyusers.txt",
        USERS: "botuser.txt",
        BANNED: "banneduser.txt",
        ADMINS: "admin.txt",
        JOINED_USERS: "Joineduser.txt"
    },
    
    // Netlify Functions Endpoints
    API_ENDPOINTS: {
        GENERATE_ACCOUNT: '/.netlify/functions/generate-account',
        VERIFY_CHANNELS: '/.netlify/functions/verify-channels',
        UPDATE_ACCOUNT_STATUS: '/.netlify/functions/update-account-status',
        GET_STATS: '/.netlify/functions/get-stats',
        SEND_PROOF: '/.netlify/functions/send-proof'
    },
    
    // Account Generation Settings
    GENERATION: {
        COOLDOWN_TIME: 60, // seconds
        MAIN_ACCOUNT_PRIORITY: 0.8, // 80%
        SUSPICIOUS_PRIORITY: 0.2, // 20%
        DAILY_USER_LIMIT: 5
    },
    
    // Telegram Alert Channel
    ALERT_CHANNEL: -1003176361256,
    
    // Web Interface Settings
    UI: {
        DEFAULT_LANGUAGE: 'en',
        SOUND_ENABLED: true,
        ANIMATIONS_ENABLED: true,
        THEME: 'dark'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

window.CONFIG = CONFIG;
FILES: {
    ACCOUNTS: "https://raw.githubusercontent.com/hk023455/my-mini-app-/main/Crunchyaccount.txt",
    SUSPICIOUS: "https://raw.githubusercontent.com/hk023455/my-mini-app-/main/Crunchysuspecious.txt",
    DEAD: "https://raw.githubusercontent.com/hk023455/my-mini-app-/main/Crunchydead.txt",
    VERIFIED: "https://raw.githubusercontent.com/hk023455/my-mini-app-/main/Crunchyverified.txt",
    GENERATION_LOG: "https://raw.githubusercontent.com/hk023455/my-mini-app-/main/Crunchygenerationbyusers.txt",
    USERS: "https://raw.githubusercontent.com/hk023455/my-mini-app-/main/botuser.txt",
    BANNED: "https://raw.githubusercontent.com/hk023455/my-mini-app-/main/banneduser.txt",
    ADMINS: "https://raw.githubusercontent.com/hk023455/my-mini-app-/main/admin.txt",
    JOINED_USERS: "https://raw.githubusercontent.com/hk023455/my-mini-app-/main/Joineduser.txt"
},
