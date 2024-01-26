import { ToolInterface } from "./editorElements";

export interface EditorTools {
  [key: string]: ToolInterface;
}

export interface EditorInterface {
  addTool(tool: ToolInterface): void;
  update(): void;
}
