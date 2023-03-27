import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

const $ = (params) => document.querySelector(params)
const $$ = (params) => document.querySelectorAll(params)

export function initTerm() {
    const term = new Terminal();
    const fitAddon = new FitAddon();
    const termEl = $("#terminal")
    window.term = term
    term.loadAddon(fitAddon);
    term.open(termEl);
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')

    term.onResize(function (evt) {
        const terminal_size = {
            Width: evt.cols,
            Height: evt.rows,
        };
        console.log(terminal_size)
        // websocket.send("\x04" + JSON.stringify(terminal_size));
    });

    const xterm_resize_ob = new ResizeObserver(function (entries) {
        try {
            fitAddon && fitAddon.fit();
        } catch (err) {
            console.log(err);
        }
    });

    // start observing for resize
    xterm_resize_ob.observe(termEl);

    fitAddon.fit();
}
