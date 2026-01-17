# 3D Shoe Customizer

A modern web application for customizing 3D shoe models using Three.js.

## Features

- **Interactive Color Picker** - Change shoe colors in real-time
- **Smooth 3D Rotation** - Auto-rotate or manual control with mouse/touch
- **High-Quality Rendering** - WebGL-based rendering with shadows
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Glassmorphism design with smooth animations

## Project Structure

```
shoe-3d-web/
├── public/              # Static files
├── src/
│   ├── css/            # Stylesheets
│   ├── js/             # Three.js modules
│   ├── models/         # 3D models (.glb files)
│   ├── textures/       # Texture files
│   └── ui/             # UI components
├── backend/            # Optional backend API
└── package.json
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your 3D model:**
   - Place your `shoe.glb` file in `src/models/`
   - Add any textures to `src/textures/`

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Optional Backend

To run the backend server:

```bash
npm run server
```

The API will be available at `http://localhost:3000/api/shoes`

## Technologies

- **Three.js** - 3D graphics library
- **Vite** - Build tool and dev server
- **Express** - Backend server (optional)
- **WebGL** - Hardware-accelerated 3D rendering

## License

MIT
