// ⚡️ PREMIUM GENERATOR PRO - MAIN SCRIPT
class PremiumGenerator {
    constructor() {
        this.currentUser = null;
        this.currentProof = null;
        this.isAdmin = false;
        this.parallaxInstance = null;
        this.init();
    }

    init() {
        this.initializeUser();
        this.setupEventListeners();
        this.initialize3DEffects();
        this.loadUserData();
        this.setupServiceWorker();
        this.checkPremiumStatus();
        console.log('⚡️ Premium Generator Pro Initialized');
    }

    initializeUser() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
        }
        
        this.currentUser = {
            id: userId,
            generations: parseInt(localStorage.getItem('userGenerations')) || 0,
            referrals: parseInt(localStorage.getItem('userReferrals')) || 0,
            points: parseInt(localStorage.getItem('userPoints')) || 0,
            joined: localStorage.getItem('userJoinDate') || new Date().toISOString()
        };

        this.saveUserData();
    }

    setupEventListeners() {
        // CAPTCHA Verification
        document.getElementById('captchaInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.verifyCaptcha();
        });

        // Proof Image Upload
        document.getElementById('proofImage')?.addEventListener('change', (e) => {
            this.handleProofImage(e.target.files[0]);
        });

        // Modal Closes
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup-modal') || 
                e.target.classList.contains('proof-modal') ||
                e.target.classList.contains('premium-modal')) {
                this.closeAllModals();
            }
        });

        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeAllModals();
            if (e.key === 'F1') e.preventDefault() && this.showHelp();
        });
    }

    initialize3DEffects() {
        // Parallax Background
        const scene = document.querySelector('.parallax-bg');
        if (scene) {
            this.parallaxInstance = new Parallax(scene, {
                relativeInput: true,
                hoverOnly: true
            });
        }

        // Mouse Move 3D Effect
        document.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });

        // Scroll Parallax
        window.addEventListener('scroll', () => {
            this.handleScrollParallax();
        });
    }

    handleMouseMove(e) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        document.querySelectorAll('.service-card-3d').forEach(card => {
            const depth = 20;
            const rotateX = (y - 50) * 0.1;
            const rotateY = (x - 50) * 0.1;
            
            card.style.transform = `
                translateZ(${depth}px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });
    }

    handleScrollParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        document.querySelectorAll('.bg-layer').forEach((layer, index) => {
            const speed = (index + 1) * 0.1;
            layer.style.transform = `translateY(${rate * speed}px)`;
        });
    }

    // CAPTCHA System
    generateCaptcha() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        const captchaElement = document.getElementById('captchaText');
        if (captchaElement) {
            captchaElement.textContent = captcha;
            captchaElement.style.color = this.getRandomColor();
        }
        
        return captcha;
    }

    getRandomColor() {
        const colors = ['#ff6b6b', '#48dbfb', '#feca57', '#1dd1a1', '#ff9ff3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    verifyCaptcha() {
        const input = document.getElementById('captchaInput');
        const captcha = document.getElementById('captchaText');
        
        if (!input || !captcha) return;

        if (input.value.toUpperCase() === captcha.textContent) {
            this.showServices();
            this.showNotification('CAPTCHA Verified!', 'success');
        } else {
            this.showNotification('Invalid CAPTCHA! Try again.', 'error');
            this.generateCaptcha();
            input.value = '';
            input.focus();
        }
    }

    refreshCaptcha() {
        this.generateCaptcha();
        document.getElementById('captchaInput').value = '';
    }

    // Services Management
    showServices() {
        document.querySelector('.welcome-section').style.display = 'none';
        document.getElementById('servicesSection').style.display = 'block';
        
        // Add entrance animation
        gsap.from('.service-card-3d', {
            duration: 0.8,
            y: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });
    }

    selectService(service) {
        if (this.isRateLimited()) {
            this.showNotification('Rate limit exceeded! Try again later.', 'error');
            return;
        }

        // Check premium requirements for some services
        if (this.requiresPremium(service) && !this.isPremiumUser()) {
            this.showPremiumPlans();
            return;
        }

        this.generateAccount(service);
    }

    requiresPremium(service) {
        const premiumServices = ['netflix', 'disney', 'hbo'];
        return premiumServices.includes(service);
    }

    isPremiumUser() {
        const status = paymentSystem.userStatus;
        return status.isPremium && status.expiry > Date.now();
    }

    // Account Generation System
    async generateAccount(service) {
        try {
            this.showLoader('Generating account...');

            let account;
            switch(service) {
                case 'crunchyroll':
                    account = this.getCrunchyrollAccount();
                    break;
                case 'expressvpn':
                    account = vpnServices.getAccount('expressvpn');
                    break;
                case 'nordvpn':
                    account = vpnServices.getAccount('nordvpn');
                    break;
                default:
                    throw new Error('Service not available');
            }

            if (!account) {
                throw new Error('No accounts available for this service');
            }

            await this.simulateGenerationDelay();
            this.showAccountPopup(account);
            this.trackGeneration(service);

            // Auto-show proof modal after 3 seconds
            setTimeout(() => {
                this.askForProof(account);
            }, 3000);

        } catch (error) {
            this.showNotification(error.message, 'error');
        } finally {
            this.hideLoader();
        }
    }

    getCrunchyrollAccount() {
        const accounts = [
            "premium.anime@crunchy.com:AnimeLove123",
            "watch.japan@premium.com:OtakuKing456",
            "anime.stream@account.com:Naruto789",
            "manga.fan@premium.com:OnePiece012",
            "japan.animation@vip.com:DragonBall345"
        ];

        const usedAccounts = JSON.parse(localStorage.getItem('usedAccounts')) || [];
        const availableAccounts = accounts.filter(acc => !usedAccounts.includes(acc));

        if (availableAccounts.length === 0) {
            return null;
        }

        const randomAccount = availableAccounts[Math.floor(Math.random() * availableAccounts.length)];
        usedAccounts.push(randomAccount);
        localStorage.setItem('usedAccounts', JSON.stringify(usedAccounts));

        const [email, password] = randomAccount.split(':');
        return { email, password, service: 'crunchyroll' };
    }

    simulateGenerationDelay() {
        return new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    }

    // Proof System
    askForProof(account) {
        this.currentProof = {
            ...account,
            userId: this.currentUser.id,
            timestamp: new Date().toISOString()
        };

        this.showProofModal();
    }

    showProofModal() {
        const modal = document.getElementById('proofModal');
        modal.style.display = 'block';
        
        // Force user to provide proof
        modal.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden';
    }

    submitProof(status) {
        if (!this.currentProof) return;

        this.currentProof.status = status;
        this.currentProof.proofTime = new Date().toISOString();

        // Save proof to history
        this.saveProofToHistory();

        this.showNotification(`Proof submitted as ${status.toUpperCase()}`, 'success');
        this.closeProofModal();

        // Auto-send to support if working
        if (status === 'working') {
            this.sendProofToSupport();
        }
    }

    async sendProofToSupport() {
        if (!this.currentProof) return;

        try {
            // Simulate sending to Telegram
            await this.sendToTelegram();
            this.showNotification('Proof sent to support!', 'success');
        } catch (error) {
            this.showNotification('Failed to send proof', 'error');
        }
    }

    async sendToTelegram() {
        // Simulate API call to Telegram bot
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Proof sent to Telegram:', this.currentProof);
                resolve(true);
            }, 1000);
        });
    }

    handleProofImage(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('proofPreview');
            preview.innerHTML = `<img src="${e.target.result}" style="max-width: 200px; border-radius: 10px;">`;
        };
        reader.readAsDataURL(file);
    }

    // Modal Management
    closeAllModals() {
        document.querySelectorAll('.popup-modal, .proof-modal, .premium-modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }

    closeProofModal() {
        document.getElementById('proofModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        this.currentProof = null;
    }

    // UI Helpers
    showLoader(message) {
        // Implement loading overlay
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="spinner"></div>
            <p>${message}</p>
        `;
        document.body.appendChild(loader);
    }

    hideLoader() {
        const loader = document.querySelector('.loading-overlay');
        if (loader) loader.remove();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Data Management
    saveUserData() {
        localStorage.setItem('userGenerations', this.currentUser.generations);
        localStorage.setItem('userReferrals', this.currentUser.referrals);
        localStorage.setItem('userPoints', this.currentUser.points);
        localStorage.setItem('userJoinDate', this.currentUser.joined);
    }

    loadUserData() {
        document.getElementById('userGenerations').textContent = this.currentUser.generations;
        document.getElementById('userReferrals').textContent = this.currentUser.referrals;
        document.getElementById('userPoints').textContent = this.currentUser.points;
    }

    trackGeneration(service) {
        this.currentUser.generations++;
        this.currentUser.points += 10;
        this.saveUserData();
        this.loadUserData();

        // Save generation history
        const history = JSON.parse(localStorage.getItem('generationHistory')) || [];
        history.push({
            service,
            timestamp: new Date().toISOString(),
            userId: this.currentUser.id
        });
        localStorage.setItem('generationHistory', JSON.stringify(history));
    }

    saveProofToHistory() {
        const proofs = JSON.parse(localStorage.getItem('proofHistory')) || [];
        proofs.push(this.currentProof);
        localStorage.setItem('proofHistory', JSON.stringify(proofs));
    }

    isRateLimited() {
        const lastGeneration = localStorage.getItem('lastGeneration');
        if (!lastGeneration) return false;

        const timeDiff = Date.now() - parseInt(lastGeneration);
        return timeDiff < 60000; // 1 minute rate limit
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
        }
    }

    checkPremiumStatus() {
        if (this.isPremiumUser()) {
            document.querySelector('.premium-btn').classList.add('premium-active');
        }
    }
}

