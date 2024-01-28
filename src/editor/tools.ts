import { Cursor, ToolInterface, ToolName } from "../interfaces/tools";

export class Tool implements ToolInterface {
  cursor: Cursor;
  name: ToolName;
  label: string;
  el: HTMLElement;

  #isDrag: boolean = false;
  #useCallback: null | ((event: MouseEvent) => string | null) = null;
  #clearCallback: null | (() => void) = null;
  #cursorStyleCallback: null | ((toolText: string) => string) = null;

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

  isDragging(): boolean {
    return this.#isDrag;
  }

  #useAt(event: MouseEvent): string | null {
    return this.#useCallback?.(event) || null;
  }

  selectTool(): void {
    this.el.classList.add("tooltip--selected");
  }

  deselectTool(): void {
    this.el.classList.remove("tooltip--selected");
  }

  drag(event: MouseEvent): string | null {
    this.#isDrag = true;
    return this.#useAt(event);
  }

  move(event: MouseEvent): string | null {
    if (this.isDragging()) {
      return this.#useAt(event);
    }
    return null;
  }

  undrag(): void {
    this.#isDrag = false;
    if (this.#clearCallback) {
      this.#clearCallback();
    }
  }

  setUse(callback: (event: MouseEvent) => string | null): void {
    this.#useCallback = callback;
  }

  setCursorStyle(callback: (toolText: string) => string): void {
    this.#cursorStyleCallback = callback;
  }

  getCursorStyle(toolText: string | null): string {
    return this.#cursorStyleCallback?.(toolText || '') || '';
  }

  setClear(callback: () => void): void {
    this.#clearCallback = callback;
  }
}
