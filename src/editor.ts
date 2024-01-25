import { EditorInterface, EditorTools } from "./interfaces/editor";
import { ToolName } from "./interfaces/editorElements";
import { Tool } from "./tools";

export class Editor implements EditorInterface {
  toolsEl: HTMLElement;
  canvasEl: HTMLElement;
  tools: EditorTools = {};
  currentTool: ToolName = ToolName.NO_TOOL;

  constructor(toolsEl: HTMLElement, canvasEl: HTMLElement) {
    this.toolsEl = toolsEl;
    this.canvasEl = canvasEl;
  }

  addTool(tool: Tool) {
    if (!this.tools[tool.name]) {
      this.tools[tool.name] = tool;
      this.toolsEl.appendChild(tool.el);
      tool.el.addEventListener("click", () => {
        this.#setCurrentTool(tool.name);
      });
    } else {
      console.warn(`Tool ${tool.name} already added`);
    }
  }

  #setCurrentTool(tool: ToolName): void {
    this.currentTool = tool;
    this.update();
  }

  #deselectTools(): void {
    for (let toolName in this.tools) {
      this.tools[toolName].deselectTool();
    }
  }

  update() {
    this.#deselectTools();

    this.tools[this.currentTool].selectTool();

    switch (this.currentTool) {
      case ToolName.COLOR_PICKER:
        this.canvasEl.classList.add("canvas--color-picker");
        break;

      default:
        this.canvasEl.className = "canvas";
        break;
    }
  }
}
