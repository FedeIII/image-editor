import {
  canvasEl,
  getPixelColor,
  lensEl,
  showLens,
  zoomIn,
  zoomOut,
} from "./canvas";
import { Editor } from "./editor";
import { Cursor, ToolName } from "./interfaces/editorElements";
import { Tool } from "./tools";

// EDITOR
const inputEl = <HTMLElement>document.getElementById("input");
const toolsEl = <HTMLCanvasElement>document.getElementById("tools");
const toolDataEl = <HTMLCanvasElement>document.getElementById("tool-data");
const editor = new Editor(inputEl, toolsEl, toolDataEl, canvasEl);

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

colorPicker.setCursorStyle((toolText) => {
  if (toolText) {
    return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="${toolText?.replace("#", "%23")}" height="128" viewBox="0 0 160 160" width="128"><path fill-rule="evenodd" clip-rule="evenodd" d="M80 148C117.555 148 148 117.555 148 80C148 42.4446 117.555 12 80 12C42.4446 12 12 42.4446 12 80C12 117.555 42.4446 148 80 148ZM80 160C124.183 160 160 124.183 160 80C160 35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z"/></svg>') 64 64, auto`;
  }
  return "";
});

colorPicker.setUse((event: MouseEvent) => {
  const hexColor: string = getPixelColor(event);
  showLens(event, hexColor);
  return hexColor;
});

colorPicker.setClear(() => {
  lensEl.style.display = "none";
});

editor.addTool(colorPicker);

// ZOOM IN TOOL
const zoomInCursor: Cursor = {
  selectionClass: "canvas--zoom-in",
  img: "public/img/zoom-in.svg",
};
const zoomInTool = new Tool(ToolName.ZOOM_IN, zoomInCursor, "Zoom in");

zoomInTool.setUse(() => {
  zoomIn();
  return "Zoomed in";
});

editor.addTool(zoomInTool);

// ZOOM OUT TOOL
const zoomOutCursor: Cursor = {
  selectionClass: "canvas--zoom-out",
  img: "public/img/zoom-out.svg",
};
const zoomOutTool = new Tool(ToolName.ZOOM_OUT, zoomOutCursor, "Zoom out");

zoomOutTool.setUse(() => {
  zoomOut();
  return "Zoomed out";
});

editor.addTool(zoomOutTool);
