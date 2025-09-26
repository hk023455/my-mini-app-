// 💰 PAYMENT AND PREMIUM SYSTEM
class PaymentSystem {
    constructor() {
        this.plans = CONFIG.PREMIUM_PLANS;
        this.userStatus = this.loadUserStatus();
        this.init();
    }

    init() {
        this.setupPaymentListeners();
        this.updatePremiumDisplay();
    }

    loadUserStatus() {
        return JSON.parse(localStorage.getItem('userPremiumStatus')) || {
            isPremium: false,
            plan: null,
            expiry: null,
            referrals: 0,
            points: 0,
            payments: []
        };
    }

    saveUserStatus() {
        localStorage.setItem('userPremiumStatus', JSON.stringify(this.userStatus));
    }

    setupPaymentListeners() {
        // Payment verification system
        this.setupPaymentVerification();
    }

    selectPlan(planType) {
        const plan = this.plans[planType.toUpperCase()];
        if (!plan) return;

        // Show payment modal with QR code
        this.showPaymentModal(planType, plan);
    }

    showPaymentModal(planType, plan) {
        // Update payment modal content
        const modal = document.getElementById('premiumModal');
        const qrImg = modal.querySelector('.qr-code img');
        
        // Generate dynamic QR code with user info
        const paymentData = {
            plan: planType,
            amount: plan.PRICE,
            currency: plan.CURRENCY,
            userId: this.getUserId(),
            timestamp: Date.now()
        };

        const qrData = btoa(JSON.stringify(paymentData));
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;

        // Show modal
        modal.style.display = 'block';
    }

    verifyPayment(proofImage) {
        // Simulate payment verification
        return new Promise((resolve) => {
            setTimeout(() => {
                // In real implementation, this would verify with payment gateway
                const success = Math.random() > 0.2; // 80% success rate for demo
                resolve(success);
            }, 2000);
        });
    }

    activatePremium(planType) {
        this.userStatus.isPremium = true;
        this.userStatus.plan = planType;
        this.userStatus.expiry = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 days
        this.saveUserStatus();

        this.updatePremiumDisplay();
        this.sendActivationNotification();
    }

    updatePremiumDisplay() {
        const premiumBtn = document.querySelector('.premium-btn');
        if (this.userStatus.isPremium) {
            premiumBtn.innerHTML = '<i class="fas fa-crown"></i> PREMIUM ACTIVE';
            premiumBtn.style.background = 'linear-gradient(45deg, #feca57, #ff9f43)';
        }
    }

    getUserId() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
        }
        return userId;
    }

    sendActivationNotification() {
        // Send to Telegram bot
        this.sendTelegramNotification(`User ${this.getUserId()} activated ${this.userStatus.plan} plan`);
    }

    sendTelegramNotification(message) {
        // Telegram bot integration
        if (CONFIG.TELEGRAM.BOT_TOKEN) {
            fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM.BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CONFIG.TELEGRAM.LOGS_CHANNEL,
                    text: message
                })
            });
        }
    }

    // Referral system
    addReferral() {
        this.userStatus.referrals++;
        this.userStatus.points += 100;
        this.saveUserStatus();
        this.updateStatsDisplay();
    }

    updateStatsDisplay() {
        document.getElementById('userReferrals').textContent = this.userStatus.referrals;
        document.getElementById('userPoints').textContent = this.userStatus.points;
    }

    setupPaymentVerification() {
        // Handle payment proof submission
        const paymentProofHandler = (event) => {
            const file = event.target.files[0];
            if (file) {
                this.handlePaymentProof(file);
            }
        };

        // Add event listener for payment proof
        document.addEventListener('DOMContentLoaded', () => {
            const proofInput = document.getElementById('paymentProof');
            if (proofInput) {
                proofInput.addEventListener('change', paymentProofHandler);
            }
        });
    }

    async handlePaymentProof(file) {
        // Upload proof and verify
        const formData = new FormData();
        formData.append('proof', file);
        formData.append('userId', this.getUserId());

        try {
            // Simulate API call
            const verification = await this.verifyPayment(file);
            
            if (verification) {
                this.activatePremium('pro'); // Activate pro plan for demo
                alert('Payment verified! Premium activated.');
            } else {
                alert('Payment verification failed. Please try again.');
            }
        } catch (error) {
            alert('Error verifying payment. Please contact support.');
        }
    }
}

// Initialize Payment System
const paymentSystem = new PaymentSystem();

// Global functions for HTML
function selectPlan(planType) {
    paymentSystem.selectPlan(planType);
}

function showPremiumPlans() {
    document.getElementById('premiumModal').style.display = 'block';
}
