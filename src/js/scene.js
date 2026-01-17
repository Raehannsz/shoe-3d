// Setup scene, camera, renderer
import * as THREE from 'three';

let renderer;

export function initScene() {
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.background = null; // Transparent for custom background

    // Create camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    camera.position.y = 2;

    // Create renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Add to DOM
    const container = document.getElementById('canvas-container');
    container.appendChild(renderer.domElement);

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return { scene, camera };
}

export function getRenderer() {
    return renderer;
}
