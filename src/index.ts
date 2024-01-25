import { Editor } from "./editor";
import { Cursor } from "./interfaces/editorElements";
import { COLOR_PICKER, NO_TOOL, Tool } from "./tools";

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

const editor = new Editor();

// NO TOOL
const noToolEl = <HTMLElement>document.getElementById("no-tool");
const noToolCursor: Cursor = {
  img: null,
};
const noTool = new Tool(NO_TOOL, noToolEl, noToolCursor);
editor.addTool(noTool);

// COLOR PICKER
const colorPickerEl = <HTMLElement>document.getElementById("color-picker");
const colorPickerCursor: Cursor = {
  img: "public/img/IconColorPicker.svg",
};
const colorPicker = new Tool(COLOR_PICKER, colorPickerEl, colorPickerCursor);
editor.addTool(colorPicker);
