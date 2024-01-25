import { EditorInterface, EditorTools } from "./interfaces/editor";
import { COLOR_PICKER, NO_TOOL, Tool } from "./tools";

export class Editor implements EditorInterface {
  toolsEl: HTMLElement;
  tools: EditorTools = {};
  currentTool: string | null = null;

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

  #setCurrentTool(tool: string) {
    this.currentTool = tool;
    this.update();
  }

  update() {
    switch (this.currentTool) {
      case NO_TOOL:
        console.log("no tool");
        break;
      case COLOR_PICKER:
        console.log("color picker");
        break;

      default:
        break;
    }
  }
}