// Global Functions for HTML onclick events
function verifyCaptcha() {
    premiumGenerator.verifyCaptcha();
}

function refreshCaptcha() {
    premiumGenerator.refreshCaptcha();
}

function selectService(service) {
    premiumGenerator.selectService(service);
}

function markWorking() {
    premiumGenerator.submitProof('working');
}

function markNotWorking() {
    premiumGenerator.submitProof('not_working');
}

function closePopup() {
    premiumGenerator.closeAllModals();
}

function showPremiumPlans() {
    document.getElementById('premiumModal').style.display = 'block';
}

function uploadProofImage() {
    document.getElementById('proofImage').click();
}

function sendProofToSupport() {
    premiumGenerator.sendProofToSupport();
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
    
    const themeBtn = document.getElementById('themeBtn');
    const isDark = document.body.classList.contains('dark-theme');
    
    themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(savedTheme + '-theme');
    
    const themeBtn = document.getElementById('themeBtn');
    themeBtn.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// Show Account Popup
function showAccountPopup(account) {
    document.getElementById('popupServiceTitle').textContent = 
        account.service === 'crunchyroll' ? '🎞️ CRUNCHY SCROLL' : 
        account.service === 'expressvpn' ? '🛡️ EXPRESS VPN' : '🔒 NORD VPN';
    
    document.getElementById('popupEmail').textContent = account.email;
    document.getElementById('popupPassword').textContent = account.password;
    document.getElementById('accountPopup').style.display = 'block';
}

// Admin Functions
function showAdminLogin() {
    const password = prompt('Enter admin password:');
    if (password === 'kartik@6201') {
        premiumGenerator.isAdmin = true;
        showAdminPanel();
    } else {
        alert('Invalid password!');
    }
}

function showAdminPanel() {
    // Implement admin panel UI
    alert('Admin panel will be implemented in next version');
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    premiumGenerator = new PremiumGenerator();
    premiumGenerator.generateCaptcha();
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }
        .notification.success { background: #1dd1a1; }
        .notification.error { background: #ff6b6b; }
        .notification button { background: none; border: none; color: white; margin-left: 10px; }
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } }
        
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
        }
        .spinner {
            border: 4px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top: 4px solid #ff6b6b;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
});

// Global variable
let premiumGenerator;
