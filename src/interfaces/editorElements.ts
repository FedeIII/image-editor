export interface Cursor {
  img: string | null;
}

export interface ToolInterface {
  name: string;
  el: HTMLElement;
  cursor: Cursor;
}
