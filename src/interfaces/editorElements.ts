export interface Cursor {
  img: string | null;
}

export interface ToolInterface {
  name: ToolName;
  cursor: Cursor;
  label: string;

  selectTool(): void;
  deselectTool(): void;
}

export enum ToolName {
  NO_TOOL = "no-tool",
  COLOR_PICKER = "color-picker",
}
