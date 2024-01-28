import { ToolInterface } from "./tools";

export interface EditorTools {
  [key: string]: ToolInterface;
}

export interface EditorInterface {
  addTool(tool: ToolInterface): void;
  update(): void;
}
