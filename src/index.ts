import { Editor } from "./editor";
import { Cursor, ToolName } from "./interfaces/editorElements";
import { rgbToHex } from "./utils";
import { Tool } from "./tools";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  LENS_HEIGHT,
  LENS_WIDTH,
  LENS_ZOOM,
} from "./config";

const inputEl = <HTMLElement>document.getElementById("input");

const canvasEl = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvasEl.getContext("2d");

const lensEl = <HTMLCanvasElement>document.getElementById("lens");
const lensCtx = <CanvasRenderingContext2D>lensEl.getContext("2d");

// EDITOR
const toolsEl = <HTMLCanvasElement>document.getElementById("tools");
const toolDataEl = <HTMLCanvasElement>document.getElementById("tool-data");
const editor = new Editor(inputEl, toolsEl, toolDataEl, canvasEl, lensEl);

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

function showLens(event: MouseEvent): void {
  const x = event.offsetX;
  const y = event.offsetY;

  lensCtx.save();
  lensCtx.beginPath();
  lensCtx.arc(
    LENS_WIDTH / 2,
    LENS_HEIGHT / 2,
    LENS_WIDTH / 2 - 4,
    0,
    Math.PI * 2,
    false
  );
  lensCtx.clip();
  lensCtx.drawImage(
    canvasEl,
    (CANVAS_WIDTH * x) / canvasEl.clientWidth - LENS_WIDTH / LENS_ZOOM / 2,
    (CANVAS_HEIGHT * y) / canvasEl.clientHeight - LENS_WIDTH / LENS_ZOOM / 2,
    LENS_WIDTH / LENS_ZOOM,
    LENS_HEIGHT / LENS_ZOOM,
    0,
    0,
    LENS_WIDTH,
    LENS_HEIGHT
  );
  lensCtx.restore();

  lensEl.style.left = event.pageX - LENS_WIDTH / 2 + "px";
  lensEl.style.top = event.pageY - LENS_HEIGHT / 2 + "px";
  lensEl.style.display = "block";
}

colorPicker.setUse((event: MouseEvent) => {
  const x = event.offsetX;
  const y = event.offsetY;

  showLens(event);

  const imageData = ctx.getImageData(
    (CANVAS_WIDTH * x) / canvasEl.clientWidth,
    (CANVAS_HEIGHT * y) / canvasEl.clientHeight,
    1,
    1
  ).data;

  return rgbToHex(imageData[0], imageData[1], imageData[2]);
});
editor.addTool(colorPicker);
