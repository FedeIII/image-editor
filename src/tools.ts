import { Cursor, ToolInterface, ToolName } from "./interfaces/editorElements";

export class Tool implements ToolInterface {
  cursor: Cursor;
  name: ToolName;
  label: string;
  el: HTMLElement;

  #isDrag: boolean = false;
  #useCallback: null | ((x: number, y: number) => string | null) = null;

  constructor(name: ToolName, cursor: Cursor, label: string) {
    this.name = name;
    this.cursor = cursor;
    this.label = label;

    this.el = this.#createToolEl();
  }

  #createToolEl(): HTMLElement {
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "tooltip");
    wrapper.setAttribute("id", this.name);

    const img = document.createElement("img");
    img.setAttribute("src", this.cursor.img || "");
    img.setAttribute("class", "tool-icon");
    img.setAttribute("alt", this.label);

    const tooltip = document.createElement("span");
    tooltip.setAttribute("class", "tooltiptext");

    const text = document.createTextNode(this.label);

    tooltip.appendChild(text);
    wrapper.appendChild(img);
    wrapper.appendChild(tooltip);

    return wrapper;
  }
  
  #isDragging(): boolean {
    return this.#isDrag;
  }

  #useAt(x: number, y: number): string | null {
    return this.#useCallback?.(x, y) || null;
  }

  selectTool(): void {
    this.el.classList.add("tooltip--selected");
  }

  deselectTool(): void {
    this.el.classList.remove("tooltip--selected");
  }

  drag(x: number, y: number): string | null {
    this.#isDrag = true;
    return this.#useAt(x, y);
  }

  move(x: number, y: number): string | null {
    if (this.#isDragging()) {
      return this.#useAt(x, y);
    }
    return null;
  }

  undrag(): void {
    this.#isDrag = false;
  }

  setUse(callback: (x: number, y: number) => string | null): void {
    this.#useCallback = callback;
  }

  getCursorStyle(toolText: string | null): string {
    if (toolText) {
      return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="${toolText?.replace("#", "%23")}" height="128" viewBox="0 0 160 160" width="128"><path fill-rule="evenodd" clip-rule="evenodd" d="M80 148C117.555 148 148 117.555 148 80C148 42.4446 117.555 12 80 12C42.4446 12 12 42.4446 12 80C12 117.555 42.4446 148 80 148ZM80 160C124.183 160 160 124.183 160 80C160 35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z"/></svg>') 64 64, auto`;
    }
    return "";
  }
}
