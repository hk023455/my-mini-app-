// Admin Configuration
const ADMIN_PASSWORD = "kartik@6201";
let isAdminLoggedIn = false;

// Admin Login Functions
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
        setTimeout(() => {
            errorElement.textContent = "";
        }, 3000);
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = "";
}

// Tab Management
function openTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Load Admin Dashboard
function loadAdminDashboard() {
    updateStatistics();
    loadAccountsList();
    loadUsersList();
}

// Statistics Functions
function updateStatistics() {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const generations = JSON.parse(localStorage.getItem('generationHistory')) || [];
    const accounts = JSON.parse(localStorage.getItem('crunchyrollAccounts')) || [];
    
    const today = new Date().toDateString();
    const todayGenerations = generations.filter(gen => 
        new Date(gen.timestamp).toDateString() === today
    );
    
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('todayGenerations').textContent = todayGenerations.length;
    document.getElementById('totalAccounts').textContent = accounts.length;
    
    const workingAccounts = accounts.filter(acc => acc.status === 'working').length;
    document.getElementById('workingAccounts').textContent = workingAccounts;
}

// Accounts Management
function showAddAccountForm() {
    const form = document.getElementById('addAccountForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function addAccounts() {
    const accountsText = document.getElementById('newAccounts').value;
    const accounts = accountsText.split('\n')
        .filter(line => line.trim() && line.includes(':'))
        .map(line => {
            const [email, password] = line.split(':');
            return { email: email.trim(), password: password.trim(), status: 'active' };
        });
    
    if (accounts.length > 0) {
        const existingAccounts = JSON.parse(localStorage.getItem('crunchyrollAccounts')) || [];
        const updatedAccounts = [...existingAccounts, ...accounts];
        localStorage.setItem('crunchyrollAccounts', JSON.stringify(updatedAccounts));
        
        document.getElementById('newAccounts').value = "";
        document.getElementById('addAccountForm').style.display = 'none';
        loadAccountsList();
        alert(`✅ ${accounts.length} accounts added successfully!`);
    }
}

function loadAccountsList() {
    const accounts = JSON.parse(localStorage.getItem('crunchyrollAccounts')) || [];
    const accountsList = document.getElementById('accountsList');
    
    accountsList.innerHTML = accounts.map((account, index) => `
        <div class="account-item">
            <div class="account-email">${account.email}</div>
            <div class="account-password">${'*'.repeat(account.password.length)}</div>
            <div class="account-status">Status: ${account.status}</div>
            <button onclick="removeAccount(${index})" class="mute-btn">Delete</button>
            <button onclick="toggleAccountStatus(${index})" class="unmute-btn">
                ${account.status === 'active' ? 'Deactivate' : 'Activate'}
            </button>
        </div>
    `).join('');
}

function removeAccount(index) {
    const accounts = JSON.parse(localStorage.getItem('crunchyrollAccounts')) || [];
    accounts.splice(index, 1);
    localStorage.setItem('crunchyrollAccounts', JSON.stringify(accounts));
    loadAccountsList();
}

function toggleAccountStatus(index) {
    const accounts = JSON.parse(localStorage.getItem('crunchyrollAccounts')) || [];
    accounts[index].status = accounts[index].status === 'active' ? 'inactive' : 'active';
    localStorage.setItem('crunchyrollAccounts', JSON.stringify(accounts));
    loadAccountsList();
}

// User Management
function loadUsersList() {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const usersList = document.getElementById('usersList');
    
    usersList.innerHTML = users.map((user, index) => `
        <div class="user-item">
            <div class="user-id">ID: ${user.id}</div>
            <div class="user-name">Name: ${user.name || 'Unknown'}</div>
            <div class="user-status">Status: ${user.muted ? 'Muted' : 'Active'}</div>
            <div class="user-actions">
                <button onclick="toggleUserMute(${index})" class="${user.muted ? 'unmute-btn' : 'mute-btn'}">
                    ${user.muted ? 'Unmute' : 'Mute'}
                </button>
                <button onclick="deleteUser(${index})" class="mute-btn">Delete</button>
            </div>
        </div>
    `).join('');
}

function toggleUserMute(index) {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    users[index].muted = !users[index].muted;
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    loadUsersList();
}

function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    users.splice(index, 1);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    loadUsersList();
}

// Settings Functions
function changePassword() {
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword.length >= 4) {
        ADMIN_PASSWORD = newPassword;
        localStorage.setItem('adminPassword', newPassword);
        alert('✅ Password changed successfully!');
        document.getElementById('newPassword').value = "";
    } else {
        alert('❌ Password must be at least 4 characters!');
    }
}

// Initialize admin system
function initializeAdminSystem() {
    const savedPassword = localStorage.getItem('adminPassword');
    if (savedPassword) {
        ADMIN_PASSWORD = savedPassword;
    }
    
    // Initialize sample data if not exists
    if (!localStorage.getItem('registeredUsers')) {
        localStorage.setItem('registeredUsers', JSON.stringify([]));
    }
    if (!localStorage.getItem('crunchyrollAccounts')) {
        localStorage.setItem('crunchyrollAccounts', JSON.stringify([]));
    }
    if (!localStorage.getItem('generationHistory')) {
        localStorage.setItem('generationHistory', JSON.stringify([]));
    }
}

// Call initialization
initializeAdminSystem();
