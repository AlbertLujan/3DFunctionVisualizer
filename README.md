# 3D Function Visualizer

A simple tool to visualize mathematical functions in 3D. Type a function like `sin(x) * cos(y)` and see it rendered in real-time.

## Demo

Just open `index.html` in your browser. No build step, no dependencies to install.

## How to use

Enter any function of `x` and `y` in the input box. The result becomes the height (`z`).

Some examples:
- `sin(x) + cos(y)` - wave pattern
- `x*x + y*y` - bowl shape
- `sin(sqrt(x*x + y*y))` - ripples from center

You can also use `t` for animation:
- `sin(x + t) * cos(y + t)` - animated waves

Available: `sin`, `cos`, `tan`, `sqrt`, `abs`, `exp`, `log`, `PI`, `E`

## Controls

- Drag to rotate
- Scroll to zoom
- Right-click drag to pan

## Built with

- Three.js for 3D rendering
- Math.js for parsing expressions
