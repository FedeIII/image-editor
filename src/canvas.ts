import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CENTRAL_PIXEL_X1,
  HALF_LENS_ZOOM,
  LENS_BORDER,
  LENS_HEIGHT,
  LENS_RADIUS,
  LENS_WIDTH,
  LENS_ZOOM,
} from "./config";
import { rgbToHex } from "./utils";

export const canvasEl = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvasEl.getContext("2d");

export const lensEl = <HTMLCanvasElement>document.getElementById("lens");
const lensCtx = <CanvasRenderingContext2D>lensEl.getContext("2d");

function drawCircle(
  lensCtx: CanvasRenderingContext2D,
  canvasEl: HTMLCanvasElement,
  event: MouseEvent
): void {
  const x = event.offsetX;
  const y = event.offsetY;

  lensCtx.save();
  lensCtx.beginPath();
  lensCtx.arc(LENS_RADIUS, LENS_RADIUS, LENS_RADIUS - 4, 0, Math.PI * 2, false);
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
}

function getCircleY(x: number, r: number): number {
  // return Math.sqrt(r ** 2 - (x - cx) ** 2);
  // given cx === r
  // return Math.sqrt(r ** 2 - (x - r) ** 2);
  // return Math.sqrt(r ** 2 - (x ** 2 + r ** 2 - 2 * x * r));
  // return Math.sqrt(r ** 2 - x ** 2 - r ** 2 + 2 * x * r);
  // return Math.sqrt(2 * x * r - x ** 2);
  return Math.sqrt(x * (2 * r - x));
}

function drawPixelGrid(lensCtx: CanvasRenderingContext2D): void {
  lensCtx.save();
  lensCtx.lineWidth = 0.25;
  lensCtx.strokeStyle = "black";
  lensCtx.beginPath();

  // vertical lines
  let x = LENS_BORDER;
  while (x < LENS_WIDTH - LENS_BORDER) {
    const y = getCircleY(x, LENS_RADIUS);
    lensCtx.moveTo(x + HALF_LENS_ZOOM, LENS_RADIUS - y + LENS_BORDER);
    lensCtx.lineTo(x + HALF_LENS_ZOOM, LENS_RADIUS + y - LENS_BORDER);
    x += LENS_ZOOM; // zoomed pixels per original pixel
  }

  // horizontal lines
  let y = LENS_BORDER;
  while (y < LENS_HEIGHT - LENS_BORDER) {
    const x = getCircleY(y, LENS_RADIUS);
    lensCtx.moveTo(LENS_RADIUS - x + LENS_BORDER, y + HALF_LENS_ZOOM);
    lensCtx.lineTo(LENS_RADIUS + x - LENS_BORDER, y + HALF_LENS_ZOOM);
    y += LENS_ZOOM; // zoomed pixels per original pixel
  }
  lensCtx.stroke();

  // central pixel
  lensCtx.save();
  lensCtx.lineWidth = 1;
  lensCtx.strokeStyle = "white";
  lensCtx.beginPath();
  lensCtx.rect(CENTRAL_PIXEL_X1, CENTRAL_PIXEL_X1, LENS_ZOOM, LENS_ZOOM);
  lensCtx.stroke();
  lensCtx.restore();

  lensCtx.restore();
}

function positionLens(lensEl: HTMLCanvasElement, event: MouseEvent): void {
  lensEl.style.left = event.pageX - LENS_WIDTH / 2 + "px";
  lensEl.style.top = event.pageY - LENS_HEIGHT / 2 + "px";
  lensEl.style.display = "block";
}

export function showLens(event: MouseEvent): void {
  drawCircle(lensCtx, canvasEl, event);

  drawPixelGrid(lensCtx);

  positionLens(lensEl, event);
}

export function getPixelColor(event: MouseEvent): string {
  const x = event.offsetX;
  const y = event.offsetY;

  const imageData = ctx.getImageData(
    (CANVAS_WIDTH * x) / canvasEl.clientWidth,
    (CANVAS_HEIGHT * y) / canvasEl.clientHeight,
    1,
    1
  ).data;

  return rgbToHex(imageData[0], imageData[1], imageData[2]);
}
