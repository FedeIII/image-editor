import { loadFile } from "./fileReader";
import { EditorInterface, EditorTools } from "./interfaces/editor";
import { ToolInterface, ToolName } from "./interfaces/editorElements";
import { Tool } from "./tools";

export class Editor implements EditorInterface {
  #inputEl: HTMLElement;
  #toolsEl: HTMLElement;
  #toolDataEl: HTMLElement;
  #canvasEl: HTMLCanvasElement;
  #lensEl: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;

  #tools: EditorTools = {};
  #currentTool: ToolName = ToolName.NO_TOOL;

  constructor(
    inputEl: HTMLElement,
    toolsEl: HTMLElement,
    toolDataEl: HTMLElement,
    canvasEl: HTMLCanvasElement,
    lensEl: HTMLCanvasElement
  ) {
    this.#inputEl = inputEl;
    this.#toolsEl = toolsEl;
    this.#toolDataEl = toolDataEl;
    this.#canvasEl = canvasEl;
    this.#lensEl = lensEl;
    this.#ctx = <CanvasRenderingContext2D>canvasEl.getContext("2d");

    this.#setEventListeners();
  }

  #setEventListeners() {
    this.#inputEl.addEventListener(
      "change",
      this.#handleImage.bind(this),
      false
    );

    this.#canvasEl.addEventListener(
      "mousedown",
      this.#dragCurrentToolAt.bind(this),
      true
    );
    this.#canvasEl.addEventListener(
      "mousemove",
      this.#moveCurrentToolAt.bind(this),
      true
    );
    this.#canvasEl.addEventListener(
      "mouseup",
      this.#undragCurrentTool.bind(this),
      true
    );
  }

  addTool(tool: Tool) {
    if (!this.#tools[tool.name]) {
      this.#tools[tool.name] = tool;
      this.#toolsEl.appendChild(tool.el);
      tool.el.addEventListener("click", () => {
        this.#setCurrentTool(tool.name);
      });
    } else {
      console.warn(`Tool ${tool.name} already added`);
    }
  }

  #setCurrentTool(tool: ToolName): void {
    this.#currentTool = tool;
    this.update();
  }

  #deselectTools(): void {
    for (let toolName in this.#tools) {
      this.#tools[toolName].deselectTool();
    }
  }

  #getSelectedTool(): ToolInterface {
    return this.#tools[this.#currentTool];
  }

  #handleImage(changeEvent: Event): void {
    const target = <HTMLInputElement>changeEvent.target;

    loadFile(target.files).then((img: HTMLImageElement) => {
      this.#ctx.clearRect(0, 0, this.#canvasEl.width, this.#canvasEl.height);
      this.#ctx.drawImage(img, 0, 0, img.width, img.height);
    });
  }

  #updateToolInfo(toolText: string | null): void {
    if (toolText) {
      this.#toolDataEl.innerHTML = "";
      this.#toolDataEl.appendChild(document.createTextNode(toolText));
    }
  }

  #dragCurrentToolAt(event: MouseEvent): void {
    const tool: ToolInterface = this.#getSelectedTool();

    const toolText = tool.drag(event);
    this.#updateToolInfo(toolText);
    this.#canvasEl.style.cursor = tool.getCursorStyle(toolText);
  }

  #moveCurrentToolAt(event: MouseEvent): void {
    const tool: ToolInterface = this.#getSelectedTool();

    const toolText = tool.move(event);
    this.#updateToolInfo(toolText);
    this.#canvasEl.style.cursor = tool.getCursorStyle(toolText);
  }

  #undragCurrentTool(): void {
    const tool: ToolInterface = this.#getSelectedTool();

    tool.undrag();
    this.#canvasEl.style.cursor = tool.getCursorStyle(null);
  }

  update() {
    this.#deselectTools();

    const tool: ToolInterface = this.#getSelectedTool();

    tool.selectTool();

    this.#canvasEl.className = "canvas";
    if (tool.cursor.selectionClass) {
      this.#canvasEl.classList.add(tool.cursor.selectionClass);
    }
  }
}
