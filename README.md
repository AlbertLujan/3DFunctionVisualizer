# 3D Function Visualizer 📊

Interactive 3D mathematical function visualizer built with Three.js.

![3D Function Visualizer](https://img.shields.io/badge/3D-Function%20Visualizer-blue?style=for-the-badge)

## ✨ Features

- **Real-time 3D visualization** of mathematical functions `z = f(x, y)`
- **Time animation** using the `t` variable for dynamic visualizations
- **Interactive controls**: rotate, zoom, and pan the 3D view
- **Preset examples**: Cross Waves, Ripple, Mexican Hat, and more
- **Customizable settings**: adjust range and resolution
- **Beautiful ocean color theme** with smooth gradients

## 🚀 Quick Start

Simply open `index.html` in your browser - no installation required!

```bash
# Or use a local server
npx serve .
```

## 📝 Usage

### Basic Functions
```javascript
z = sin(x) + cos(y)     // Wave patterns
z = x*x + y*y           // Paraboloid (bowl)
z = sqrt(x*x + y*y)     // Cone
```

### Animated Functions (use `t`)
```javascript
z = sin(x + t) * cos(y + t)                    // Cross Waves
z = sin(sqrt(x*x + y*y) - t)                   // Ripple
z = sin(sqrt(x*x + y*y) - t) / sqrt(x*x + y*y) // Mexican Hat
```

### Available Functions
- Operators: `+`, `-`, `*`, `/`, `^`
- Trigonometric: `sin`, `cos`, `tan`
- Other: `sqrt`, `abs`, `exp`, `log`
- Constants: `PI`, `E`

## 🎮 Controls

- 🖱️ **Click and drag** - Rotate view
- 🔍 **Scroll** - Zoom in/out
- ⌨️ **Right-click drag** - Pan

## 📚 Tutorial

See [TUTORIAL.md](TUTORIAL.md) for a comprehensive guide on understanding 3D mathematical functions.

## 🛠️ Technologies

- [Three.js](https://threejs.org/) - 3D graphics
- [Math.js](https://mathjs.org/) - Mathematical expression parsing
- Vanilla HTML/CSS/JavaScript

## 📄 License

MIT License - feel free to use and modify!
