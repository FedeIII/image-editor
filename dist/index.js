'use strict';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const NO_TOOL = "no-tool";
const COLOR_PICKER = "color-picker";
class Tool {
    constructor(name, el, cursor) {
        this.name = name;
        this.el = el;
        this.cursor = cursor;
    }
}

var _Editor_instances, _Editor_setCurrentTool;
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
            case NO_TOOL:
                console.log('no tool');
                break;
            case COLOR_PICKER:
                console.log('color picker');
                break;
        }
    }
}
_Editor_instances = new WeakSet(), _Editor_setCurrentTool = function _Editor_setCurrentTool(tool) {
    this.currentTool = tool;
    this.update();
};

const MAX_WIDTH = 4000;
const MAX_HEIGHT = 4000;
const canvas = document.getElementById("canvas");
canvas.width = MAX_WIDTH;
canvas.height = MAX_HEIGHT;
const ctx = canvas.getContext("2d");
const img = new Image();
img.src =
    "public/img/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg";
img.addEventListener("load", function () {
    ctx.drawImage(img, 0, 0);
});
const editor = new Editor();
// NO TOOL
const noToolEl = document.getElementById("no-tool");
const noToolCursor = {
    img: null,
};
const noTool = new Tool(NO_TOOL, noToolEl, noToolCursor);
editor.addTool(noTool);
// COLOR PICKER
const colorPickerEl = document.getElementById("color-picker");
const colorPickerCursor = {
    img: "public/img/IconColorPicker.svg",
};
const colorPicker = new Tool(COLOR_PICKER, colorPickerEl, colorPickerCursor);
editor.addTool(colorPicker);
