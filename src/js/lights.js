// Lighting setup
import * as THREE from 'three';

export function setupLights(scene) {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Directional light (main light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Point light for highlights
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-5, 3, -5);
    scene.add(pointLight);

    // Hemisphere light for natural lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
    scene.add(hemisphereLight);
}
