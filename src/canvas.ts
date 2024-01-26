import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  LENS_HEIGHT,
  LENS_WIDTH,
  LENS_ZOOM,
} from "./config";
import { rgbToHex } from "./utils";

export function getCanvas(): Canvas {
  const canvasEl = <HTMLCanvasElement>document.getElementById("canvas");
  const ctx = <CanvasRenderingContext2D>canvasEl.getContext("2d");

  const lensEl = <HTMLCanvasElement>document.getElementById("lens");
  const lensCtx = <CanvasRenderingContext2D>lensEl.getContext("2d");

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

  function getPixelColor(event: MouseEvent): string {
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

  return {
    elements: {
      canvasEl,
      lensEl,
    },
    actions: {
      showLens,
      getPixelColor,
    },
  };
}
