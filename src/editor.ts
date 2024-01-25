import { EditorInterface, EditorTools } from "./interfaces/editor";
import { ToolName } from "./interfaces/editorElements";
import { Tool } from "./tools";

export class Editor implements EditorInterface {
  toolsEl: HTMLElement;
  tools: EditorTools = {};
  currentTool: ToolName = ToolName.NO_TOOL;

  constructor(toolsEl: HTMLElement) {
    this.toolsEl = toolsEl;
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
  }
}
