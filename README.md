# Image Editor

This is a prototype of a web-based image editor

## Dev environment

Rollup is used to compile and bundle the frontend code.
```
npm install
```
### For development
Watches over the files (needs manual browser refreshing) to recompile:
```
npm run demo
npm run dev
```
### To demo
One-time build to demo the app:
```
npm run build
npm run demo
```
### To pass tests
Runs the e2e tests with cypress:
```
npm run test
```

## File explanation
- [index.html](../index.html): Static html and css rules.
- [Editor](../src/editor/): Editor abstractions
  - [config.ts](../src/editor/config.ts): Constants used to configure editor tools (specifically, the lens shown on color picker usage)
  - [editor.ts](../src/editor/editor.ts): Abstraction for the Editor to add tools to. Responsibilities:
    - Loading the image
    - Interactions between its tools and the canvas and general DOM
  - [tools.ts](../src/editor/tools.ts): Abstraction for a generic Tool. Responsibilities:
    - Tool icon DOM
    - Tool state over the canvas
    - Store and execute tool behavior
- [Canvas](../src/canvas.ts): Exports canvases' elements and functionalities.
- [Utils](../src/utils.ts):
  - FileReader to load any image into the editor
  - RGB to HEX color parser
- [Index](../src/index.ts): Instantiates the Editor, creates and adds the different tools and defines their behavior

## Features
- Load any image from local
- **Tools**:
  - **No tool**: Deselects any selected tool
  - **Color picker**: Pick a color code from the image. Shows a lens for better precision. The color code appears at the tool bar and inside the lens.
  - **Zoom in**: renders the image in the canvas with the real DOM resolution. *You have to click on the image to use it.*
  - **Zoom out**: renders the image in the canvas with a resolution that fits the window (default). *You have to click on the image to use it.*

## To Do
- Zoom-in gets the cursor position to scroll the image vertically and horizontally for that point to be centered after the zoom.
- Zoom-in & out really zooms in & out, changing the drawImage mapping when rendering the image