// 3D Parallax Effect
document.addEventListener('DOMContentLoaded', function() {
    // Initialize parallax
    const scene = document.querySelector('.parallax-bg');
    const parallaxInstance = new Parallax(scene);
    
    // Mouse move 3D effect
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        document.querySelector('.container-3d').style.transform = 
            `rotateX(${(y - 50) * 0.1}deg) rotateY(${(x - 50) * 0.1}deg)`;
    });
});

// Sample Accounts Data
const crunchyrollAccounts = [
    { email: "premium.anime@crunchy.com", password: "AnimeLove123" },
    { email: "watch.anime@premium.com", password: "OtakuKing456" },
    { email: "japan.animation@account.com", password: "Naruto789" },
    { email: "manga.fan@premium.com", password: "OnePiece321" },
    { email: "anime.stream@account.com", password: "DragonBall654" }
];

let usedAccounts = new Set();
let userHistory = JSON.parse(localStorage.getItem('userHistory')) || [];

// Channel Verification
function joinChannel() {
    window.open('https://t.me/+vNA6mxXv25M1MmI1', '_blank');
}

function verifyJoin() {
    // Simulate verification
    const verifyBtn = document.querySelector('.verify-btn-3d');
    verifyBtn.innerHTML = '⏳ Verifying...';
    verifyBtn.disabled = true;
    
    setTimeout(() => {
        document.querySelector('.welcome-3d').style.display = 'none';
        document.getElementById('services3d').style.display = 'block';
        
        // Add 3D entrance animation
        const services = document.getElementById('services3d');
        services.style.animation = 'cardFloat 2s ease-out';
    }, 2000);
}

// Account Generation
function generateAccount(service) {
    if (service === 'crunchyroll') {
        const availableAccounts = crunchyrollAccounts.filter(acc => 
            !usedAccounts.has(acc.email)
        );
        
        if (availableAccounts.length === 0) {
            alert('❌ No accounts available at the moment!');
            return;
        }
        
        const randomAccount = availableAccounts[Math.floor(Math.random() * availableAccounts.length)];
        usedAccounts.add(randomAccount.email);
        
        // Save to history
        userHistory.push({
            service: 'Crunchyroll',
            email: randomAccount.email,
            password: randomAccount.password,
            timestamp: new Date().toLocaleString()
        });
        localStorage.setItem('userHistory', JSON.stringify(userHistory));
        
        // Show popup
        showAccountPopup(randomAccount.email, randomAccount.password);
    }
}

// Show Account Popup with Confetti
function showAccountPopup(email, password) {
    document.getElementById('popupEmail').textContent = email;
    document.getElementById('popupPassword').textContent = password;
    
    const popup = document.getElementById('accountPopup');
    popup.style.display = 'block';
    
    // Add confetti effect
    createConfetti();
}

function closePopup() {
    document.getElementById('accountPopup').style.display = 'none';
}

// Mark Account Working
function markWorking() {
    createConfetti();
    alert('🎉 Thank you for confirming! Account marked as WORKING');
    closePopup();
    
    // Add to working accounts
    const currentEmail = document.getElementById('popupEmail').textContent;
    // You can save this to localStorage or send to server
}

function markNotWorking() {
    alert('⚠️ Account reported as NOT WORKING. Thank you for feedback!');
    closePopup();
}

// Confetti Effect
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ff6b6b', '#48dbfb', '#feca57', '#1dd1a1', '#ff9ff3'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        
        container.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// History Function
function showHistory() {
    const historyText = userHistory.map((item, index) => 
        `${index + 1}. ${item.service} - ${item.email} (${item.timestamp})`
    ).join('\n');
    
    alert('📊 YOUR GENERATION HISTORY:\n\n' + (historyText || 'No accounts generated yet!'));
}

// Help Function
function openHelp() {
    window.open('https://t.me/+dbBLVmVAvfU5NGU1', '_blank');
}

