// ===========================
// Global Variables
// ===========================
let scene, camera, renderer, controls;
let surfaceMesh;
let currentFunction = 'sin(sqrt(x*x + y*y) - t) / sqrt(x*x + y*y + 0.1)';
let currentRange = 5;
let currentResolution = 80;
let currentColorScheme = 'ocean';

// Animation mode variables
let animationMode = true;
let animationTime = 0;
let timeMin = -5;
let timeMax = 5;

// Color schemes
const colorSchemes = {
    rainbow: [
        { stop: 0.0, color: '#4c1d95' },  // purple
        { stop: 0.2, color: '#3b82f6' },  // blue
        { stop: 0.4, color: '#14b8a6' },  // teal
        { stop: 0.6, color: '#10b981' },  // green
        { stop: 0.8, color: '#f59e0b' },  // orange
        { stop: 1.0, color: '#ef4444' }   // red
    ],
    ocean: [
        { stop: 0.0, color: '#1e3a8a' },  // deep blue
        { stop: 0.3, color: '#0ea5e9' },  // sky blue
        { stop: 0.6, color: '#06b6d4' },  // cyan
        { stop: 1.0, color: '#67e8f9' }   // light cyan
    ],
    sunset: [
        { stop: 0.0, color: '#7c2d12' },  // brown
        { stop: 0.3, color: '#dc2626' },  // red
        { stop: 0.6, color: '#f97316' },  // orange
        { stop: 1.0, color: '#fbbf24' }   // yellow
    ],
    forest: [
        { stop: 0.0, color: '#064e3b' },  // dark green
        { stop: 0.4, color: '#059669' },  // green
        { stop: 0.7, color: '#34d399' },  // light green
        { stop: 1.0, color: '#86efac' }   // pale green
    ]
};

// ===========================
// Initialization
// ===========================
function init() {
    const container = document.getElementById('canvas-container');

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    // Camera setup
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2 + 0.5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 10, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x6366f1, 0.4);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);

    // Grid and Axes
    const gridHelper = new THREE.GridHelper(20, 20, 0x6366f1, 0x334155);
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(8);
    scene.add(axesHelper);

    // Initial visualization
    visualizeFunction();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation loop
    animate();
}

// ===========================
// Function Parser & Evaluator
// ===========================
function evaluateFunction(funcStr, x, y, t = 0) {
    try {
        // Replace common math notation
        let expression = funcStr
            .replace(/\^/g, '**')
            .replace(/PI/g, 'pi')
            .replace(/E/g, 'e');

        // Use math.js to evaluate
        const scope = { x, y, t };
        const result = math.evaluate(expression, scope);

        return isFinite(result) ? result : 0;
    } catch (error) {
        console.error('Error evaluating function:', error);
        return 0;
    }
}

// ===========================
// Surface Generation
// ===========================
function generateSurface(funcStr, range, resolution, t = 0) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const indices = [];

    const step = (2 * range) / resolution;
    let minZ = Infinity;
    let maxZ = -Infinity;

    // First pass: calculate vertices and find min/max Z
    const zValues = [];
    for (let i = 0; i <= resolution; i++) {
        zValues[i] = [];
        for (let j = 0; j <= resolution; j++) {
            const x = -range + i * step;
            const y = -range + j * step;
            const z = evaluateFunction(funcStr, x, y, t);

            // Clamp extreme values
            const clampedZ = Math.max(-10, Math.min(10, z));
            zValues[i][j] = clampedZ;

            minZ = Math.min(minZ, clampedZ);
            maxZ = Math.max(maxZ, clampedZ);

            vertices.push(x, clampedZ, y);
        }
    }

    // Second pass: assign colors based on normalized height
    const scheme = colorSchemes[currentColorScheme];
    for (let i = 0; i <= resolution; i++) {
        for (let j = 0; j <= resolution; j++) {
            const z = zValues[i][j];
            const normalized = maxZ !== minZ ? (z - minZ) / (maxZ - minZ) : 0.5;

            const color = getColorFromScheme(normalized, scheme);
            colors.push(color.r, color.g, color.b);
        }
    }

    // Create faces
    for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
            const a = i * (resolution + 1) + j;
            const b = a + 1;
            const c = a + resolution + 1;
            const d = c + 1;

            indices.push(a, b, d);
            indices.push(a, d, c);
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    // Use MeshStandardMaterial for better lighting and smoother appearance
    const material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        flatShading: false,
        metalness: 0.2,
        roughness: 0.6,
        envMapIntensity: 1.0
    });

    return new THREE.Mesh(geometry, material);
}

function getColorFromScheme(value, scheme) {
    // Find the two color stops to interpolate between
    let lowerStop = scheme[0];
    let upperStop = scheme[scheme.length - 1];

    for (let i = 0; i < scheme.length - 1; i++) {
        if (value >= scheme[i].stop && value <= scheme[i + 1].stop) {
            lowerStop = scheme[i];
            upperStop = scheme[i + 1];
            break;
        }
    }

    // Interpolate between the two colors
    const range = upperStop.stop - lowerStop.stop;
    const t = range > 0 ? (value - lowerStop.stop) / range : 0;

    const color1 = new THREE.Color(lowerStop.color);
    const color2 = new THREE.Color(upperStop.color);

    return color1.lerp(color2, t);
}

