"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("./tools");
const editor = {
    currentTool: null,
    setCurrentTool(tool) {
        this.currentTool = tool;
        this.update();
    },
    update() {
        switch (this.currentTool) {
            case tools_1.NO_TOOL:
                break;
            default:
                break;
        }
    }
};
exports.default = editor;
