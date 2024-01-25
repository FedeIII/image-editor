import { ToolInterface } from "./editorElements";

export interface EditorTools {
  [key: string]: ToolInterface;
}

export interface EditorInterface {
  toolsEl: HTMLElement;
  canvasEl: HTMLElement;
  tools: EditorTools;
  currentTool: string | null;

  addTool(tool: ToolInterface): void;
  update(): void;
}
