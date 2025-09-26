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
    window.open('https://t.me/your_channel_link', '_blank');
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
    window.open('https://t.me/your_help_channel', '_blank');
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
