// Mini App Functions
function showAlert() {
    alert('Hello! Mini App Working Perfectly! 🚀');
}

function changeBackground() {
    const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#ff9ff3'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
}

function addItem() {
    const item = prompt('Kya add karna chahte ho?');
    if (item) {
        const list = document.getElementById('itemList');
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    }
}

// Initialize
console.log('Mini App Loaded Successfully!');
