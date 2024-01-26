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
  drag(event: MouseEvent): string | null;
  move(event: MouseEvent): string | null;
  isDragging(): boolean;
  undrag(): void;
  setUse(callback: (event: MouseEvent) => string | null): void;
  getCursorStyle(toolText: string | null): string;
  setClear(callback: () => void): void;
}

export enum ToolName {
  NO_TOOL = "no-tool",
  COLOR_PICKER = "color-picker",
}
