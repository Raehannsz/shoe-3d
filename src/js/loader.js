// Load model 3D (GLTF/OBJ)
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let loadedModel = null;

export async function loadModel(scene) {
    const loader = new GLTFLoader();

    try {
        const gltf = await loader.loadAsync('/src/models/shoe.glb');
        loadedModel = gltf.scene;

        // Configure model
        loadedModel.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Center and scale model
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        loadedModel.position.sub(center);

        scene.add(loadedModel);
        console.log('Model loaded successfully');

        return loadedModel;
    } catch (error) {
        console.error('Error loading model:', error);

        // Create fallback cube if model fails to load
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0xff6b6b });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        scene.add(cube);
        loadedModel = cube;

        return cube;
    }
}

export function getModel() {
    return loadedModel;
}
