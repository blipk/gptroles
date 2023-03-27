import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

const $ = (params) => document.querySelector(params)
const $$ = (params) => document.querySelectorAll(params)

const term = new Terminal();
const fitAddon = new FitAddon();
export const globalTermEl = document.createElement("div")

export function initTerm() {
    window.term = term
    term.loadAddon(fitAddon);

    globalTermEl.setAttribute("id", "terminal")
    globalTermEl.setAttribute("style", "display: none;")
    document.body.appendChild(globalTermEl)
    window.globalTermEl = globalTermEl


    term.onResize(function (evt) {
        const terminal_size = {
            Width: evt.cols,
            Height: evt.rows,
        };
        console.log(terminal_size)
        // websocket.send("\x04" + JSON.stringify(terminal_size));
    });

    resizewatch(globalTermEl)

    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    openTerm(globalTermEl)
}

function resizewatch(element) {
    const xterm_resize_ob = new ResizeObserver(function (entries) {
        try {
            fitAddon && fitAddon.fit();
        } catch (err) {
            console.log(err);
        }
    });
    xterm_resize_ob.observe(element);
}

export function openTerm(element) {
    term.open(element);
    fitAddon.fit()
}

export function placeTerm(element) {
    // window.globalTermEl.parentNode.removeChild(window.globalTermEl)
    // element.appendChild(element)
    // element.insertBefore(globalTermEl, elment.firstChild)
    if (globalTermEl.parentElement === element)
        return
    element.prepend(globalTermEl)
    fitAddon.fit()
    // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
}