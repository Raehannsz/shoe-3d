// Entry point Three.js - 3D Shoe Customizer
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f2f2);

// Camera
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 5, 15);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = false;
controls.target.set(0, 2, 0);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 20, 10);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
scene.add(dirLight);

const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
backLight.position.set(-10, 10, -10);
scene.add(backLight);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0xdddddd })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Store loaded model and materials
let shoeModel = null;
const shoeMaterials = {};

// Colors for color picker
const colors = [
    { name: 'Red', value: '#ff6b6b' },
    { name: 'Blue', value: '#1e90ff' },
    { name: 'Green', value: '#2ecc71' },
    { name: 'Yellow', value: '#f1c40f' },
    { name: 'Purple', value: '#9b59b6' },
    { name: 'Black', value: '#2c3e50' },
    { name: 'White', value: '#ecf0f1' },
    { name: 'Orange', value: '#e67e22' }
];

// Load OBJ Model
const loader = new OBJLoader();

// Loading indicator
const loadingDiv = document.createElement('div');
loadingDiv.id = 'loading';
loadingDiv.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    color: white; font-size: 24px; font-family: Arial, sans-serif;
    background: rgba(0,0,0,0.7); padding: 20px 40px; border-radius: 10px;
    z-index: 100;
`;
loadingDiv.textContent = 'Loading 3D Model...';
document.body.appendChild(loadingDiv);

loader.load(
    '/supastarOBJ.obj',
    (object) => {
        shoeModel = object;

        // Apply default material and setup for color changing
        let partIndex = 0;
        object.traverse((child) => {
            if (child.isMesh) {
                // Create material for this part
                const material = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    roughness: 0.5,
                    metalness: 0.1
                });
                child.material = material;
                child.castShadow = true;
                child.receiveShadow = true;

                // Store material reference
                const partName = child.name || `part_${partIndex}`;
                shoeMaterials[partName] = material;
                partIndex++;
            }
        });

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Scale to fit nicely
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5 / maxDim;
        object.scale.setScalar(scale);

        // Center horizontally, place on floor
        object.position.x = -center.x * scale;
        object.position.y = -box.min.y * scale;
        object.position.z = -center.z * scale;

        scene.add(object);

        // Update camera target
        controls.target.set(0, size.y * scale / 2, 0);

        // Remove loading indicator
        loadingDiv.remove();

        // Initialize UI after model loads
        initUI();

        console.log('Model loaded successfully!');
        console.log('Found parts:', Object.keys(shoeMaterials));
    },
    (xhr) => {
        const percent = Math.round((xhr.loaded / xhr.total) * 100);
        loadingDiv.textContent = `Loading 3D Model... ${percent}%`;
    },
    (error) => {
        console.error('Error loading model:', error);
        loadingDiv.textContent = 'Error loading model!';
        loadingDiv.style.color = '#ff6b6b';

        // Create fallback cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ color: 0xff6b6b });
        shoeMaterials['fallback'] = material;
        const cube = new THREE.Mesh(geometry, material);
        cube.position.y = 1;
        cube.castShadow = true;
        scene.add(cube);
        shoeModel = cube;

        setTimeout(() => {
            loadingDiv.remove();
            initUI();
        }, 2000);
    }
);

// UI Initialization
function initUI() {
    const colorContainer = document.getElementById('color-picker-container');
    const menuContainer = document.getElementById('menu-container');

    // Get all material names
    const materialNames = Object.keys(shoeMaterials);

    // Part selector
    const partTitle = document.createElement('h3');
    partTitle.textContent = 'Select Part';
    partTitle.style.cssText = 'color: white; margin-bottom: 10px; font-size: 14px;';
    colorContainer.appendChild(partTitle);

    // Option to change all parts at once
    const allOption = document.createElement('button');
    allOption.textContent = '🎨 Change All Parts';
    allOption.style.cssText = `
        width: 100%; padding: 10px; border-radius: 8px; border: none;
        margin-bottom: 10px; background: linear-gradient(135deg, #667eea, #764ba2);
        color: white; cursor: pointer; font-weight: bold;
        transition: transform 0.2s;
    `;
    allOption.addEventListener('mouseenter', () => allOption.style.transform = 'scale(1.02)');
    allOption.addEventListener('mouseleave', () => allOption.style.transform = 'scale(1)');
    allOption.addEventListener('click', () => {
        selectedPart = 'ALL';
        partSelect.value = '';
    });
    colorContainer.appendChild(allOption);

    const partSelect = document.createElement('select');
    partSelect.style.cssText = 'width: 100%; padding: 8px; border-radius: 8px; border: none; margin-bottom: 15px; background: rgba(255,255,255,0.9); cursor: pointer;';

    materialNames.forEach((name, index) => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = `Part ${index + 1}: ${name}`;
        partSelect.appendChild(option);
    });

    partSelect.addEventListener('change', (e) => {
        selectedPart = e.target.value;
    });

    colorContainer.appendChild(partSelect);

    // Color title
    const colorTitle = document.createElement('h3');
    colorTitle.textContent = 'Choose Color';
    colorTitle.style.cssText = 'color: white; margin-bottom: 10px; font-size: 14px;';
    colorContainer.appendChild(colorTitle);

    // Color grid
    const colorGrid = document.createElement('div');
    colorGrid.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;';

    colors.forEach(color => {
        const btn = document.createElement('button');
        btn.style.cssText = `
            width: 40px; height: 40px; border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%; background: ${color.value}; cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        `;
        btn.title = color.name;

        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.15)';
            btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = 'none';
        });

        btn.addEventListener('click', () => {
            if (selectedPart === 'ALL') {
                // Change all parts
                Object.values(shoeMaterials).forEach(mat => {
                    mat.color.set(color.value);
                });
            } else if (shoeMaterials[selectedPart]) {
                shoeMaterials[selectedPart].color.set(color.value);
            }
        });

        colorGrid.appendChild(btn);
    });

    colorContainer.appendChild(colorGrid);

    // Custom color picker
    const customColorDiv = document.createElement('div');
    customColorDiv.style.cssText = 'margin-top: 15px;';

    const customLabel = document.createElement('label');
    customLabel.textContent = 'Custom Color: ';
    customLabel.style.cssText = 'color: white; font-size: 12px;';

    const customInput = document.createElement('input');
    customInput.type = 'color';
    customInput.value = '#1e90ff';
    customInput.style.cssText = 'margin-left: 10px; cursor: pointer; width: 50px; height: 30px; border: none; border-radius: 5px;';

    customInput.addEventListener('input', (e) => {
        if (selectedPart === 'ALL') {
            Object.values(shoeMaterials).forEach(mat => {
                mat.color.set(e.target.value);
            });
        } else if (shoeMaterials[selectedPart]) {
            shoeMaterials[selectedPart].color.set(e.target.value);
        }
    });

    customLabel.appendChild(customInput);
    customColorDiv.appendChild(customLabel);
    colorContainer.appendChild(customColorDiv);

    // Controls menu
    const controlsTitle = document.createElement('h3');
    controlsTitle.textContent = 'Controls';
    controlsTitle.style.cssText = 'color: white; margin-bottom: 10px; font-size: 14px; margin-top: 20px;';
    menuContainer.appendChild(controlsTitle);

    // Auto rotate toggle
    const rotateLabel = document.createElement('label');
    rotateLabel.style.cssText = 'color: white; display: flex; align-items: center; cursor: pointer; margin-bottom: 10px;';

    const rotateCheckbox = document.createElement('input');
    rotateCheckbox.type = 'checkbox';
    rotateCheckbox.style.marginRight = '8px';
    rotateCheckbox.addEventListener('change', () => {
        controls.autoRotate = rotateCheckbox.checked;
    });

    rotateLabel.appendChild(rotateCheckbox);
    rotateLabel.appendChild(document.createTextNode('Auto Rotate'));
    menuContainer.appendChild(rotateLabel);

    // Reset button
    const resetBtn = document.createElement('button');
    resetBtn.textContent = '🔄 Reset Colors';
    resetBtn.style.cssText = `
        width: 100%; padding: 10px; border-radius: 8px; border: none;
        margin-top: 10px; background: rgba(255,255,255,0.2);
        color: white; cursor: pointer;
        transition: background 0.2s;
    `;
    resetBtn.addEventListener('mouseenter', () => resetBtn.style.background = 'rgba(255,255,255,0.3)');
    resetBtn.addEventListener('mouseleave', () => resetBtn.style.background = 'rgba(255,255,255,0.2)');
    resetBtn.addEventListener('click', () => {
        Object.values(shoeMaterials).forEach(mat => {
            mat.color.set(0xffffff);
        });
    });
    menuContainer.appendChild(resetBtn);

    // Info
    const info = document.createElement('p');
    info.style.cssText = 'color: rgba(255,255,255,0.7); font-size: 12px; margin-top: 15px;';
    info.innerHTML = '🖱️ Drag to rotate<br>🔍 Scroll to zoom';
    menuContainer.appendChild(info);
}

let selectedPart = 'ALL';

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
