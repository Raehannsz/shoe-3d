// Ganti warna sepatu
import { updateMaterialColor } from '../js/materials.js';

const colors = [
    { name: 'Red', value: '#ff6b6b' },
    { name: 'Blue', value: '#4ecdc4' },
    { name: 'Green', value: '#95e1d3' },
    { name: 'Yellow', value: '#f9ca24' },
    { name: 'Purple', value: '#a29bfe' },
    { name: 'Black', value: '#2d3436' },
    { name: 'White', value: '#ffffff' },
    { name: 'Orange', value: '#ff7675' }
];

export function initColorPicker(model) {
    const container = document.getElementById('color-picker-container');

    const title = document.createElement('h3');
    title.textContent = 'Choose Color';
    title.style.color = 'white';
    title.style.marginBottom = '10px';
    title.style.fontSize = '16px';
    container.appendChild(title);

    const colorGrid = document.createElement('div');
    colorGrid.style.display = 'grid';
    colorGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    colorGrid.style.gap = '10px';

    colors.forEach(color => {
        const colorButton = document.createElement('button');
        colorButton.style.width = '40px';
        colorButton.style.height = '40px';
        colorButton.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        colorButton.style.borderRadius = '50%';
        colorButton.style.backgroundColor = color.value;
        colorButton.style.cursor = 'pointer';
        colorButton.style.transition = 'transform 0.2s, box-shadow 0.2s';
        colorButton.title = color.name;

        colorButton.addEventListener('mouseenter', () => {
            colorButton.style.transform = 'scale(1.1)';
            colorButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        });

        colorButton.addEventListener('mouseleave', () => {
            colorButton.style.transform = 'scale(1)';
            colorButton.style.boxShadow = 'none';
        });

        colorButton.addEventListener('click', () => {
            if (model) {
                model.traverse((child) => {
                    if (child.isMesh) {
                        updateMaterialColor(child, color.value);
                    }
                });
            }
        });

        colorGrid.appendChild(colorButton);
    });

    container.appendChild(colorGrid);
}
