// script.js
const colorInput =
document.getElementById('colorInput');
const colorValue =
document.getElementById('colorValue');
const colorDisplay =
document.getElementById('colorDisplay');

colorInput.addEventListener('input', function()
{
    const selectedColor = colorInput.value;
    colorValue.textContent = selectedColor;
    colorDisplay.style.backgroundColor = selectedColor;
});