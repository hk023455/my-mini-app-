// ===== APPLICATION CONFIGURATION =====
const CONFIG = {
    // App Information
    APP_NAME: "CrunchyRoll Premium Bot",
    VERSION: "3.0.0",
    AUTHOR: "Kartik",
    
    // API Endpoints (Netlify Functions)
    API_BASE_URL: "/.netlify/functions",
    ENDPOINTS: {
        ACCOUNTS: "/accounts",
        STATS: "/stats",
        USERS: "/users",
        AUTH: "/auth",
        VERIFY: "/verify"
    },
    
    // Telegram Bot Configuration
    TELEGRAM: {
        BOT_TOKEN: "8236893425:AAFNPK6GnoTkxyjjSI4WgRYbhwZIf_zS-9w",
        CHANNELS: {
            MAIN: -1002649315259,
            LOGS: -1002564024778
        },
        REQUIRED_CHANNELS: [
            -1002649315259  // ʅσɠιƈ..
        ]
    },
    
    // File Paths (GitHub Storage)
    FILES: {
        ACCOUNTS: "Crunchyaccount.txt",
        SUSPICIOUS: "Crunchysuspecious.txt",
        DEAD: "Crunchydead.txt",
        VERIFIED: "Crunchyverified.txt",
        GENERATION_LOG: "Crunchygenerationbyusers.txt",
        USERS: "botuser.txt",
        BANNED: "banneduser.txt",
        ADMINS: "admin.txt"
    },
    
    // Account Generation Settings
    GENERATION: {
        COOLDOWN: 60, // seconds
        DAILY_LIMIT: 5,
        PRIORITY: {
            MAIN: 0.8,    // 80% chance for main accounts
            SUSPICIOUS: 0.2 // 20% chance for suspicious accounts
        }
    },
    
    // UI Settings
    UI: {
        THEME: "dark",
        ANIMATIONS: true,
        SOUNDS: true,
        NOTIFICATIONS: true,
        LANGUAGE: "en"
    },
    
    // Security Settings
    SECURITY: {
        SESSION_TIMEOUT: 3600, // 1 hour in seconds
        MAX_LOGIN_ATTEMPTS: 5,
        PASSWORD_MIN_LENGTH: 8,
        API_RATE_LIMIT: 100 // requests per minute
    },
    
    // 3D Settings
    THREE_D: {
        PARTICLE_COUNT: 1000,
        PARTICLE_SPEED: 0.002,
        BACKGROUND_COLOR: 0x0f0f1a,
        FOG_DENSITY: 0.001
    },
    
    // Sound Settings
    SOUNDS: {
        VOLUME: 0.5,
        ENABLED: true,
        FILES: {
            CLICK: "assets/sounds/click.mp3",
            SUCCESS: "assets/sounds/success.mp3",
            NOTIFICATION: "assets/sounds/notification.mp3",
            GENERATE: "assets/sounds/generate.mp3",
            ERROR: "assets/sounds/error.mp3"
        }
    },
    
    // Feature Toggles
    FEATURES: {
        CHANNEL_VERIFICATION: true,
        ADMIN_PANEL: true,
        REAL_TIME_STATS: true,
        MULTI_LANGUAGE: true,
        OFFLINE_MODE: true,
        PWA_SUPPORT: true
    },
    
    // Default Values
    DEFAULTS: {
        ACCOUNT_FORMAT: "email:password",
        DATE_FORMAT: "YYYY-MM-DD",
        TIME_FORMAT: "HH:mm:ss",
        TIMEZONE: "Asia/Kolkata"
    }
};

// ===== EXPORT FOR MODULES =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// ===== CONFIGURATION VALIDATION =====
function validateConfig() {
    const errors = [];
    
    if (!CONFIG.TELEGRAM.BOT_TOKEN) {
        errors.push("Telegram Bot Token is required");
    }
    
    if (CONFIG.GENERATION.COOLDOWN < 0) {
        errors.push("Cooldown must be positive");
    }
    
    if (CONFIG.SECURITY.SESSION_TIMEOUT < 300) {
        errors.push("Session timeout too short");
    }
    
    if (errors.length > 0) {
        console.error("Configuration errors:", errors);
        return false;
    }
    
    return true;
}

// ===== CONFIGURATION HELPER FUNCTIONS =====
class ConfigHelper {
    static getApiUrl(endpoint) {
        return `${CONFIG.API_BASE_URL}${endpoint}`;
    }
    
    static getFileUrl(filename) {
        return `https://raw.githubusercontent.com/your-username/your-repo/main/${filename}`;
    }
    
    static isFeatureEnabled(feature) {
        return CONFIG.FEATURES[feature] === true;
    }
    
    static getLanguage() {
        return localStorage.getItem('preferred-language') || CONFIG.UI.LANGUAGE;
    }
    
    static setLanguage(lang) {
        localStorage.setItem('preferred-language', lang);
        CONFIG.UI.LANGUAGE = lang;
    }
    
    static getSoundSettings() {
        return {
            enabled: localStorage.getItem('sound-enabled') !== 'false',
            volume: parseFloat(localStorage.getItem('sound-volume') || CONFIG.SOUNDS.VOLUME)
        };
    }
    
    static setSoundSettings(enabled, volume) {
        localStorage.setItem('sound-enabled', enabled);
        localStorage.setItem('sound-volume', volume);
    }
}

// ===== RUNTIME CONFIGURATION UPDATES =====
function updateConfig(newConfig) {
    Object.keys(newConfig).forEach(key => {
        if (CONFIG.hasOwnProperty(key)) {
            if (typeof CONFIG[key] === 'object' && !Array.isArray(CONFIG[key])) {
                Object.assign(CONFIG[key], newConfig[key]);
            } else {
                CONFIG[key] = newConfig[key];
            }
        }
    });
    
    // Save to localStorage for persistence
    localStorage.setItem('app-config', JSON.stringify(CONFIG));
}

// ===== LOAD SAVED CONFIGURATION =====
function loadSavedConfig() {
    try {
        const savedConfig = localStorage.getItem('app-config');
        if (savedConfig) {
            const parsedConfig = JSON.parse(savedConfig);
            updateConfig(parsedConfig);
        }
    } catch (error) {
        console.error('Error loading saved config:', error);
    }
}

// Initialize configuration
document.addEventListener('DOMContentLoaded', () => {
    loadSavedConfig();
    validateConfig();
});

// Make CONFIG globally available
window.CONFIG = CONFIG;
window.ConfigHelper = ConfigHelper;
