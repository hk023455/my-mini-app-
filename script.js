// ===== CRUNCHYROLL BOT WEB INTERFACE =====
class CrunchyRollBotWeb {
    constructor() {
        this.userId = null;
        this.isVerified = false;
        this.cooldown = false;
        this.currentAccount = null;
        this.soundEnabled = true;
        this.init();
    }

    async init() {
        // Initialize systems
        this.init3DBackground();
        this.initCustomCursor();
        this.initSoundSystem();
        this.initLanguageSystem();
        
        // Get user info
        await this.detectUser();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        await this.loadInitialData();
        
        // Hide loading screen
        this.hideLoadingScreen();
    }

    // ===== 3D BACKGROUND =====
    init3DBackground() {
        const canvas = document.getElementById('particle-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 500;
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00ffff,
            transparent: true,
            opacity: 0.6
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        camera.position.z = 2;
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.x += 0.001;
            particlesMesh.rotation.y += 0.002;
            renderer.render(scene, camera);
        };
        animate();
    }

    // ===== CUSTOM CURSOR =====
    initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1
            });
        });
        
        // Hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.classList.contains('clickable')) {
                gsap.to(cursor, { scale: 1.5, duration: 0.2 });
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.classList.contains('clickable')) {
                gsap.to(cursor, { scale: 1, duration: 0.2 });
            }
        });
    }

    // ===== SOUND SYSTEM =====
    initSoundSystem() {
        this.sounds = {
            click: new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'] }),
            success: new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-success-bell-593.mp3'] }),
            generate: new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'] })
        };
        
        // Sound toggle
        document.getElementById('sound-toggle').addEventListener('click', () => {
            this.soundEnabled = !this.soundEnabled;
            document.getElementById('sound-toggle').textContent = this.soundEnabled ? '🔊' : '🔇';
            this.showNotification(this.soundEnabled ? 'Sound enabled' : 'Sound disabled');
        });
    }

    playSound(soundName) {
        if (this.soundEnabled && this.sounds[soundName]) {
            this.sounds[soundName].play();
        }
    }

    // ===== LANGUAGE SYSTEM =====
    initLanguageSystem() {
        const langSelect = document.getElementById('language-select');
        langSelect.addEventListener('change', (e) => {
            langManager.setLanguage(e.target.value);
        });
    }

    // ===== USER DETECTION =====
    async detectUser() {
        // Try to get user from Telegram WebApp
        if (window.Telegram && Telegram.WebApp) {
            this.userId = Telegram.WebApp.initDataUnsafe.user?.id;
            document.getElementById('user-id').textContent = this.userId;
        }
        
        // If not from Telegram, use demo mode
        if (!this.userId) {
            this.userId = 'demo_user_' + Math.random().toString(36).substr(2, 9);
            document.getElementById('user-id').textContent = this.userId + ' (Demo)';
        }
        
        // Check channel membership
        await this.checkChannelMembership();
    }

    // ===== CHANNEL VERIFICATION =====
    async checkChannelMembership() {
        const statusElem = document.getElementById('channel-status');
        
        try {
            const response = await fetch(CONFIG.API_ENDPOINTS.VERIFY_CHANNELS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.userId })
            });
            
            const result = await response.json();
            
            if (result.verified) {
                this.isVerified = true;
                statusElem.innerHTML = '<span style="color:#00ff00">✅ ' + langManager.getText('verified') + '</span>';
                document.getElementById('user-status').textContent = 'Verified';
            } else {
                this.isVerified = false;
                statusElem.innerHTML = '<span style="color:#ff0000">❌ ' + langManager.getText('not-verified') + '</span>' +
                                      '<button onclick="crunchyBot.verifyChannels()" style="margin-left:10px">' + langManager.getText('verify-now') + '</button>';
                document.getElementById('user-status').textContent = 'Not Verified';
            }
        } catch (error) {
            console.error('Channel verification error:', error);
            statusElem.innerHTML = '<span style="color:#ff9900">⚠️ Verification service unavailable</span>';
        }
    }

    async verifyChannels() {
        this.showNotification('Redirecting to channels...');
        // Redirect to Telegram channels
        window.open('https://t.me/logic_channel', '_blank');
    }

    // ===== ACCOUNT GENERATION =====
    async generateAccount() {
        if (!this.isVerified) {
            this.showNotification('Please verify channel membership first');
            return;
        }
        
        if (this.cooldown) {
            this.showNotification('Please wait before generating another account');
            return;
        }
        
        const generateBtn = document.getElementById('generate-btn');
        const btnText = generateBtn.querySelector('.btn-text');
        const btnLoader = generateBtn.querySelector('.btn-loader');
        
        // Show loading
        btnText.textContent = langManager.getText('generating');
        btnLoader.style.display = 'block';
        generateBtn.disabled = true;
        
        this.playSound('generate');
        
        try {
            const response = await fetch(CONFIG.API_ENDPOINTS.GENERATE_ACCOUNT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.userId })
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.currentAccount = result.account;
                this.showAccountResult(result.account);
                this.playSound('success');
                this.showConfetti();
                
                // Send Telegram alert
                this.sendTelegramAlert();
                
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            this.showNotification('Error generating account: ' + error.message);
        } finally {
            // Reset button
            btnText.textContent = langManager.getText('generate-account');
            btnLoader.style.display = 'none';
            generateBtn.disabled = false;
            
            // Set cooldown
            this.startCooldown();
        }
    }

    showAccountResult(account) {
        const resultDiv = document.getElementById('account-result');
        document.getElementById('account-email').textContent = account.email;
        document.getElementById('account-password').textContent = account.password;
        document.getElementById('account-status').textContent = langManager.getText('generated');
        document.getElementById('account-status').className = 'status-working';
        
        resultDiv.style.display = 'block';
        gsap.fromTo(resultDiv, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
        
        this.showNotification(langManager.getText('generation-success'));
    }

    // ===== FEEDBACK SYSTEM =====
    async markAccountWorking() {
        if (!this.currentAccount) {
            this.showNotification('No account to mark');
            return;
        }
        
        try {
            await fetch(CONFIG.API_ENDPOINTS.UPDATE_ACCOUNT_STATUS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    account: this.currentAccount,
                    status: 'working',
                    userId: this.userId
                })
            });
            
            this.showNotification(langManager.getText('account-marked-working'));
            this.currentAccount = null;
            
        } catch (error) {
            this.showNotification('Error updating account status');
        }
    }

    async markAccountNotWorking() {
        if (!this.currentAccount) {
            this.showNotification('No account to mark');
            return;
        }
        
        try {
            await fetch(CONFIG.API_ENDPOINTS.UPDATE_ACCOUNT_STATUS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    account: this.currentAccount,
                    status: 'not_working',
                    userId: this.userId
                })
            });
            
            this.showNotification(langManager.getText('account-marked-not-working'));
            this.currentAccount = null;
            
        } catch (error) {
            this.showNotification('Error updating account status');
        }
    }

    // ===== SCREENSHOT PROOF =====
    async sendScreenshotProof() {
        const fileInput = document.getElementById('screenshot-input');
        if (!fileInput.files[0]) {
            this.showNotification('Please select a screenshot first');
            return;
        }
        
        const formData = new FormData();
        formData.append('screenshot', fileInput.files[0]);
        formData.append('userId', this.userId);
        formData.append('account', JSON.stringify(this.currentAccount));
        
        try {
            await fetch(CONFIG.API_ENDPOINTS.SEND_PROOF, {
                method: 'POST',
                body: formData
            });
            
            this.showNotification(langManager.getText('proof-sent'));
            fileInput.value = '';
            
        } catch (error) {
            this.showNotification('Error sending proof');
        }
    }

    // ===== TELEGRAM ALERT =====
    async sendTelegramAlert() {
        try {
            await fetch('/.netlify/functions/send-alert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.userId,
                    account: this.currentAccount,
                    type: 'generation'
                })
            });
        } catch (error) {
            console.error('Telegram alert failed:', error);
        }
    }

    // ===== COOLDOWN SYSTEM =====
    startCooldown() {
        this.cooldown = true;
        const generateBtn = document.getElementById('generate-btn');
        const btnText = generateBtn.querySelector('.btn-text');
        
        let timeLeft = CONFIG.GENERATION.COOLDOWN_TIME;
        const countdown = setInterval(() => {
            btnText.textContent = `Cooldown: ${timeLeft}s`;
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                this.cooldown = false;
                btnText.textContent = langManager.getText('generate-account');
                generateBtn.disabled = false;
            }
            
            timeLeft--;
        }, 1000);
    }

    // ===== STATISTICS =====
    async loadInitialData() {
        try {
            const response = await fetch(CONFIG.API_ENDPOINTS.GET_STATS);
            const stats = await response.json();
            
            this.updateStatsDisplay(stats);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    updateStatsDisplay(stats) {
        document.getElementById('total-accounts').textContent = stats.totalAccounts.toLocaleString();
        document.getElementById('working-accounts').textContent = stats.workingAccounts.toLocaleString();
        document.getElementById('today-generations').textContent = stats.todayGenerations.toLocaleString();
        document.getElementById('user-generations').textContent = stats.userGenerations.toLocaleString();
    }

    // ===== UTILITIES =====
    setupEventListeners() {
        // Generate button
        document.getElementById('generate-btn').addEventListener('click', () => {
            this.generateAccount();
        });
        
        // Feedback buttons
        document.getElementById('working-btn').addEventListener('click', () => {
            this.markAccountWorking();
        });
        
        document.getElementById('not-working-btn').addEventListener('click', () => {
            this.markAccountNotWorking();
        });
        
        // Copy buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.copyToClipboard(e.target);
            });
        });
        
        // Screenshot proof
        document.getElementById('send-proof').addEventListener('click', () => {
            this.sendScreenshotProof();
        });
    }

    async copyToClipboard(button) {
        const copyType = button.getAttribute('data-copy');
        let textToCopy = '';
        
        if (copyType === 'email') {
            textToCopy = document.getElementById('account-email').textContent;
        } else if (copyType === 'password') {
            textToCopy = document.getElementById('account-password').textContent;
        } else {
            const email = document.getElementById('account-email').textContent;
            const password = document.getElementById('account-password').textContent;
            textToCopy = `Email: ${email}\nPassword: ${password}`;
        }
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            this.showNotification(langManager.getText('copy-success'));
            this.playSound('success');
        } catch (err) {
            this.showNotification('Failed to copy');
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            border-left: 4px solid #00ffff;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    showConfetti() {
        // Simple confetti effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: hsl(${Math.random() * 360}, 100%, 50%);
                    top: -10px;
                    left: ${Math.random() * 100}vw;
                    animation: confetti-fall 3s linear forwards;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 100);
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loadingScreen.style.display = 'none';
            }
        });
    }
}

// Initialize the application
const crunchyBot = new CrunchyRollBotWeb();
window.crunchyBot = crunchyBot;
