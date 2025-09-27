// ===== MAIN APPLICATION =====
class CrunchyRollApp {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize all components
        await this.loadConfig();
        this.init3DBackground();
        this.initCustomCursor();
        this.initSoundSystem();
        this.initLanguageSystem();
        this.initEventListeners();
        this.loadStats();
        this.hideLoadingScreen();
        
        // Start background services
        this.startBackgroundServices();
    }

    // ===== 3D BACKGROUND SYSTEM =====
    init3DBackground() {
        const canvas = document.getElementById('particle-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        
        // Create floating particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
            colorArray[i] = Math.random();
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        camera.position.z = 2;
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.001;
            particlesMesh.rotation.y += 0.002;
            
            const positions = particlesMesh.geometry.attributes.position.array;
            for(let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.0005;
            }
            particlesMesh.geometry.attributes.position.needsUpdate = true;
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // ===== CUSTOM CURSOR SYSTEM =====
    initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        const trail = document.querySelector('.cursor-trail');
        
        document.addEventListener('mousemove', (e) => {
            // Main cursor
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1,
                ease: "power2.out"
            });
            
            // Trail with delay
            gsap.to(trail, {
                x: e.clientX - 4,
                y: e.clientY - 4,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Hover effects
            const target = e.target;
            if (target.classList.contains('generate-btn') || 
                target.classList.contains('action-btn') ||
                target.tagName === 'BUTTON') {
                gsap.to(cursor, { scale: 1.5, duration: 0.2 });
                cursor.style.background = 'rgba(255, 0, 255, 0.3)';
            } else {
                gsap.to(cursor, { scale: 1, duration: 0.2 });
                cursor.style.background = 'transparent';
            }
        });
        
        // Click effect
        document.addEventListener('click', () => {
            gsap.to(cursor, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 });
            this.playSound('click');
        });
    }

    // ===== SOUND SYSTEM =====
    initSoundSystem() {
        this.sounds = {
            click: new Howl({ src: ['assets/sounds/click.mp3'], volume: 0.3 }),
            success: new Howl({ src: ['assets/sounds/success.mp3'], volume: 0.5 }),
            notification: new Howl({ src: ['assets/sounds/notification.mp3'], volume: 0.4 }),
            generate: new Howl({ src: ['assets/sounds/generate.mp3'], volume: 0.6 })
        };
        
        this.soundEnabled = true;
        
        // Sound toggle
        document.getElementById('sound-toggle').addEventListener('click', () => {
            this.soundEnabled = !this.soundEnabled;
            const btn = document.getElementById('sound-toggle');
            btn.textContent = this.soundEnabled ? '🔊' : '🔇';
            this.showNotification(this.soundEnabled ? 'Sound Enabled' : 'Sound Disabled');
        });
        
        // Volume control
        const volumeSlider = document.getElementById('volume-slider');
        volumeSlider.addEventListener('input', (e) => {
            Howler.volume(e.target.value);
        });
    }

    playSound(soundName) {
        if (this.soundEnabled && this.sounds[soundName]) {
            this.sounds[soundName].play();
        }
    }

    // ===== LANGUAGE SYSTEM =====
    initLanguageSystem() {
        const languageSelect = document.getElementById('language-select');
        const savedLanguage = localStorage.getItem('preferred-language') || 'en';
        
        languageSelect.value = savedLanguage;
        this.setLanguage(savedLanguage);
        
        languageSelect.addEventListener('change', (e) => {
            this.setLanguage(e.target.value);
            localStorage.setItem('preferred-language', e.target.value);
        });
    }

    setLanguage(lang) {
        // This would integrate with your languages.js
        document.documentElement.lang = lang;
        this.updateTextContent(lang);
    }

    updateTextContent(lang) {
        // Simple translation implementation - extend with languages.js
        const translations = {
            en: {
                'subtitle': 'Advanced 3D Account Management System',
                'generate-now': 'GENERATE NOW',
                'admin-panel': 'Admin Panel'
            },
            hi: {
                'subtitle': 'उन्नत 3D अकाउंट प्रबंधन प्रणाली',
                'generate-now': 'अभी जनरेट करें',
                'admin-panel': 'एडमिन पैनल'
            },
            es: {
                'subtitle': 'Sistema avanzado de gestión de cuentas 3D',
                'generate-now': 'GENERAR AHORA',
                'admin-panel': 'Panel de administración'
            }
        };
        
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // ===== EVENT LISTENERS =====
    initEventListeners() {
        // Generate account button
        document.getElementById('generate-account').addEventListener('click', () => {
            this.generateAccount();
        });
        
        // Verify channels button
        document.getElementById('verify-channels').addEventListener('click', () => {
            this.verifyChannels();
        });
        
        // Admin panel button
        document.getElementById('open-admin').addEventListener('click', () => {
            this.openAdminPanel();
        });
        
        // Copy buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                this.copyToClipboard(e.target);
            }
        });
    }

    // ===== ACCOUNT GENERATION =====
    async generateAccount() {
        const generateBtn = document.getElementById('generate-account');
        const btnText = generateBtn.querySelector('.btn-text');
        const btnLoading = generateBtn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';
        generateBtn.disabled = true;
        
        this.playSound('generate');
        
        try {
            // Simulate API call - replace with actual backend
            const account = await this.fetchAccount();
            
            // Show result
            this.showAccountResult(account);
            this.playSound('success');
            this.showConfetti();
            
            // Update stats
            this.updateStats();
            
        } catch (error) {
            this.showNotification('Error generating account. Please try again.', 'error');
        } finally {
            // Reset button
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            generateBtn.disabled = false;
            
            // Set cooldown
            this.startCooldown(60); // 60 seconds cooldown
        }
    }

    async fetchAccount() {
        // Replace with actual API call to Netlify function
        const response = await fetch('/.netlify/functions/accounts');
        if (!response.ok) throw new Error('Failed to fetch account');
        return await response.json();
    }

    showAccountResult(account) {
        const resultDiv = document.getElementById('account-result');
        const emailElem = document.getElementById('account-email');
        const passwordElem = document.getElementById('account-password');
        const statusElem = document.getElementById('account-status');
        
        emailElem.textContent = account.email;
        passwordElem.textContent = account.password;
        statusElem.textContent = 'Working';
        statusElem.className = 'status-working';
        
        resultDiv.style.display = 'block';
        
        // Animate appearance
        gsap.fromTo(resultDiv, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 0.5 }
        );
    }

    // ===== COOLDOWN SYSTEM =====
    startCooldown(seconds) {
        const cooldownElem = document.getElementById('cooldown-time');
        const generateBtn = document.getElementById('generate-account');
        
        generateBtn.disabled = true;
        
        let timeLeft = seconds;
        const countdown = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            cooldownElem.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                generateBtn.disabled = false;
                cooldownElem.textContent = 'Ready!';
            }
            
            timeLeft--;
        }, 1000);
    }

    // ===== CHANNEL VERIFICATION =====
    async verifyChannels() {
        const verifyBtn = document.getElementById('verify-channels');
        verifyBtn.disabled = true;
        verifyBtn.textContent = 'Verifying...';
        
        try {
            // Simulate channel verification
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showNotification('Channels verified successfully!', 'success');
            verifyBtn.textContent = 'Verified ✓';
            verifyBtn.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';
            
        } catch (error) {
            this.showNotification('Verification failed. Please try again.', 'error');
            verifyBtn.textContent = 'Verify Now';
            verifyBtn.disabled = false;
        }
    }

    // ===== STATISTICS SYSTEM =====
    async loadStats() {
        try {
            // Simulate API call
            const stats = {
                totalAccounts: 1250,
                workingAccounts: 843,
                totalUsers: 892,
                todayGenerations: 47
            };
            
            this.updateDisplayStats(stats);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    updateDisplayStats(stats) {
        document.getElementById('total-accounts').textContent = stats.totalAccounts.toLocaleString();
        document.getElementById('working-accounts').textContent = stats.workingAccounts.toLocaleString();
        document.getElementById('total-users').textContent = stats.totalUsers.toLocaleString();
        document.getElementById('today-generations').textContent = stats.todayGenerations.toLocaleString();
        
        // Animate number counting
        this.animateValue('total-accounts', 0, stats.totalAccounts, 2000);
        this.animateValue('working-accounts', 0, stats.workingAccounts, 2000);
    }

    animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.textContent = value.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }

    updateStats() {
        // Update stats after account generation
        const todayElem = document.getElementById('today-generations');
        todayElem.textContent = (parseInt(todayElem.textContent) + 1).toString();
    }

    // ===== ADMIN PANEL =====
    openAdminPanel() {
        this.showNotification('Admin panel opening...', 'info');
        // Redirect to admin.html or show modal
        window.location.href = 'admin.html';
    }

    // ===== NOTIFICATION SYSTEM =====
    showNotification(message, type = 'info') {
        const notificationCenter = document.getElementById('notification-center');
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;
        
        notificationCenter.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        this.playSound('notification');
    }

    // ===== CONFETTI EFFECT =====
    showConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        confettiContainer.innerHTML = '';
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.background = this.getRandomColor();
            confettiContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            confettiContainer.innerHTML = '';
        }, 3000);
    }

    getRandomColor() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // ===== UTILITY FUNCTIONS =====
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
            this.showNotification('Copied to clipboard!', 'success');
        } catch (err) {
            this.showNotification('Failed to copy', 'error');
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

    startBackgroundServices() {
        // Update stats every 30 seconds
        setInterval(() => {
            this.loadStats();
        }, 30000);
        
        // Check for updates
        setInterval(() => {
            this.checkForUpdates();
        }, 60000);
    }

    async checkForUpdates() {
        // Implementation for checking updates
        console.log('Checking for updates...');
    }

    async loadConfig() {
        // Load configuration from config.js
        if (typeof CONFIG !== 'undefined') {
            this.config = CONFIG;
        }
    }
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with GSAP
    gsap.registerPlugin();
    
    // Create app instance
    window.crunchyApp = new CrunchyRollApp();
    
    // Prevent right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        window.crunchyApp.showNotification('Right-click is disabled', 'warning');
    });
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
});

// ===== OFFLINE DETECTION =====
window.addEventListener('online', () => {
    window.crunchyApp.showNotification('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    window.crunchyApp.showNotification('You are offline', 'warning');
});
