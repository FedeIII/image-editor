interface Elements {
  canvasEl: HTMLCanvasElement;
  lensEl: HTMLCanvasElement;
}

interface Actions {
  showLens: (event: MouseEvent) => void;
  getPixelColor: (event: MouseEvent) => string;
}

interface Canvas {
  elements: Elements;
  actions: Actions;
}
