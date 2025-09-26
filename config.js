// 🔧 ADVANCED CONFIGURATION FILE
const CONFIG = {
    // Website Settings
    SITE: {
        NAME: "⚡️ PREMIUM GENERATOR PRO",
        VERSION: "2.0.0",
        AUTHOR: "Kartik",
        SUPPORT_EMAIL: "support@premiumgenerator.com"
    },

    // Security Settings
    SECURITY: {
        CAPTCHA_ENABLED: true,
        RATE_LIMIT: 5, // Generations per hour
        AUTO_LOGOUT: 30 // Minutes
    },

    // Service Configuration
    SERVICES: {
        CRUNCHYROLL: {
            ENABLED: true,
            NAME: "Crunchyroll",
            ICON: "🍥",
            DAILY_LIMIT: 3
        },
        EXPRESS_VPN: {
            ENABLED: true,
            NAME: "Express VPN",
            ICON: "🛡️",
            DAILY_LIMIT: 2
        },
        NORD_VPN: {
            ENABLED: true,
            NAME: "Nord VPN",
            ICON: "🔒",
            DAILY_LIMIT: 2
        }
    },

    // Premium Plans
    PREMIUM_PLANS: {
        BASIC: {
            PRICE: 299,
            CURRENCY: "₹",
            FEATURES: [
                "5 Daily Generations",
                "All Services Access",
                "Priority Support",
                "No Ads"
            ]
        },
        PRO: {
            PRICE: 599,
            CURRENCY: "₹",
            FEATURES: [
                "Unlimited Generations",
                "All Services + New Releases",
                "24/7 Priority Support",
                "Referral Earnings",
                "Early Access"
            ]
        }
    },

    // Payment Settings
    PAYMENT: {
        UPI_ID: "your-upi@id",
        QR_CODE: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=UPI_ID_HERE",
        SUPPORT_CHAT: "https://t.me/your_support_group"
    },

    // Telegram Bot Configuration
    TELEGRAM: {
        BOT_TOKEN: "YOUR_BOT_TOKEN_HERE",
        SUPPORT_GROUP: "-1001234567890",
        LOGS_CHANNEL: "-1001234567891"
    },

    // Account Management
    ACCOUNT_FILES: {
        ACTIVE: "active_accounts",
        WORKING: "working_accounts",
        SUSPICIOUS: "suspicious_accounts",
        DEAD: "dead_accounts",
        USER_HISTORY: "user_history"
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
