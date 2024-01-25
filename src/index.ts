import { Editor } from "./editor";
import { Cursor, ToolName } from "./interfaces/editorElements";
import { Tool } from "./tools";

const MAX_WIDTH = 4000;
const MAX_HEIGHT = 4000;

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
canvas.width = MAX_WIDTH;
canvas.height = MAX_HEIGHT;

const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

const img = new Image();
img.src =
  "public/img/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg";
img.addEventListener("load", function () {
  ctx.drawImage(img, 0, 0);
});

// EDITOR
const toolsEl = <HTMLCanvasElement>document.getElementById("tools");
const editor = new Editor(toolsEl);

// NO TOOL
const noToolCursor: Cursor = {
  img: "public/img/cursor.svg",
};
const noTool = new Tool(ToolName.NO_TOOL, noToolCursor, "No tool");
editor.addTool(noTool);

// COLOR PICKER
const colorPickerCursor: Cursor = {
  img: "public/img/IconColorPicker.svg",
};
const colorPicker = new Tool(
  ToolName.COLOR_PICKER,
  colorPickerCursor,
  "Color picker"
);
editor.addTool(colorPicker);
