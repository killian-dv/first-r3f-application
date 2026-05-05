# First React Three Fiber Application — Three.js Journey

Quick recap of the **First React Three Fiber Application** lesson from [Three.js Journey](https://threejsjourney.com/) by Bruno Simon.

## What this project covers

This project is an introduction to [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction): a React renderer for Three.js. Instead of imperative `scene`, `renderer`, and `animate` boilerplate in plain JavaScript, the scene is built with JSX components that map to Three.js objects. The lesson focuses on hooks for the render loop (`useFrame`), access to Three.js internals (`useThree`), camera controls declared as components (`OrbitControls`), and constructing geometry from typed arrays.

- **Declarative scenes** — meshes, lights, geometries, and materials expressed as JSX.
- **`Canvas` bootstrap** — a single `<Canvas>` configures the WebGL context, scene, camera, and render loop integration with React.
- **Animation hook** — `useFrame` runs code every tick (FPS-aware with `delta`) to rotate objects or tweak the camera over time.
- **Controls integration** — `extend` pulls classic Three.js classes (like `OrbitControls`) into the R3F component tree as `<OrbitControls />`.
- **Custom geometry** — a `bufferGeometry` with a `bufferAttribute` for vertex positions plus `computeVertexNormals()` for lighting on non-indexed meshes.

## What I built

- Bootstrapped a Vite + React + TypeScript app with `@react-three/fiber` and `three`.
- Wrapped the scene in `<Canvas>` and setcamera parameters (`fov`, `near`, `far`, initial `position`) via props instead of constructing a `PerspectiveCamera` by hand.
- Composed `<Experience />` containing:
  - `<OrbitControls args={[camera, gl.domElement]} />` wired with `camera` and the canvas DOM element from `useThree()`.
  - `ambientLight` and `directionalLight` for simple, readable lighting.
  - A `<group>` with a sphere and a purple box scaled and positioned with short-hand props (`position-x`, `scale`, `rotation-y`).
  - A ground-like `<mesh>` (`planeGeometry` rotated to lie horizontally) scaled for a visible floor plane.
  - A `<CustomObject />` triangle mesh built from a `Float32Array` of random vertex positions, `bufferAttribute attach="attributes-position"`, normals computed after mount with `geometry.computeVertexNormals()`, and `DoubleSide` on the standard material so the mesh is lit from either side during development.
- Used `useRef` + R3F’s `attach`/`ref` pattern to mutate mesh rotation inside `useFrame` (cube spinning on **Y**) while keeping React’s declarative tree for structure.
- Left commented experiments in code for circling the camera with `elapsedTime`, rotating the entire group, and similar patterns from the lesson.

## What I learned

### 1) How React Three Fiber fits Three.js into React

- R3F is not an alternative physics or game engine—it is Three.js orchestrated through React reconciliation.
- JSX elements map to constructors and setter-style updates on Three objects, so naming stays familiar (`mesh`, `sphereGeometry`, `meshStandardMaterial`).

### 2) Why `<Canvas>` replaces a lot of setup code

- The canvas creates the renderer and scene lifecycle and ties them to React Strict Mode-friendly patterns.
- Camera defaults can still be overridden with a `camera` prop object matching what you would configure in vanilla Three.js.

### 3) How `useFrame` differs from raw `requestAnimationFrame`

- Callbacks receive the shared `state` (clock, viewport, scene, camera, etc.) plus `delta`, which makes frame-rate-independent motion straightforward (`rotation += delta`).
- It runs inside the same render loop managed by Fiber, avoiding manual sync between React UI and Three.js.

### 4) What `useThree` is for

- It exposes `camera`, `gl`, `scene`, and other singletons inside components that descend from `<Canvas>`.
- Passing `camera` and `gl.domElement` into `OrbitControls` mirrors the imperative example from earlier lessons—a small bridge pattern worth remembering.

### 5) How to register non-core classes (`extend`)

- Classes from `examples/jsm`—like `OrbitControls`—are not known to R3F out of the box.
- Calling `extend(ThreeOrbitControls)` lets me write `<OrbitControls />` alongside native primitives and reuse the familiar API with `args` for constructor parameters.

### 6) How short-hand JSX props relate to vectors and Euler angles

- Props such as `position-x` or `rotation-y` are ergonomic sugar for translating or rotating meshes without allocating `Vector3` / `Euler` in React state for simple cases.

### 7) Basics of programmatic geometry in R3F

- `bufferGeometry` + `bufferAttribute` is the same data model as in vanilla Three.js; R3F’s `attach` connects child nodes to parent attributes.
- After generating positions (here, random floats), normals often need recomputation (`computeVertexNormals`) so `MeshStandardMaterial` shading looks correct unless you supply normals yourself.

## Run the project

```bash
npm install
npm run dev
```

## Credits

Part of the **Three.js Journey** course by Bruno Simon.
