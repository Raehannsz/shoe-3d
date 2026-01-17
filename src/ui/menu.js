// UI customizer
import { getControls } from '../js/controls.js';

export function initMenu() {
    const container = document.getElementById('menu-container');

    const title = document.createElement('h3');
    title.textContent = 'Controls';
    title.style.color = 'white';
    title.style.marginBottom = '10px';
    title.style.fontSize = '16px';
    title.style.marginTop = '20px';
    container.appendChild(title);

    // Auto-rotate toggle
    const autoRotateContainer = document.createElement('div');
    autoRotateContainer.style.marginBottom = '10px';

    const autoRotateLabel = document.createElement('label');
    autoRotateLabel.style.color = 'white';
    autoRotateLabel.style.display = 'flex';
    autoRotateLabel.style.alignItems = 'center';
    autoRotateLabel.style.cursor = 'pointer';

    const autoRotateCheckbox = document.createElement('input');
    autoRotateCheckbox.type = 'checkbox';
    autoRotateCheckbox.checked = true;
    autoRotateCheckbox.style.marginRight = '8px';
    autoRotateCheckbox.style.cursor = 'pointer';

    autoRotateCheckbox.addEventListener('change', () => {
        const controls = getControls();
        if (controls) {
            controls.autoRotate = autoRotateCheckbox.checked;
        }
    });

    const labelText = document.createElement('span');
    labelText.textContent = 'Auto Rotate';

    autoRotateLabel.appendChild(autoRotateCheckbox);
    autoRotateLabel.appendChild(labelText);
    autoRotateContainer.appendChild(autoRotateLabel);
    container.appendChild(autoRotateContainer);

    // Info text
    const infoText = document.createElement('p');
    infoText.style.color = 'rgba(255, 255, 255, 0.7)';
    infoText.style.fontSize = '12px';
    infoText.style.marginTop = '15px';
    infoText.innerHTML = 'Click and drag to rotate<br>Scroll to zoom';
    container.appendChild(infoText);
}
