// Material & color logic
import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export function createMaterial(options = {}) {
    const {
        color = 0xffffff,
        metalness = 0.3,
        roughness = 0.7,
        textureUrl = null,
        normalMapUrl = null
    } = options;

    const materialConfig = {
        color: new THREE.Color(color),
        metalness,
        roughness
    };

    if (textureUrl) {
        materialConfig.map = textureLoader.load(textureUrl);
    }

    if (normalMapUrl) {
        materialConfig.normalMap = textureLoader.load(normalMapUrl);
    }

    return new THREE.MeshStandardMaterial(materialConfig);
}

export function updateMaterialColor(mesh, color) {
    if (mesh && mesh.material) {
        if (Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => {
                mat.color.set(color);
            });
        } else {
            mesh.material.color.set(color);
        }
    }
}

export function applyTextureToMesh(mesh, textureUrl) {
    if (mesh && mesh.material) {
        const texture = textureLoader.load(textureUrl);
        if (Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => {
                mat.map = texture;
                mat.needsUpdate = true;
            });
        } else {
            mesh.material.map = texture;
            mesh.material.needsUpdate = true;
        }
    }
}
