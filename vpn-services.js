// 🔒 VPN SERVICES MANAGEMENT
class VPNServices {
    constructor() {
        this.accounts = {
            expressvpn: [
                "premium1@expressvpn.com:vpn123456",
                "premium2@expressvpn.com:secure789",
                "vip3@expressvpn.com:fastvpn012",
                "account4@expressvpn.com:express345"
            ],
            nordvpn: [
                "norduser1@nordvpn.com:nordpass123",
                "premium2@nordvpn.com:secure456",
                "vip3@nordvpn.com:nord789",
                "account4@nordvpn.com:vpn012345"
            ]
        };
        this.init();
    }

    init() {
        this.loadAccountsFromStorage();
    }

    loadAccountsFromStorage() {
        // Load from localStorage or use default
        Object.keys(this.accounts).forEach(service => {
            const stored = localStorage.getItem(`vpn_${service}_accounts`);
            if (stored) {
                this.accounts[service] = JSON.parse(stored);
            }
        });
    }

    saveAccountsToStorage() {
        Object.keys(this.accounts).forEach(service => {
            localStorage.setItem(`vpn_${service}_accounts`, JSON.stringify(this.accounts[service]));
        });
    }

    getAccount(service) {
        if (!this.accounts[service] || this.accounts[service].length === 0) {
            return null;
        }

        // Get random account
        const randomIndex = Math.floor(Math.random() * this.accounts[service].length);
        const accountStr = this.accounts[service][randomIndex];
        
        // Remove from available accounts
        this.accounts[service].splice(randomIndex, 1);
        this.saveAccountsToStorage();

        const [email, password] = accountStr.split(':');
        return { email, password, service };
    }

    addAccounts(service, newAccounts) {
        if (!this.accounts[service]) {
            this.accounts[service] = [];
        }

        const accountsArray = Array.isArray(newAccounts) ? newAccounts : [newAccounts];
        this.accounts[service].push(...accountsArray);
        this.saveAccountsToStorage();
    }

    getServiceStats() {
        const stats = {};
        Object.keys(this.accounts).forEach(service => {
            stats[service] = {
                total: this.accounts[service].length,
                available: this.accounts[service].length
            };
        });
        return stats;
    }

    // Admin functions
    getAllAccounts() {
        return this.accounts;
    }

    clearService(service) {
        if (this.accounts[service]) {
            this.accounts[service] = [];
            this.saveAccountsToStorage();
        }
    }
}

// Initialize VPN Services
const vpnServices = new VPNServices();
