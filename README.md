# CrunchyRoll Premium Bot Web Interface

A beautiful 3D web interface for CrunchyRoll account generation bot.

## 🌟 Features

- ✅ 3D Animated Background
- ✅ Multi-language Support (English, Hindi, Telugu, Tamil)
- ✅ Sound Effects System
- ✅ Channel Join Verification
- ✅ Real-time Account Generation
- ✅ Screenshot Proof System
- ✅ Telegram Integration
- ✅ Mobile Responsive

## 🚀 Setup Instructions

### 1. GitHub Setup
- Upload all files to your GitHub repository
- Enable GitHub Pages if needed

### 2. Netlify Deployment
1. Go to [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Set build settings:
   - Build command: `npm install`
   - Publish directory: `.`
4. Add environment variables:
   - `BOT_TOKEN`: Your Telegram bot token

### 3. File Configuration
Update `config.js` with your actual file paths:
```javascript
const GITHUB_FILES = {
    ACCOUNTS: 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/Crunchyaccount.txt',
    // ... other files
};