// Scroll 3D Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.querySelector('.layer-1').style.transform = `translateZ(-100px) translateY(${rate * 0.1}px) scale(2)`;
    document.querySelector('.layer-2').style.transform = `translateZ(-50px) translateY(${rate * 0.2}px) scale(1.5)`;
    document.querySelector('.layer-3').style.transform = `translateZ(0px) translateY(${rate * 0.3}px) scale(1)`;
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Initialize
console.log('⚡️ CodeBeast Generator Loaded!');
// Admin System
const ADMIN_PASSWORD = "kartik@6201";
let isAdminLoggedIn = false;

// Admin Functions
function showAdminLogin() {
    document.getElementById('adminLoginModal').style.display = 'block';
}

function checkAdminPassword() {
    const password = document.getElementById('adminPassword').value;
    const errorElement = document.getElementById('loginError');
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        document.getElementById('adminLoginModal').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminDashboard();
    } else {
        errorElement.textContent = "❌ Invalid password!";
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = "";
}

function openTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

function loadAdminDashboard() {
    updateStatistics();
    loadAccountsList();
    loadUsersList();
}

function updateStatistics() {
    const users = JSON.parse(localStorage.getItem('userHistory')) || [];
    const accounts = JSON.parse(localStorage.getItem('crunchyrollAccounts')) || [];
    
    const today = new Date().toDateString();
    const todayGens = users.filter(user => 
        new Date(user.timestamp).toDateString() === today
    );
    
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('todayGenerations').textContent = todayGens.length;
    document.getElementById('totalAccounts').textContent = accounts.length;
}

