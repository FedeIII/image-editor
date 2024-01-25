export interface Cursor {
  img: string | null;
}

export interface ToolInterface {
  name: string;
  cursor: Cursor;
  label: string;
}
