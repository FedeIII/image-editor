import { canvasEl, getPixelColor, lensEl, showLens } from "./canvas";
import { Editor } from "./editor";
import { Cursor, ToolName } from "./interfaces/editorElements";
import { Tool } from "./tools";


// EDITOR
const inputEl = <HTMLElement>document.getElementById("input");
const toolsEl = <HTMLCanvasElement>document.getElementById("tools");
const toolDataEl = <HTMLCanvasElement>document.getElementById("tool-data");
const editor = new Editor(inputEl, toolsEl, toolDataEl, canvasEl, lensEl);

// NO TOOL
const noToolCursor: Cursor = {
  img: "public/img/cursor.svg",
};
const noTool = new Tool(ToolName.NO_TOOL, noToolCursor, "No tool");
editor.addTool(noTool);

// COLOR PICKER TOOL
const colorPickerCursor: Cursor = {
  selectionClass: "canvas--color-picker",
  img: "public/img/IconColorPicker.svg",
};
const colorPicker = new Tool(
  ToolName.COLOR_PICKER,
  colorPickerCursor,
  "Color picker"
);

colorPicker.setUse((event: MouseEvent) => {
  showLens(event);
  return getPixelColor(event);
});

colorPicker.setClear(() => {
  lensEl.style.display = "none";
});

editor.addTool(colorPicker);
