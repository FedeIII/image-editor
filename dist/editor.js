"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Editor_instances, _Editor_setCurrentTool;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const tools_1 = require("./tools");
class Editor {
    constructor() {
        _Editor_instances.add(this);
        this.tools = {};
        this.currentTool = null;
    }
    addTool(tool) {
        if (!this.tools[tool.name]) {
            this.tools[tool.name] = tool;
            tool.el.addEventListener("click", () => {
                __classPrivateFieldGet(this, _Editor_instances, "m", _Editor_setCurrentTool).call(this, tool.name);
            });
        }
        else {
            console.warn(`Tool ${tool.name} already added`);
        }
    }
    update() {
        switch (this.currentTool) {
            case tools_1.NO_TOOL:
                console.log('no tool');
                break;
            case tools_1.COLOR_PICKER:
                console.log('color picker');
                break;
            default:
                break;
        }
    }
}
exports.Editor = Editor;
_Editor_instances = new WeakSet(), _Editor_setCurrentTool = function _Editor_setCurrentTool(tool) {
    this.currentTool = tool;
    this.update();
};
