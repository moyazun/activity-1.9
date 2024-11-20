import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./textures/minecraft.png'); // Adjust the path if needed



// Box geometry and material with texture
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Add lights for 3D shading
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Soft light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1); // Strong light
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Resize event handling
window.addEventListener('resize', () => {
    // Update sizes
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
    

// Animate
const tick = () => {
    // Rotate the cube for better 3D effect
    mesh.rotation.y += 0.01;
    mesh.rotation.x += 0.01;
    window.requestAnimationFrame(tick);

    // Render the scene
    renderer.render(scene, camera);
};

tick();
