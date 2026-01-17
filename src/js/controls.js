// OrbitControls / interaction
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let controls;

export function setupControls(camera, renderer) {
    controls = new OrbitControls(camera, renderer.domElement);

    // Configure controls
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;

    return controls;
}

export function getControls() {
    return controls;
}

export function updateControls() {
    if (controls) {
        controls.update();
    }
}