function showAddAccountForm() {
    const form = document.getElementById('addAccountForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function addAccounts() {
    const accountsText = document.getElementById('newAccounts').value;
    const accounts = accountsText.split('\n')
        .filter(line => line.includes(':'))
        .map(line => {
            const [email, password] = line.split(':');
            return { email: email.trim(), password: password.trim() };
        });
    
    if (accounts.length > 0) {
        const existing = JSON.parse(localStorage.getItem('crunchyrollAccounts')) || [];
        const updated = [...existing, ...accounts];
        localStorage.setItem('crunchyrollAccounts', JSON.stringify(updated));
        
        document.getElementById('newAccounts').value = "";
        showAddAccountForm();
        loadAccountsList();
        alert(`✅ ${accounts.length} accounts added!`);
    }
}

function loadAccountsList() {
    const accounts = JSON.parse(localStorage.getItem('crunchyrollAccounts')) || [];
    const list = document.getElementById('accountsList');
    
    list.innerHTML = accounts.map(acc => `
        <div style="background: rgba(72,219,251,0.1); padding: 10px; margin: 5px 0; border-radius: 5px;">
            <strong>${acc.email}</strong> - ${acc.password}
        </div>
    `).join('');
}

function loadUsersList() {
    const users = JSON.parse(localStorage.getItem('userHistory')) || [];
    const list = document.getElementById('usersList');
    
    list.innerHTML = users.map(user => `
        <div style="background: rgba(254,202,87,0.1); padding: 10px; margin: 5px 0; border-radius: 5px;">
            <strong>${user.email}</strong> - ${user.timestamp}
        </div>
    `).join('');
}

// Initialize user history if not exists
if (!localStorage.getItem('userHistory')) {
    localStorage.setItem('userHistory', JSON.stringify([]));
}
if (!localStorage.getItem('crunchyrollAccounts')) {
    localStorage.setItem('crunchyrollAccounts', JSON.stringify([]));
}
// 5 Anime Backgrounds
const ANIME_BACKGROUNDS = [
    "https://e1.pxfuel.com/desktop-wallpaper/520/452/desktop-wallpaper-7-3d-anime-cool-anime-3d.jpg",
    "https://wallpapercave.com/wp/wp11752715.jpg",
    "https://wallpaperaccess.com/full/5651980.jpg",
    "https://images.hdqwalls.com/download/anime-city-scape-neon-4k-5k-5c-1920x1080.jpg",
    "https://images3.alphacoders.com/133/1334330.png"
];

// Current background index
let currentBgIndex = 0;

// Change Background Function
function changeBackground(index) {
    currentBgIndex = index - 1;
    const bgUrl = ANIME_BACKGROUNDS[currentBgIndex];
    
    // Update all background layers
    document.querySelectorAll('.bg-layer').forEach(layer => {
        layer.style.backgroundImage = `url('${bgUrl}')`;
    });
    
    // Save to localStorage
    localStorage.setItem('selectedBackground', index);
}

// Random background on page load
function setRandomBackground() {
    const savedBg = localStorage.getItem('selectedBackground');
    if (savedBg) {
        changeBackground(parseInt(savedBg));
    } else {
        const randomIndex = Math.floor(Math.random() * ANIME_BACKGROUNDS.length) + 1;
        changeBackground(randomIndex);
    }
}

// Section Navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    document.getElementById(sectionName + 'Section').style.display = 'block';
    
    // Update active menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

// Proof System
let currentProofData = null;

function askForProof(accountData) {
    currentProofData = accountData;
    document.getElementById('proofModal').style.display = 'block';
}

function submitProof(status) {
    currentProofData.status = status;
    alert(`Proof recorded as: ${status.toUpperCase()}`);
}

function sendProofToSupport() {
    if (!currentProofData) return;
    
    const proofInfo = `
📋 PROOF SUBMISSION
├─ Account: ${currentProofData.email}
├─ Status: ${currentProofData.status || 'Unknown'}
├─ User ID: ${currentProofData.userId}
└─ Time: ${new Date().toLocaleString()}
    `;
    
    // Here you can send to your support group
    // For now, we'll just show an alert
    alert(`Proof sent to support group!\n\n${proofInfo}`);
    
    // Save proof to history
    saveProofToHistory(currentProofData);
    closeProofModal();
}

function saveProofToHistory(proofData) {
    const proofs = JSON.parse(localStorage.getItem('proofHistory')) || [];
    proofs.push({
        ...proofData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('proofHistory', JSON.stringify(proofs));
}

function closeProofModal() {
    document.getElementById('proofModal').style.display = 'none';
    currentProofData = null;
}

// Update account generation function to ask for proof
function generateAccount(service) {
    if (service === 'crunchyroll') {
        const availableAccounts = crunchyrollAccounts.filter(acc => 
            !usedAccounts.has(acc.email)
        );
        
        if (availableAccounts.length === 0) {
            alert('❌ No accounts available!');
            return;
        }
        
        const randomAccount = availableAccounts[Math.floor(Math.random() * availableAccounts.length)];
        usedAccounts.add(randomAccount.email);
        
        // Show account in popup
        showAccountPopup(randomAccount.email, randomAccount.password);
        
        // Ask for proof after 3 seconds
        setTimeout(() => {
            askForProof({
                email: randomAccount.email,
                password: randomAccount.password,
                userId: 'current_user', // You can get actual user ID
                service: service
            });
        }, 3000);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setRandomBackground();
    
    // Set first section as active
    showSection('home');
});
// Account Management System
const ACCOUNT_FILES = {
    ACTIVE: "active_accounts",
    WORKING: "working_accounts", 
    SUSPICIOUS: "suspicious_accounts",
    DEAD: "dead_accounts",
    USER_HISTORY: "user_history"
};

// Initialize Account System
function initializeAccountSystem() {
    // Create files if not exists
    if (!localStorage.getItem(ACCOUNT_FILES.ACTIVE)) {
        // Add sample accounts (replace with your accounts)
        const sampleAccounts = [
            "premium1@crunchy.com:anime123",
            "premium2@crunchy.com:otaku456", 
            "premium3@crunchy.com:naruto789",
            "premium4@crunchy.com:onepiece012",
            "premium5@crunchy.com:dragonball345"
        ];
        localStorage.setItem(ACCOUNT_FILES.ACTIVE, JSON.stringify(sampleAccounts));
    }
    
    // Initialize other files
    if (!localStorage.getItem(ACCOUNT_FILES.WORKING)) {
        localStorage.setItem(ACCOUNT_FILES.WORKING, JSON.stringify([]));
    }
    if (!localStorage.getItem(ACCOUNT_FILES.SUSPICIOUS)) {
        localStorage.setItem(ACCOUNT_FILES.SUSPICIOUS, JSON.stringify([]));
    }
    if (!localStorage.getItem(ACCOUNT_FILES.DEAD)) {
        localStorage.setItem(ACCOUNT_FILES.DEAD, JSON.stringify([]));
    }
    if (!localStorage.getItem(ACCOUNT_FILES.USER_HISTORY)) {
        localStorage.setItem(ACCOUNT_FILES.USER_HISTORY, JSON.stringify([]));
    }
}

// Get accounts from file
function getAccounts(fileType) {
    return JSON.parse(localStorage.getItem(fileType)) || [];
}

// Save accounts to file
function saveAccounts(fileType, accounts) {
    localStorage.setItem(fileType, JSON.stringify(accounts));
}

// Move account between files
function moveAccount(account, fromFile, toFile) {
    const fromAccounts = getAccounts(fromFile);
    const toAccounts = getAccounts(toFile);
    
    const index = fromAccounts.indexOf(account);
    if (index > -1) {
        fromAccounts.splice(index, 1);
        toAccounts.push(account);
        
        saveAccounts(fromFile, fromAccounts);
        saveAccounts(toFile, toAccounts);
    }
}

// Check if user already got account
function hasUserReceivedAccount(userId) {
    const userHistory = getAccounts(ACCOUNT_FILES.USER_HISTORY);
    return userHistory.some(entry => entry.userId === userId && entry.account);
}

// Get user's first account if proof not provided
function getUserFirstAccount(userId) {
    const userHistory = getAccounts(ACCOUNT_FILES.USER_HISTORY);
    const userEntry = userHistory.find(entry => entry.userId === userId);
    return userEntry ? userEntry.account : null;
}

// Generate Account with New Rules
function generateAccount(service) {
    if (service !== 'crunchyroll') return;
    
    const userId = getCurrentUserId(); // You need to implement user identification
    
    // Check if user already got account but didn't provide proof
    if (hasUserReceivedAccount(userId)) {
        const firstAccount = getUserFirstAccount(userId);
        if (firstAccount) {
            showAccountPopup(firstAccount.email, firstAccount.password);
            alert("⚠️ Provide proof for your first account to get new one!");
            return;
        }
    }
    
    // Get active accounts
    let activeAccounts = getAccounts(ACCOUNT_FILES.ACTIVE);
    
    if (activeAccounts.length === 0) {
        // Try working accounts if no active accounts
        const workingAccounts = getAccounts(ACCOUNT_FILES.WORKING);
        if (workingAccounts.length > 0) {
            activeAccounts = workingAccounts;
        } else {
            alert("❌ No accounts available at the moment!");
            return;
        }
    }
    
    // Select random account
    const randomIndex = Math.floor(Math.random() * activeAccounts.length);
    const accountStr = activeAccounts[randomIndex];
    const [email, password] = accountStr.split(':');
    
    // Remove from active accounts
    activeAccounts.splice(randomIndex, 1);
    saveAccounts(ACCOUNT_FILES.ACTIVE, activeAccounts);
    
    // Record in user history
    const userHistory = getAccounts(ACCOUNT_FILES.USER_HISTORY);
    const userEntry = userHistory.find(entry => entry.userId === userId);
    
    if (userEntry) {
        userEntry.account = { email, password };
        userEntry.timestamp = new Date().toISOString();
    } else {
        userHistory.push({
            userId: userId,
            account: { email, password },
            timestamp: new Date().toISOString(),
            proofProvided: false
        });
    }
    
    saveAccounts(ACCOUNT_FILES.USER_HISTORY, userHistory);
    
    // Show account
    showAccountPopup(email, password);
    
    // Ask for proof after 5 seconds
    setTimeout(() => {
        askForProof({
            email: email,
            password: password,
            userId: userId,
            service: service
        });
    }, 5000);
}

// Proof System (Mandatory)
function askForProof(accountData) {
    currentProofData = accountData;
    document.getElementById('proofModal').style.display = 'block';
    
    // Force proof - user can't skip
    document.querySelector('.close-proof').style.display = 'none';
}

function submitProof(status) {
    if (!currentProofData) return;
    
    currentProofData.status = status;
    const accountStr = `${currentProofData.email}:${currentProofData.password}`;
    
    // Update user history
    const userHistory = getAccounts(ACCOUNT_FILES.USER_HISTORY);
    const userEntry = userHistory.find(entry => entry.userId === currentProofData.userId);
    
    if (userEntry) {
        userEntry.proofProvided = true;
        userEntry.proofStatus = status;
        userEntry.proofTime = new Date().toISOString();
        saveAccounts(ACCOUNT_FILES.USER_HISTORY, userHistory);
    }
    
    // Move account based on proof
    if (status === 'working') {
        moveAccount(accountStr, ACCOUNT_FILES.ACTIVE, ACCOUNT_FILES.WORKING);
        alert("✅ Account marked as WORKING! Thank you for proof.");
    } else if (status === 'not_working') {
        // Check if already in suspicious
        const suspiciousAccounts = getAccounts(ACCOUNT_FILES.SUSPICIOUS);
        
        if (suspiciousAccounts.includes(accountStr)) {
            // Second time not working - move to dead
            moveAccount(accountStr, ACCOUNT_FILES.SUSPICIOUS, ACCOUNT_FILES.DEAD);
            alert("❌ Account moved to DEAD (2nd time not working)");
        } else {
            // First time not working - move to suspicious
            moveAccount(accountStr, ACCOUNT_FILES.ACTIVE, ACCOUNT_FILES.SUSPICIOUS);
            alert("⚠️ Account marked as SUSPICIOUS (1st time not working)");
        }
    }
    
    closeProofModal();
}

function sendProofToSupport() {
    if (!currentProofData) return;
    
    const proofInfo = `
📋 PROOF SUBMISSION
├─ Account: ${currentProofData.email}
├─ Status: ${currentProofData.status || 'Unknown'}
├─ User ID: ${currentProofData.userId}
└─ Time: ${new Date().toLocaleString()}
    `;
    
    // Save proof details
    const proofs = JSON.parse(localStorage.getItem('proofHistory')) || [];
    proofs.push({
        ...currentProofData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('proofHistory', JSON.stringify(proofs));
    
    alert(`✅ Proof submitted successfully!\n\n${proofInfo}`);
    closeProofModal();
}

function closeProofModal() {
    // Don't allow closing without proof
    if (!currentProofData?.status) {
        alert("⚠️ You must provide proof before closing!");
        return;
    }
    document.getElementById('proofModal').style.display = 'none';
    currentProofData = null;
}

// User Identification (Simple method - you can improve this)
function getCurrentUserId() {
    let userId = localStorage.getItem('currentUserId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('currentUserId', userId);
    }
    return userId;
}

// Admin Functions for Account Management
function addAccountsToFile() {
    const accountsText = document.getElementById('newAccounts').value;
    const accounts = accountsText.split('\n')
        .filter(line => line.trim() && line.includes(':'))
        .map(line => line.trim());
    
    if (accounts.length > 0) {
        const activeAccounts = getAccounts(ACCOUNT_FILES.ACTIVE);
        const updatedAccounts = [...activeAccounts, ...accounts];
        saveAccounts(ACCOUNT_FILES.ACTIVE, updatedAccounts);
        
        document.getElementById('newAccounts').value = "";
        alert(`✅ ${accounts.length} accounts added to ACTIVE file!`);
        loadAccountsList();
    }
}

function loadAccountsList() {
    const activeAccounts = getAccounts(ACCOUNT_FILES.ACTIVE);
    const workingAccounts = getAccounts(ACCOUNT_FILES.WORKING);
    const suspiciousAccounts = getAccounts(ACCOUNT_FILES.SUSPICIOUS);
    const deadAccounts = getAccounts(ACCOUNT_FILES.DEAD);
    
    document.getElementById('accountsList').innerHTML = `
        <div class="account-file">
            <h4>🟢 ACTIVE Accounts (${activeAccounts.length})</h4>
            ${activeAccounts.map(acc => `<div class="account-item">${acc}</div>`).join('')}
        </div>
        <div class="account-file">
            <h4>✅ WORKING Accounts (${workingAccounts.length})</h4>
            ${workingAccounts.map(acc => `<div class="account-item">${acc}</div>`).join('')}
        </div>
        <div class="account-file">
            <h4>⚠️ SUSPICIOUS Accounts (${suspiciousAccounts.length})</h4>
            ${suspiciousAccounts.map(acc => `<div class="account-item">${acc}</div>`).join('')}
        </div>
        <div class="account-file">
            <h4>💀 DEAD Accounts (${deadAccounts.length})</h4>
            ${deadAccounts.map(acc => `<div class="account-item">${acc}</div>`).join('')}
        </div>
    `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAccountSystem();
    setRandomBackground();
    showSection('home');
});
// Updated Account Generation Function
function generateAccount(service) {
    if (service !== 'crunchyroll') return;
    
    const userId = getCurrentUserId();
    
    // Check if user already got account but didn't provide proof
    if (hasUserReceivedAccount(userId) && !hasUserProvidedProof(userId)) {
        const firstAccount = getUserFirstAccount(userId);
        if (firstAccount) {
            showAccountPopup(firstAccount.email, firstAccount.password);
            // IMMEDIATELY SHOW PROOF MODAL
            setTimeout(() => {
                askForProof({
                    email: firstAccount.email,
                    password: firstAccount.password,
                    userId: userId,
                    service: service
                });
            }, 1000);
            return;
        }
    }
    
    // ... rest of account generation code ...
    
    // Show account and IMMEDIATELY ask for proof
    showAccountPopup(email, password);
    
    // Show proof modal immediately after account generation
    setTimeout(() => {
        askForProof({
            email: email,
            password: password,
            userId: userId,
            service: service
        });
    }, 1000);
}

// Check if user provided proof
function hasUserProvidedProof(userId) {
    const userHistory = getAccounts(ACCOUNT_FILES.USER_HISTORY);
    const userEntry = userHistory.find(entry => entry.userId === userId);
    return userEntry ? userEntry.proofProvided : false;
}
// Telegram Proof Forwarding Function
async function sendProofToTelegram(proofData) {
    const botToken = 'YOUR_BOT_TOKEN'; // Apna bot token yahan dalo
    const chatId = 'YOUR_GROUP_CHAT_ID'; // Apne group ka chat ID
    
    const message = `
📋 *PROOF SUBMISSION*

🔸 *Account:* ${proofData.email}
🔸 *Status:* ${proofData.status || 'Unknown'}
🔸 *User ID:* ${proofData.userId}
🔸 *Time:* ${new Date().toLocaleString()}
🔸 *Service:* ${proofData.service}

${proofData.screenshot ? '📸 Screenshot Provided' : '❌ No Screenshot'}
    `;
    
    try {
        // Send message to Telegram group
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        if (response.ok) {
            console.log('Proof sent to Telegram successfully');
            return true;
        } else {
            console.error('Failed to send proof to Telegram');
            return false;
        }
    } catch (error) {
        console.error('Error sending proof to Telegram:', error);
        return false;
    }
}

// Updated sendProofToSupport Function
async function sendProofToSupport() {
    if (!currentProofData) return;
    
    // Validate proof status
    if (!currentProofData.status) {
        alert("⚠️ Please select Working or Not Working first!");
        return;
    }
    
    // Show loading
    const sendBtn = document.querySelector('.send-proof-btn');
    sendBtn.innerHTML = '⏳ Sending...';
    sendBtn.disabled = true;
    
    try {
        // Send to Telegram group
        const telegramSuccess = await sendProofToTelegram(currentProofData);
        
        if (telegramSuccess) {
            alert("✅ Proof successfully sent to support group!");
            
            // Update local storage
            submitProof(currentProofData.status);
        } else {
            alert("❌ Failed to send proof. Saving locally...");
            submitProof(currentProofData.status);
        }
    } catch (error) {
        alert("⚠️ Error sending proof. Saving locally...");
        submitProof(currentProofData.status);
    }
    
    closeProofModal();
}
