// ===== MULTI-LANGUAGE SUPPORT =====
const LANGUAGES = {
    en: {
        // Navigation & Basic
        'title': 'CrunchyRoll Premium • Web Dashboard',
        'subtitle': 'Web Dashboard - Account Generator',
        'loading': 'Loading CrunchyRoll Dashboard',
        
        // Channel Verification
        'checking-membership': 'Checking channel membership...',
        'verified': '✅ Channels Verified - Access Granted',
        'not-verified': '❌ Join Required Channels First',
        'verify-now': 'Verify Now',
        
        // Stats
        'total-accounts': 'Total Accounts',
        'working-accounts': 'Working Accounts', 
        'today-generations': 'Today\'s Generation',
        'your-generations': 'Your Generations',
        
        // Account Generation
        'generate-account': 'Generate CrunchyRoll Account',
        'generating': 'Generating...',
        'account-details': 'Account Details',
        'email': 'Email',
        'password': 'Password',
        'status': 'Status',
        'pending': 'Pending',
        'generated': 'Generated',
        
        // Feedback Buttons
        'working': '✅ Working',
        'not-working': '❌ Not Working',
        'copy-all': 'Copy All',
        'copy': 'Copy',
        
        // Screenshot Proof
        'screenshot-proof': 'Send Screenshot Proof',
        'send-proof-tg': 'Send Proof to Telegram',
        
        // User Info
        'user-info': 'User Information',
        'user-id': 'User ID',
        'user-status': 'Status',
        'join-date': 'Joined',
        
        // Status Messages
        'generation-success': 'Account generated successfully!',
        'copy-success': 'Copied to clipboard!',
        'proof-sent': 'Proof sent to Telegram!',
        'channel-verified': 'Channels verified successfully!',
        'account-marked-working': 'Account marked as Working',
        'account-marked-not-working': 'Account marked as Not Working'
    },
    
    hi: {
        // Navigation & Basic
        'title': 'क्रंचीरोल प्रीमियम • वेब डैशबोर्ड',
        'subtitle': 'वेब डैशबोर्ड - अकाउंट जनरेटर',
        'loading': 'क्रंचीरोल डैशबोर्ड लोड हो रहा है',
        
        // Channel Verification
        'checking-membership': 'चैनल सदस्यता जांची जा रही है...',
        'verified': '✅ चैनल सत्यापित - एक्सेस मंजूर',
        'not-verified': '❌ पहले आवश्यक चैनल्स से जुड़ें',
        'verify-now': 'अभी सत्यापित करें',
        
        // Stats
        'total-accounts': 'कुल अकाउंट',
        'working-accounts': 'कार्यशील अकाउंट',
        'today-generations': 'आज की जनरेशन',
        'your-generations': 'आपकी जनरेशन',
        
        // Account Generation
        'generate-account': 'क्रंचीरोल अकाउंट जनरेट करें',
        'generating': 'जनरेट हो रहा है...',
        'account-details': 'अकाउंट विवरण',
        'email': 'ईमेल',
        'password': 'पासवर्ड',
        'status': 'स्थिति',
        'pending': 'लंबित',
        'generated': 'जनरेट हो गया',
        
        // Feedback Buttons
        'working': '✅ काम कर रहा है',
        'not-working': '❌ काम नहीं कर रहा',
        'copy-all': 'सब कॉपी करें',
        'copy': 'कॉपी',
        
        // Screenshot Proof
        'screenshot-proof': 'स्क्रीनशॉट प्रूफ भेजें',
        'send-proof-tg': 'टेलीग्राम पर प्रूफ भेजें',
        
        // User Info
        'user-info': 'उपयोगकर्ता जानकारी',
        'user-id': 'यूजर आईडी',
        'user-status': 'स्थिति',
        'join-date': 'जुड़े थे',
        
        // Status Messages
        'generation-success': 'अकाउंट सफलतापूर्वक जनरेट हो गया!',
        'copy-success': 'क्लिपबोर्ड पर कॉपी किया गया!',
        'proof-sent': 'प्रूफ टेलीग्राम पर भेज दिया गया!',
        'channel-verified': 'चैनल सफलतापूर्वक सत्यापित!',
        'account-marked-working': 'अकाउंट काम कर रहा है चिन्हित',
        'account-marked-not-working': 'अकाउंट काम नहीं कर रहा चिन्हित'
    },
    
    te: {
        // Navigation & Basic
        'title': 'క్రంచీరోల్ ప్రీమియం • వెబ్ డాష్బోర్డ్',
        'subtitle': 'వెబ్ డాష్బోర్డ్ - అకౌంట్ జనరేటర్',
        'loading': 'క్రంచీరోల్ డాష్బోర్డ్ లోడ్ అవుతుంది',
        
        // Channel Verification
        'checking-membership': 'ఛానెల్ సభ్యత్వం తనిఖీ చేయబడుతుంది...',
        'verified': '✅ ఛానెల్స్ ధృవీకరించబడ్డాయి - ప్రవేశం మంజూరు',
        'not-verified': '❌ ముందు అవసరమైన ఛానెల్స్‌లో చేరండి',
        'verify-now': 'ఇప్పుడు ధృవీకరించండి',
        
        // Stats
        'total-accounts': 'మొత్తం ఖాతాలు',
        'working-accounts': 'పని చేస్తున్న ఖాతాలు',
        'today-generations': 'ఈరోజు జనరేషన్',
        'your-generations': 'మీ జనరేషన్లు',
        
        // Account Generation
        'generate-account': 'క్రంచీరోల్ అకౌంట్ జనరేట్ చేయండి',
        'generating': 'జనరేట్ అవుతుంది...',
        'account-details': 'ఖాతా వివరాలు',
        'email': 'ఇమెయిల్',
        'password': 'పాస్వర్డ్',
        'status': 'స్థితి',
        'pending': 'పెండింగ్‌లో ఉంది',
        'generated': 'జనరేట్ చేయబడింది',
        
        // Feedback Buttons
        'working': '✅ పని చేస్తుంది',
        'not-working': '❌ పని చేయడం లేదు',
        'copy-all': 'అన్ని కాపీ చేయండి',
        'copy': 'కాపీ',
        
        // Screenshot Proof
        'screenshot-proof': 'స్క్రీన్‌షాట్ రుజువు పంపండి',
        'send-proof-tg': 'టెలిగ్రామ్‌కు రుజువు పంపండి',
        
        // User Info
        'user-info': 'వినియోగదారు సమాచారం',
        'user-id': 'వినియోగదారు ID',
        'user-status': 'స్థితి',
        'join-date': 'చేరిన తేదీ',
        
        // Status Messages
        'generation-success': 'ఖాతా విజయవంతంగా జనరేట్ చేయబడింది!',
        'copy-success': 'క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది!',
        'proof-sent': 'రుజువు టెలిగ్రామ్‌కు పంపబడింది!',
        'channel-verified': 'ఛానెల్స్ విజయవంతంగా ధృవీకరించబడ్డాయి!',
        'account-marked-working': 'ఖాతా పని చేస్తుంది గుర్తించబడింది',
        'account-marked-not-working': 'ఖాతా పని చేయడం లేదు గుర్తించబడింది'
    },
    
    ta: {
        // Navigation & Basic
        'title': 'கிரஞ்சிரோல் பிரீமியம் • வெப் டாஷ்போர்ட்',
        'subtitle': 'வெப் டாஷ்போர்ட் - கணக்கு ஜெனரேட்டர்',
        'loading': 'கிரஞ்சிரோல் டாஷ்போர்ட் ஏற்றப்படுகிறது',
        
        // Channel Verification
        'checking-membership': 'சேனல் உறுப்பினர் சரிபார்க்கப்படுகிறது...',
        'verified': '✅ சேனல்கள் சரிபார்க்கப்பட்டது - அணுகல் அனுமதிக்கப்பட்டது',
        'not-verified': '❌ முதலில் தேவையான சேனல்களில் சேருங்கள்',
        'verify-now': 'இப்போது சரிபார்க்கவும்',
        
        // Stats
        'total-accounts': 'மொத்த கணக்குகள்',
        'working-accounts': 'வேலை செய்யும் கணக்குகள்',
        'today-generations': 'இன்றைய ஜெனரேஷன்',
        'your-generations': 'உங்கள் ஜெனரேஷன்கள்',
        
        // Account Generation
        'generate-account': 'கிரஞ்சிரோல் கணக்கு உருவாக்கவும்',
        'generating': 'உருவாக்கப்படுகிறது...',
        'account-details': 'கணக்கு விவரங்கள்',
        'email': 'மின்னஞ்சல்',
        'password': 'கடவுச்சொல்',
        'status': 'நிலை',
        'pending': 'நிலுவையில்',
        'generated': 'உருவாக்கப்பட்டது',
        
        // Feedback Buttons
        'working': '✅ வேலை செய்கிறது',
        'not-working': '❌ வேலை செய்யவில்லை',
        'copy-all': 'அனைத்தும் நகலெடு',
        'copy': 'நகலெடு',
        
        // Screenshot Proof
        'screenshot-proof': 'திரைப்பிடிப்பு ஆதாரம் அனுப்பவும்',
        'send-proof-tg': 'டெலிகிராமில் ஆதாரம் அனுப்பவும்',
        
        // User Info
        'user-info': 'பயனர் தகவல்',
        'user-id': 'பயனர் ஐடி',
        'user-status': 'நிலை',
        'join-date': 'சேர்ந்த தேதி',
        
        // Status Messages
        'generation-success': 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!',
        'copy-success': 'கிளிப்போர்டுக்கு நகலெடுக்கப்பட்டது!',
        'proof-sent': 'ஆதாரம் டெலிகிராமில் அனுப்பப்பட்டது!',
        'channel-verified': 'சேனல்கள் வெற்றிகரமாக சரிபார்க்கப்பட்டன!',
        'account-marked-working': 'கணக்கு வேலை செய்கிறது என குறிக்கப்பட்டது',
        'account-marked-not-working': 'கணக்கு வேலை செய்யவில்லை என குறிக்கப்பட்டது'
    }
};

// ===== LANGUAGE MANAGER =====
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        // Load saved language
        const savedLang = localStorage.getItem('crunchyLang') || 'en';
        this.setLanguage(savedLang);
    }

    setLanguage(langCode) {
        if (LANGUAGES[langCode]) {
            this.currentLang = langCode;
            localStorage.setItem('crunchyLang', langCode);
            this.updatePageText();
            return true;
        }
        return false;
    }

    getText(key) {
        return LANGUAGES[this.currentLang]?.[key] || LANGUAGES['en'][key] || key;
    }

    updatePageText() {
        // Update all elements with data-lang attribute
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang');
            element.textContent = this.getText(key);
        });

        // Update placeholders
        const placeholders = document.querySelectorAll('[data-lang-placeholder]');
        placeholders.forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            element.placeholder = this.getText(key);
        });

        // Update titles
        const titles = document.querySelectorAll('[data-lang-title]');
        titles.forEach(element => {
            const key = element.getAttribute('data-lang-title');
            element.title = this.getText(key);
        });
    }
}

// Initialize Language Manager
const langManager = new LanguageManager();

// Make available globally
window.langManager = langManager;
window.LANGUAGES = LANGUAGES;
