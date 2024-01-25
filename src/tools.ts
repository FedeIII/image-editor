import { Cursor, ToolInterface } from "./interfaces/editorElements";

export const NO_TOOL = "no-tool";
export const COLOR_PICKER = "color-picker";

export class Tool implements ToolInterface {
  name: string;
  el: HTMLElement;
  cursor: Cursor;

  constructor(name: string, el: HTMLElement, cursor: Cursor) {
    this.name = name;
    this.el = el;
    this.cursor = cursor;
  }
}
