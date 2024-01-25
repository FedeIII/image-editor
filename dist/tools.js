"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tool = exports.COLOR_PICKER = exports.NO_TOOL = void 0;
exports.NO_TOOL = "no-tool";
exports.COLOR_PICKER = "color-picker";
class Tool {
    constructor(name, el, cursor) {
        this.name = name;
        this.el = el;
        this.cursor = cursor;
    }
}
exports.Tool = Tool;
