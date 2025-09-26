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
