import { Cursor, ToolInterface, ToolName } from "./interfaces/editorElements";

export class Tool implements ToolInterface {
  name: ToolName;
  cursor: Cursor;
  label: string;
  el: HTMLElement;

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

  selectTool(): void {
    this.el.classList.add("tooltip--selected");
  }

  deselectTool(): void {
    this.el.classList.remove("tooltip--selected");
  }
}
