// WebGL Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Ground
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x7cfc00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = - Math.PI / 2;
scene.add(ground);

// Load Corgi Puppy Texture
const loader = new THREE.TextureLoader();
loader.load('corgi-puppy.png', function (texture) {
    const puppyGeometry = new THREE.PlaneGeometry(1, 1);
    const puppyMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    
    // Create multiple puppies
    for (let i = 0; i < 10; i++) {
        const puppy = new THREE.Mesh(puppyGeometry, puppyMaterial);
        puppy.position.set(Math.random() * 20 - 10, 0.5, Math.random() * 20 - 10);
        scene.add(puppy);
    }
});

// Animation
camera.position.z = 5;
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
