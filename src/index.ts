import { Editor } from "./editor";
import { Cursor, ToolName } from "./interfaces/editorElements";
import { rgbToHex } from "./utils";
import { Tool } from "./tools";

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

const inputEl = <HTMLElement>document.getElementById("input");

const canvasEl = <HTMLCanvasElement>document.getElementById("canvas");
canvasEl.width = MAX_WIDTH;
canvasEl.height = MAX_HEIGHT;

const ctx = <CanvasRenderingContext2D>canvasEl.getContext("2d");

// EDITOR
const toolsEl = <HTMLCanvasElement>document.getElementById("tools");
const toolDataEl = <HTMLCanvasElement>document.getElementById("tool-data");
const editor = new Editor(inputEl, toolsEl, toolDataEl, canvasEl);

// NO TOOL
const noToolCursor: Cursor = {
  img: "public/img/cursor.svg",
};
const noTool = new Tool(ToolName.NO_TOOL, noToolCursor, "No tool");
editor.addTool(noTool);

// COLOR PICKER
const colorPickerCursor: Cursor = {
  selectionClass: "canvas--color-picker",
  img: "public/img/IconColorPicker.svg",
};
const colorPicker = new Tool(
  ToolName.COLOR_PICKER,
  colorPickerCursor,
  "Color picker"
);
colorPicker.setUse((x: number, y: number) => {
  const imageData = ctx.getImageData(
    (1920 * x) / window.innerWidth,
    (1080 * y) / window.innerHeight,
    1,
    1
  ).data;

  return rgbToHex(imageData[0], imageData[1], imageData[2]);
});
editor.addTool(colorPicker);