// ===========================
// Visualization
// ===========================
function visualizeFunction(t = animationTime) {
    // Show loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.classList.add('active');

    // Use setTimeout to allow UI to update
    setTimeout(() => {
        try {
            // Remove previous surface
            if (surfaceMesh) {
                scene.remove(surfaceMesh);
                surfaceMesh.geometry.dispose();
                surfaceMesh.material.dispose();
            }

            // Generate new surface
            surfaceMesh = generateSurface(currentFunction, currentRange, currentResolution, t);
            scene.add(surfaceMesh);

        } catch (error) {
            console.error('Error visualizing function:', error);
            alert('Error al visualizar la función. Verifica la sintaxis.');
        } finally {
            // Hide loading overlay
            loadingOverlay.classList.remove('active');
        }
    }, 50);
}

// Update surface vertices for animation (much faster than regenerating)
function updateSurfaceVertices(t) {
    if (!surfaceMesh) return;

    const positions = surfaceMesh.geometry.attributes.position.array;
    const colors = surfaceMesh.geometry.attributes.color.array;
    const step = (2 * currentRange) / currentResolution;

    let minZ = Infinity;
    let maxZ = -Infinity;
    const zValues = [];

    // First pass: calculate new Z values and find min/max
    let vertexIndex = 0;
    for (let i = 0; i <= currentResolution; i++) {
        for (let j = 0; j <= currentResolution; j++) {
            const x = -currentRange + i * step;
            const y = -currentRange + j * step;
            const z = evaluateFunction(currentFunction, x, y, t);
            const clampedZ = Math.max(-10, Math.min(10, z));

            zValues[vertexIndex] = clampedZ;
            minZ = Math.min(minZ, clampedZ);
            maxZ = Math.max(maxZ, clampedZ);

            // Update Y position (Z in world space)
            positions[vertexIndex * 3 + 1] = clampedZ;
            vertexIndex++;
        }
    }

    // Second pass: update colors based on new heights
    const scheme = colorSchemes[currentColorScheme];
    for (let i = 0; i < zValues.length; i++) {
        const z = zValues[i];
        const normalized = maxZ !== minZ ? (z - minZ) / (maxZ - minZ) : 0.5;
        const color = getColorFromScheme(normalized, scheme);

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    // Mark attributes as needing update
    surfaceMesh.geometry.attributes.position.needsUpdate = true;
    surfaceMesh.geometry.attributes.color.needsUpdate = true;
    surfaceMesh.geometry.computeVertexNormals();
}

// ===========================
// Animation Loop
// ===========================
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// ===========================
// Event Handlers
// ===========================
function onWindowResize() {
    const container = document.getElementById('canvas-container');
    const aspect = container.clientWidth / container.clientHeight;

    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

function resetCamera() {
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);
    controls.reset();
}

// ===========================
// UI Event Listeners
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js
    init();

    // Visualize button
    const visualizeBtn = document.getElementById('visualize-btn');
    visualizeBtn.addEventListener('click', () => {
        const input = document.getElementById('function-input');
        currentFunction = input.value.trim();
        if (currentFunction) {
            visualizeFunction();
        }
    });

    // Enter key in input
    const functionInput = document.getElementById('function-input');
    functionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentFunction = functionInput.value.trim();
            if (currentFunction) {
                visualizeFunction();
            }
        }
    });

    // Example buttons
    const exampleBtns = document.querySelectorAll('.example-btn');
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const func = btn.getAttribute('data-function');
            currentFunction = func;
            functionInput.value = func;
            visualizeFunction();
        });
    });

    // Range slider
    const rangeSlider = document.getElementById('range-slider');
    const rangeValue = document.getElementById('range-value');
    rangeSlider.addEventListener('input', (e) => {
        currentRange = parseFloat(e.target.value);
        rangeValue.textContent = currentRange.toFixed(1);
    });
    rangeSlider.addEventListener('change', () => {
        visualizeFunction();
    });

    // Resolution slider
    const resolutionSlider = document.getElementById('resolution-slider');
    const resolutionValue = document.getElementById('resolution-value');
    resolutionSlider.addEventListener('input', (e) => {
        currentResolution = parseInt(e.target.value);
        resolutionValue.textContent = currentResolution;
    });
    resolutionSlider.addEventListener('change', () => {
        visualizeFunction();
    });

    // Reset camera button
    const resetCameraBtn = document.getElementById('reset-camera-btn');
    resetCameraBtn.addEventListener('click', resetCamera);

    // ===========================
    // Time Slider Controls
    // ===========================

    // Time slider controls
    const timeSlider = document.getElementById('time-slider');
    const timeDisplay = document.getElementById('time-display');
    const timeMinInput = document.getElementById('time-min');
    const timeMaxInput = document.getElementById('time-max');

    // Update visualization when slider moves
    timeSlider.addEventListener('input', (e) => {
        animationTime = parseFloat(e.target.value);
        timeDisplay.textContent = animationTime.toFixed(2);

        if (surfaceMesh && animationMode) {
            updateSurfaceVertices(animationTime);
        }
    });

    // Update slider range when min input changes
    timeMinInput.addEventListener('change', (e) => {
        timeMin = parseFloat(e.target.value);
        timeSlider.min = timeMin;

        // Clamp current value if needed
        if (animationTime < timeMin) {
            animationTime = timeMin;
            timeSlider.value = timeMin;
            timeDisplay.textContent = animationTime.toFixed(2);
            if (surfaceMesh && animationMode) {
                updateSurfaceVertices(animationTime);
            }
        }
    });

    // Update slider range when max input changes
    timeMaxInput.addEventListener('change', (e) => {
        timeMax = parseFloat(e.target.value);
        timeSlider.max = timeMax;

        // Clamp current value if needed
        if (animationTime > timeMax) {
            animationTime = timeMax;
            timeSlider.value = timeMax;
            timeDisplay.textContent = animationTime.toFixed(2);
            if (surfaceMesh && animationMode) {
                updateSurfaceVertices(animationTime);
            }
        }
    });
});
