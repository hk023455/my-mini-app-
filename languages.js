// 🌍 MULTI-LANGUAGE SUPPORT SYSTEM
const LANGUAGE_PACKS = {
    hi: { // Hindi
        welcome: "स्वागत है",
        gate_locked: "🔒 गेट लॉक है...",
        unlock_instruction: "👇 नीचे वेरिफाई करके अनलॉक करें 👇",
        verify_join: "✅ वेरिफाई करें",
        select_service: "🎯 अपनी सर्विस चुनें",
        crunchyroll: "क्रंचीरोल",
        premium_anime: "प्रीमियम एनिमे अकाउंट्स",
        premium_vpn: "प्रीमियम VPN अकाउंट्स",
        secure_vpn: "सिक्योर VPN अकाउंट्स",
        more_services: "और सर्विसेज",
        premium_unlock: "प्रीमियम से अनलॉक करें",
        premium: "प्रीमियम",
        generations: "जनरेशन्स",
        referrals: "रेफरल्स",
        points: "पॉइंट्स",
        email: "📧 ईमेल:",
        password: "🔑 पासवर्ड:",
        account_ready: "🌀 अकाउंट तैयार है\n🔥 प्रीमियम अनुभव का आनंद लें",
        working: "✅ काम कर रहा है",
        not_working: "❌ काम नहीं कर रहा",
        provide_proof: "📸 प्रूफ दें",
        proof_instruction: "कृपया स्क्रीनशॉट के रूप में प्रूफ दें",
        working_proof: "✅ वर्किंग प्रूफ",
        not_working_proof: "❌ नॉट वर्किंग प्रूफ",
        upload_screenshot: "स्क्रीनशॉट अपलोड करें",
        send_to_support: "📤 सपोर्ट को भेजें",
        premium_plans: "⭐ प्रीमियम प्लान्स",
        basic: "बेसिक",
        month: "/महीना",
        basic_feature1: "5 दैनिक जनरेशन्स",
        basic_feature2: "सभी सर्विसेज एक्सेस",
        basic_feature3: "प्रायोरिटी सपोर्ट",
        pro: "प्रो",
        pro_feature1: "अनलिमिटेड जनरेशन्स",
        pro_feature2: "सभी सर्विसेज + नई रिलीज",
        pro_feature3: "24/7 प्रायोरिटी सपोर्ट",
        pro_feature4: "रेफरल कमाई",
        select_plan: "प्लान चुनें",
        popular: "पॉपुलर",
        scan_to_pay: "पेमेंट के लिए QR स्कैन करें",
        payment_instruction: "पेमेंट करें और स्क्रीनशॉट ओनर को भेजें"
    },

    en: { // English
        welcome: "WELCOME TO",
        gate_locked: "🔒 The Gate Is Locked...",
        unlock_instruction: "👉 Unlock It By Verifying Below 👇",
        verify_join: "✅ Verify & Continue",
        select_service: "🎯 SELECT YOUR SERVICE",
        crunchyroll: "CRUNCHYROLL",
        premium_anime: "Premium Anime Accounts",
        premium_vpn: "Premium VPN Accounts",
        secure_vpn: "Secure VPN Accounts",
        more_services: "MORE SERVICES",
        premium_unlock: "Unlock with Premium",
        premium: "PREMIUM",
        generations: "Generations",
        referrals: "Referrals",
        points: "Points",
        email: "📧 EMAIL:",
        password: "🔑 PASSWORD:",
        account_ready: "🌀 Account ready for your use\n🔥 Enjoy premium experience",
        working: "✅ WORKING",
        not_working: "❌ NOT WORKING",
        provide_proof: "📸 PROVIDE PROOF",
        proof_instruction: "Please provide screenshot as proof",
        working_proof: "✅ WORKING PROOF",
        not_working_proof: "❌ NOT WORKING PROOF",
        upload_screenshot: "UPLOAD SCREENSHOT",
        send_to_support: "📤 SEND TO SUPPORT",
        premium_plans: "⭐ PREMIUM PLANS",
        basic: "BASIC",
        month: "/month",
        basic_feature1: "5 Daily Generations",
        basic_feature2: "All Services Access",
        basic_feature3: "Priority Support",
        pro: "PRO",
        pro_feature1: "Unlimited Generations",
        pro_feature2: "All Services + New Releases",
        pro_feature3: "24/7 Priority Support",
        pro_feature4: "Referral Earnings",
        select_plan: "SELECT PLAN",
        popular: "POPULAR",
        scan_to_pay: "Scan QR Code to Pay",
        payment_instruction: "Pay and send screenshot to owner"
    },

    ta: { // Tamil
        welcome: "வரவேற்கிறோம்",
        gate_locked: "🔒 கேட் பூட்டப்பட்டுள்ளது...",
        unlock_instruction: "👇 கீழே சரிபார்த்து திறக்கவும் 👇",
        verify_join: "✅ சரிபார் & தொடரவும்",
        // ... and so on for other languages
    },

    te: { // Telugu
        welcome: "స్వాగతం",
        gate_locked: "🔒 గేట్ లాక్ అయ్యింది...",
        unlock_instruction: "👇 దిగువన ధృవీకరించి అన్లాక్ చేయండి 👇",
        verify_join: "✅ ధృవీకరించు & కొనసాగించు",
        // ... and so on for other languages
    },

    kn: { // Kannada
        welcome: "ಸ್ವಾಗತ",
        gate_locked: "🔒 ಗೇಟ್ ಲಾಕ್ ಆಗಿದೆ...",
        unlock_instruction: "👇 ಕೆಳಗೆ ಧೃಡೀಕರಿಸಿ ಅನ್ಲಾಕ್ ಮಾಡಿ 👇",
        verify_join: "✅ ಧೃಡೀಕರಿಸಿ & ಮುಂದುವರಿಸಿ",
        // ... and so on for other languages
    }
};

// Language Management System
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'hi';
        this.init();
    }

    init() {
        this.applyLanguage(this.currentLang);
        this.setupLanguageSelector();
    }

    applyLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        
        // Update all elements with data-lang attribute
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (LANGUAGE_PACKS[lang] && LANGUAGE_PACKS[lang][key]) {
                element.textContent = LANGUAGE_PACKS[lang][key];
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    setupLanguageSelector() {
        const selector = document.getElementById('languageSelect');
        if (selector) {
            selector.value = this.currentLang;
            selector.addEventListener('change', (e) => {
                this.applyLanguage(e.target.value);
            });
        }
    }

    getText(key) {
        return LANGUAGE_PACKS[this.currentLang]?.[key] || LANGUAGE_PACKS['en'][key] || key;
    }

    translatePage() {
        // Advanced translation for dynamic content
        this.applyLanguage(this.currentLang);
    }
}

// Initialize Language Manager
const languageManager = new LanguageManager();

// Global function for language change
function changeLanguage(lang) {
    languageManager.applyLanguage(lang);
}
