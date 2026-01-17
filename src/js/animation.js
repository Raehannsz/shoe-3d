// Animation loop
import { updateControls } from './controls.js';

let animationId;

export function startAnimation(scene, camera, renderer) {
    function animate() {
        animationId = requestAnimationFrame(animate);

        // Update controls
        updateControls();

        // Render scene
        renderer.render(scene, camera);
    }

    animate();
}

export function stopAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}
