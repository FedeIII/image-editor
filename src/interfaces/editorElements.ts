export interface Cursor {
  selectionClass?: string;
  dragClass?: string;
  img: string | null;
}

export interface ToolInterface {
  name: ToolName;
  cursor: Cursor;
  label: string;
  el: HTMLElement;

  selectTool(): void;
  deselectTool(): void;
  drag(x: number, y: number): string | null;
  move(x: number, y: number): string | null;
  undrag(): void;
  setUse(callback: (x: number, y: number) => string | null): void;
  getCursorStyle(toolText: string | null): string;
}

export enum ToolName {
  NO_TOOL = "no-tool",
  COLOR_PICKER = "color-picker",
}
