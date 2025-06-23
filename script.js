// script.js
const colorInput = document.getElementById('colorInput');
const colorValue = document.getElementById('colorValue');
const colorDisplay = document.getElementById('colorDisplay');
const copyBtn = document.getElementById('copyBtn');
const themeToggle = document.getElementById('themeToggle');

// Create and insert RGB value display
let rgbValue = document.createElement('div');
rgbValue.id = 'rgbValue';
rgbValue.style.marginTop = '0.5rem';
rgbValue.style.fontSize = '1rem';
rgbValue.style.color = '#888';
colorValue.parentNode.insertBefore(rgbValue, colorValue.nextSibling);

function hexToRgb(hex) {
    let c = hex.substring(1);
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return `rgb(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255})`;
}

function animateColorDisplay() {
    colorDisplay.animate(
        [
            { transform: 'scale(1)', boxShadow: colorDisplay.style.boxShadow },
            { transform: 'scale(1.08)', boxShadow: '0 0 32px 8px rgba(0,0,0,0.12)' },
            { transform: 'scale(1)', boxShadow: colorDisplay.style.boxShadow }
        ],
        { duration: 350, easing: 'ease' }
    );
}

function updateColor() {
    const color = colorInput.value;
    colorValue.textContent = color;
    colorDisplay.style.background = color;
    rgbValue.textContent = hexToRgb(color);
    animateColorDisplay();
}

colorInput.addEventListener('input', updateColor);

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(colorValue.textContent);
    copyBtn.textContent = '✔ Copied!';
    copyBtn.style.background = '#4caf50';
    copyBtn.style.transition = 'background 0.3s';
    setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.style.background = '';
    }, 1200);
});

// Theme toggle logic
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Change icon
    if (document.body.classList.contains('dark')) {
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
    // Save preference
    localStorage.setItem('colorPickerTheme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load theme preference
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('colorPickerTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
    updateColor();
});
