// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"iIoW5":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = true;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"8lqZg":[function(require,module,exports) {
var _termJs = require("./term.js");
const $ = (params)=>document.querySelector(params);
const $$ = (params)=>document.querySelectorAll(params);
class ChatPage {
    constructor(){
        this.username = "You";
        this.chatLog = $(".chat-container");
    }
    copyText(text) {
        const copyText = document.createElement("textarea");
        copyText.setAttribute("style", "width:1px;border:0;opacity:0;");
        document.body.appendChild(copyText);
        // copyText.innerHTML = text.trim()
        copyText.value = text.trim();
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        // navigator.clipboard.writeText(copyText.value)
        document.execCommand("copy");
        document.body.removeChild(copyText);
    }
    clear() {
        this.chatLog.innerHTML = "";
    }
    notification(message, parent) {
        const notification = document.createElement("div");
        notification.setAttribute("class", "notification");
        notification.innerText = message;
        parent.appendChild(notification);
        setTimeout(()=>{
            notification.style.animation = "fadeout 1s";
            setTimeout(()=>parent.removeChild(notification), 1000);
        }, 1500);
    }
    addMessage(username, text, time, id) {
        const chatMessageClasses = username === this.username ? [
            "chat-message-self"
        ] : [];
        const chatNameClasses = username === this.username ? [
            "chat-message-username-self"
        ] : [];
        const msg = marked.parse(text.replaceAll("|TICK|", "`").replaceAll("$|{", "${"));
        const newMsgEl = `<div class="chat-message-msg" x-msg-id="${id}" x-msg-time="${time}" x-msg-user="${username}">${msg}</div>`;
        if (username === this.lastMessage?.username) {
            this.lastMessage.lastMessageEl.innerHTML += newMsgEl;
            this.lastMessage.timeEl.innerHTML = time;
        } else this.chatLog.innerHTML += `<div class="chat-message ${chatMessageClasses}">
                <span class="chat-message-username ${chatNameClasses}">${username}</span>
                ${newMsgEl}
                <span class="chat-message-time chat-message-time-self">${time}</span>
            </div>`;
        this.applyMarkdownButtons();
        this.applyMessageButtons();
        this.chatLog.scrollTo(0, this.chatLog.scrollHeight);
    }
    updateMessage(id, text, blockIndex = null, time = Date.now() / 1000) {
        const msg = $(`.chat-message-msg[x-msg-id="${id}"]`);
        if (!msg) return;
        if (blockIndex !== null) {
            const block = msg.querySelectorAll("pre code")[parseInt(blockIndex, 10)];
            block.textContent = text;
        } else msg.innerHTML = marked.parse(text);
        msg.setAttribute("x-msg-updated", time);
    }
    get lastMessage() {
        const lastMessageEl = this.chatLog.querySelector(".chat-message:last-child");
        if (!lastMessageEl) return lastMessageEl;
        const usernameEl = lastMessageEl.querySelector(".chat-message-username");
        const msgEl = lastMessageEl.querySelector(".chat-message-msg:last-child");
        const timeEl = lastMessageEl.querySelector(".chat-message-time");
        return {
            username: usernameEl.textContent,
            msg: msgEl?.textContent,
            time: timeEl.textContent,
            lastMessageEl,
            msgEl,
            timeEl
        };
    }
    applyMessageButtons() {
        [
            ...$$(".chat-message")
        ].forEach((el)=>{
            const buttons = el.querySelector(".message-buttons");
            if (buttons) buttons.parentNode.removeChild(buttons);
            const newButtons = document.createElement("div");
            newButtons.setAttribute("class", "message-buttons");
            newButtons.innerHTML = `<input type="button" class="message-button" value="⚙️"/>`;
            el.prepend(newButtons);
        });
    }
    applyMarkdownButtons() {
        [
            ...$$(".chat-message-msg")
        ].forEach((chatMessageEl)=>{
            [
                ...chatMessageEl.querySelectorAll("pre code")
            ].forEach((el, i)=>{
                const codeButtons = el.querySelector(".code-buttons");
                const msg = el.parentElement.parentElement;
                const msgId = msg.getAttribute("x-msg-id");
                el.setAttribute("x-block-index", i);
                if (codeButtons) codeButtons.parentNode.removeChild(codeButtons);
                const lang = [
                    ...el.classList
                ].find((c)=>c.includes("language"))?.replace("language-", "");
                const newButtons = document.createElement("div");
                newButtons.setAttribute("class", "code-buttons");
                if ([
                    "python",
                    "shell",
                    "sh",
                    "bash"
                ].includes(lang)) {
                    newButtons.innerHTML = `<input type="button" class="code-button play-button" value="▶️"/>`;
                    newButtons.innerHTML += `<input type="button" class="code-button edit-button" value="✏️"/>`;
                }
                newButtons.innerHTML += `<input type="button" class="code-button save-button" value="💾"/>`;
                newButtons.innerHTML += `<input type="button" class="code-button copy-button" value="📋"/>`;
                el.prepend(newButtons);
                const playButton = el.querySelector(".play-button");
                const editButton = el.querySelector(".edit-button");
                const saveButton = el.querySelector(".save-button");
                const copyButton = el.querySelector(".copy-button");
                copyButton?.addEventListener("click", (e)=>{
                    e.preventDefault();
                    this.copyText(el.textContent);
                    this.notification("Copied!", copyButton.parentElement);
                });
                playButton?.addEventListener("click", (e)=>{
                    e.preventDefault();
                    window.bridge.setData([
                        "run_code",
                        msgId,
                        i,
                        lang,
                        el.textContent
                    ]);
                });
                saveButton?.addEventListener("click", (e)=>{
                    e.preventDefault();
                    window.bridge.setData([
                        "save",
                        msgId,
                        i,
                        lang,
                        el.textContent
                    ]);
                //TODO add open in editor icon after saving
                });
                editButton?.addEventListener("click", (e)=>{
                    e.preventDefault();
                // window.bridge.setData(["save", msgId, i, lang, el.textContent])
                //TODO edit internally or open in editor on alternate click
                });
            });
        });
    }
}
window.onload = function(e) {
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code, lang) {
            console.log("Highlighting", lang);
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, {
                language
            }).value;
        },
        langPrefix: "hljs language-",
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartypants: false,
        xhtml: true
    });
    window.chatPage = new ChatPage();
    window.chatPage.applyMessageButtons();
    window.chatPage.applyMarkdownButtons();
    console.log("ChatPage inititialised");
    // Messages to python
    if (typeof QWebChannel !== "undefined") // window.chatPage.clear()
    new QWebChannel(qt.webChannelTransport, function(channel) {
        var bridge = channel.objects.bridge;
        window.bridge = bridge;
    });
    // Messages from python
    window.handlePyMessage = function(message) {
        if (message?.cmd === "lastMessage") return window.chatPage.lastMessage;
        else {
            console.log("Recieved unknown message", message);
            window.bridge.setData("Javascript didn't understand your message: " + message);
        }
        return null;
    };
// initTerm()
};

},{"./term.js":"56Y8V"}],"56Y8V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initTerm", ()=>initTerm);
var _xterm = require("xterm");
var _xtermAddonFit = require("xterm-addon-fit");
const $ = (params)=>document.querySelector(params);
const $$ = (params)=>document.querySelectorAll(params);
function initTerm() {
    const term = new (0, _xterm.Terminal)();
    const fitAddon = new (0, _xtermAddonFit.FitAddon)();
    const termEl = $("#terminal");
    window.term = term;
    term.loadAddon(fitAddon);
    term.open(termEl);
    term.write("Hello from \x1b[1;3;31mxterm.js\x1b[0m $ ");
    term.onResize(function(evt) {
        const terminal_size = {
            Width: evt.cols,
            Height: evt.rows
        };
        console.log(terminal_size);
    // websocket.send("\x04" + JSON.stringify(terminal_size));
    });
    const xterm_resize_ob = new ResizeObserver(function(entries) {
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

},{"xterm":"aEUZq","xterm-addon-fit":"a5mjI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aEUZq":[function(require,module,exports) {
!function(e, t) {
    var i, s;
    module.exports = t();
}(self, function() {
    return (()=>{
        "use strict";
        var e = {
            4567: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.AccessibilityManager = void 0;
                const s = i(9042), r = i(6114), n = i(9924), o = i(3656), a = i(844), h = i(5596), c = i(9631);
                class l extends a.Disposable {
                    constructor(e, t){
                        super(), this._terminal = e, this._renderService = t, this._liveRegionLineCount = 0, this._charsToConsume = [], this._charsToAnnounce = "", this._accessibilityTreeRoot = document.createElement("div"), this._accessibilityTreeRoot.classList.add("xterm-accessibility"), this._accessibilityTreeRoot.tabIndex = 0, this._rowContainer = document.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
                        for(let e = 0; e < this._terminal.rows; e++)this._rowElements[e] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e]);
                        if (this._topBoundaryFocusListener = (e)=>this._handleBoundaryFocus(e, 0), this._bottomBoundaryFocusListener = (e)=>this._handleBoundaryFocus(e, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions(), this._accessibilityTreeRoot.appendChild(this._rowContainer), this._renderRowsDebouncer = new n.TimeBasedDebouncer(this._renderRows.bind(this)), this._refreshRows(), this._liveRegion = document.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityTreeRoot.appendChild(this._liveRegion), !this._terminal.element) throw new Error("Cannot enable accessibility before Terminal.open");
                        this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityTreeRoot), this.register(this._renderRowsDebouncer), this.register(this._terminal.onResize((e)=>this._handleResize(e.rows))), this.register(this._terminal.onRender((e)=>this._refreshRows(e.start, e.end))), this.register(this._terminal.onScroll(()=>this._refreshRows())), this.register(this._terminal.onA11yChar((e)=>this._handleChar(e))), this.register(this._terminal.onLineFeed(()=>this._handleChar("\n"))), this.register(this._terminal.onA11yTab((e)=>this._handleTab(e))), this.register(this._terminal.onKey((e)=>this._handleKey(e.key))), this.register(this._terminal.onBlur(()=>this._clearLiveRegion())), this.register(this._renderService.onDimensionsChange(()=>this._refreshRowsDimensions())), this._screenDprMonitor = new h.ScreenDprMonitor(window), this.register(this._screenDprMonitor), this._screenDprMonitor.setListener(()=>this._refreshRowsDimensions()), this.register((0, o.addDisposableDomListener)(window, "resize", ()=>this._refreshRowsDimensions())), this.register((0, a.toDisposable)(()=>{
                            (0, c.removeElementFromParent)(this._accessibilityTreeRoot), this._rowElements.length = 0;
                        }));
                    }
                    _handleBoundaryFocus(e, t) {
                        const i = e.target, s = this._rowElements[0 === t ? 1 : this._rowElements.length - 2];
                        if (i.getAttribute("aria-posinset") === (0 === t ? "1" : `${this._terminal.buffer.lines.length}`)) return;
                        if (e.relatedTarget !== s) return;
                        let r, n;
                        if (0 === t ? (r = i, n = this._rowElements.pop(), this._rowContainer.removeChild(n)) : (r = this._rowElements.shift(), n = i, this._rowContainer.removeChild(r)), r.removeEventListener("focus", this._topBoundaryFocusListener), n.removeEventListener("focus", this._bottomBoundaryFocusListener), 0 === t) {
                            const e = this._createAccessibilityTreeNode();
                            this._rowElements.unshift(e), this._rowContainer.insertAdjacentElement("afterbegin", e);
                        } else {
                            const e = this._createAccessibilityTreeNode();
                            this._rowElements.push(e), this._rowContainer.appendChild(e);
                        }
                        this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(0 === t ? -1 : 1), this._rowElements[0 === t ? 1 : this._rowElements.length - 2].focus(), e.preventDefault(), e.stopImmediatePropagation();
                    }
                    _handleResize(e) {
                        this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
                        for(let e = this._rowContainer.children.length; e < this._terminal.rows; e++)this._rowElements[e] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e]);
                        for(; this._rowElements.length > e;)this._rowContainer.removeChild(this._rowElements.pop());
                        this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
                    }
                    _createAccessibilityTreeNode() {
                        const e = document.createElement("div");
                        return e.setAttribute("role", "listitem"), e.tabIndex = -1, this._refreshRowDimensions(e), e;
                    }
                    _handleTab(e) {
                        for(let t = 0; t < e; t++)this._handleChar(" ");
                    }
                    _handleChar(e) {
                        this._liveRegionLineCount < 21 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e && (this._charsToAnnounce += e) : this._charsToAnnounce += e, "\n" === e && (this._liveRegionLineCount++, 21 === this._liveRegionLineCount && (this._liveRegion.textContent += s.tooMuchOutput)), r.isMac && this._liveRegion.textContent && this._liveRegion.textContent.length > 0 && !this._liveRegion.parentNode && setTimeout(()=>{
                            this._accessibilityTreeRoot.appendChild(this._liveRegion);
                        }, 0));
                    }
                    _clearLiveRegion() {
                        this._liveRegion.textContent = "", this._liveRegionLineCount = 0, r.isMac && (0, c.removeElementFromParent)(this._liveRegion);
                    }
                    _handleKey(e) {
                        this._clearLiveRegion(), /\p{Control}/u.test(e) || this._charsToConsume.push(e);
                    }
                    _refreshRows(e, t) {
                        this._renderRowsDebouncer.refresh(e, t, this._terminal.rows);
                    }
                    _renderRows(e, t) {
                        const i = this._terminal.buffer, s = i.lines.length.toString();
                        for(let r = e; r <= t; r++){
                            const e = i.translateBufferLineToString(i.ydisp + r, !0), t = (i.ydisp + r + 1).toString(), n = this._rowElements[r];
                            n && (0 === e.length ? n.innerText = "\xa0" : n.textContent = e, n.setAttribute("aria-posinset", t), n.setAttribute("aria-setsize", s));
                        }
                        this._announceCharacters();
                    }
                    _refreshRowsDimensions() {
                        if (this._renderService.dimensions.css.cell.height) {
                            this._accessibilityTreeRoot.style.width = `${this._renderService.dimensions.css.canvas.width}px`, this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
                            for(let e = 0; e < this._terminal.rows; e++)this._refreshRowDimensions(this._rowElements[e]);
                        }
                    }
                    _refreshRowDimensions(e) {
                        e.style.height = `${this._renderService.dimensions.css.cell.height}px`;
                    }
                    _announceCharacters() {
                        0 !== this._charsToAnnounce.length && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
                    }
                }
                t.AccessibilityManager = l;
            },
            3614: (e, t)=>{
                function i(e) {
                    return e.replace(/\r?\n/g, "\r");
                }
                function s(e, t) {
                    return t ? "\x1b[200~" + e + "\x1b[201~" : e;
                }
                function r(e, t, r) {
                    e = s(e = i(e), r.decPrivateModes.bracketedPasteMode), r.triggerDataEvent(e, !0), t.value = "";
                }
                function n(e, t, i) {
                    const s = i.getBoundingClientRect(), r = e.clientX - s.left - 10, n = e.clientY - s.top - 10;
                    t.style.width = "20px", t.style.height = "20px", t.style.left = `${r}px`, t.style.top = `${n}px`, t.style.zIndex = "1000", t.focus();
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.rightClickHandler = t.moveTextAreaUnderMouseCursor = t.paste = t.handlePasteEvent = t.copyHandler = t.bracketTextForPaste = t.prepareTextForTerminal = void 0, t.prepareTextForTerminal = i, t.bracketTextForPaste = s, t.copyHandler = function(e, t) {
                    e.clipboardData && e.clipboardData.setData("text/plain", t.selectionText), e.preventDefault();
                }, t.handlePasteEvent = function(e, t, i) {
                    e.stopPropagation(), e.clipboardData && r(e.clipboardData.getData("text/plain"), t, i);
                }, t.paste = r, t.moveTextAreaUnderMouseCursor = n, t.rightClickHandler = function(e, t, i, s, r) {
                    n(e, t, i), r && s.rightClickSelect(e), t.value = s.selectionText, t.select();
                };
            },
            7239: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ColorContrastCache = void 0;
                const s = i(1505);
                t.ColorContrastCache = class {
                    constructor(){
                        this._color = new s.TwoKeyMap, this._css = new s.TwoKeyMap;
                    }
                    setCss(e, t, i) {
                        this._css.set(e, t, i);
                    }
                    getCss(e, t) {
                        return this._css.get(e, t);
                    }
                    setColor(e, t, i) {
                        this._color.set(e, t, i);
                    }
                    getColor(e, t) {
                        return this._color.get(e, t);
                    }
                    clear() {
                        this._color.clear(), this._css.clear();
                    }
                };
            },
            9631: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.removeElementFromParent = void 0, t.removeElementFromParent = function(...e) {
                    var t;
                    for (const i of e)null === (t = null == i ? void 0 : i.parentElement) || void 0 === t || t.removeChild(i);
                };
            },
            3656: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.addDisposableDomListener = void 0, t.addDisposableDomListener = function(e, t, i, s) {
                    e.addEventListener(t, i, s);
                    let r = !1;
                    return {
                        dispose: ()=>{
                            r || (r = !0, e.removeEventListener(t, i, s));
                        }
                    };
                };
            },
            6465: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Linkifier2 = void 0;
                const n = i(2585), o = i(8460), a = i(844), h = i(3656);
                let c = class extends a.Disposable {
                    constructor(e){
                        super(), this._bufferService = e, this._linkProviders = [], this._linkCacheDisposables = [], this._isMouseOut = !0, this._activeLine = -1, this._onShowLinkUnderline = this.register(new o.EventEmitter), this.onShowLinkUnderline = this._onShowLinkUnderline.event, this._onHideLinkUnderline = this.register(new o.EventEmitter), this.onHideLinkUnderline = this._onHideLinkUnderline.event, this.register((0, a.getDisposeArrayDisposable)(this._linkCacheDisposables)), this.register((0, a.toDisposable)(()=>{
                            this._lastMouseEvent = void 0;
                        }));
                    }
                    get currentLink() {
                        return this._currentLink;
                    }
                    registerLinkProvider(e) {
                        return this._linkProviders.push(e), {
                            dispose: ()=>{
                                const t = this._linkProviders.indexOf(e);
                                -1 !== t && this._linkProviders.splice(t, 1);
                            }
                        };
                    }
                    attachToDom(e, t, i) {
                        this._element = e, this._mouseService = t, this._renderService = i, this.register((0, h.addDisposableDomListener)(this._element, "mouseleave", ()=>{
                            this._isMouseOut = !0, this._clearCurrentLink();
                        })), this.register((0, h.addDisposableDomListener)(this._element, "mousemove", this._handleMouseMove.bind(this))), this.register((0, h.addDisposableDomListener)(this._element, "mousedown", this._handleMouseDown.bind(this))), this.register((0, h.addDisposableDomListener)(this._element, "mouseup", this._handleMouseUp.bind(this)));
                    }
                    _handleMouseMove(e) {
                        if (this._lastMouseEvent = e, !this._element || !this._mouseService) return;
                        const t = this._positionFromMouseEvent(e, this._element, this._mouseService);
                        if (!t) return;
                        this._isMouseOut = !1;
                        const i = e.composedPath();
                        for(let e = 0; e < i.length; e++){
                            const t = i[e];
                            if (t.classList.contains("xterm")) break;
                            if (t.classList.contains("xterm-hover")) return;
                        }
                        this._lastBufferCell && t.x === this._lastBufferCell.x && t.y === this._lastBufferCell.y || (this._handleHover(t), this._lastBufferCell = t);
                    }
                    _handleHover(e) {
                        if (this._activeLine !== e.y) return this._clearCurrentLink(), void this._askForLink(e, !1);
                        this._currentLink && this._linkAtPosition(this._currentLink.link, e) || (this._clearCurrentLink(), this._askForLink(e, !0));
                    }
                    _askForLink(e, t) {
                        var i, s;
                        this._activeProviderReplies && t || (null === (i = this._activeProviderReplies) || void 0 === i || i.forEach((e)=>{
                            null == e || e.forEach((e)=>{
                                e.link.dispose && e.link.dispose();
                            });
                        }), this._activeProviderReplies = new Map, this._activeLine = e.y);
                        let r = !1;
                        for (const [i, n] of this._linkProviders.entries())t ? (null === (s = this._activeProviderReplies) || void 0 === s ? void 0 : s.get(i)) && (r = this._checkLinkProviderResult(i, e, r)) : n.provideLinks(e.y, (t)=>{
                            var s, n;
                            if (this._isMouseOut) return;
                            const o = null == t ? void 0 : t.map((e)=>({
                                    link: e
                                }));
                            null === (s = this._activeProviderReplies) || void 0 === s || s.set(i, o), r = this._checkLinkProviderResult(i, e, r), (null === (n = this._activeProviderReplies) || void 0 === n ? void 0 : n.size) === this._linkProviders.length && this._removeIntersectingLinks(e.y, this._activeProviderReplies);
                        });
                    }
                    _removeIntersectingLinks(e, t) {
                        const i = new Set;
                        for(let s = 0; s < t.size; s++){
                            const r = t.get(s);
                            if (r) for(let t = 0; t < r.length; t++){
                                const s = r[t], n = s.link.range.start.y < e ? 0 : s.link.range.start.x, o = s.link.range.end.y > e ? this._bufferService.cols : s.link.range.end.x;
                                for(let e = n; e <= o; e++){
                                    if (i.has(e)) {
                                        r.splice(t--, 1);
                                        break;
                                    }
                                    i.add(e);
                                }
                            }
                        }
                    }
                    _checkLinkProviderResult(e, t, i) {
                        var s;
                        if (!this._activeProviderReplies) return i;
                        const r = this._activeProviderReplies.get(e);
                        let n = !1;
                        for(let t = 0; t < e; t++)this._activeProviderReplies.has(t) && !this._activeProviderReplies.get(t) || (n = !0);
                        if (!n && r) {
                            const e = r.find((e)=>this._linkAtPosition(e.link, t));
                            e && (i = !0, this._handleNewLink(e));
                        }
                        if (this._activeProviderReplies.size === this._linkProviders.length && !i) for(let e = 0; e < this._activeProviderReplies.size; e++){
                            const r = null === (s = this._activeProviderReplies.get(e)) || void 0 === s ? void 0 : s.find((e)=>this._linkAtPosition(e.link, t));
                            if (r) {
                                i = !0, this._handleNewLink(r);
                                break;
                            }
                        }
                        return i;
                    }
                    _handleMouseDown() {
                        this._mouseDownLink = this._currentLink;
                    }
                    _handleMouseUp(e) {
                        if (!this._element || !this._mouseService || !this._currentLink) return;
                        const t = this._positionFromMouseEvent(e, this._element, this._mouseService);
                        t && this._mouseDownLink === this._currentLink && this._linkAtPosition(this._currentLink.link, t) && this._currentLink.link.activate(e, this._currentLink.link.text);
                    }
                    _clearCurrentLink(e, t) {
                        this._element && this._currentLink && this._lastMouseEvent && (!e || !t || this._currentLink.link.range.start.y >= e && this._currentLink.link.range.end.y <= t) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, (0, a.disposeArray)(this._linkCacheDisposables));
                    }
                    _handleNewLink(e) {
                        if (!this._element || !this._lastMouseEvent || !this._mouseService) return;
                        const t = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
                        t && this._linkAtPosition(e.link, t) && (this._currentLink = e, this._currentLink.state = {
                            decorations: {
                                underline: void 0 === e.link.decorations || e.link.decorations.underline,
                                pointerCursor: void 0 === e.link.decorations || e.link.decorations.pointerCursor
                            },
                            isHovered: !0
                        }, this._linkHover(this._element, e.link, this._lastMouseEvent), e.link.decorations = {}, Object.defineProperties(e.link.decorations, {
                            pointerCursor: {
                                get: ()=>{
                                    var e, t;
                                    return null === (t = null === (e = this._currentLink) || void 0 === e ? void 0 : e.state) || void 0 === t ? void 0 : t.decorations.pointerCursor;
                                },
                                set: (e)=>{
                                    var t, i;
                                    (null === (t = this._currentLink) || void 0 === t ? void 0 : t.state) && this._currentLink.state.decorations.pointerCursor !== e && (this._currentLink.state.decorations.pointerCursor = e, this._currentLink.state.isHovered && (null === (i = this._element) || void 0 === i || i.classList.toggle("xterm-cursor-pointer", e)));
                                }
                            },
                            underline: {
                                get: ()=>{
                                    var e, t;
                                    return null === (t = null === (e = this._currentLink) || void 0 === e ? void 0 : e.state) || void 0 === t ? void 0 : t.decorations.underline;
                                },
                                set: (t)=>{
                                    var i, s, r;
                                    (null === (i = this._currentLink) || void 0 === i ? void 0 : i.state) && (null === (r = null === (s = this._currentLink) || void 0 === s ? void 0 : s.state) || void 0 === r ? void 0 : r.decorations.underline) !== t && (this._currentLink.state.decorations.underline = t, this._currentLink.state.isHovered && this._fireUnderlineEvent(e.link, t));
                                }
                            }
                        }), this._renderService && this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((e)=>{
                            const t = 0 === e.start ? 0 : e.start + 1 + this._bufferService.buffer.ydisp, i = this._currentLink ? this._lastMouseEvent : void 0;
                            if (this._clearCurrentLink(t, e.end + 1 + this._bufferService.buffer.ydisp), i && this._element) {
                                const e = this._positionFromMouseEvent(i, this._element, this._mouseService);
                                e && this._askForLink(e, !1);
                            }
                        })));
                    }
                    _linkHover(e, t, i) {
                        var s;
                        (null === (s = this._currentLink) || void 0 === s ? void 0 : s.state) && (this._currentLink.state.isHovered = !0, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t, !0), this._currentLink.state.decorations.pointerCursor && e.classList.add("xterm-cursor-pointer")), t.hover && t.hover(i, t.text);
                    }
                    _fireUnderlineEvent(e, t) {
                        const i = e.range, s = this._bufferService.buffer.ydisp, r = this._createLinkUnderlineEvent(i.start.x - 1, i.start.y - s - 1, i.end.x, i.end.y - s - 1, void 0);
                        (t ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(r);
                    }
                    _linkLeave(e, t, i) {
                        var s;
                        (null === (s = this._currentLink) || void 0 === s ? void 0 : s.state) && (this._currentLink.state.isHovered = !1, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t, !1), this._currentLink.state.decorations.pointerCursor && e.classList.remove("xterm-cursor-pointer")), t.leave && t.leave(i, t.text);
                    }
                    _linkAtPosition(e, t) {
                        const i = e.range.start.y * this._bufferService.cols + e.range.start.x, s = e.range.end.y * this._bufferService.cols + e.range.end.x, r = t.y * this._bufferService.cols + t.x;
                        return i <= r && r <= s;
                    }
                    _positionFromMouseEvent(e, t, i) {
                        const s = i.getCoords(e, t, this._bufferService.cols, this._bufferService.rows);
                        if (s) return {
                            x: s[0],
                            y: s[1] + this._bufferService.buffer.ydisp
                        };
                    }
                    _createLinkUnderlineEvent(e, t, i, s, r) {
                        return {
                            x1: e,
                            y1: t,
                            x2: i,
                            y2: s,
                            cols: this._bufferService.cols,
                            fg: r
                        };
                    }
                };
                c = s([
                    r(0, n.IBufferService)
                ], c), t.Linkifier2 = c;
            },
            9042: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.tooMuchOutput = t.promptLabel = void 0, t.promptLabel = "Terminal input", t.tooMuchOutput = "Too much output to announce, navigate to rows manually to read";
            },
            3730: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.OscLinkProvider = void 0;
                const n = i(511), o = i(2585);
                let a = class {
                    constructor(e, t, i){
                        this._bufferService = e, this._optionsService = t, this._oscLinkService = i;
                    }
                    provideLinks(e, t) {
                        var i;
                        const s = this._bufferService.buffer.lines.get(e - 1);
                        if (!s) return void t(void 0);
                        const r = [], o = this._optionsService.rawOptions.linkHandler, a = new n.CellData, c = s.getTrimmedLength();
                        let l = -1, d = -1, _ = !1;
                        for(let t = 0; t < c; t++)if (-1 !== d || s.hasContent(t)) {
                            if (s.loadCell(t, a), a.hasExtendedAttrs() && a.extended.urlId) {
                                if (-1 === d) {
                                    d = t, l = a.extended.urlId;
                                    continue;
                                }
                                _ = a.extended.urlId !== l;
                            } else -1 !== d && (_ = !0);
                            if (_ || -1 !== d && t === c - 1) {
                                const s = null === (i = this._oscLinkService.getLinkData(l)) || void 0 === i ? void 0 : i.uri;
                                if (s) {
                                    const i = {
                                        start: {
                                            x: d + 1,
                                            y: e
                                        },
                                        end: {
                                            x: t + (_ || t !== c - 1 ? 0 : 1),
                                            y: e
                                        }
                                    };
                                    let n = !1;
                                    if (!(null == o ? void 0 : o.allowNonHttpProtocols)) try {
                                        const e = new URL(s);
                                        [
                                            "http:",
                                            "https:"
                                        ].includes(e.protocol) || (n = !0);
                                    } catch (e) {
                                        n = !0;
                                    }
                                    n || r.push({
                                        text: s,
                                        range: i,
                                        activate: (e, t)=>o ? o.activate(e, t, i) : h(0, t),
                                        hover: (e, t)=>{
                                            var s;
                                            return null === (s = null == o ? void 0 : o.hover) || void 0 === s ? void 0 : s.call(o, e, t, i);
                                        },
                                        leave: (e, t)=>{
                                            var s;
                                            return null === (s = null == o ? void 0 : o.leave) || void 0 === s ? void 0 : s.call(o, e, t, i);
                                        }
                                    });
                                }
                                _ = !1, a.hasExtendedAttrs() && a.extended.urlId ? (d = t, l = a.extended.urlId) : (d = -1, l = -1);
                            }
                        }
                        t(r);
                    }
                };
                function h(e, t) {
                    if (confirm(`Do you want to navigate to ${t}?\n\nWARNING: This link could potentially be dangerous`)) {
                        const e = window.open();
                        if (e) {
                            try {
                                e.opener = null;
                            } catch (e) {}
                            e.location.href = t;
                        } else console.warn("Opening link blocked as opener could not be cleared");
                    }
                }
                a = s([
                    r(0, o.IBufferService),
                    r(1, o.IOptionsService),
                    r(2, o.IOscLinkService)
                ], a), t.OscLinkProvider = a;
            },
            6193: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.RenderDebouncer = void 0, t.RenderDebouncer = class {
                    constructor(e, t){
                        this._parentWindow = e, this._renderCallback = t, this._refreshCallbacks = [];
                    }
                    dispose() {
                        this._animationFrame && (this._parentWindow.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
                    }
                    addRefreshCallback(e) {
                        return this._refreshCallbacks.push(e), this._animationFrame || (this._animationFrame = this._parentWindow.requestAnimationFrame(()=>this._innerRefresh())), this._animationFrame;
                    }
                    refresh(e, t, i) {
                        this._rowCount = i, e = void 0 !== e ? e : 0, t = void 0 !== t ? t : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e) : e, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t) : t, this._animationFrame || (this._animationFrame = this._parentWindow.requestAnimationFrame(()=>this._innerRefresh()));
                    }
                    _innerRefresh() {
                        if (this._animationFrame = void 0, void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount) return void this._runRefreshCallbacks();
                        const e = Math.max(this._rowStart, 0), t = Math.min(this._rowEnd, this._rowCount - 1);
                        this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e, t), this._runRefreshCallbacks();
                    }
                    _runRefreshCallbacks() {
                        for (const e of this._refreshCallbacks)e(0);
                        this._refreshCallbacks = [];
                    }
                };
            },
            5596: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ScreenDprMonitor = void 0;
                const s = i(844);
                class r extends s.Disposable {
                    constructor(e){
                        super(), this._parentWindow = e, this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this.register((0, s.toDisposable)(()=>{
                            this.clearListener();
                        }));
                    }
                    setListener(e) {
                        this._listener && this.clearListener(), this._listener = e, this._outerListener = ()=>{
                            this._listener && (this._listener(this._parentWindow.devicePixelRatio, this._currentDevicePixelRatio), this._updateDpr());
                        }, this._updateDpr();
                    }
                    _updateDpr() {
                        var e;
                        this._outerListener && (null === (e = this._resolutionMediaMatchList) || void 0 === e || e.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
                    }
                    clearListener() {
                        this._resolutionMediaMatchList && this._listener && this._outerListener && (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._listener = void 0, this._outerListener = void 0);
                    }
                }
                t.ScreenDprMonitor = r;
            },
            3236: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Terminal = void 0;
                const s = i(2950), r = i(1680), n = i(3614), o = i(2584), a = i(5435), h = i(9312), c = i(6114), l = i(3656), d = i(9042), _ = i(4567), u = i(1296), f = i(7399), v = i(8460), g = i(8437), p = i(3230), S = i(4725), m = i(428), C = i(8934), b = i(6465), y = i(5114), w = i(8969), E = i(8055), L = i(4269), k = i(5941), R = i(3107), D = i(5744), A = i(9074), x = i(2585), B = i(3730), T = i(844), M = i(6731), O = "undefined" != typeof window ? window.document : null;
                class I extends w.CoreTerminal {
                    constructor(e = {}){
                        super(e), this.browser = c, this._keyDownHandled = !1, this._keyDownSeen = !1, this._keyPressHandled = !1, this._unprocessedDeadKey = !1, this._onCursorMove = this.register(new v.EventEmitter), this.onCursorMove = this._onCursorMove.event, this._onKey = this.register(new v.EventEmitter), this.onKey = this._onKey.event, this._onRender = this.register(new v.EventEmitter), this.onRender = this._onRender.event, this._onSelectionChange = this.register(new v.EventEmitter), this.onSelectionChange = this._onSelectionChange.event, this._onTitleChange = this.register(new v.EventEmitter), this.onTitleChange = this._onTitleChange.event, this._onBell = this.register(new v.EventEmitter), this.onBell = this._onBell.event, this._onFocus = this.register(new v.EventEmitter), this._onBlur = this.register(new v.EventEmitter), this._onA11yCharEmitter = this.register(new v.EventEmitter), this._onA11yTabEmitter = this.register(new v.EventEmitter), this._onWillOpen = this.register(new v.EventEmitter), this._setup(), this.linkifier2 = this.register(this._instantiationService.createInstance(b.Linkifier2)), this.linkifier2.registerLinkProvider(this._instantiationService.createInstance(B.OscLinkProvider)), this._decorationService = this._instantiationService.createInstance(A.DecorationService), this._instantiationService.setService(x.IDecorationService, this._decorationService), this.register(this._inputHandler.onRequestBell(()=>this._onBell.fire())), this.register(this._inputHandler.onRequestRefreshRows((e, t)=>this.refresh(e, t))), this.register(this._inputHandler.onRequestSendFocus(()=>this._reportFocus())), this.register(this._inputHandler.onRequestReset(()=>this.reset())), this.register(this._inputHandler.onRequestWindowsOptionsReport((e)=>this._reportWindowsOptions(e))), this.register(this._inputHandler.onColor((e)=>this._handleColorEvent(e))), this.register((0, v.forwardEvent)(this._inputHandler.onCursorMove, this._onCursorMove)), this.register((0, v.forwardEvent)(this._inputHandler.onTitleChange, this._onTitleChange)), this.register((0, v.forwardEvent)(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this.register((0, v.forwardEvent)(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this.register(this._bufferService.onResize((e)=>this._afterResize(e.cols, e.rows))), this.register((0, T.toDisposable)(()=>{
                            var e, t;
                            this._customKeyEventHandler = void 0, null === (t = null === (e = this.element) || void 0 === e ? void 0 : e.parentNode) || void 0 === t || t.removeChild(this.element);
                        }));
                    }
                    get onFocus() {
                        return this._onFocus.event;
                    }
                    get onBlur() {
                        return this._onBlur.event;
                    }
                    get onA11yChar() {
                        return this._onA11yCharEmitter.event;
                    }
                    get onA11yTab() {
                        return this._onA11yTabEmitter.event;
                    }
                    get onWillOpen() {
                        return this._onWillOpen.event;
                    }
                    _handleColorEvent(e) {
                        if (this._themeService) for (const t of e){
                            let e, i = "";
                            switch(t.index){
                                case 256:
                                    e = "foreground", i = "10";
                                    break;
                                case 257:
                                    e = "background", i = "11";
                                    break;
                                case 258:
                                    e = "cursor", i = "12";
                                    break;
                                default:
                                    e = "ansi", i = "4;" + t.index;
                            }
                            switch(t.type){
                                case 0:
                                    const s = E.color.toColorRGB("ansi" === e ? this._themeService.colors.ansi[t.index] : this._themeService.colors[e]);
                                    this.coreService.triggerDataEvent(`${o.C0.ESC}]${i};${(0, k.toRgbString)(s)}${o.C1_ESCAPED.ST}`);
                                    break;
                                case 1:
                                    if ("ansi" === e) this._themeService.modifyColors((e)=>e.ansi[t.index] = E.rgba.toColor(...t.color));
                                    else {
                                        const i = e;
                                        this._themeService.modifyColors((e)=>e[i] = E.rgba.toColor(...t.color));
                                    }
                                    break;
                                case 2:
                                    this._themeService.restoreColor(t.index);
                            }
                        }
                    }
                    _setup() {
                        super._setup(), this._customKeyEventHandler = void 0;
                    }
                    get buffer() {
                        return this.buffers.active;
                    }
                    focus() {
                        this.textarea && this.textarea.focus({
                            preventScroll: !0
                        });
                    }
                    _handleScreenReaderModeOptionChange(e) {
                        var t;
                        e ? !this._accessibilityManager && this._renderService && (this._accessibilityManager = new _.AccessibilityManager(this, this._renderService)) : (null === (t = this._accessibilityManager) || void 0 === t || t.dispose(), this._accessibilityManager = void 0);
                    }
                    _handleTextAreaFocus(e) {
                        this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(o.C0.ESC + "[I"), this.updateCursorStyle(e), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
                    }
                    blur() {
                        var e;
                        return null === (e = this.textarea) || void 0 === e ? void 0 : e.blur();
                    }
                    _handleTextAreaBlur() {
                        this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(o.C0.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
                    }
                    _syncTextArea() {
                        if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
                        const e = this.buffer.ybase + this.buffer.y, t = this.buffer.lines.get(e);
                        if (!t) return;
                        const i = Math.min(this.buffer.x, this.cols - 1), s = this._renderService.dimensions.css.cell.height, r = t.getWidth(i), n = this._renderService.dimensions.css.cell.width * r, o = this.buffer.y * this._renderService.dimensions.css.cell.height, a = i * this._renderService.dimensions.css.cell.width;
                        this.textarea.style.left = a + "px", this.textarea.style.top = o + "px", this.textarea.style.width = n + "px", this.textarea.style.height = s + "px", this.textarea.style.lineHeight = s + "px", this.textarea.style.zIndex = "-5";
                    }
                    _initGlobal() {
                        this._bindKeys(), this.register((0, l.addDisposableDomListener)(this.element, "copy", (e)=>{
                            this.hasSelection() && (0, n.copyHandler)(e, this._selectionService);
                        }));
                        const e = (e)=>(0, n.handlePasteEvent)(e, this.textarea, this.coreService);
                        this.register((0, l.addDisposableDomListener)(this.textarea, "paste", e)), this.register((0, l.addDisposableDomListener)(this.element, "paste", e)), c.isFirefox ? this.register((0, l.addDisposableDomListener)(this.element, "mousedown", (e)=>{
                            2 === e.button && (0, n.rightClickHandler)(e, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
                        })) : this.register((0, l.addDisposableDomListener)(this.element, "contextmenu", (e)=>{
                            (0, n.rightClickHandler)(e, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
                        })), c.isLinux && this.register((0, l.addDisposableDomListener)(this.element, "auxclick", (e)=>{
                            1 === e.button && (0, n.moveTextAreaUnderMouseCursor)(e, this.textarea, this.screenElement);
                        }));
                    }
                    _bindKeys() {
                        this.register((0, l.addDisposableDomListener)(this.textarea, "keyup", (e)=>this._keyUp(e), !0)), this.register((0, l.addDisposableDomListener)(this.textarea, "keydown", (e)=>this._keyDown(e), !0)), this.register((0, l.addDisposableDomListener)(this.textarea, "keypress", (e)=>this._keyPress(e), !0)), this.register((0, l.addDisposableDomListener)(this.textarea, "compositionstart", ()=>this._compositionHelper.compositionstart())), this.register((0, l.addDisposableDomListener)(this.textarea, "compositionupdate", (e)=>this._compositionHelper.compositionupdate(e))), this.register((0, l.addDisposableDomListener)(this.textarea, "compositionend", ()=>this._compositionHelper.compositionend())), this.register((0, l.addDisposableDomListener)(this.textarea, "input", (e)=>this._inputEvent(e), !0)), this.register(this.onRender(()=>this._compositionHelper.updateCompositionElements()));
                    }
                    open(e) {
                        var t;
                        if (!e) throw new Error("Terminal requires a parent element.");
                        e.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this._document = e.ownerDocument, this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), this.element.setAttribute("tabindex", "0"), e.appendChild(this.element);
                        const i = O.createDocumentFragment();
                        this._viewportElement = O.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), i.appendChild(this._viewportElement), this._viewportScrollArea = O.createElement("div"), this._viewportScrollArea.classList.add("xterm-scroll-area"), this._viewportElement.appendChild(this._viewportScrollArea), this.screenElement = O.createElement("div"), this.screenElement.classList.add("xterm-screen"), this._helperContainer = O.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), i.appendChild(this.screenElement), this.textarea = O.createElement("textarea"), this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", d.promptLabel), c.isChromeOS || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._coreBrowserService = this._instantiationService.createInstance(y.CoreBrowserService, this.textarea, null !== (t = this._document.defaultView) && void 0 !== t ? t : window), this._instantiationService.setService(S.ICoreBrowserService, this._coreBrowserService), this.register((0, l.addDisposableDomListener)(this.textarea, "focus", (e)=>this._handleTextAreaFocus(e))), this.register((0, l.addDisposableDomListener)(this.textarea, "blur", ()=>this._handleTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(m.CharSizeService, this._document, this._helperContainer), this._instantiationService.setService(S.ICharSizeService, this._charSizeService), this._themeService = this._instantiationService.createInstance(M.ThemeService), this._instantiationService.setService(S.IThemeService, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(L.CharacterJoinerService), this._instantiationService.setService(S.ICharacterJoinerService, this._characterJoinerService), this._renderService = this.register(this._instantiationService.createInstance(p.RenderService, this.rows, this.screenElement)), this._instantiationService.setService(S.IRenderService, this._renderService), this.register(this._renderService.onRenderedViewportChange((e)=>this._onRender.fire(e))), this.onResize((e)=>this._renderService.resize(e.cols, e.rows)), this._compositionView = O.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance(s.CompositionHelper, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this.element.appendChild(i);
                        try {
                            this._onWillOpen.fire(this.element);
                        } catch (e) {}
                        this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this._mouseService = this._instantiationService.createInstance(C.MouseService), this._instantiationService.setService(S.IMouseService, this._mouseService), this.viewport = this._instantiationService.createInstance(r.Viewport, (e)=>this.scrollLines(e, !0, 1), this._viewportElement, this._viewportScrollArea), this.register(this._inputHandler.onRequestSyncScrollBar(()=>this.viewport.syncScrollArea())), this.register(this.viewport), this.register(this.onCursorMove(()=>{
                            this._renderService.handleCursorMove(), this._syncTextArea();
                        })), this.register(this.onResize(()=>this._renderService.handleResize(this.cols, this.rows))), this.register(this.onBlur(()=>this._renderService.handleBlur())), this.register(this.onFocus(()=>this._renderService.handleFocus())), this.register(this._renderService.onDimensionsChange(()=>this.viewport.syncScrollArea())), this._selectionService = this.register(this._instantiationService.createInstance(h.SelectionService, this.element, this.screenElement, this.linkifier2)), this._instantiationService.setService(S.ISelectionService, this._selectionService), this.register(this._selectionService.onRequestScrollLines((e)=>this.scrollLines(e.amount, e.suppressScrollEvent))), this.register(this._selectionService.onSelectionChange(()=>this._onSelectionChange.fire())), this.register(this._selectionService.onRequestRedraw((e)=>this._renderService.handleSelectionChanged(e.start, e.end, e.columnSelectMode))), this.register(this._selectionService.onLinuxMouseSelection((e)=>{
                            this.textarea.value = e, this.textarea.focus(), this.textarea.select();
                        })), this.register(this._onScroll.event((e)=>{
                            this.viewport.syncScrollArea(), this._selectionService.refresh();
                        })), this.register((0, l.addDisposableDomListener)(this._viewportElement, "scroll", ()=>this._selectionService.refresh())), this.linkifier2.attachToDom(this.screenElement, this._mouseService, this._renderService), this.register(this._instantiationService.createInstance(R.BufferDecorationRenderer, this.screenElement)), this.register((0, l.addDisposableDomListener)(this.element, "mousedown", (e)=>this._selectionService.handleMouseDown(e))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager = new _.AccessibilityManager(this, this._renderService)), this.register(this.optionsService.onSpecificOptionChange("screenReaderMode", (e)=>this._handleScreenReaderModeOptionChange(e))), this.options.overviewRulerWidth && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(D.OverviewRulerRenderer, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRulerWidth", (e)=>{
                            !this._overviewRulerRenderer && e && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(D.OverviewRulerRenderer, this._viewportElement, this.screenElement)));
                        }), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
                    }
                    _createRenderer() {
                        return this._instantiationService.createInstance(u.DomRenderer, this.element, this.screenElement, this._viewportElement, this.linkifier2);
                    }
                    bindMouse() {
                        const e = this, t = this.element;
                        function i(t) {
                            const i = e._mouseService.getMouseReportCoords(t, e.screenElement);
                            if (!i) return !1;
                            let s, r;
                            switch(t.overrideType || t.type){
                                case "mousemove":
                                    r = 32, void 0 === t.buttons ? (s = 3, void 0 !== t.button && (s = t.button < 3 ? t.button : 3)) : s = 1 & t.buttons ? 0 : 4 & t.buttons ? 1 : 2 & t.buttons ? 2 : 3;
                                    break;
                                case "mouseup":
                                    r = 0, s = t.button < 3 ? t.button : 3;
                                    break;
                                case "mousedown":
                                    r = 1, s = t.button < 3 ? t.button : 3;
                                    break;
                                case "wheel":
                                    if (0 === e.viewport.getLinesScrolled(t)) return !1;
                                    r = t.deltaY < 0 ? 0 : 1, s = 4;
                                    break;
                                default:
                                    return !1;
                            }
                            return !(void 0 === r || void 0 === s || s > 4) && e.coreMouseService.triggerMouseEvent({
                                col: i.col,
                                row: i.row,
                                x: i.x,
                                y: i.y,
                                button: s,
                                action: r,
                                ctrl: t.ctrlKey,
                                alt: t.altKey,
                                shift: t.shiftKey
                            });
                        }
                        const s = {
                            mouseup: null,
                            wheel: null,
                            mousedrag: null,
                            mousemove: null
                        }, r = {
                            mouseup: (e)=>(i(e), e.buttons || (this._document.removeEventListener("mouseup", s.mouseup), s.mousedrag && this._document.removeEventListener("mousemove", s.mousedrag)), this.cancel(e)),
                            wheel: (e)=>(i(e), this.cancel(e, !0)),
                            mousedrag: (e)=>{
                                e.buttons && i(e);
                            },
                            mousemove: (e)=>{
                                e.buttons || i(e);
                            }
                        };
                        this.register(this.coreMouseService.onProtocolChange((e)=>{
                            e ? ("debug" === this.optionsService.rawOptions.logLevel && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(e)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), 8 & e ? s.mousemove || (t.addEventListener("mousemove", r.mousemove), s.mousemove = r.mousemove) : (t.removeEventListener("mousemove", s.mousemove), s.mousemove = null), 16 & e ? s.wheel || (t.addEventListener("wheel", r.wheel, {
                                passive: !1
                            }), s.wheel = r.wheel) : (t.removeEventListener("wheel", s.wheel), s.wheel = null), 2 & e ? s.mouseup || (s.mouseup = r.mouseup) : (this._document.removeEventListener("mouseup", s.mouseup), s.mouseup = null), 4 & e ? s.mousedrag || (s.mousedrag = r.mousedrag) : (this._document.removeEventListener("mousemove", s.mousedrag), s.mousedrag = null);
                        })), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this.register((0, l.addDisposableDomListener)(t, "mousedown", (e)=>{
                            if (e.preventDefault(), this.focus(), this.coreMouseService.areMouseEventsActive && !this._selectionService.shouldForceSelection(e)) return i(e), s.mouseup && this._document.addEventListener("mouseup", s.mouseup), s.mousedrag && this._document.addEventListener("mousemove", s.mousedrag), this.cancel(e);
                        })), this.register((0, l.addDisposableDomListener)(t, "wheel", (e)=>{
                            if (!s.wheel) {
                                if (!this.buffer.hasScrollback) {
                                    const t = this.viewport.getLinesScrolled(e);
                                    if (0 === t) return;
                                    const i = o.C0.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (e.deltaY < 0 ? "A" : "B");
                                    let s = "";
                                    for(let e = 0; e < Math.abs(t); e++)s += i;
                                    return this.coreService.triggerDataEvent(s, !0), this.cancel(e, !0);
                                }
                                return this.viewport.handleWheel(e) ? this.cancel(e) : void 0;
                            }
                        }, {
                            passive: !1
                        })), this.register((0, l.addDisposableDomListener)(t, "touchstart", (e)=>{
                            if (!this.coreMouseService.areMouseEventsActive) return this.viewport.handleTouchStart(e), this.cancel(e);
                        }, {
                            passive: !0
                        })), this.register((0, l.addDisposableDomListener)(t, "touchmove", (e)=>{
                            if (!this.coreMouseService.areMouseEventsActive) return this.viewport.handleTouchMove(e) ? void 0 : this.cancel(e);
                        }, {
                            passive: !1
                        }));
                    }
                    refresh(e, t) {
                        var i;
                        null === (i = this._renderService) || void 0 === i || i.refreshRows(e, t);
                    }
                    updateCursorStyle(e) {
                        var t;
                        (null === (t = this._selectionService) || void 0 === t ? void 0 : t.shouldColumnSelect(e)) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
                    }
                    _showCursor() {
                        this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = !0, this.refresh(this.buffer.y, this.buffer.y));
                    }
                    scrollLines(e, t, i = 0) {
                        super.scrollLines(e, t, i), this.refresh(0, this.rows - 1);
                    }
                    paste(e) {
                        (0, n.paste)(e, this.textarea, this.coreService);
                    }
                    attachCustomKeyEventHandler(e) {
                        this._customKeyEventHandler = e;
                    }
                    registerLinkProvider(e) {
                        return this.linkifier2.registerLinkProvider(e);
                    }
                    registerCharacterJoiner(e) {
                        if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
                        const t = this._characterJoinerService.register(e);
                        return this.refresh(0, this.rows - 1), t;
                    }
                    deregisterCharacterJoiner(e) {
                        if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
                        this._characterJoinerService.deregister(e) && this.refresh(0, this.rows - 1);
                    }
                    get markers() {
                        return this.buffer.markers;
                    }
                    addMarker(e) {
                        return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e);
                    }
                    registerDecoration(e) {
                        return this._decorationService.registerDecoration(e);
                    }
                    hasSelection() {
                        return !!this._selectionService && this._selectionService.hasSelection;
                    }
                    select(e, t, i) {
                        this._selectionService.setSelection(e, t, i);
                    }
                    getSelection() {
                        return this._selectionService ? this._selectionService.selectionText : "";
                    }
                    getSelectionPosition() {
                        if (this._selectionService && this._selectionService.hasSelection) return {
                            start: {
                                x: this._selectionService.selectionStart[0],
                                y: this._selectionService.selectionStart[1]
                            },
                            end: {
                                x: this._selectionService.selectionEnd[0],
                                y: this._selectionService.selectionEnd[1]
                            }
                        };
                    }
                    clearSelection() {
                        var e;
                        null === (e = this._selectionService) || void 0 === e || e.clearSelection();
                    }
                    selectAll() {
                        var e;
                        null === (e = this._selectionService) || void 0 === e || e.selectAll();
                    }
                    selectLines(e, t) {
                        var i;
                        null === (i = this._selectionService) || void 0 === i || i.selectLines(e, t);
                    }
                    _keyDown(e) {
                        if (this._keyDownHandled = !1, this._keyDownSeen = !0, this._customKeyEventHandler && !1 === this._customKeyEventHandler(e)) return !1;
                        const t = this.browser.isMac && this.options.macOptionIsMeta && e.altKey;
                        if (!t && !this._compositionHelper.keydown(e)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this._bufferService.scrollToBottom(), !1;
                        t || "Dead" !== e.key && "AltGraph" !== e.key || (this._unprocessedDeadKey = !0);
                        const i = (0, f.evaluateKeyboardEvent)(e, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
                        if (this.updateCursorStyle(e), 3 === i.type || 2 === i.type) {
                            const t = this.rows - 1;
                            return this.scrollLines(2 === i.type ? -t : t), this.cancel(e, !0);
                        }
                        return 1 === i.type && this.selectAll(), !!this._isThirdLevelShift(this.browser, e) || (i.cancel && this.cancel(e, !0), !i.key || !!(e.key && !e.ctrlKey && !e.altKey && !e.metaKey && 1 === e.key.length && e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90) || (this._unprocessedDeadKey ? (this._unprocessedDeadKey = !1, !0) : (i.key !== o.C0.ETX && i.key !== o.C0.CR || (this.textarea.value = ""), this._onKey.fire({
                            key: i.key,
                            domEvent: e
                        }), this._showCursor(), this.coreService.triggerDataEvent(i.key, !0), !this.optionsService.rawOptions.screenReaderMode || e.altKey || e.ctrlKey ? this.cancel(e, !0) : void (this._keyDownHandled = !0))));
                    }
                    _isThirdLevelShift(e, t) {
                        const i = e.isMac && !this.options.macOptionIsMeta && t.altKey && !t.ctrlKey && !t.metaKey || e.isWindows && t.altKey && t.ctrlKey && !t.metaKey || e.isWindows && t.getModifierState("AltGraph");
                        return "keypress" === t.type ? i : i && (!t.keyCode || t.keyCode > 47);
                    }
                    _keyUp(e) {
                        this._keyDownSeen = !1, this._customKeyEventHandler && !1 === this._customKeyEventHandler(e) || (function(e) {
                            return 16 === e.keyCode || 17 === e.keyCode || 18 === e.keyCode;
                        }(e) || this.focus(), this.updateCursorStyle(e), this._keyPressHandled = !1);
                    }
                    _keyPress(e) {
                        let t;
                        if (this._keyPressHandled = !1, this._keyDownHandled) return !1;
                        if (this._customKeyEventHandler && !1 === this._customKeyEventHandler(e)) return !1;
                        if (this.cancel(e), e.charCode) t = e.charCode;
                        else if (null === e.which || void 0 === e.which) t = e.keyCode;
                        else {
                            if (0 === e.which || 0 === e.charCode) return !1;
                            t = e.which;
                        }
                        return !(!t || (e.altKey || e.ctrlKey || e.metaKey) && !this._isThirdLevelShift(this.browser, e) || (t = String.fromCharCode(t), this._onKey.fire({
                            key: t,
                            domEvent: e
                        }), this._showCursor(), this.coreService.triggerDataEvent(t, !0), this._keyPressHandled = !0, this._unprocessedDeadKey = !1, 0));
                    }
                    _inputEvent(e) {
                        if (e.data && "insertText" === e.inputType && (!e.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
                            if (this._keyPressHandled) return !1;
                            this._unprocessedDeadKey = !1;
                            const t = e.data;
                            return this.coreService.triggerDataEvent(t, !0), this.cancel(e), !0;
                        }
                        return !1;
                    }
                    resize(e, t) {
                        e !== this.cols || t !== this.rows ? super.resize(e, t) : this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
                    }
                    _afterResize(e, t) {
                        var i, s;
                        null === (i = this._charSizeService) || void 0 === i || i.measure(), null === (s = this.viewport) || void 0 === s || s.syncScrollArea(!0);
                    }
                    clear() {
                        if (0 !== this.buffer.ybase || 0 !== this.buffer.y) {
                            this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
                            for(let e = 1; e < this.rows; e++)this.buffer.lines.push(this.buffer.getBlankLine(g.DEFAULT_ATTR_DATA));
                            this.refresh(0, this.rows - 1), this._onScroll.fire({
                                position: this.buffer.ydisp,
                                source: 0
                            });
                        }
                    }
                    reset() {
                        var e, t;
                        this.options.rows = this.rows, this.options.cols = this.cols;
                        const i = this._customKeyEventHandler;
                        this._setup(), super.reset(), null === (e = this._selectionService) || void 0 === e || e.reset(), this._decorationService.reset(), this._customKeyEventHandler = i, this.refresh(0, this.rows - 1), null === (t = this.viewport) || void 0 === t || t.syncScrollArea();
                    }
                    clearTextureAtlas() {
                        var e;
                        null === (e = this._renderService) || void 0 === e || e.clearTextureAtlas();
                    }
                    _reportFocus() {
                        var e;
                        (null === (e = this.element) || void 0 === e ? void 0 : e.classList.contains("focus")) ? this.coreService.triggerDataEvent(o.C0.ESC + "[I") : this.coreService.triggerDataEvent(o.C0.ESC + "[O");
                    }
                    _reportWindowsOptions(e) {
                        if (this._renderService) switch(e){
                            case a.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
                                const e1 = this._renderService.dimensions.css.canvas.width.toFixed(0), t = this._renderService.dimensions.css.canvas.height.toFixed(0);
                                this.coreService.triggerDataEvent(`${o.C0.ESC}[4;${t};${e1}t`);
                                break;
                            case a.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
                                const i = this._renderService.dimensions.css.cell.width.toFixed(0), s = this._renderService.dimensions.css.cell.height.toFixed(0);
                                this.coreService.triggerDataEvent(`${o.C0.ESC}[6;${s};${i}t`);
                        }
                    }
                    cancel(e, t) {
                        if (this.options.cancelEvents || t) return e.preventDefault(), e.stopPropagation(), !1;
                    }
                }
                t.Terminal = I;
            },
            9924: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.TimeBasedDebouncer = void 0, t.TimeBasedDebouncer = class {
                    constructor(e, t = 1e3){
                        this._renderCallback = e, this._debounceThresholdMS = t, this._lastRefreshMs = 0, this._additionalRefreshRequested = !1;
                    }
                    dispose() {
                        this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
                    }
                    refresh(e, t, i) {
                        this._rowCount = i, e = void 0 !== e ? e : 0, t = void 0 !== t ? t : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e) : e, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t) : t;
                        const s = Date.now();
                        if (s - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = s, this._innerRefresh();
                        else if (!this._additionalRefreshRequested) {
                            const e = s - this._lastRefreshMs, t = this._debounceThresholdMS - e;
                            this._additionalRefreshRequested = !0, this._refreshTimeoutID = window.setTimeout(()=>{
                                this._lastRefreshMs = Date.now(), this._innerRefresh(), this._additionalRefreshRequested = !1, this._refreshTimeoutID = void 0;
                            }, t);
                        }
                    }
                    _innerRefresh() {
                        if (void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount) return;
                        const e = Math.max(this._rowStart, 0), t = Math.min(this._rowEnd, this._rowCount - 1);
                        this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e, t);
                    }
                };
            },
            1680: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Viewport = void 0;
                const n = i(844), o = i(3656), a = i(4725), h = i(2585);
                let c = class extends n.Disposable {
                    constructor(e, t, i, s, r, n, a, h, c){
                        super(), this._scrollLines = e, this._viewportElement = t, this._scrollArea = i, this._bufferService = s, this._optionsService = r, this._charSizeService = n, this._renderService = a, this._coreBrowserService = h, this.scrollBarWidth = 0, this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._wheelPartialScroll = 0, this._refreshAnimationFrame = null, this._ignoreNextScrollEvent = !1, this._smoothScrollState = {
                            startTime: 0,
                            origin: -1,
                            target: -1
                        }, this.scrollBarWidth = this._viewportElement.offsetWidth - this._scrollArea.offsetWidth || 15, this.register((0, o.addDisposableDomListener)(this._viewportElement, "scroll", this._handleScroll.bind(this))), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((e)=>this._activeBuffer = e.activeBuffer)), this._renderDimensions = this._renderService.dimensions, this.register(this._renderService.onDimensionsChange((e)=>this._renderDimensions = e)), this._handleThemeChange(c.colors), this.register(c.onChangeColors((e)=>this._handleThemeChange(e))), this.register(this._optionsService.onSpecificOptionChange("scrollback", ()=>this.syncScrollArea())), setTimeout(()=>this.syncScrollArea(), 0);
                    }
                    _handleThemeChange(e) {
                        this._viewportElement.style.backgroundColor = e.background.css;
                    }
                    _refresh(e) {
                        if (e) return this._innerRefresh(), void (null !== this._refreshAnimationFrame && this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));
                        null === this._refreshAnimationFrame && (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(()=>this._innerRefresh()));
                    }
                    _innerRefresh() {
                        if (this._charSizeService.height > 0) {
                            this._currentRowHeight = this._renderService.dimensions.device.cell.height / this._coreBrowserService.dpr, this._currentDeviceCellHeight = this._renderService.dimensions.device.cell.height, this._lastRecordedViewportHeight = this._viewportElement.offsetHeight;
                            const e = Math.round(this._currentRowHeight * this._lastRecordedBufferLength) + (this._lastRecordedViewportHeight - this._renderService.dimensions.css.canvas.height);
                            this._lastRecordedBufferHeight !== e && (this._lastRecordedBufferHeight = e, this._scrollArea.style.height = this._lastRecordedBufferHeight + "px");
                        }
                        const e = this._bufferService.buffer.ydisp * this._currentRowHeight;
                        this._viewportElement.scrollTop !== e && (this._ignoreNextScrollEvent = !0, this._viewportElement.scrollTop = e), this._refreshAnimationFrame = null;
                    }
                    syncScrollArea(e = !1) {
                        if (this._lastRecordedBufferLength !== this._bufferService.buffer.lines.length) return this._lastRecordedBufferLength = this._bufferService.buffer.lines.length, void this._refresh(e);
                        this._lastRecordedViewportHeight === this._renderService.dimensions.css.canvas.height && this._lastScrollTop === this._activeBuffer.ydisp * this._currentRowHeight && this._renderDimensions.device.cell.height === this._currentDeviceCellHeight || this._refresh(e);
                    }
                    _handleScroll(e) {
                        if (this._lastScrollTop = this._viewportElement.scrollTop, !this._viewportElement.offsetParent) return;
                        if (this._ignoreNextScrollEvent) return this._ignoreNextScrollEvent = !1, void this._scrollLines(0);
                        const t = Math.round(this._lastScrollTop / this._currentRowHeight) - this._bufferService.buffer.ydisp;
                        this._scrollLines(t);
                    }
                    _smoothScroll() {
                        if (this._isDisposed || -1 === this._smoothScrollState.origin || -1 === this._smoothScrollState.target) return;
                        const e = this._smoothScrollPercent();
                        this._viewportElement.scrollTop = this._smoothScrollState.origin + Math.round(e * (this._smoothScrollState.target - this._smoothScrollState.origin)), e < 1 ? this._coreBrowserService.window.requestAnimationFrame(()=>this._smoothScroll()) : this._clearSmoothScrollState();
                    }
                    _smoothScrollPercent() {
                        return this._optionsService.rawOptions.smoothScrollDuration && this._smoothScrollState.startTime ? Math.max(Math.min((Date.now() - this._smoothScrollState.startTime) / this._optionsService.rawOptions.smoothScrollDuration, 1), 0) : 1;
                    }
                    _clearSmoothScrollState() {
                        this._smoothScrollState.startTime = 0, this._smoothScrollState.origin = -1, this._smoothScrollState.target = -1;
                    }
                    _bubbleScroll(e, t) {
                        const i = this._viewportElement.scrollTop + this._lastRecordedViewportHeight;
                        return !(t < 0 && 0 !== this._viewportElement.scrollTop || t > 0 && i < this._lastRecordedBufferHeight) || (e.cancelable && e.preventDefault(), !1);
                    }
                    handleWheel(e) {
                        const t = this._getPixelsScrolled(e);
                        return 0 !== t && (this._optionsService.rawOptions.smoothScrollDuration ? (this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, -1 === this._smoothScrollState.target ? this._smoothScrollState.target = this._viewportElement.scrollTop + t : this._smoothScrollState.target += t, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState()) : this._viewportElement.scrollTop += t, this._bubbleScroll(e, t));
                    }
                    _getPixelsScrolled(e) {
                        if (0 === e.deltaY || e.shiftKey) return 0;
                        let t = this._applyScrollModifier(e.deltaY, e);
                        return e.deltaMode === WheelEvent.DOM_DELTA_LINE ? t *= this._currentRowHeight : e.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t *= this._currentRowHeight * this._bufferService.rows), t;
                    }
                    getLinesScrolled(e) {
                        if (0 === e.deltaY || e.shiftKey) return 0;
                        let t = this._applyScrollModifier(e.deltaY, e);
                        return e.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (t /= this._currentRowHeight + 0, this._wheelPartialScroll += t, t = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t *= this._bufferService.rows), t;
                    }
                    _applyScrollModifier(e, t) {
                        const i = this._optionsService.rawOptions.fastScrollModifier;
                        return "alt" === i && t.altKey || "ctrl" === i && t.ctrlKey || "shift" === i && t.shiftKey ? e * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e * this._optionsService.rawOptions.scrollSensitivity;
                    }
                    handleTouchStart(e) {
                        this._lastTouchY = e.touches[0].pageY;
                    }
                    handleTouchMove(e) {
                        const t = this._lastTouchY - e.touches[0].pageY;
                        return this._lastTouchY = e.touches[0].pageY, 0 !== t && (this._viewportElement.scrollTop += t, this._bubbleScroll(e, t));
                    }
                };
                c = s([
                    r(3, h.IBufferService),
                    r(4, h.IOptionsService),
                    r(5, a.ICharSizeService),
                    r(6, a.IRenderService),
                    r(7, a.ICoreBrowserService),
                    r(8, a.IThemeService)
                ], c), t.Viewport = c;
            },
            3107: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.BufferDecorationRenderer = void 0;
                const n = i(3656), o = i(4725), a = i(844), h = i(2585);
                let c = class extends a.Disposable {
                    constructor(e, t, i, s){
                        super(), this._screenElement = e, this._bufferService = t, this._decorationService = i, this._renderService = s, this._decorationElements = new Map, this._altBufferIsActive = !1, this._dimensionsChanged = !1, this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this.register(this._renderService.onRenderedViewportChange(()=>this._doRefreshDecorations())), this.register(this._renderService.onDimensionsChange(()=>{
                            this._dimensionsChanged = !0, this._queueRefresh();
                        })), this.register((0, n.addDisposableDomListener)(window, "resize", ()=>this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(()=>{
                            this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
                        })), this.register(this._decorationService.onDecorationRegistered(()=>this._queueRefresh())), this.register(this._decorationService.onDecorationRemoved((e)=>this._removeDecoration(e))), this.register((0, a.toDisposable)(()=>{
                            this._container.remove(), this._decorationElements.clear();
                        }));
                    }
                    _queueRefresh() {
                        void 0 === this._animationFrame && (this._animationFrame = this._renderService.addRefreshCallback(()=>{
                            this._doRefreshDecorations(), this._animationFrame = void 0;
                        }));
                    }
                    _doRefreshDecorations() {
                        for (const e of this._decorationService.decorations)this._renderDecoration(e);
                        this._dimensionsChanged = !1;
                    }
                    _renderDecoration(e) {
                        this._refreshStyle(e), this._dimensionsChanged && this._refreshXPosition(e);
                    }
                    _createElement(e) {
                        var t;
                        const i = document.createElement("div");
                        i.classList.add("xterm-decoration"), i.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, i.style.height = (e.options.height || 1) * this._renderService.dimensions.css.cell.height + "px", i.style.top = (e.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height + "px", i.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
                        const s = null !== (t = e.options.x) && void 0 !== t ? t : 0;
                        return s && s > this._bufferService.cols && (i.style.display = "none"), this._refreshXPosition(e, i), i;
                    }
                    _refreshStyle(e) {
                        const t = e.marker.line - this._bufferService.buffers.active.ydisp;
                        if (t < 0 || t >= this._bufferService.rows) e.element && (e.element.style.display = "none", e.onRenderEmitter.fire(e.element));
                        else {
                            let i = this._decorationElements.get(e);
                            i || (i = this._createElement(e), e.element = i, this._decorationElements.set(e, i), this._container.appendChild(i)), i.style.top = t * this._renderService.dimensions.css.cell.height + "px", i.style.display = this._altBufferIsActive ? "none" : "block", e.onRenderEmitter.fire(i);
                        }
                    }
                    _refreshXPosition(e, t = e.element) {
                        var i;
                        if (!t) return;
                        const s = null !== (i = e.options.x) && void 0 !== i ? i : 0;
                        "right" === (e.options.anchor || "left") ? t.style.right = s ? s * this._renderService.dimensions.css.cell.width + "px" : "" : t.style.left = s ? s * this._renderService.dimensions.css.cell.width + "px" : "";
                    }
                    _removeDecoration(e) {
                        var t;
                        null === (t = this._decorationElements.get(e)) || void 0 === t || t.remove(), this._decorationElements.delete(e), e.dispose();
                    }
                };
                c = s([
                    r(1, h.IBufferService),
                    r(2, h.IDecorationService),
                    r(3, o.IRenderService)
                ], c), t.BufferDecorationRenderer = c;
            },
            5871: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ColorZoneStore = void 0, t.ColorZoneStore = class {
                    constructor(){
                        this._zones = [], this._zonePool = [], this._zonePoolIndex = 0, this._linePadding = {
                            full: 0,
                            left: 0,
                            center: 0,
                            right: 0
                        };
                    }
                    get zones() {
                        return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
                    }
                    clear() {
                        this._zones.length = 0, this._zonePoolIndex = 0;
                    }
                    addDecoration(e) {
                        if (e.options.overviewRulerOptions) {
                            for (const t of this._zones)if (t.color === e.options.overviewRulerOptions.color && t.position === e.options.overviewRulerOptions.position) {
                                if (this._lineIntersectsZone(t, e.marker.line)) return;
                                if (this._lineAdjacentToZone(t, e.marker.line, e.options.overviewRulerOptions.position)) return void this._addLineToZone(t, e.marker.line);
                            }
                            if (this._zonePoolIndex < this._zonePool.length) return this._zonePool[this._zonePoolIndex].color = e.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = e.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = e.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = e.marker.line, void this._zones.push(this._zonePool[this._zonePoolIndex++]);
                            this._zones.push({
                                color: e.options.overviewRulerOptions.color,
                                position: e.options.overviewRulerOptions.position,
                                startBufferLine: e.marker.line,
                                endBufferLine: e.marker.line
                            }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
                        }
                    }
                    setPadding(e) {
                        this._linePadding = e;
                    }
                    _lineIntersectsZone(e, t) {
                        return t >= e.startBufferLine && t <= e.endBufferLine;
                    }
                    _lineAdjacentToZone(e, t, i) {
                        return t >= e.startBufferLine - this._linePadding[i || "full"] && t <= e.endBufferLine + this._linePadding[i || "full"];
                    }
                    _addLineToZone(e, t) {
                        e.startBufferLine = Math.min(e.startBufferLine, t), e.endBufferLine = Math.max(e.endBufferLine, t);
                    }
                };
            },
            5744: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.OverviewRulerRenderer = void 0;
                const n = i(5871), o = i(3656), a = i(4725), h = i(844), c = i(2585), l = {
                    full: 0,
                    left: 0,
                    center: 0,
                    right: 0
                }, d = {
                    full: 0,
                    left: 0,
                    center: 0,
                    right: 0
                }, _ = {
                    full: 0,
                    left: 0,
                    center: 0,
                    right: 0
                };
                let u = class extends h.Disposable {
                    constructor(e, t, i, s, r, o, a){
                        var c;
                        super(), this._viewportElement = e, this._screenElement = t, this._bufferService = i, this._decorationService = s, this._renderService = r, this._optionsService = o, this._coreBrowseService = a, this._colorZoneStore = new n.ColorZoneStore, this._shouldUpdateDimensions = !0, this._shouldUpdateAnchor = !0, this._lastKnownBufferLength = 0, this._canvas = document.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), null === (c = this._viewportElement.parentElement) || void 0 === c || c.insertBefore(this._canvas, this._viewportElement);
                        const l = this._canvas.getContext("2d");
                        if (!l) throw new Error("Ctx cannot be null");
                        this._ctx = l, this._registerDecorationListeners(), this._registerBufferChangeListeners(), this._registerDimensionChangeListeners(), this.register((0, h.toDisposable)(()=>{
                            var e;
                            null === (e = this._canvas) || void 0 === e || e.remove();
                        }));
                    }
                    get _width() {
                        return this._optionsService.options.overviewRulerWidth || 0;
                    }
                    _registerDecorationListeners() {
                        this.register(this._decorationService.onDecorationRegistered(()=>this._queueRefresh(void 0, !0))), this.register(this._decorationService.onDecorationRemoved(()=>this._queueRefresh(void 0, !0)));
                    }
                    _registerBufferChangeListeners() {
                        this.register(this._renderService.onRenderedViewportChange(()=>this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(()=>{
                            this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
                        })), this.register(this._bufferService.onScroll(()=>{
                            this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
                        }));
                    }
                    _registerDimensionChangeListeners() {
                        this.register(this._renderService.onRender(()=>{
                            this._containerHeight && this._containerHeight === this._screenElement.clientHeight || (this._queueRefresh(!0), this._containerHeight = this._screenElement.clientHeight);
                        })), this.register(this._optionsService.onSpecificOptionChange("overviewRulerWidth", ()=>this._queueRefresh(!0))), this.register((0, o.addDisposableDomListener)(this._coreBrowseService.window, "resize", ()=>this._queueRefresh(!0))), this._queueRefresh(!0);
                    }
                    _refreshDrawConstants() {
                        const e = Math.floor(this._canvas.width / 3), t = Math.ceil(this._canvas.width / 3);
                        d.full = this._canvas.width, d.left = e, d.center = t, d.right = e, this._refreshDrawHeightConstants(), _.full = 0, _.left = 0, _.center = d.left, _.right = d.left + d.center;
                    }
                    _refreshDrawHeightConstants() {
                        l.full = Math.round(2 * this._coreBrowseService.dpr);
                        const e = this._canvas.height / this._bufferService.buffer.lines.length, t = Math.round(Math.max(Math.min(e, 12), 6) * this._coreBrowseService.dpr);
                        l.left = t, l.center = t, l.right = t;
                    }
                    _refreshColorZonePadding() {
                        this._colorZoneStore.setPadding({
                            full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.full),
                            left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.left),
                            center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.center),
                            right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.right)
                        }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
                    }
                    _refreshCanvasDimensions() {
                        this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowseService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowseService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
                    }
                    _refreshDecorations() {
                        this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
                        for (const e of this._decorationService.decorations)this._colorZoneStore.addDecoration(e);
                        this._ctx.lineWidth = 1;
                        const e = this._colorZoneStore.zones;
                        for (const t of e)"full" !== t.position && this._renderColorZone(t);
                        for (const t of e)"full" === t.position && this._renderColorZone(t);
                        this._shouldUpdateDimensions = !1, this._shouldUpdateAnchor = !1;
                    }
                    _renderColorZone(e) {
                        this._ctx.fillStyle = e.color, this._ctx.fillRect(_[e.position || "full"], Math.round((this._canvas.height - 1) * (e.startBufferLine / this._bufferService.buffers.active.lines.length) - l[e.position || "full"] / 2), d[e.position || "full"], Math.round((this._canvas.height - 1) * ((e.endBufferLine - e.startBufferLine) / this._bufferService.buffers.active.lines.length) + l[e.position || "full"]));
                    }
                    _queueRefresh(e, t) {
                        this._shouldUpdateDimensions = e || this._shouldUpdateDimensions, this._shouldUpdateAnchor = t || this._shouldUpdateAnchor, void 0 === this._animationFrame && (this._animationFrame = this._coreBrowseService.window.requestAnimationFrame(()=>{
                            this._refreshDecorations(), this._animationFrame = void 0;
                        }));
                    }
                };
                u = s([
                    r(2, c.IBufferService),
                    r(3, c.IDecorationService),
                    r(4, a.IRenderService),
                    r(5, c.IOptionsService),
                    r(6, a.ICoreBrowserService)
                ], u), t.OverviewRulerRenderer = u;
            },
            2950: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.CompositionHelper = void 0;
                const n = i(4725), o = i(2585), a = i(2584);
                let h = class {
                    constructor(e, t, i, s, r, n){
                        this._textarea = e, this._compositionView = t, this._bufferService = i, this._optionsService = s, this._coreService = r, this._renderService = n, this._isComposing = !1, this._isSendingComposition = !1, this._compositionPosition = {
                            start: 0,
                            end: 0
                        }, this._dataAlreadySent = "";
                    }
                    get isComposing() {
                        return this._isComposing;
                    }
                    compositionstart() {
                        this._isComposing = !0, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
                    }
                    compositionupdate(e) {
                        this._compositionView.textContent = e.data, this.updateCompositionElements(), setTimeout(()=>{
                            this._compositionPosition.end = this._textarea.value.length;
                        }, 0);
                    }
                    compositionend() {
                        this._finalizeComposition(!0);
                    }
                    keydown(e) {
                        if (this._isComposing || this._isSendingComposition) {
                            if (229 === e.keyCode) return !1;
                            if (16 === e.keyCode || 17 === e.keyCode || 18 === e.keyCode) return !1;
                            this._finalizeComposition(!1);
                        }
                        return 229 !== e.keyCode || (this._handleAnyTextareaChanges(), !1);
                    }
                    _finalizeComposition(e) {
                        if (this._compositionView.classList.remove("active"), this._isComposing = !1, e) {
                            const e = {
                                start: this._compositionPosition.start,
                                end: this._compositionPosition.end
                            };
                            this._isSendingComposition = !0, setTimeout(()=>{
                                if (this._isSendingComposition) {
                                    let t;
                                    this._isSendingComposition = !1, e.start += this._dataAlreadySent.length, t = this._isComposing ? this._textarea.value.substring(e.start, e.end) : this._textarea.value.substring(e.start), t.length > 0 && this._coreService.triggerDataEvent(t, !0);
                                }
                            }, 0);
                        } else {
                            this._isSendingComposition = !1;
                            const e = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
                            this._coreService.triggerDataEvent(e, !0);
                        }
                    }
                    _handleAnyTextareaChanges() {
                        const e = this._textarea.value;
                        setTimeout(()=>{
                            if (!this._isComposing) {
                                const t = this._textarea.value, i = t.replace(e, "");
                                this._dataAlreadySent = i, t.length > e.length ? this._coreService.triggerDataEvent(i, !0) : t.length < e.length ? this._coreService.triggerDataEvent(`${a.C0.DEL}`, !0) : t.length === e.length && t !== e && this._coreService.triggerDataEvent(t, !0);
                            }
                        }, 0);
                    }
                    updateCompositionElements(e) {
                        if (this._isComposing) {
                            if (this._bufferService.buffer.isCursorInViewport) {
                                const e = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), t = this._renderService.dimensions.css.cell.height, i = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, s = e * this._renderService.dimensions.css.cell.width;
                                this._compositionView.style.left = s + "px", this._compositionView.style.top = i + "px", this._compositionView.style.height = t + "px", this._compositionView.style.lineHeight = t + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
                                const r = this._compositionView.getBoundingClientRect();
                                this._textarea.style.left = s + "px", this._textarea.style.top = i + "px", this._textarea.style.width = Math.max(r.width, 1) + "px", this._textarea.style.height = Math.max(r.height, 1) + "px", this._textarea.style.lineHeight = r.height + "px";
                            }
                            e || setTimeout(()=>this.updateCompositionElements(!0), 0);
                        }
                    }
                };
                h = s([
                    r(2, o.IBufferService),
                    r(3, o.IOptionsService),
                    r(4, o.ICoreService),
                    r(5, n.IRenderService)
                ], h), t.CompositionHelper = h;
            },
            9806: (e, t)=>{
                function i(e, t, i) {
                    const s = i.getBoundingClientRect(), r = e.getComputedStyle(i), n = parseInt(r.getPropertyValue("padding-left")), o = parseInt(r.getPropertyValue("padding-top"));
                    return [
                        t.clientX - s.left - n,
                        t.clientY - s.top - o
                    ];
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.getCoords = t.getCoordsRelativeToElement = void 0, t.getCoordsRelativeToElement = i, t.getCoords = function(e, t, s, r, n, o, a, h, c) {
                    if (!o) return;
                    const l = i(e, t, s);
                    return l ? (l[0] = Math.ceil((l[0] + (c ? a / 2 : 0)) / a), l[1] = Math.ceil(l[1] / h), l[0] = Math.min(Math.max(l[0], 1), r + (c ? 1 : 0)), l[1] = Math.min(Math.max(l[1], 1), n), l) : void 0;
                };
            },
            9504: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.moveToCellSequence = void 0;
                const s = i(2584);
                function r(e, t, i, s) {
                    const r = e - n(e, i), a = t - n(t, i), l = Math.abs(r - a) - function(e, t, i) {
                        let s = 0;
                        const r = e - n(e, i), a = t - n(t, i);
                        for(let n = 0; n < Math.abs(r - a); n++){
                            const a = "A" === o(e, t) ? -1 : 1, h = i.buffer.lines.get(r + a * n);
                            (null == h ? void 0 : h.isWrapped) && s++;
                        }
                        return s;
                    }(e, t, i);
                    return c(l, h(o(e, t), s));
                }
                function n(e, t) {
                    let i = 0, s = t.buffer.lines.get(e), r = null == s ? void 0 : s.isWrapped;
                    for(; r && e >= 0 && e < t.rows;)i++, s = t.buffer.lines.get(--e), r = null == s ? void 0 : s.isWrapped;
                    return i;
                }
                function o(e, t) {
                    return e > t ? "A" : "B";
                }
                function a(e, t, i, s, r, n) {
                    let o = e, a = t, h = "";
                    for(; o !== i || a !== s;)o += r ? 1 : -1, r && o > n.cols - 1 ? (h += n.buffer.translateBufferLineToString(a, !1, e, o), o = 0, e = 0, a++) : !r && o < 0 && (h += n.buffer.translateBufferLineToString(a, !1, 0, e + 1), o = n.cols - 1, e = o, a--);
                    return h + n.buffer.translateBufferLineToString(a, !1, e, o);
                }
                function h(e, t) {
                    const i = t ? "O" : "[";
                    return s.C0.ESC + i + e;
                }
                function c(e, t) {
                    e = Math.floor(e);
                    let i = "";
                    for(let s = 0; s < e; s++)i += t;
                    return i;
                }
                t.moveToCellSequence = function(e, t, i, s) {
                    const o = i.buffer.x, l = i.buffer.y;
                    if (!i.buffer.hasScrollback) return function(e, t, i, s, o, l) {
                        return 0 === r(t, s, o, l).length ? "" : c(a(e, t, e, t - n(t, o), !1, o).length, h("D", l));
                    }(o, l, 0, t, i, s) + r(l, t, i, s) + function(e, t, i, s, o, l) {
                        let d;
                        d = r(t, s, o, l).length > 0 ? s - n(s, o) : t;
                        const _ = s, u = function(e, t, i, s, o, a) {
                            let h;
                            return h = r(i, s, o, a).length > 0 ? s - n(s, o) : t, e < i && h <= s || e >= i && h < s ? "C" : "D";
                        }(e, t, i, s, o, l);
                        return c(a(e, d, i, _, "C" === u, o).length, h(u, l));
                    }(o, l, e, t, i, s);
                    let d;
                    if (l === t) return d = o > e ? "D" : "C", c(Math.abs(o - e), h(d, s));
                    d = l > t ? "D" : "C";
                    const _ = Math.abs(l - t);
                    return c(function(e, t) {
                        return t.cols - e;
                    }(l > t ? e : o, i) + (_ - 1) * i.cols + 1 + ((l > t ? o : e) - 1), h(d, s));
                };
            },
            1296: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.DomRenderer = void 0;
                const n = i(9631), o = i(3787), a = i(2223), h = i(6171), c = i(4725), l = i(8055), d = i(8460), _ = i(844), u = i(2585), f = "xterm-dom-renderer-owner-", v = "xterm-focus";
                let g = 1, p = class extends _.Disposable {
                    constructor(e, t, i, s, r, a, c, l, u, v){
                        super(), this._element = e, this._screenElement = t, this._viewportElement = i, this._linkifier2 = s, this._charSizeService = a, this._optionsService = c, this._bufferService = l, this._coreBrowserService = u, this._terminalClass = g++, this._rowElements = [], this._cellToRowElements = [], this.onRequestRedraw = this.register(new d.EventEmitter).event, this._rowContainer = document.createElement("div"), this._rowContainer.classList.add("xterm-rows"), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = document.createElement("div"), this._selectionContainer.classList.add("xterm-selection"), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = (0, h.createRenderDimensions)(), this._updateDimensions(), this.register(this._optionsService.onOptionChange(()=>this._handleOptionsChanged())), this.register(v.onChangeColors((e)=>this._injectCss(e))), this._injectCss(v.colors), this._rowFactory = r.createInstance(o.DomRendererRowFactory, document), this._element.classList.add(f + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this.register(this._linkifier2.onShowLinkUnderline((e)=>this._handleLinkHover(e))), this.register(this._linkifier2.onHideLinkUnderline((e)=>this._handleLinkLeave(e))), this.register((0, _.toDisposable)(()=>{
                            this._element.classList.remove(f + this._terminalClass), (0, n.removeElementFromParent)(this._rowContainer, this._selectionContainer, this._themeStyleElement, this._dimensionsStyleElement);
                        }));
                    }
                    _updateDimensions() {
                        const e = this._coreBrowserService.dpr;
                        this.dimensions.device.char.width = this._charSizeService.width * e, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
                        for (const e of this._rowElements)e.style.width = `${this.dimensions.css.canvas.width}px`, e.style.height = `${this.dimensions.css.cell.height}px`, e.style.lineHeight = `${this.dimensions.css.cell.height}px`, e.style.overflow = "hidden";
                        this._dimensionsStyleElement || (this._dimensionsStyleElement = document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
                        const t = `${this._terminalSelector} .xterm-rows span { display: inline-block; height: 100%; vertical-align: top; width: ${this.dimensions.css.cell.width}px}`;
                        this._dimensionsStyleElement.textContent = t, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
                    }
                    _injectCss(e) {
                        this._themeStyleElement || (this._themeStyleElement = document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
                        let t = `${this._terminalSelector} .xterm-rows { color: ${e.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px;}`;
                        t += `${this._terminalSelector} span:not(.${o.BOLD_CLASS}) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.${o.BOLD_CLASS} { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.${o.ITALIC_CLASS} { font-style: italic;}`, t += "@keyframes blink_box_shadow_" + this._terminalClass + " { 50% {  box-shadow: none; }}", t += "@keyframes blink_block_" + this._terminalClass + " { 0% {" + `  background-color: ${e.cursor.css};` + `  color: ${e.cursorAccent.css}; } 50% {` + `  background-color: ${e.cursorAccent.css};` + `  color: ${e.cursor.css}; }}`, t += `${this._terminalSelector} .xterm-rows:not(.xterm-focus) .${o.CURSOR_CLASS}.${o.CURSOR_STYLE_BLOCK_CLASS} { outline: 1px solid ${e.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .xterm-rows.xterm-focus .${o.CURSOR_CLASS}.${o.CURSOR_BLINK_CLASS}:not(.${o.CURSOR_STYLE_BLOCK_CLASS}) { animation: blink_box_shadow_` + this._terminalClass + " 1s step-end infinite;}" + `${this._terminalSelector} .xterm-rows.xterm-focus .${o.CURSOR_CLASS}.${o.CURSOR_BLINK_CLASS}.${o.CURSOR_STYLE_BLOCK_CLASS} { animation: blink_block_` + this._terminalClass + " 1s step-end infinite;}" + `${this._terminalSelector} .xterm-rows.xterm-focus .${o.CURSOR_CLASS}.${o.CURSOR_STYLE_BLOCK_CLASS} {` + ` background-color: ${e.cursor.css};` + ` color: ${e.cursorAccent.css};}` + `${this._terminalSelector} .xterm-rows .${o.CURSOR_CLASS}.${o.CURSOR_STYLE_BAR_CLASS} {` + ` box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e.cursor.css} inset;}` + `${this._terminalSelector} .xterm-rows .${o.CURSOR_CLASS}.${o.CURSOR_STYLE_UNDERLINE_CLASS} {` + ` box-shadow: 0 -1px 0 ${e.cursor.css} inset;}`, t += `${this._terminalSelector} .xterm-selection { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .xterm-selection div { position: absolute; background-color: ${e.selectionBackgroundOpaque.css};}${this._terminalSelector} .xterm-selection div { position: absolute; background-color: ${e.selectionInactiveBackgroundOpaque.css};}`;
                        for (const [i, s] of e.ansi.entries())t += `${this._terminalSelector} .xterm-fg-${i} { color: ${s.css}; }${this._terminalSelector} .xterm-bg-${i} { background-color: ${s.css}; }`;
                        t += `${this._terminalSelector} .xterm-fg-${a.INVERTED_DEFAULT_COLOR} { color: ${l.color.opaque(e.background).css}; }${this._terminalSelector} .xterm-bg-${a.INVERTED_DEFAULT_COLOR} { background-color: ${e.foreground.css}; }`, this._themeStyleElement.textContent = t;
                    }
                    handleDevicePixelRatioChange() {
                        this._updateDimensions();
                    }
                    _refreshRowElements(e, t) {
                        for(let e = this._rowElements.length; e <= t; e++){
                            const e = document.createElement("div");
                            this._rowContainer.appendChild(e), this._rowElements.push(e);
                        }
                        for(; this._rowElements.length > t;)this._rowContainer.removeChild(this._rowElements.pop());
                    }
                    handleResize(e, t) {
                        this._refreshRowElements(e, t), this._updateDimensions();
                    }
                    handleCharSizeChanged() {
                        this._updateDimensions();
                    }
                    handleBlur() {
                        this._rowContainer.classList.remove(v);
                    }
                    handleFocus() {
                        this._rowContainer.classList.add(v);
                    }
                    handleSelectionChanged(e, t, i) {
                        for(; this._selectionContainer.children.length;)this._selectionContainer.removeChild(this._selectionContainer.children[0]);
                        if (this._rowFactory.handleSelectionChanged(e, t, i), this.renderRows(0, this._bufferService.rows - 1), !e || !t) return;
                        const s = e[1] - this._bufferService.buffer.ydisp, r = t[1] - this._bufferService.buffer.ydisp, n = Math.max(s, 0), o = Math.min(r, this._bufferService.rows - 1);
                        if (n >= this._bufferService.rows || o < 0) return;
                        const a = document.createDocumentFragment();
                        if (i) {
                            const i = e[0] > t[0];
                            a.appendChild(this._createSelectionElement(n, i ? t[0] : e[0], i ? e[0] : t[0], o - n + 1));
                        } else {
                            const i = s === n ? e[0] : 0, h = n === r ? t[0] : this._bufferService.cols;
                            a.appendChild(this._createSelectionElement(n, i, h));
                            const c = o - n - 1;
                            if (a.appendChild(this._createSelectionElement(n + 1, 0, this._bufferService.cols, c)), n !== o) {
                                const e = r === o ? t[0] : this._bufferService.cols;
                                a.appendChild(this._createSelectionElement(o, 0, e));
                            }
                        }
                        this._selectionContainer.appendChild(a);
                    }
                    _createSelectionElement(e, t, i, s = 1) {
                        const r = document.createElement("div");
                        return r.style.height = s * this.dimensions.css.cell.height + "px", r.style.top = e * this.dimensions.css.cell.height + "px", r.style.left = t * this.dimensions.css.cell.width + "px", r.style.width = this.dimensions.css.cell.width * (i - t) + "px", r;
                    }
                    handleCursorMove() {}
                    _handleOptionsChanged() {
                        this._updateDimensions();
                    }
                    clear() {
                        for (const e of this._rowElements)e.replaceChildren();
                    }
                    renderRows(e, t) {
                        const i = this._bufferService.buffer.ybase + this._bufferService.buffer.y, s = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), r = this._optionsService.rawOptions.cursorBlink;
                        for(let n = e; n <= t; n++){
                            const e = this._rowElements[n], t = n + this._bufferService.buffer.ydisp, o = this._bufferService.buffer.lines.get(t), a = this._optionsService.rawOptions.cursorStyle;
                            this._cellToRowElements[n] && this._cellToRowElements[n].length === this._bufferService.cols || (this._cellToRowElements[n] = new Int16Array(this._bufferService.cols)), e.replaceChildren(this._rowFactory.createRow(o, t, t === i, a, s, r, this.dimensions.css.cell.width, this._bufferService.cols, this._cellToRowElements[n]));
                        }
                    }
                    get _terminalSelector() {
                        return `.${f}${this._terminalClass}`;
                    }
                    _handleLinkHover(e) {
                        this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, !0);
                    }
                    _handleLinkLeave(e) {
                        this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, !1);
                    }
                    _setCellUnderline(e, t, i, s, r, n) {
                        if (e = this._cellToRowElements[i][e], t = this._cellToRowElements[s][t], -1 !== e && -1 !== t) for(; e !== t || i !== s;){
                            const t = this._rowElements[i];
                            if (!t) return;
                            const s = t.children[e];
                            s && (s.style.textDecoration = n ? "underline" : "none"), ++e >= r && (e = 0, i++);
                        }
                    }
                };
                p = s([
                    r(4, u.IInstantiationService),
                    r(5, c.ICharSizeService),
                    r(6, u.IOptionsService),
                    r(7, u.IBufferService),
                    r(8, c.ICoreBrowserService),
                    r(9, c.IThemeService)
                ], p), t.DomRenderer = p;
            },
            3787: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.DomRendererRowFactory = t.CURSOR_STYLE_UNDERLINE_CLASS = t.CURSOR_STYLE_BAR_CLASS = t.CURSOR_STYLE_BLOCK_CLASS = t.CURSOR_BLINK_CLASS = t.CURSOR_CLASS = t.STRIKETHROUGH_CLASS = t.UNDERLINE_CLASS = t.ITALIC_CLASS = t.DIM_CLASS = t.BOLD_CLASS = void 0;
                const n = i(2223), o = i(643), a = i(511), h = i(2585), c = i(8055), l = i(4725), d = i(4269), _ = i(6171), u = i(3734);
                t.BOLD_CLASS = "xterm-bold", t.DIM_CLASS = "xterm-dim", t.ITALIC_CLASS = "xterm-italic", t.UNDERLINE_CLASS = "xterm-underline", t.STRIKETHROUGH_CLASS = "xterm-strikethrough", t.CURSOR_CLASS = "xterm-cursor", t.CURSOR_BLINK_CLASS = "xterm-cursor-blink", t.CURSOR_STYLE_BLOCK_CLASS = "xterm-cursor-block", t.CURSOR_STYLE_BAR_CLASS = "xterm-cursor-bar", t.CURSOR_STYLE_UNDERLINE_CLASS = "xterm-cursor-underline";
                let f = class {
                    constructor(e, t, i, s, r, n, o){
                        this._document = e, this._characterJoinerService = t, this._optionsService = i, this._coreBrowserService = s, this._coreService = r, this._decorationService = n, this._themeService = o, this._workCell = new a.CellData, this._columnSelectMode = !1;
                    }
                    handleSelectionChanged(e, t, i) {
                        this._selectionStart = e, this._selectionEnd = t, this._columnSelectMode = i;
                    }
                    createRow(e, i, s, r, a, h, l, _, f) {
                        const g = this._document.createDocumentFragment(), p = this._characterJoinerService.getJoinedCharacters(i);
                        let S = 0;
                        for(let t = Math.min(e.length, _) - 1; t >= 0; t--)if (e.loadCell(t, this._workCell).getCode() !== o.NULL_CELL_CODE || s && t === a) {
                            S = t + 1;
                            break;
                        }
                        const m = this._themeService.colors;
                        let C = -1, b = 0;
                        for(; b < S; b++){
                            e.loadCell(b, this._workCell);
                            let _ = this._workCell.getWidth();
                            if (0 === _) {
                                f[b] = C;
                                continue;
                            }
                            let S = !1, y = b, w = this._workCell;
                            if (p.length > 0 && b === p[0][0]) {
                                S = !0;
                                const t = p.shift();
                                w = new d.JoinedCellData(this._workCell, e.translateToString(!0, t[0], t[1]), t[1] - t[0]), y = t[1] - 1, _ = w.getWidth();
                            }
                            const E = this._document.createElement("span");
                            if (_ > 1 && (E.style.width = l * _ + "px"), S && (E.style.display = "inline", a >= b && a <= y && (a = b)), !this._coreService.isCursorHidden && s && b === a) switch(E.classList.add(t.CURSOR_CLASS), h && E.classList.add(t.CURSOR_BLINK_CLASS), r){
                                case "bar":
                                    E.classList.add(t.CURSOR_STYLE_BAR_CLASS);
                                    break;
                                case "underline":
                                    E.classList.add(t.CURSOR_STYLE_UNDERLINE_CLASS);
                                    break;
                                default:
                                    E.classList.add(t.CURSOR_STYLE_BLOCK_CLASS);
                            }
                            if (w.isBold() && E.classList.add(t.BOLD_CLASS), w.isItalic() && E.classList.add(t.ITALIC_CLASS), w.isDim() && E.classList.add(t.DIM_CLASS), w.isInvisible() ? E.textContent = o.WHITESPACE_CELL_CHAR : E.textContent = w.getChars() || o.WHITESPACE_CELL_CHAR, w.isUnderline() && (E.classList.add(`${t.UNDERLINE_CLASS}-${w.extended.underlineStyle}`), " " === E.textContent && (E.textContent = "\xa0"), !w.isUnderlineColorDefault())) {
                                if (w.isUnderlineColorRGB()) E.style.textDecorationColor = `rgb(${u.AttributeData.toColorRGB(w.getUnderlineColor()).join(",")})`;
                                else {
                                    let e = w.getUnderlineColor();
                                    this._optionsService.rawOptions.drawBoldTextInBrightColors && w.isBold() && e < 8 && (e += 8), E.style.textDecorationColor = m.ansi[e].css;
                                }
                            }
                            w.isStrikethrough() && E.classList.add(t.STRIKETHROUGH_CLASS);
                            let L = w.getFgColor(), k = w.getFgColorMode(), R = w.getBgColor(), D = w.getBgColorMode();
                            const A = !!w.isInverse();
                            if (A) {
                                const e = L;
                                L = R, R = e;
                                const t = k;
                                k = D, D = t;
                            }
                            let x, B, T = !1;
                            this._decorationService.forEachDecorationAtCell(b, i, void 0, (e)=>{
                                "top" !== e.options.layer && T || (e.backgroundColorRGB && (D = 50331648, R = e.backgroundColorRGB.rgba >> 8 & 16777215, x = e.backgroundColorRGB), e.foregroundColorRGB && (k = 50331648, L = e.foregroundColorRGB.rgba >> 8 & 16777215, B = e.foregroundColorRGB), T = "top" === e.options.layer);
                            });
                            const M = this._isCellInSelection(b, i);
                            let O;
                            switch(T || m.selectionForeground && M && (k = 50331648, L = m.selectionForeground.rgba >> 8 & 16777215, B = m.selectionForeground), M && (x = this._coreBrowserService.isFocused ? m.selectionBackgroundOpaque : m.selectionInactiveBackgroundOpaque, T = !0), T && E.classList.add("xterm-decoration-top"), D){
                                case 16777216:
                                case 33554432:
                                    O = m.ansi[R], E.classList.add(`xterm-bg-${R}`);
                                    break;
                                case 50331648:
                                    O = c.rgba.toColor(R >> 16, R >> 8 & 255, 255 & R), this._addStyle(E, `background-color:#${v((R >>> 0).toString(16), "0", 6)}`);
                                    break;
                                default:
                                    A ? (O = m.foreground, E.classList.add(`xterm-bg-${n.INVERTED_DEFAULT_COLOR}`)) : O = m.background;
                            }
                            switch(x || w.isDim() && (x = c.color.multiplyOpacity(O, .5)), k){
                                case 16777216:
                                case 33554432:
                                    w.isBold() && L < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && (L += 8), this._applyMinimumContrast(E, O, m.ansi[L], w, x, void 0) || E.classList.add(`xterm-fg-${L}`);
                                    break;
                                case 50331648:
                                    const e1 = c.rgba.toColor(L >> 16 & 255, L >> 8 & 255, 255 & L);
                                    this._applyMinimumContrast(E, O, e1, w, x, B) || this._addStyle(E, `color:#${v(L.toString(16), "0", 6)}`);
                                    break;
                                default:
                                    this._applyMinimumContrast(E, O, m.foreground, w, x, void 0) || A && E.classList.add(`xterm-fg-${n.INVERTED_DEFAULT_COLOR}`);
                            }
                            g.appendChild(E), f[b] = ++C, b = y;
                        }
                        return b < _ - 1 && f.subarray(b).fill(++C), g;
                    }
                    _applyMinimumContrast(e, t, i, s, r, n) {
                        if (1 === this._optionsService.rawOptions.minimumContrastRatio || (0, _.excludeFromContrastRatioDemands)(s.getCode())) return !1;
                        let o;
                        return r || n || (o = this._themeService.colors.contrastCache.getColor(t.rgba, i.rgba)), void 0 === o && (o = c.color.ensureContrastRatio(r || t, n || i, this._optionsService.rawOptions.minimumContrastRatio), this._themeService.colors.contrastCache.setColor((r || t).rgba, (n || i).rgba, null != o ? o : null)), !!o && (this._addStyle(e, `color:${o.css}`), !0);
                    }
                    _addStyle(e, t) {
                        e.setAttribute("style", `${e.getAttribute("style") || ""}${t};`);
                    }
                    _isCellInSelection(e, t) {
                        const i = this._selectionStart, s = this._selectionEnd;
                        return !(!i || !s) && (this._columnSelectMode ? i[0] <= s[0] ? e >= i[0] && t >= i[1] && e < s[0] && t <= s[1] : e < i[0] && t >= i[1] && e >= s[0] && t <= s[1] : t > i[1] && t < s[1] || i[1] === s[1] && t === i[1] && e >= i[0] && e < s[0] || i[1] < s[1] && t === s[1] && e < s[0] || i[1] < s[1] && t === i[1] && e >= i[0]);
                    }
                };
                function v(e, t, i) {
                    for(; e.length < i;)e = t + e;
                    return e;
                }
                f = s([
                    r(1, l.ICharacterJoinerService),
                    r(2, h.IOptionsService),
                    r(3, l.ICoreBrowserService),
                    r(4, h.ICoreService),
                    r(5, h.IDecorationService),
                    r(6, l.IThemeService)
                ], f), t.DomRendererRowFactory = f;
            },
            2223: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.TEXT_BASELINE = t.DIM_OPACITY = t.INVERTED_DEFAULT_COLOR = void 0;
                const s = i(6114);
                t.INVERTED_DEFAULT_COLOR = 257, t.DIM_OPACITY = .5, t.TEXT_BASELINE = s.isFirefox || s.isLegacyEdge ? "bottom" : "ideographic";
            },
            6171: (e, t)=>{
                function i(e) {
                    return 57508 <= e && e <= 57558;
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.createRenderDimensions = t.excludeFromContrastRatioDemands = t.isRestrictedPowerlineGlyph = t.isPowerlineGlyph = t.throwIfFalsy = void 0, t.throwIfFalsy = function(e) {
                    if (!e) throw new Error("value must not be falsy");
                    return e;
                }, t.isPowerlineGlyph = i, t.isRestrictedPowerlineGlyph = function(e) {
                    return 57520 <= e && e <= 57527;
                }, t.excludeFromContrastRatioDemands = function(e) {
                    return i(e) || function(e) {
                        return 9472 <= e && e <= 9631;
                    }(e);
                }, t.createRenderDimensions = function() {
                    return {
                        css: {
                            canvas: {
                                width: 0,
                                height: 0
                            },
                            cell: {
                                width: 0,
                                height: 0
                            }
                        },
                        device: {
                            canvas: {
                                width: 0,
                                height: 0
                            },
                            cell: {
                                width: 0,
                                height: 0
                            },
                            char: {
                                width: 0,
                                height: 0,
                                left: 0,
                                top: 0
                            }
                        }
                    };
                };
            },
            456: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.SelectionModel = void 0, t.SelectionModel = class {
                    constructor(e){
                        this._bufferService = e, this.isSelectAllActive = !1, this.selectionStartLength = 0;
                    }
                    clearSelection() {
                        this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = !1, this.selectionStartLength = 0;
                    }
                    get finalSelectionStart() {
                        return this.isSelectAllActive ? [
                            0,
                            0
                        ] : this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
                    }
                    get finalSelectionEnd() {
                        if (this.isSelectAllActive) return [
                            this._bufferService.cols,
                            this._bufferService.buffer.ybase + this._bufferService.rows - 1
                        ];
                        if (this.selectionStart) {
                            if (!this.selectionEnd || this.areSelectionValuesReversed()) {
                                const e = this.selectionStart[0] + this.selectionStartLength;
                                return e > this._bufferService.cols ? e % this._bufferService.cols == 0 ? [
                                    this._bufferService.cols,
                                    this.selectionStart[1] + Math.floor(e / this._bufferService.cols) - 1
                                ] : [
                                    e % this._bufferService.cols,
                                    this.selectionStart[1] + Math.floor(e / this._bufferService.cols)
                                ] : [
                                    e,
                                    this.selectionStart[1]
                                ];
                            }
                            if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
                                const e = this.selectionStart[0] + this.selectionStartLength;
                                return e > this._bufferService.cols ? [
                                    e % this._bufferService.cols,
                                    this.selectionStart[1] + Math.floor(e / this._bufferService.cols)
                                ] : [
                                    Math.max(e, this.selectionEnd[0]),
                                    this.selectionEnd[1]
                                ];
                            }
                            return this.selectionEnd;
                        }
                    }
                    areSelectionValuesReversed() {
                        const e = this.selectionStart, t = this.selectionEnd;
                        return !(!e || !t) && (e[1] > t[1] || e[1] === t[1] && e[0] > t[0]);
                    }
                    handleTrim(e) {
                        return this.selectionStart && (this.selectionStart[1] -= e), this.selectionEnd && (this.selectionEnd[1] -= e), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), !0) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), !1);
                    }
                };
            },
            428: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.CharSizeService = void 0;
                const n = i(2585), o = i(8460), a = i(844);
                let h = class extends a.Disposable {
                    constructor(e, t, i){
                        super(), this._optionsService = i, this.width = 0, this.height = 0, this._onCharSizeChange = this.register(new o.EventEmitter), this.onCharSizeChange = this._onCharSizeChange.event, this._measureStrategy = new c(e, t, this._optionsService), this.register(this._optionsService.onMultipleOptionChange([
                            "fontFamily",
                            "fontSize"
                        ], ()=>this.measure()));
                    }
                    get hasValidSize() {
                        return this.width > 0 && this.height > 0;
                    }
                    measure() {
                        const e = this._measureStrategy.measure();
                        e.width === this.width && e.height === this.height || (this.width = e.width, this.height = e.height, this._onCharSizeChange.fire());
                    }
                };
                h = s([
                    r(2, n.IOptionsService)
                ], h), t.CharSizeService = h;
                class c {
                    constructor(e, t, i){
                        this._document = e, this._parentElement = t, this._optionsService = i, this._result = {
                            width: 0,
                            height: 0
                        }, this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W", this._measureElement.setAttribute("aria-hidden", "true"), this._parentElement.appendChild(this._measureElement);
                    }
                    measure() {
                        this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`;
                        const e = this._measureElement.getBoundingClientRect();
                        return 0 !== e.width && 0 !== e.height && (this._result.width = e.width, this._result.height = Math.ceil(e.height)), this._result;
                    }
                }
            },
            4269: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.CharacterJoinerService = t.JoinedCellData = void 0;
                const n = i(3734), o = i(643), a = i(511), h = i(2585);
                class c extends n.AttributeData {
                    constructor(e, t, i){
                        super(), this.content = 0, this.combinedData = "", this.fg = e.fg, this.bg = e.bg, this.combinedData = t, this._width = i;
                    }
                    isCombined() {
                        return 2097152;
                    }
                    getWidth() {
                        return this._width;
                    }
                    getChars() {
                        return this.combinedData;
                    }
                    getCode() {
                        return 2097151;
                    }
                    setFromCharData(e) {
                        throw new Error("not implemented");
                    }
                    getAsCharData() {
                        return [
                            this.fg,
                            this.getChars(),
                            this.getWidth(),
                            this.getCode()
                        ];
                    }
                }
                t.JoinedCellData = c;
                let l = class e {
                    constructor(e){
                        this._bufferService = e, this._characterJoiners = [], this._nextCharacterJoinerId = 0, this._workCell = new a.CellData;
                    }
                    register(e) {
                        const t = {
                            id: this._nextCharacterJoinerId++,
                            handler: e
                        };
                        return this._characterJoiners.push(t), t.id;
                    }
                    deregister(e) {
                        for(let t = 0; t < this._characterJoiners.length; t++)if (this._characterJoiners[t].id === e) return this._characterJoiners.splice(t, 1), !0;
                        return !1;
                    }
                    getJoinedCharacters(e) {
                        if (0 === this._characterJoiners.length) return [];
                        const t = this._bufferService.buffer.lines.get(e);
                        if (!t || 0 === t.length) return [];
                        const i = [], s = t.translateToString(!0);
                        let r = 0, n = 0, a = 0, h = t.getFg(0), c = t.getBg(0);
                        for(let e = 0; e < t.getTrimmedLength(); e++)if (t.loadCell(e, this._workCell), 0 !== this._workCell.getWidth()) {
                            if (this._workCell.fg !== h || this._workCell.bg !== c) {
                                if (e - r > 1) {
                                    const e = this._getJoinedRanges(s, a, n, t, r);
                                    for(let t = 0; t < e.length; t++)i.push(e[t]);
                                }
                                r = e, a = n, h = this._workCell.fg, c = this._workCell.bg;
                            }
                            n += this._workCell.getChars().length || o.WHITESPACE_CELL_CHAR.length;
                        }
                        if (this._bufferService.cols - r > 1) {
                            const e = this._getJoinedRanges(s, a, n, t, r);
                            for(let t = 0; t < e.length; t++)i.push(e[t]);
                        }
                        return i;
                    }
                    _getJoinedRanges(t, i, s, r, n) {
                        const o = t.substring(i, s);
                        let a = [];
                        try {
                            a = this._characterJoiners[0].handler(o);
                        } catch (e) {
                            console.error(e);
                        }
                        for(let t = 1; t < this._characterJoiners.length; t++)try {
                            const i = this._characterJoiners[t].handler(o);
                            for(let t = 0; t < i.length; t++)e._mergeRanges(a, i[t]);
                        } catch (e) {
                            console.error(e);
                        }
                        return this._stringRangesToCellRanges(a, r, n), a;
                    }
                    _stringRangesToCellRanges(e, t, i) {
                        let s = 0, r = !1, n = 0, a = e[s];
                        if (a) {
                            for(let h = i; h < this._bufferService.cols; h++){
                                const i = t.getWidth(h), c = t.getString(h).length || o.WHITESPACE_CELL_CHAR.length;
                                if (0 !== i) {
                                    if (!r && a[0] <= n && (a[0] = h, r = !0), a[1] <= n) {
                                        if (a[1] = h, a = e[++s], !a) break;
                                        a[0] <= n ? (a[0] = h, r = !0) : r = !1;
                                    }
                                    n += c;
                                }
                            }
                            a && (a[1] = this._bufferService.cols);
                        }
                    }
                    static _mergeRanges(e, t) {
                        let i = !1;
                        for(let s = 0; s < e.length; s++){
                            const r = e[s];
                            if (i) {
                                if (t[1] <= r[0]) return e[s - 1][1] = t[1], e;
                                if (t[1] <= r[1]) return e[s - 1][1] = Math.max(t[1], r[1]), e.splice(s, 1), e;
                                e.splice(s, 1), s--;
                            } else {
                                if (t[1] <= r[0]) return e.splice(s, 0, t), e;
                                if (t[1] <= r[1]) return r[0] = Math.min(t[0], r[0]), e;
                                t[0] < r[1] && (r[0] = Math.min(t[0], r[0]), i = !0);
                            }
                        }
                        return i ? e[e.length - 1][1] = t[1] : e.push(t), e;
                    }
                };
                l = s([
                    r(0, h.IBufferService)
                ], l), t.CharacterJoinerService = l;
            },
            5114: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.CoreBrowserService = void 0, t.CoreBrowserService = class {
                    constructor(e, t){
                        this._textarea = e, this.window = t, this._isFocused = !1, this._cachedIsFocused = void 0, this._textarea.addEventListener("focus", ()=>this._isFocused = !0), this._textarea.addEventListener("blur", ()=>this._isFocused = !1);
                    }
                    get dpr() {
                        return this.window.devicePixelRatio;
                    }
                    get isFocused() {
                        return void 0 === this._cachedIsFocused && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask(()=>this._cachedIsFocused = void 0)), this._cachedIsFocused;
                    }
                };
            },
            8934: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.MouseService = void 0;
                const n = i(4725), o = i(9806);
                let a = class {
                    constructor(e, t){
                        this._renderService = e, this._charSizeService = t;
                    }
                    getCoords(e, t, i, s, r) {
                        return (0, o.getCoords)(window, e, t, i, s, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, r);
                    }
                    getMouseReportCoords(e, t) {
                        const i = (0, o.getCoordsRelativeToElement)(window, e, t);
                        if (!(!this._charSizeService.hasValidSize || i[0] < 0 || i[1] < 0 || i[0] >= this._renderService.dimensions.css.canvas.width || i[1] >= this._renderService.dimensions.css.canvas.height)) return {
                            col: Math.floor(i[0] / this._renderService.dimensions.css.cell.width),
                            row: Math.floor(i[1] / this._renderService.dimensions.css.cell.height),
                            x: Math.floor(i[0]),
                            y: Math.floor(i[1])
                        };
                    }
                };
                a = s([
                    r(0, n.IRenderService),
                    r(1, n.ICharSizeService)
                ], a), t.MouseService = a;
            },
            3230: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.RenderService = void 0;
                const n = i(6193), o = i(8460), a = i(844), h = i(5596), c = i(3656), l = i(2585), d = i(4725), _ = i(7226);
                let u = class extends a.Disposable {
                    constructor(e, t, i, s, r, a, l, d){
                        if (super(), this._rowCount = e, this._charSizeService = s, this._pausedResizeTask = new _.DebouncedIdleTask, this._isPaused = !1, this._needsFullRefresh = !1, this._isNextRenderRedrawOnly = !0, this._needsSelectionRefresh = !1, this._canvasWidth = 0, this._canvasHeight = 0, this._selectionState = {
                            start: void 0,
                            end: void 0,
                            columnSelectMode: !1
                        }, this._onDimensionsChange = this.register(new o.EventEmitter), this.onDimensionsChange = this._onDimensionsChange.event, this._onRenderedViewportChange = this.register(new o.EventEmitter), this.onRenderedViewportChange = this._onRenderedViewportChange.event, this._onRender = this.register(new o.EventEmitter), this.onRender = this._onRender.event, this._onRefreshRequest = this.register(new o.EventEmitter), this.onRefreshRequest = this._onRefreshRequest.event, this.register({
                            dispose: ()=>{
                                var e;
                                return null === (e = this._renderer) || void 0 === e ? void 0 : e.dispose();
                            }
                        }), this._renderDebouncer = new n.RenderDebouncer(l.window, (e, t)=>this._renderRows(e, t)), this.register(this._renderDebouncer), this._screenDprMonitor = new h.ScreenDprMonitor(l.window), this._screenDprMonitor.setListener(()=>this.handleDevicePixelRatioChange()), this.register(this._screenDprMonitor), this.register(a.onResize(()=>this._fullRefresh())), this.register(a.buffers.onBufferActivate(()=>{
                            var e;
                            return null === (e = this._renderer) || void 0 === e ? void 0 : e.clear();
                        })), this.register(i.onOptionChange(()=>this._handleOptionsChanged())), this.register(this._charSizeService.onCharSizeChange(()=>this.handleCharSizeChanged())), this.register(r.onDecorationRegistered(()=>this._fullRefresh())), this.register(r.onDecorationRemoved(()=>this._fullRefresh())), this.register(i.onMultipleOptionChange([
                            "customGlyphs",
                            "drawBoldTextInBrightColors",
                            "letterSpacing",
                            "lineHeight",
                            "fontFamily",
                            "fontSize",
                            "fontWeight",
                            "fontWeightBold",
                            "minimumContrastRatio"
                        ], ()=>{
                            this.clear(), this.handleResize(a.cols, a.rows), this._fullRefresh();
                        })), this.register(i.onMultipleOptionChange([
                            "cursorBlink",
                            "cursorStyle"
                        ], ()=>this.refreshRows(a.buffer.y, a.buffer.y, !0))), this.register((0, c.addDisposableDomListener)(l.window, "resize", ()=>this.handleDevicePixelRatioChange())), this.register(d.onChangeColors(()=>this._fullRefresh())), "IntersectionObserver" in l.window) {
                            const e = new l.window.IntersectionObserver((e)=>this._handleIntersectionChange(e[e.length - 1]), {
                                threshold: 0
                            });
                            e.observe(t), this.register({
                                dispose: ()=>e.disconnect()
                            });
                        }
                    }
                    get dimensions() {
                        return this._renderer.dimensions;
                    }
                    _handleIntersectionChange(e) {
                        this._isPaused = void 0 === e.isIntersecting ? 0 === e.intersectionRatio : !e.isIntersecting, this._isPaused || this._charSizeService.hasValidSize || this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = !1);
                    }
                    refreshRows(e, t, i = !1) {
                        this._isPaused ? this._needsFullRefresh = !0 : (i || (this._isNextRenderRedrawOnly = !1), this._renderDebouncer.refresh(e, t, this._rowCount));
                    }
                    _renderRows(e, t) {
                        this._renderer && (this._renderer.renderRows(e, t), this._needsSelectionRefresh && (this._renderer.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = !1), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({
                            start: e,
                            end: t
                        }), this._onRender.fire({
                            start: e,
                            end: t
                        }), this._isNextRenderRedrawOnly = !0);
                    }
                    resize(e, t) {
                        this._rowCount = t, this._fireOnCanvasResize();
                    }
                    _handleOptionsChanged() {
                        this._renderer && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
                    }
                    _fireOnCanvasResize() {
                        this._renderer && (this._renderer.dimensions.css.canvas.width === this._canvasWidth && this._renderer.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.dimensions));
                    }
                    hasRenderer() {
                        return !!this._renderer;
                    }
                    setRenderer(e) {
                        var t;
                        null === (t = this._renderer) || void 0 === t || t.dispose(), this._renderer = e, this._renderer.onRequestRedraw((e)=>this.refreshRows(e.start, e.end, !0)), this._needsSelectionRefresh = !0, this._fullRefresh();
                    }
                    addRefreshCallback(e) {
                        return this._renderDebouncer.addRefreshCallback(e);
                    }
                    _fullRefresh() {
                        this._isPaused ? this._needsFullRefresh = !0 : this.refreshRows(0, this._rowCount - 1);
                    }
                    clearTextureAtlas() {
                        var e, t;
                        this._renderer && (null === (t = (e = this._renderer).clearTextureAtlas) || void 0 === t || t.call(e), this._fullRefresh());
                    }
                    handleDevicePixelRatioChange() {
                        this._charSizeService.measure(), this._renderer && (this._renderer.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
                    }
                    handleResize(e, t) {
                        this._renderer && (this._isPaused ? this._pausedResizeTask.set(()=>this._renderer.handleResize(e, t)) : this._renderer.handleResize(e, t), this._fullRefresh());
                    }
                    handleCharSizeChanged() {
                        var e;
                        null === (e = this._renderer) || void 0 === e || e.handleCharSizeChanged();
                    }
                    handleBlur() {
                        var e;
                        null === (e = this._renderer) || void 0 === e || e.handleBlur();
                    }
                    handleFocus() {
                        var e;
                        null === (e = this._renderer) || void 0 === e || e.handleFocus();
                    }
                    handleSelectionChanged(e, t, i) {
                        var s;
                        this._selectionState.start = e, this._selectionState.end = t, this._selectionState.columnSelectMode = i, null === (s = this._renderer) || void 0 === s || s.handleSelectionChanged(e, t, i);
                    }
                    handleCursorMove() {
                        var e;
                        null === (e = this._renderer) || void 0 === e || e.handleCursorMove();
                    }
                    clear() {
                        var e;
                        null === (e = this._renderer) || void 0 === e || e.clear();
                    }
                };
                u = s([
                    r(2, l.IOptionsService),
                    r(3, d.ICharSizeService),
                    r(4, l.IDecorationService),
                    r(5, l.IBufferService),
                    r(6, d.ICoreBrowserService),
                    r(7, d.IThemeService)
                ], u), t.RenderService = u;
            },
            9312: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.SelectionService = void 0;
                const n = i(6114), o = i(456), a = i(511), h = i(8460), c = i(4725), l = i(2585), d = i(9806), _ = i(9504), u = i(844), f = i(4841), v = String.fromCharCode(160), g = new RegExp(v, "g");
                let p = class extends u.Disposable {
                    constructor(e, t, i, s, r, n, c, l, d){
                        super(), this._element = e, this._screenElement = t, this._linkifier = i, this._bufferService = s, this._coreService = r, this._mouseService = n, this._optionsService = c, this._renderService = l, this._coreBrowserService = d, this._dragScrollAmount = 0, this._enabled = !0, this._workCell = new a.CellData, this._mouseDownTimeStamp = 0, this._oldHasSelection = !1, this._oldSelectionStart = void 0, this._oldSelectionEnd = void 0, this._onLinuxMouseSelection = this.register(new h.EventEmitter), this.onLinuxMouseSelection = this._onLinuxMouseSelection.event, this._onRedrawRequest = this.register(new h.EventEmitter), this.onRequestRedraw = this._onRedrawRequest.event, this._onSelectionChange = this.register(new h.EventEmitter), this.onSelectionChange = this._onSelectionChange.event, this._onRequestScrollLines = this.register(new h.EventEmitter), this.onRequestScrollLines = this._onRequestScrollLines.event, this._mouseMoveListener = (e)=>this._handleMouseMove(e), this._mouseUpListener = (e)=>this._handleMouseUp(e), this._coreService.onUserInput(()=>{
                            this.hasSelection && this.clearSelection();
                        }), this._trimListener = this._bufferService.buffer.lines.onTrim((e)=>this._handleTrim(e)), this.register(this._bufferService.buffers.onBufferActivate((e)=>this._handleBufferActivate(e))), this.enable(), this._model = new o.SelectionModel(this._bufferService), this._activeSelectionMode = 0, this.register((0, u.toDisposable)(()=>{
                            this._removeMouseDownListeners();
                        }));
                    }
                    reset() {
                        this.clearSelection();
                    }
                    disable() {
                        this.clearSelection(), this._enabled = !1;
                    }
                    enable() {
                        this._enabled = !0;
                    }
                    get selectionStart() {
                        return this._model.finalSelectionStart;
                    }
                    get selectionEnd() {
                        return this._model.finalSelectionEnd;
                    }
                    get hasSelection() {
                        const e = this._model.finalSelectionStart, t = this._model.finalSelectionEnd;
                        return !(!e || !t || e[0] === t[0] && e[1] === t[1]);
                    }
                    get selectionText() {
                        const e = this._model.finalSelectionStart, t = this._model.finalSelectionEnd;
                        if (!e || !t) return "";
                        const i = this._bufferService.buffer, s = [];
                        if (3 === this._activeSelectionMode) {
                            if (e[0] === t[0]) return "";
                            const r = e[0] < t[0] ? e[0] : t[0], n = e[0] < t[0] ? t[0] : e[0];
                            for(let o = e[1]; o <= t[1]; o++){
                                const e = i.translateBufferLineToString(o, !0, r, n);
                                s.push(e);
                            }
                        } else {
                            const r = e[1] === t[1] ? t[0] : void 0;
                            s.push(i.translateBufferLineToString(e[1], !0, e[0], r));
                            for(let r = e[1] + 1; r <= t[1] - 1; r++){
                                const e = i.lines.get(r), t = i.translateBufferLineToString(r, !0);
                                (null == e ? void 0 : e.isWrapped) ? s[s.length - 1] += t : s.push(t);
                            }
                            if (e[1] !== t[1]) {
                                const e = i.lines.get(t[1]), r = i.translateBufferLineToString(t[1], !0, 0, t[0]);
                                e && e.isWrapped ? s[s.length - 1] += r : s.push(r);
                            }
                        }
                        return s.map((e)=>e.replace(g, " ")).join(n.isWindows ? "\r\n" : "\n");
                    }
                    clearSelection() {
                        this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
                    }
                    refresh(e) {
                        this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(()=>this._refresh())), n.isLinux && e && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
                    }
                    _refresh() {
                        this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({
                            start: this._model.finalSelectionStart,
                            end: this._model.finalSelectionEnd,
                            columnSelectMode: 3 === this._activeSelectionMode
                        });
                    }
                    _isClickInSelection(e) {
                        const t = this._getMouseBufferCoords(e), i = this._model.finalSelectionStart, s = this._model.finalSelectionEnd;
                        return !!(i && s && t) && this._areCoordsInSelection(t, i, s);
                    }
                    isCellInSelection(e, t) {
                        const i = this._model.finalSelectionStart, s = this._model.finalSelectionEnd;
                        return !(!i || !s) && this._areCoordsInSelection([
                            e,
                            t
                        ], i, s);
                    }
                    _areCoordsInSelection(e, t, i) {
                        return e[1] > t[1] && e[1] < i[1] || t[1] === i[1] && e[1] === t[1] && e[0] >= t[0] && e[0] < i[0] || t[1] < i[1] && e[1] === i[1] && e[0] < i[0] || t[1] < i[1] && e[1] === t[1] && e[0] >= t[0];
                    }
                    _selectWordAtCursor(e, t) {
                        var i, s;
                        const r = null === (s = null === (i = this._linkifier.currentLink) || void 0 === i ? void 0 : i.link) || void 0 === s ? void 0 : s.range;
                        if (r) return this._model.selectionStart = [
                            r.start.x - 1,
                            r.start.y - 1
                        ], this._model.selectionStartLength = (0, f.getRangeLength)(r, this._bufferService.cols), this._model.selectionEnd = void 0, !0;
                        const n = this._getMouseBufferCoords(e);
                        return !!n && (this._selectWordAt(n, t), this._model.selectionEnd = void 0, !0);
                    }
                    selectAll() {
                        this._model.isSelectAllActive = !0, this.refresh(), this._onSelectionChange.fire();
                    }
                    selectLines(e, t) {
                        this._model.clearSelection(), e = Math.max(e, 0), t = Math.min(t, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [
                            0,
                            e
                        ], this._model.selectionEnd = [
                            this._bufferService.cols,
                            t
                        ], this.refresh(), this._onSelectionChange.fire();
                    }
                    _handleTrim(e) {
                        this._model.handleTrim(e) && this.refresh();
                    }
                    _getMouseBufferCoords(e) {
                        const t = this._mouseService.getCoords(e, this._screenElement, this._bufferService.cols, this._bufferService.rows, !0);
                        if (t) return t[0]--, t[1]--, t[1] += this._bufferService.buffer.ydisp, t;
                    }
                    _getMouseEventScrollAmount(e) {
                        let t = (0, d.getCoordsRelativeToElement)(this._coreBrowserService.window, e, this._screenElement)[1];
                        const i = this._renderService.dimensions.css.canvas.height;
                        return t >= 0 && t <= i ? 0 : (t > i && (t -= i), t = Math.min(Math.max(t, -50), 50), t /= 50, t / Math.abs(t) + Math.round(14 * t));
                    }
                    shouldForceSelection(e) {
                        return n.isMac ? e.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e.shiftKey;
                    }
                    handleMouseDown(e) {
                        if (this._mouseDownTimeStamp = e.timeStamp, (2 !== e.button || !this.hasSelection) && 0 === e.button) {
                            if (!this._enabled) {
                                if (!this.shouldForceSelection(e)) return;
                                e.stopPropagation();
                            }
                            e.preventDefault(), this._dragScrollAmount = 0, this._enabled && e.shiftKey ? this._handleIncrementalClick(e) : 1 === e.detail ? this._handleSingleClick(e) : 2 === e.detail ? this._handleDoubleClick(e) : 3 === e.detail && this._handleTripleClick(e), this._addMouseDownListeners(), this.refresh(!0);
                        }
                    }
                    _addMouseDownListeners() {
                        this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(()=>this._dragScroll(), 50);
                    }
                    _removeMouseDownListeners() {
                        this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
                    }
                    _handleIncrementalClick(e) {
                        this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e));
                    }
                    _handleSingleClick(e) {
                        if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = !1, this._activeSelectionMode = this.shouldColumnSelect(e) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e), !this._model.selectionStart) return;
                        this._model.selectionEnd = void 0;
                        const t = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
                        t && t.length !== this._model.selectionStart[0] && 0 === t.hasWidth(this._model.selectionStart[0]) && this._model.selectionStart[0]++;
                    }
                    _handleDoubleClick(e) {
                        this._selectWordAtCursor(e, !0) && (this._activeSelectionMode = 1);
                    }
                    _handleTripleClick(e) {
                        const t = this._getMouseBufferCoords(e);
                        t && (this._activeSelectionMode = 2, this._selectLineAt(t[1]));
                    }
                    shouldColumnSelect(e) {
                        return e.altKey && !(n.isMac && this._optionsService.rawOptions.macOptionClickForcesSelection);
                    }
                    _handleMouseMove(e) {
                        if (e.stopImmediatePropagation(), !this._model.selectionStart) return;
                        const t = this._model.selectionEnd ? [
                            this._model.selectionEnd[0],
                            this._model.selectionEnd[1]
                        ] : null;
                        if (this._model.selectionEnd = this._getMouseBufferCoords(e), !this._model.selectionEnd) return void this.refresh(!0);
                        2 === this._activeSelectionMode ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : 1 === this._activeSelectionMode && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e), 3 !== this._activeSelectionMode && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
                        const i = this._bufferService.buffer;
                        if (this._model.selectionEnd[1] < i.lines.length) {
                            const e = i.lines.get(this._model.selectionEnd[1]);
                            e && 0 === e.hasWidth(this._model.selectionEnd[0]) && this._model.selectionEnd[0]++;
                        }
                        t && t[0] === this._model.selectionEnd[0] && t[1] === this._model.selectionEnd[1] || this.refresh(!0);
                    }
                    _dragScroll() {
                        if (this._model.selectionEnd && this._model.selectionStart && this._dragScrollAmount) {
                            this._onRequestScrollLines.fire({
                                amount: this._dragScrollAmount,
                                suppressScrollEvent: !1
                            });
                            const e = this._bufferService.buffer;
                            this._dragScrollAmount > 0 ? (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e.ydisp + this._bufferService.rows, e.lines.length - 1)) : (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e.ydisp), this.refresh();
                        }
                    }
                    _handleMouseUp(e) {
                        const t = e.timeStamp - this._mouseDownTimeStamp;
                        if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && t < 500 && e.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
                            if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
                                const t = this._mouseService.getCoords(e, this._element, this._bufferService.cols, this._bufferService.rows, !1);
                                if (t && void 0 !== t[0] && void 0 !== t[1]) {
                                    const e = (0, _.moveToCellSequence)(t[0] - 1, t[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
                                    this._coreService.triggerDataEvent(e, !0);
                                }
                            }
                        } else this._fireEventIfSelectionChanged();
                    }
                    _fireEventIfSelectionChanged() {
                        const e = this._model.finalSelectionStart, t = this._model.finalSelectionEnd, i = !(!e || !t || e[0] === t[0] && e[1] === t[1]);
                        i ? e && t && (this._oldSelectionStart && this._oldSelectionEnd && e[0] === this._oldSelectionStart[0] && e[1] === this._oldSelectionStart[1] && t[0] === this._oldSelectionEnd[0] && t[1] === this._oldSelectionEnd[1] || this._fireOnSelectionChange(e, t, i)) : this._oldHasSelection && this._fireOnSelectionChange(e, t, i);
                    }
                    _fireOnSelectionChange(e, t, i) {
                        this._oldSelectionStart = e, this._oldSelectionEnd = t, this._oldHasSelection = i, this._onSelectionChange.fire();
                    }
                    _handleBufferActivate(e) {
                        this.clearSelection(), this._trimListener.dispose(), this._trimListener = e.activeBuffer.lines.onTrim((e)=>this._handleTrim(e));
                    }
                    _convertViewportColToCharacterIndex(e, t) {
                        let i = t;
                        for(let s = 0; t >= s; s++){
                            const r = e.loadCell(s, this._workCell).getChars().length;
                            0 === this._workCell.getWidth() ? i-- : r > 1 && t !== s && (i += r - 1);
                        }
                        return i;
                    }
                    setSelection(e, t, i) {
                        this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [
                            e,
                            t
                        ], this._model.selectionStartLength = i, this.refresh(), this._fireEventIfSelectionChanged();
                    }
                    rightClickSelect(e) {
                        this._isClickInSelection(e) || (this._selectWordAtCursor(e, !1) && this.refresh(!0), this._fireEventIfSelectionChanged());
                    }
                    _getWordAt(e, t, i = !0, s = !0) {
                        if (e[0] >= this._bufferService.cols) return;
                        const r = this._bufferService.buffer, n = r.lines.get(e[1]);
                        if (!n) return;
                        const o = r.translateBufferLineToString(e[1], !1);
                        let a = this._convertViewportColToCharacterIndex(n, e[0]), h = a;
                        const c = e[0] - a;
                        let l = 0, d = 0, _ = 0, u = 0;
                        if (" " === o.charAt(a)) {
                            for(; a > 0 && " " === o.charAt(a - 1);)a--;
                            for(; h < o.length && " " === o.charAt(h + 1);)h++;
                        } else {
                            let t = e[0], i = e[0];
                            0 === n.getWidth(t) && (l++, t--), 2 === n.getWidth(i) && (d++, i++);
                            const s = n.getString(i).length;
                            for(s > 1 && (u += s - 1, h += s - 1); t > 0 && a > 0 && !this._isCharWordSeparator(n.loadCell(t - 1, this._workCell));){
                                n.loadCell(t - 1, this._workCell);
                                const e = this._workCell.getChars().length;
                                0 === this._workCell.getWidth() ? (l++, t--) : e > 1 && (_ += e - 1, a -= e - 1), a--, t--;
                            }
                            for(; i < n.length && h + 1 < o.length && !this._isCharWordSeparator(n.loadCell(i + 1, this._workCell));){
                                n.loadCell(i + 1, this._workCell);
                                const e = this._workCell.getChars().length;
                                2 === this._workCell.getWidth() ? (d++, i++) : e > 1 && (u += e - 1, h += e - 1), h++, i++;
                            }
                        }
                        h++;
                        let f = a + c - l + _, v = Math.min(this._bufferService.cols, h - a + l + d - _ - u);
                        if (t || "" !== o.slice(a, h).trim()) {
                            if (i && 0 === f && 32 !== n.getCodePoint(0)) {
                                const t = r.lines.get(e[1] - 1);
                                if (t && n.isWrapped && 32 !== t.getCodePoint(this._bufferService.cols - 1)) {
                                    const t = this._getWordAt([
                                        this._bufferService.cols - 1,
                                        e[1] - 1
                                    ], !1, !0, !1);
                                    if (t) {
                                        const e = this._bufferService.cols - t.start;
                                        f -= e, v += e;
                                    }
                                }
                            }
                            if (s && f + v === this._bufferService.cols && 32 !== n.getCodePoint(this._bufferService.cols - 1)) {
                                const t = r.lines.get(e[1] + 1);
                                if ((null == t ? void 0 : t.isWrapped) && 32 !== t.getCodePoint(0)) {
                                    const t = this._getWordAt([
                                        0,
                                        e[1] + 1
                                    ], !1, !1, !0);
                                    t && (v += t.length);
                                }
                            }
                            return {
                                start: f,
                                length: v
                            };
                        }
                    }
                    _selectWordAt(e, t) {
                        const i = this._getWordAt(e, t);
                        if (i) {
                            for(; i.start < 0;)i.start += this._bufferService.cols, e[1]--;
                            this._model.selectionStart = [
                                i.start,
                                e[1]
                            ], this._model.selectionStartLength = i.length;
                        }
                    }
                    _selectToWordAt(e) {
                        const t = this._getWordAt(e, !0);
                        if (t) {
                            let i = e[1];
                            for(; t.start < 0;)t.start += this._bufferService.cols, i--;
                            if (!this._model.areSelectionValuesReversed()) for(; t.start + t.length > this._bufferService.cols;)t.length -= this._bufferService.cols, i++;
                            this._model.selectionEnd = [
                                this._model.areSelectionValuesReversed() ? t.start : t.start + t.length,
                                i
                            ];
                        }
                    }
                    _isCharWordSeparator(e) {
                        return 0 !== e.getWidth() && this._optionsService.rawOptions.wordSeparator.indexOf(e.getChars()) >= 0;
                    }
                    _selectLineAt(e) {
                        const t = this._bufferService.buffer.getWrappedRangeForLine(e), i = {
                            start: {
                                x: 0,
                                y: t.first
                            },
                            end: {
                                x: this._bufferService.cols - 1,
                                y: t.last
                            }
                        };
                        this._model.selectionStart = [
                            0,
                            t.first
                        ], this._model.selectionEnd = void 0, this._model.selectionStartLength = (0, f.getRangeLength)(i, this._bufferService.cols);
                    }
                };
                p = s([
                    r(3, l.IBufferService),
                    r(4, l.ICoreService),
                    r(5, c.IMouseService),
                    r(6, l.IOptionsService),
                    r(7, c.IRenderService),
                    r(8, c.ICoreBrowserService)
                ], p), t.SelectionService = p;
            },
            4725: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.IThemeService = t.ICharacterJoinerService = t.ISelectionService = t.IRenderService = t.IMouseService = t.ICoreBrowserService = t.ICharSizeService = void 0;
                const s = i(8343);
                t.ICharSizeService = (0, s.createDecorator)("CharSizeService"), t.ICoreBrowserService = (0, s.createDecorator)("CoreBrowserService"), t.IMouseService = (0, s.createDecorator)("MouseService"), t.IRenderService = (0, s.createDecorator)("RenderService"), t.ISelectionService = (0, s.createDecorator)("SelectionService"), t.ICharacterJoinerService = (0, s.createDecorator)("CharacterJoinerService"), t.IThemeService = (0, s.createDecorator)("ThemeService");
            },
            6731: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ThemeService = t.DEFAULT_ANSI_COLORS = void 0;
                const n = i(7239), o = i(8055), a = i(8460), h = i(844), c = i(2585), l = o.css.toColor("#ffffff"), d = o.css.toColor("#000000"), _ = o.css.toColor("#ffffff"), u = o.css.toColor("#000000"), f = {
                    css: "rgba(255, 255, 255, 0.3)",
                    rgba: 4294967117
                };
                t.DEFAULT_ANSI_COLORS = Object.freeze((()=>{
                    const e = [
                        o.css.toColor("#2e3436"),
                        o.css.toColor("#cc0000"),
                        o.css.toColor("#4e9a06"),
                        o.css.toColor("#c4a000"),
                        o.css.toColor("#3465a4"),
                        o.css.toColor("#75507b"),
                        o.css.toColor("#06989a"),
                        o.css.toColor("#d3d7cf"),
                        o.css.toColor("#555753"),
                        o.css.toColor("#ef2929"),
                        o.css.toColor("#8ae234"),
                        o.css.toColor("#fce94f"),
                        o.css.toColor("#729fcf"),
                        o.css.toColor("#ad7fa8"),
                        o.css.toColor("#34e2e2"),
                        o.css.toColor("#eeeeec")
                    ], t = [
                        0,
                        95,
                        135,
                        175,
                        215,
                        255
                    ];
                    for(let i = 0; i < 216; i++){
                        const s = t[i / 36 % 6 | 0], r = t[i / 6 % 6 | 0], n = t[i % 6];
                        e.push({
                            css: o.channels.toCss(s, r, n),
                            rgba: o.channels.toRgba(s, r, n)
                        });
                    }
                    for(let t = 0; t < 24; t++){
                        const i = 8 + 10 * t;
                        e.push({
                            css: o.channels.toCss(i, i, i),
                            rgba: o.channels.toRgba(i, i, i)
                        });
                    }
                    return e;
                })());
                let v = class extends h.Disposable {
                    constructor(e){
                        super(), this._optionsService = e, this._onChangeColors = this.register(new a.EventEmitter), this.onChangeColors = this._onChangeColors.event, this._contrastCache = new n.ColorContrastCache, this._colors = {
                            foreground: l,
                            background: d,
                            cursor: _,
                            cursorAccent: u,
                            selectionForeground: void 0,
                            selectionBackgroundTransparent: f,
                            selectionBackgroundOpaque: o.color.blend(d, f),
                            selectionInactiveBackgroundTransparent: f,
                            selectionInactiveBackgroundOpaque: o.color.blend(d, f),
                            ansi: t.DEFAULT_ANSI_COLORS.slice(),
                            contrastCache: this._contrastCache
                        }, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", ()=>this._contrastCache.clear())), this.register(this._optionsService.onSpecificOptionChange("theme", ()=>this._setTheme(this._optionsService.rawOptions.theme)));
                    }
                    get colors() {
                        return this._colors;
                    }
                    _setTheme(e = {}) {
                        const i = this._colors;
                        if (i.foreground = g(e.foreground, l), i.background = g(e.background, d), i.cursor = g(e.cursor, _), i.cursorAccent = g(e.cursorAccent, u), i.selectionBackgroundTransparent = g(e.selectionBackground, f), i.selectionBackgroundOpaque = o.color.blend(i.background, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundTransparent = g(e.selectionInactiveBackground, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundOpaque = o.color.blend(i.background, i.selectionInactiveBackgroundTransparent), i.selectionForeground = e.selectionForeground ? g(e.selectionForeground, o.NULL_COLOR) : void 0, i.selectionForeground === o.NULL_COLOR && (i.selectionForeground = void 0), o.color.isOpaque(i.selectionBackgroundTransparent)) {
                            const e = .3;
                            i.selectionBackgroundTransparent = o.color.opacity(i.selectionBackgroundTransparent, e);
                        }
                        if (o.color.isOpaque(i.selectionInactiveBackgroundTransparent)) {
                            const e = .3;
                            i.selectionInactiveBackgroundTransparent = o.color.opacity(i.selectionInactiveBackgroundTransparent, e);
                        }
                        if (i.ansi = t.DEFAULT_ANSI_COLORS.slice(), i.ansi[0] = g(e.black, t.DEFAULT_ANSI_COLORS[0]), i.ansi[1] = g(e.red, t.DEFAULT_ANSI_COLORS[1]), i.ansi[2] = g(e.green, t.DEFAULT_ANSI_COLORS[2]), i.ansi[3] = g(e.yellow, t.DEFAULT_ANSI_COLORS[3]), i.ansi[4] = g(e.blue, t.DEFAULT_ANSI_COLORS[4]), i.ansi[5] = g(e.magenta, t.DEFAULT_ANSI_COLORS[5]), i.ansi[6] = g(e.cyan, t.DEFAULT_ANSI_COLORS[6]), i.ansi[7] = g(e.white, t.DEFAULT_ANSI_COLORS[7]), i.ansi[8] = g(e.brightBlack, t.DEFAULT_ANSI_COLORS[8]), i.ansi[9] = g(e.brightRed, t.DEFAULT_ANSI_COLORS[9]), i.ansi[10] = g(e.brightGreen, t.DEFAULT_ANSI_COLORS[10]), i.ansi[11] = g(e.brightYellow, t.DEFAULT_ANSI_COLORS[11]), i.ansi[12] = g(e.brightBlue, t.DEFAULT_ANSI_COLORS[12]), i.ansi[13] = g(e.brightMagenta, t.DEFAULT_ANSI_COLORS[13]), i.ansi[14] = g(e.brightCyan, t.DEFAULT_ANSI_COLORS[14]), i.ansi[15] = g(e.brightWhite, t.DEFAULT_ANSI_COLORS[15]), e.extendedAnsi) {
                            const s = Math.min(i.ansi.length - 16, e.extendedAnsi.length);
                            for(let r = 0; r < s; r++)i.ansi[r + 16] = g(e.extendedAnsi[r], t.DEFAULT_ANSI_COLORS[r + 16]);
                        }
                        this._contrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
                    }
                    restoreColor(e) {
                        this._restoreColor(e), this._onChangeColors.fire(this.colors);
                    }
                    _restoreColor(e) {
                        if (void 0 !== e) switch(e){
                            case 256:
                                this._colors.foreground = this._restoreColors.foreground;
                                break;
                            case 257:
                                this._colors.background = this._restoreColors.background;
                                break;
                            case 258:
                                this._colors.cursor = this._restoreColors.cursor;
                                break;
                            default:
                                this._colors.ansi[e] = this._restoreColors.ansi[e];
                        }
                        else for(let e = 0; e < this._restoreColors.ansi.length; ++e)this._colors.ansi[e] = this._restoreColors.ansi[e];
                    }
                    modifyColors(e) {
                        e(this._colors), this._onChangeColors.fire(this.colors);
                    }
                    _updateRestoreColors() {
                        this._restoreColors = {
                            foreground: this._colors.foreground,
                            background: this._colors.background,
                            cursor: this._colors.cursor,
                            ansi: this._colors.ansi.slice()
                        };
                    }
                };
                function g(e, t) {
                    if (void 0 !== e) try {
                        return o.css.toColor(e);
                    } catch (e) {}
                    return t;
                }
                v = s([
                    r(0, c.IOptionsService)
                ], v), t.ThemeService = v;
            },
            6349: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.CircularList = void 0;
                const s = i(8460), r = i(844);
                class n extends r.Disposable {
                    constructor(e){
                        super(), this._maxLength = e, this.onDeleteEmitter = this.register(new s.EventEmitter), this.onDelete = this.onDeleteEmitter.event, this.onInsertEmitter = this.register(new s.EventEmitter), this.onInsert = this.onInsertEmitter.event, this.onTrimEmitter = this.register(new s.EventEmitter), this.onTrim = this.onTrimEmitter.event, this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
                    }
                    get maxLength() {
                        return this._maxLength;
                    }
                    set maxLength(e) {
                        if (this._maxLength === e) return;
                        const t = new Array(e);
                        for(let i = 0; i < Math.min(e, this.length); i++)t[i] = this._array[this._getCyclicIndex(i)];
                        this._array = t, this._maxLength = e, this._startIndex = 0;
                    }
                    get length() {
                        return this._length;
                    }
                    set length(e) {
                        if (e > this._length) for(let t = this._length; t < e; t++)this._array[t] = void 0;
                        this._length = e;
                    }
                    get(e) {
                        return this._array[this._getCyclicIndex(e)];
                    }
                    set(e, t) {
                        this._array[this._getCyclicIndex(e)] = t;
                    }
                    push(e) {
                        this._array[this._getCyclicIndex(this._length)] = e, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
                    }
                    recycle() {
                        if (this._length !== this._maxLength) throw new Error("Can only recycle when the buffer is full");
                        return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
                    }
                    get isFull() {
                        return this._length === this._maxLength;
                    }
                    pop() {
                        return this._array[this._getCyclicIndex(this._length-- - 1)];
                    }
                    splice(e, t, ...i) {
                        if (t) {
                            for(let i = e; i < this._length - t; i++)this._array[this._getCyclicIndex(i)] = this._array[this._getCyclicIndex(i + t)];
                            this._length -= t, this.onDeleteEmitter.fire({
                                index: e,
                                amount: t
                            });
                        }
                        for(let t = this._length - 1; t >= e; t--)this._array[this._getCyclicIndex(t + i.length)] = this._array[this._getCyclicIndex(t)];
                        for(let t = 0; t < i.length; t++)this._array[this._getCyclicIndex(e + t)] = i[t];
                        if (i.length && this.onInsertEmitter.fire({
                            index: e,
                            amount: i.length
                        }), this._length + i.length > this._maxLength) {
                            const e = this._length + i.length - this._maxLength;
                            this._startIndex += e, this._length = this._maxLength, this.onTrimEmitter.fire(e);
                        } else this._length += i.length;
                    }
                    trimStart(e) {
                        e > this._length && (e = this._length), this._startIndex += e, this._length -= e, this.onTrimEmitter.fire(e);
                    }
                    shiftElements(e, t, i) {
                        if (!(t <= 0)) {
                            if (e < 0 || e >= this._length) throw new Error("start argument out of range");
                            if (e + i < 0) throw new Error("Cannot shift elements in list beyond index 0");
                            if (i > 0) {
                                for(let s = t - 1; s >= 0; s--)this.set(e + s + i, this.get(e + s));
                                const s = e + t + i - this._length;
                                if (s > 0) for(this._length += s; this._length > this._maxLength;)this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
                            } else for(let s = 0; s < t; s++)this.set(e + s + i, this.get(e + s));
                        }
                    }
                    _getCyclicIndex(e) {
                        return (this._startIndex + e) % this._maxLength;
                    }
                }
                t.CircularList = n;
            },
            1439: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.clone = void 0, t.clone = function e(t, i = 5) {
                    if ("object" != typeof t) return t;
                    const s = Array.isArray(t) ? [] : {};
                    for(const r in t)s[r] = i <= 1 ? t[r] : t[r] && e(t[r], i - 1);
                    return s;
                };
            },
            8055: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.contrastRatio = t.toPaddedHex = t.rgba = t.rgb = t.css = t.color = t.channels = t.NULL_COLOR = void 0;
                const s = i(6114);
                let r = 0, n = 0, o = 0, a = 0;
                var h, c, l;
                function d(e) {
                    const t = e.toString(16);
                    return t.length < 2 ? "0" + t : t;
                }
                function _(e, t) {
                    return e < t ? (t + .05) / (e + .05) : (e + .05) / (t + .05);
                }
                t.NULL_COLOR = {
                    css: "#00000000",
                    rgba: 0
                }, function(e) {
                    e.toCss = function(e, t, i, s) {
                        return void 0 !== s ? `#${d(e)}${d(t)}${d(i)}${d(s)}` : `#${d(e)}${d(t)}${d(i)}`;
                    }, e.toRgba = function(e, t, i, s = 255) {
                        return (e << 24 | t << 16 | i << 8 | s) >>> 0;
                    };
                }(h = t.channels || (t.channels = {})), function(e) {
                    function t(e, t) {
                        return a = Math.round(255 * t), [r, n, o] = l.toChannels(e.rgba), {
                            css: h.toCss(r, n, o, a),
                            rgba: h.toRgba(r, n, o, a)
                        };
                    }
                    e.blend = function(e, t) {
                        if (a = (255 & t.rgba) / 255, 1 === a) return {
                            css: t.css,
                            rgba: t.rgba
                        };
                        const i = t.rgba >> 24 & 255, s = t.rgba >> 16 & 255, c = t.rgba >> 8 & 255, l = e.rgba >> 24 & 255, d = e.rgba >> 16 & 255, _ = e.rgba >> 8 & 255;
                        return r = l + Math.round((i - l) * a), n = d + Math.round((s - d) * a), o = _ + Math.round((c - _) * a), {
                            css: h.toCss(r, n, o),
                            rgba: h.toRgba(r, n, o)
                        };
                    }, e.isOpaque = function(e) {
                        return 255 == (255 & e.rgba);
                    }, e.ensureContrastRatio = function(e, t, i) {
                        const s = l.ensureContrastRatio(e.rgba, t.rgba, i);
                        if (s) return l.toColor(s >> 24 & 255, s >> 16 & 255, s >> 8 & 255);
                    }, e.opaque = function(e) {
                        const t = (255 | e.rgba) >>> 0;
                        return [r, n, o] = l.toChannels(t), {
                            css: h.toCss(r, n, o),
                            rgba: t
                        };
                    }, e.opacity = t, e.multiplyOpacity = function(e, i) {
                        return a = 255 & e.rgba, t(e, a * i / 255);
                    }, e.toColorRGB = function(e) {
                        return [
                            e.rgba >> 24 & 255,
                            e.rgba >> 16 & 255,
                            e.rgba >> 8 & 255
                        ];
                    };
                }(t.color || (t.color = {})), function(e) {
                    let t, i;
                    if (!s.isNode) {
                        const e = document.createElement("canvas");
                        e.width = 1, e.height = 1;
                        const s = e.getContext("2d", {
                            willReadFrequently: !0
                        });
                        s && (t = s, t.globalCompositeOperation = "copy", i = t.createLinearGradient(0, 0, 1, 1));
                    }
                    e.toColor = function(e) {
                        if (e.match(/#[\da-f]{3,8}/i)) switch(e.length){
                            case 4:
                                return r = parseInt(e.slice(1, 2).repeat(2), 16), n = parseInt(e.slice(2, 3).repeat(2), 16), o = parseInt(e.slice(3, 4).repeat(2), 16), l.toColor(r, n, o);
                            case 5:
                                return r = parseInt(e.slice(1, 2).repeat(2), 16), n = parseInt(e.slice(2, 3).repeat(2), 16), o = parseInt(e.slice(3, 4).repeat(2), 16), a = parseInt(e.slice(4, 5).repeat(2), 16), l.toColor(r, n, o, a);
                            case 7:
                                return {
                                    css: e,
                                    rgba: (parseInt(e.slice(1), 16) << 8 | 255) >>> 0
                                };
                            case 9:
                                return {
                                    css: e,
                                    rgba: parseInt(e.slice(1), 16) >>> 0
                                };
                        }
                        const s = e.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
                        if (s) return r = parseInt(s[1]), n = parseInt(s[2]), o = parseInt(s[3]), a = Math.round(255 * (void 0 === s[5] ? 1 : parseFloat(s[5]))), l.toColor(r, n, o, a);
                        if (!t || !i) throw new Error("css.toColor: Unsupported css format");
                        if (t.fillStyle = i, t.fillStyle = e, "string" != typeof t.fillStyle) throw new Error("css.toColor: Unsupported css format");
                        if (t.fillRect(0, 0, 1, 1), [r, n, o, a] = t.getImageData(0, 0, 1, 1).data, 255 !== a) throw new Error("css.toColor: Unsupported css format");
                        return {
                            rgba: h.toRgba(r, n, o, a),
                            css: e
                        };
                    };
                }(t.css || (t.css = {})), function(e) {
                    function t(e, t, i) {
                        const s = e / 255, r = t / 255, n = i / 255;
                        return .2126 * (s <= .03928 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4)) + .7152 * (r <= .03928 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4)) + .0722 * (n <= .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4));
                    }
                    e.relativeLuminance = function(e) {
                        return t(e >> 16 & 255, e >> 8 & 255, 255 & e);
                    }, e.relativeLuminance2 = t;
                }(c = t.rgb || (t.rgb = {})), function(e) {
                    function t(e, t, i) {
                        const s = e >> 24 & 255, r = e >> 16 & 255, n = e >> 8 & 255;
                        let o = t >> 24 & 255, a = t >> 16 & 255, h = t >> 8 & 255, l = _(c.relativeLuminance2(o, a, h), c.relativeLuminance2(s, r, n));
                        for(; l < i && (o > 0 || a > 0 || h > 0);)o -= Math.max(0, Math.ceil(.1 * o)), a -= Math.max(0, Math.ceil(.1 * a)), h -= Math.max(0, Math.ceil(.1 * h)), l = _(c.relativeLuminance2(o, a, h), c.relativeLuminance2(s, r, n));
                        return (o << 24 | a << 16 | h << 8 | 255) >>> 0;
                    }
                    function i(e, t, i) {
                        const s = e >> 24 & 255, r = e >> 16 & 255, n = e >> 8 & 255;
                        let o = t >> 24 & 255, a = t >> 16 & 255, h = t >> 8 & 255, l = _(c.relativeLuminance2(o, a, h), c.relativeLuminance2(s, r, n));
                        for(; l < i && (o < 255 || a < 255 || h < 255);)o = Math.min(255, o + Math.ceil(.1 * (255 - o))), a = Math.min(255, a + Math.ceil(.1 * (255 - a))), h = Math.min(255, h + Math.ceil(.1 * (255 - h))), l = _(c.relativeLuminance2(o, a, h), c.relativeLuminance2(s, r, n));
                        return (o << 24 | a << 16 | h << 8 | 255) >>> 0;
                    }
                    e.ensureContrastRatio = function(e, s, r) {
                        const n = c.relativeLuminance(e >> 8), o = c.relativeLuminance(s >> 8);
                        if (_(n, o) < r) {
                            if (o < n) {
                                const o = t(e, s, r), a = _(n, c.relativeLuminance(o >> 8));
                                if (a < r) {
                                    const t = i(e, s, r);
                                    return a > _(n, c.relativeLuminance(t >> 8)) ? o : t;
                                }
                                return o;
                            }
                            const a = i(e, s, r), h = _(n, c.relativeLuminance(a >> 8));
                            if (h < r) {
                                const i = t(e, s, r);
                                return h > _(n, c.relativeLuminance(i >> 8)) ? a : i;
                            }
                            return a;
                        }
                    }, e.reduceLuminance = t, e.increaseLuminance = i, e.toChannels = function(e) {
                        return [
                            e >> 24 & 255,
                            e >> 16 & 255,
                            e >> 8 & 255,
                            255 & e
                        ];
                    }, e.toColor = function(e, t, i, s) {
                        return {
                            css: h.toCss(e, t, i, s),
                            rgba: h.toRgba(e, t, i, s)
                        };
                    };
                }(l = t.rgba || (t.rgba = {})), t.toPaddedHex = d, t.contrastRatio = _;
            },
            8969: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.CoreTerminal = void 0;
                const s = i(844), r = i(2585), n = i(4348), o = i(7866), a = i(744), h = i(7302), c = i(6975), l = i(8460), d = i(1753), _ = i(1480), u = i(7994), f = i(9282), v = i(5435), g = i(5981), p = i(2660);
                let S = !1;
                class m extends s.Disposable {
                    constructor(e){
                        super(), this._onBinary = this.register(new l.EventEmitter), this.onBinary = this._onBinary.event, this._onData = this.register(new l.EventEmitter), this.onData = this._onData.event, this._onLineFeed = this.register(new l.EventEmitter), this.onLineFeed = this._onLineFeed.event, this._onResize = this.register(new l.EventEmitter), this.onResize = this._onResize.event, this._onWriteParsed = this.register(new l.EventEmitter), this.onWriteParsed = this._onWriteParsed.event, this._onScroll = this.register(new l.EventEmitter), this._instantiationService = new n.InstantiationService, this.optionsService = this.register(new h.OptionsService(e)), this._instantiationService.setService(r.IOptionsService, this.optionsService), this._bufferService = this.register(this._instantiationService.createInstance(a.BufferService)), this._instantiationService.setService(r.IBufferService, this._bufferService), this._logService = this.register(this._instantiationService.createInstance(o.LogService)), this._instantiationService.setService(r.ILogService, this._logService), this.coreService = this.register(this._instantiationService.createInstance(c.CoreService)), this._instantiationService.setService(r.ICoreService, this.coreService), this.coreMouseService = this.register(this._instantiationService.createInstance(d.CoreMouseService)), this._instantiationService.setService(r.ICoreMouseService, this.coreMouseService), this.unicodeService = this.register(this._instantiationService.createInstance(_.UnicodeService)), this._instantiationService.setService(r.IUnicodeService, this.unicodeService), this._charsetService = this._instantiationService.createInstance(u.CharsetService), this._instantiationService.setService(r.ICharsetService, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(p.OscLinkService), this._instantiationService.setService(r.IOscLinkService, this._oscLinkService), this._inputHandler = this.register(new v.InputHandler(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this.register((0, l.forwardEvent)(this._inputHandler.onLineFeed, this._onLineFeed)), this.register(this._inputHandler), this.register((0, l.forwardEvent)(this._bufferService.onResize, this._onResize)), this.register((0, l.forwardEvent)(this.coreService.onData, this._onData)), this.register((0, l.forwardEvent)(this.coreService.onBinary, this._onBinary)), this.register(this.coreService.onRequestScrollToBottom(()=>this.scrollToBottom())), this.register(this.coreService.onUserInput(()=>this._writeBuffer.handleUserInput())), this.register(this.optionsService.onSpecificOptionChange("windowsMode", (e)=>this._handleWindowsModeOptionChange(e))), this.register(this._bufferService.onScroll((e)=>{
                            this._onScroll.fire({
                                position: this._bufferService.buffer.ydisp,
                                source: 0
                            }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
                        })), this.register(this._inputHandler.onScroll((e)=>{
                            this._onScroll.fire({
                                position: this._bufferService.buffer.ydisp,
                                source: 0
                            }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
                        })), this._writeBuffer = this.register(new g.WriteBuffer((e, t)=>this._inputHandler.parse(e, t))), this.register((0, l.forwardEvent)(this._writeBuffer.onWriteParsed, this._onWriteParsed)), this.register((0, s.toDisposable)(()=>{
                            var e;
                            null === (e = this._windowsMode) || void 0 === e || e.dispose(), this._windowsMode = void 0;
                        }));
                    }
                    get onScroll() {
                        return this._onScrollApi || (this._onScrollApi = this.register(new l.EventEmitter), this._onScroll.event((e)=>{
                            var t;
                            null === (t = this._onScrollApi) || void 0 === t || t.fire(e.position);
                        })), this._onScrollApi.event;
                    }
                    get cols() {
                        return this._bufferService.cols;
                    }
                    get rows() {
                        return this._bufferService.rows;
                    }
                    get buffers() {
                        return this._bufferService.buffers;
                    }
                    get options() {
                        return this.optionsService.options;
                    }
                    set options(e) {
                        for(const t in e)this.optionsService.options[t] = e[t];
                    }
                    write(e, t) {
                        this._writeBuffer.write(e, t);
                    }
                    writeSync(e, t) {
                        this._logService.logLevel <= r.LogLevelEnum.WARN && !S && (this._logService.warn("writeSync is unreliable and will be removed soon."), S = !0), this._writeBuffer.writeSync(e, t);
                    }
                    resize(e, t) {
                        isNaN(e) || isNaN(t) || (e = Math.max(e, a.MINIMUM_COLS), t = Math.max(t, a.MINIMUM_ROWS), this._bufferService.resize(e, t));
                    }
                    scroll(e, t = !1) {
                        this._bufferService.scroll(e, t);
                    }
                    scrollLines(e, t, i) {
                        this._bufferService.scrollLines(e, t, i);
                    }
                    scrollPages(e) {
                        this._bufferService.scrollPages(e);
                    }
                    scrollToTop() {
                        this._bufferService.scrollToTop();
                    }
                    scrollToBottom() {
                        this._bufferService.scrollToBottom();
                    }
                    scrollToLine(e) {
                        this._bufferService.scrollToLine(e);
                    }
                    registerEscHandler(e, t) {
                        return this._inputHandler.registerEscHandler(e, t);
                    }
                    registerDcsHandler(e, t) {
                        return this._inputHandler.registerDcsHandler(e, t);
                    }
                    registerCsiHandler(e, t) {
                        return this._inputHandler.registerCsiHandler(e, t);
                    }
                    registerOscHandler(e, t) {
                        return this._inputHandler.registerOscHandler(e, t);
                    }
                    _setup() {
                        this.optionsService.rawOptions.windowsMode && this._enableWindowsMode();
                    }
                    reset() {
                        this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
                    }
                    _handleWindowsModeOptionChange(e) {
                        var t;
                        e ? this._enableWindowsMode() : (null === (t = this._windowsMode) || void 0 === t || t.dispose(), this._windowsMode = void 0);
                    }
                    _enableWindowsMode() {
                        if (!this._windowsMode) {
                            const e = [];
                            e.push(this.onLineFeed(f.updateWindowsModeWrappedState.bind(null, this._bufferService))), e.push(this.registerCsiHandler({
                                final: "H"
                            }, ()=>((0, f.updateWindowsModeWrappedState)(this._bufferService), !1))), this._windowsMode = {
                                dispose: ()=>{
                                    for (const t of e)t.dispose();
                                }
                            };
                        }
                    }
                }
                t.CoreTerminal = m;
            },
            8460: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.forwardEvent = t.EventEmitter = void 0, t.EventEmitter = class {
                    constructor(){
                        this._listeners = [], this._disposed = !1;
                    }
                    get event() {
                        return this._event || (this._event = (e)=>(this._listeners.push(e), {
                                dispose: ()=>{
                                    if (!this._disposed) {
                                        for(let t = 0; t < this._listeners.length; t++)if (this._listeners[t] === e) return void this._listeners.splice(t, 1);
                                    }
                                }
                            })), this._event;
                    }
                    fire(e, t) {
                        const i = [];
                        for(let e = 0; e < this._listeners.length; e++)i.push(this._listeners[e]);
                        for(let s = 0; s < i.length; s++)i[s].call(void 0, e, t);
                    }
                    dispose() {
                        this._listeners && (this._listeners.length = 0), this._disposed = !0;
                    }
                }, t.forwardEvent = function(e, t) {
                    return e((e)=>t.fire(e));
                };
            },
            5435: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.InputHandler = t.WindowsOptionsReportType = void 0;
                const n = i(2584), o = i(7116), a = i(2015), h = i(844), c = i(482), l = i(8437), d = i(8460), _ = i(643), u = i(511), f = i(3734), v = i(2585), g = i(6242), p = i(6351), S = i(5941), m = {
                    "(": 0,
                    ")": 1,
                    "*": 2,
                    "+": 3,
                    "-": 1,
                    ".": 2
                }, C = 131072;
                function b(e, t) {
                    if (e > 24) return t.setWinLines || !1;
                    switch(e){
                        case 1:
                            return !!t.restoreWin;
                        case 2:
                            return !!t.minimizeWin;
                        case 3:
                            return !!t.setWinPosition;
                        case 4:
                            return !!t.setWinSizePixels;
                        case 5:
                            return !!t.raiseWin;
                        case 6:
                            return !!t.lowerWin;
                        case 7:
                            return !!t.refreshWin;
                        case 8:
                            return !!t.setWinSizeChars;
                        case 9:
                            return !!t.maximizeWin;
                        case 10:
                            return !!t.fullscreenWin;
                        case 11:
                            return !!t.getWinState;
                        case 13:
                            return !!t.getWinPosition;
                        case 14:
                            return !!t.getWinSizePixels;
                        case 15:
                            return !!t.getScreenSizePixels;
                        case 16:
                            return !!t.getCellSizePixels;
                        case 18:
                            return !!t.getWinSizeChars;
                        case 19:
                            return !!t.getScreenSizeChars;
                        case 20:
                            return !!t.getIconTitle;
                        case 21:
                            return !!t.getWinTitle;
                        case 22:
                            return !!t.pushTitle;
                        case 23:
                            return !!t.popTitle;
                        case 24:
                            return !!t.setWinLines;
                    }
                    return !1;
                }
                var y;
                !function(e) {
                    e[e.GET_WIN_SIZE_PIXELS = 0] = "GET_WIN_SIZE_PIXELS", e[e.GET_CELL_SIZE_PIXELS = 1] = "GET_CELL_SIZE_PIXELS";
                }(y = t.WindowsOptionsReportType || (t.WindowsOptionsReportType = {}));
                let w = 0;
                class E extends h.Disposable {
                    constructor(e, t, i, s, r, h, _, f, v = new a.EscapeSequenceParser){
                        super(), this._bufferService = e, this._charsetService = t, this._coreService = i, this._logService = s, this._optionsService = r, this._oscLinkService = h, this._coreMouseService = _, this._unicodeService = f, this._parser = v, this._parseBuffer = new Uint32Array(4096), this._stringDecoder = new c.StringToUtf32, this._utf8Decoder = new c.Utf8ToUtf32, this._workCell = new u.CellData, this._windowTitle = "", this._iconName = "", this._windowTitleStack = [], this._iconNameStack = [], this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = l.DEFAULT_ATTR_DATA.clone(), this._onRequestBell = this.register(new d.EventEmitter), this.onRequestBell = this._onRequestBell.event, this._onRequestRefreshRows = this.register(new d.EventEmitter), this.onRequestRefreshRows = this._onRequestRefreshRows.event, this._onRequestReset = this.register(new d.EventEmitter), this.onRequestReset = this._onRequestReset.event, this._onRequestSendFocus = this.register(new d.EventEmitter), this.onRequestSendFocus = this._onRequestSendFocus.event, this._onRequestSyncScrollBar = this.register(new d.EventEmitter), this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event, this._onRequestWindowsOptionsReport = this.register(new d.EventEmitter), this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event, this._onA11yChar = this.register(new d.EventEmitter), this.onA11yChar = this._onA11yChar.event, this._onA11yTab = this.register(new d.EventEmitter), this.onA11yTab = this._onA11yTab.event, this._onCursorMove = this.register(new d.EventEmitter), this.onCursorMove = this._onCursorMove.event, this._onLineFeed = this.register(new d.EventEmitter), this.onLineFeed = this._onLineFeed.event, this._onScroll = this.register(new d.EventEmitter), this.onScroll = this._onScroll.event, this._onTitleChange = this.register(new d.EventEmitter), this.onTitleChange = this._onTitleChange.event, this._onColor = this.register(new d.EventEmitter), this.onColor = this._onColor.event, this._parseStack = {
                            paused: !1,
                            cursorStartX: 0,
                            cursorStartY: 0,
                            decodedLength: 0,
                            position: 0
                        }, this._specialColors = [
                            256,
                            257,
                            258
                        ], this.register(this._parser), this._dirtyRowTracker = new L(this._bufferService), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((e)=>this._activeBuffer = e.activeBuffer)), this._parser.setCsiHandlerFallback((e, t)=>{
                            this._logService.debug("Unknown CSI code: ", {
                                identifier: this._parser.identToString(e),
                                params: t.toArray()
                            });
                        }), this._parser.setEscHandlerFallback((e)=>{
                            this._logService.debug("Unknown ESC code: ", {
                                identifier: this._parser.identToString(e)
                            });
                        }), this._parser.setExecuteHandlerFallback((e)=>{
                            this._logService.debug("Unknown EXECUTE code: ", {
                                code: e
                            });
                        }), this._parser.setOscHandlerFallback((e, t, i)=>{
                            this._logService.debug("Unknown OSC code: ", {
                                identifier: e,
                                action: t,
                                data: i
                            });
                        }), this._parser.setDcsHandlerFallback((e, t, i)=>{
                            "HOOK" === t && (i = i.toArray()), this._logService.debug("Unknown DCS code: ", {
                                identifier: this._parser.identToString(e),
                                action: t,
                                payload: i
                            });
                        }), this._parser.setPrintHandler((e, t, i)=>this.print(e, t, i)), this._parser.registerCsiHandler({
                            final: "@"
                        }, (e)=>this.insertChars(e)), this._parser.registerCsiHandler({
                            intermediates: " ",
                            final: "@"
                        }, (e)=>this.scrollLeft(e)), this._parser.registerCsiHandler({
                            final: "A"
                        }, (e)=>this.cursorUp(e)), this._parser.registerCsiHandler({
                            intermediates: " ",
                            final: "A"
                        }, (e)=>this.scrollRight(e)), this._parser.registerCsiHandler({
                            final: "B"
                        }, (e)=>this.cursorDown(e)), this._parser.registerCsiHandler({
                            final: "C"
                        }, (e)=>this.cursorForward(e)), this._parser.registerCsiHandler({
                            final: "D"
                        }, (e)=>this.cursorBackward(e)), this._parser.registerCsiHandler({
                            final: "E"
                        }, (e)=>this.cursorNextLine(e)), this._parser.registerCsiHandler({
                            final: "F"
                        }, (e)=>this.cursorPrecedingLine(e)), this._parser.registerCsiHandler({
                            final: "G"
                        }, (e)=>this.cursorCharAbsolute(e)), this._parser.registerCsiHandler({
                            final: "H"
                        }, (e)=>this.cursorPosition(e)), this._parser.registerCsiHandler({
                            final: "I"
                        }, (e)=>this.cursorForwardTab(e)), this._parser.registerCsiHandler({
                            final: "J"
                        }, (e)=>this.eraseInDisplay(e, !1)), this._parser.registerCsiHandler({
                            prefix: "?",
                            final: "J"
                        }, (e)=>this.eraseInDisplay(e, !0)), this._parser.registerCsiHandler({
                            final: "K"
                        }, (e)=>this.eraseInLine(e, !1)), this._parser.registerCsiHandler({
                            prefix: "?",
                            final: "K"
                        }, (e)=>this.eraseInLine(e, !0)), this._parser.registerCsiHandler({
                            final: "L"
                        }, (e)=>this.insertLines(e)), this._parser.registerCsiHandler({
                            final: "M"
                        }, (e)=>this.deleteLines(e)), this._parser.registerCsiHandler({
                            final: "P"
                        }, (e)=>this.deleteChars(e)), this._parser.registerCsiHandler({
                            final: "S"
                        }, (e)=>this.scrollUp(e)), this._parser.registerCsiHandler({
                            final: "T"
                        }, (e)=>this.scrollDown(e)), this._parser.registerCsiHandler({
                            final: "X"
                        }, (e)=>this.eraseChars(e)), this._parser.registerCsiHandler({
                            final: "Z"
                        }, (e)=>this.cursorBackwardTab(e)), this._parser.registerCsiHandler({
                            final: "`"
                        }, (e)=>this.charPosAbsolute(e)), this._parser.registerCsiHandler({
                            final: "a"
                        }, (e)=>this.hPositionRelative(e)), this._parser.registerCsiHandler({
                            final: "b"
                        }, (e)=>this.repeatPrecedingCharacter(e)), this._parser.registerCsiHandler({
                            final: "c"
                        }, (e)=>this.sendDeviceAttributesPrimary(e)), this._parser.registerCsiHandler({
                            prefix: ">",
                            final: "c"
                        }, (e)=>this.sendDeviceAttributesSecondary(e)), this._parser.registerCsiHandler({
                            final: "d"
                        }, (e)=>this.linePosAbsolute(e)), this._parser.registerCsiHandler({
                            final: "e"
                        }, (e)=>this.vPositionRelative(e)), this._parser.registerCsiHandler({
                            final: "f"
                        }, (e)=>this.hVPosition(e)), this._parser.registerCsiHandler({
                            final: "g"
                        }, (e)=>this.tabClear(e)), this._parser.registerCsiHandler({
                            final: "h"
                        }, (e)=>this.setMode(e)), this._parser.registerCsiHandler({
                            prefix: "?",
                            final: "h"
                        }, (e)=>this.setModePrivate(e)), this._parser.registerCsiHandler({
                            final: "l"
                        }, (e)=>this.resetMode(e)), this._parser.registerCsiHandler({
                            prefix: "?",
                            final: "l"
                        }, (e)=>this.resetModePrivate(e)), this._parser.registerCsiHandler({
                            final: "m"
                        }, (e)=>this.charAttributes(e)), this._parser.registerCsiHandler({
                            final: "n"
                        }, (e)=>this.deviceStatus(e)), this._parser.registerCsiHandler({
                            prefix: "?",
                            final: "n"
                        }, (e)=>this.deviceStatusPrivate(e)), this._parser.registerCsiHandler({
                            intermediates: "!",
                            final: "p"
                        }, (e)=>this.softReset(e)), this._parser.registerCsiHandler({
                            intermediates: " ",
                            final: "q"
                        }, (e)=>this.setCursorStyle(e)), this._parser.registerCsiHandler({
                            final: "r"
                        }, (e)=>this.setScrollRegion(e)), this._parser.registerCsiHandler({
                            final: "s"
                        }, (e)=>this.saveCursor(e)), this._parser.registerCsiHandler({
                            final: "t"
                        }, (e)=>this.windowOptions(e)), this._parser.registerCsiHandler({
                            final: "u"
                        }, (e)=>this.restoreCursor(e)), this._parser.registerCsiHandler({
                            intermediates: "'",
                            final: "}"
                        }, (e)=>this.insertColumns(e)), this._parser.registerCsiHandler({
                            intermediates: "'",
                            final: "~"
                        }, (e)=>this.deleteColumns(e)), this._parser.registerCsiHandler({
                            intermediates: '"',
                            final: "q"
                        }, (e)=>this.selectProtected(e)), this._parser.registerCsiHandler({
                            intermediates: "$",
                            final: "p"
                        }, (e)=>this.requestMode(e, !0)), this._parser.registerCsiHandler({
                            prefix: "?",
                            intermediates: "$",
                            final: "p"
                        }, (e)=>this.requestMode(e, !1)), this._parser.setExecuteHandler(n.C0.BEL, ()=>this.bell()), this._parser.setExecuteHandler(n.C0.LF, ()=>this.lineFeed()), this._parser.setExecuteHandler(n.C0.VT, ()=>this.lineFeed()), this._parser.setExecuteHandler(n.C0.FF, ()=>this.lineFeed()), this._parser.setExecuteHandler(n.C0.CR, ()=>this.carriageReturn()), this._parser.setExecuteHandler(n.C0.BS, ()=>this.backspace()), this._parser.setExecuteHandler(n.C0.HT, ()=>this.tab()), this._parser.setExecuteHandler(n.C0.SO, ()=>this.shiftOut()), this._parser.setExecuteHandler(n.C0.SI, ()=>this.shiftIn()), this._parser.setExecuteHandler(n.C1.IND, ()=>this.index()), this._parser.setExecuteHandler(n.C1.NEL, ()=>this.nextLine()), this._parser.setExecuteHandler(n.C1.HTS, ()=>this.tabSet()), this._parser.registerOscHandler(0, new g.OscHandler((e)=>(this.setTitle(e), this.setIconName(e), !0))), this._parser.registerOscHandler(1, new g.OscHandler((e)=>this.setIconName(e))), this._parser.registerOscHandler(2, new g.OscHandler((e)=>this.setTitle(e))), this._parser.registerOscHandler(4, new g.OscHandler((e)=>this.setOrReportIndexedColor(e))), this._parser.registerOscHandler(8, new g.OscHandler((e)=>this.setHyperlink(e))), this._parser.registerOscHandler(10, new g.OscHandler((e)=>this.setOrReportFgColor(e))), this._parser.registerOscHandler(11, new g.OscHandler((e)=>this.setOrReportBgColor(e))), this._parser.registerOscHandler(12, new g.OscHandler((e)=>this.setOrReportCursorColor(e))), this._parser.registerOscHandler(104, new g.OscHandler((e)=>this.restoreIndexedColor(e))), this._parser.registerOscHandler(110, new g.OscHandler((e)=>this.restoreFgColor(e))), this._parser.registerOscHandler(111, new g.OscHandler((e)=>this.restoreBgColor(e))), this._parser.registerOscHandler(112, new g.OscHandler((e)=>this.restoreCursorColor(e))), this._parser.registerEscHandler({
                            final: "7"
                        }, ()=>this.saveCursor()), this._parser.registerEscHandler({
                            final: "8"
                        }, ()=>this.restoreCursor()), this._parser.registerEscHandler({
                            final: "D"
                        }, ()=>this.index()), this._parser.registerEscHandler({
                            final: "E"
                        }, ()=>this.nextLine()), this._parser.registerEscHandler({
                            final: "H"
                        }, ()=>this.tabSet()), this._parser.registerEscHandler({
                            final: "M"
                        }, ()=>this.reverseIndex()), this._parser.registerEscHandler({
                            final: "="
                        }, ()=>this.keypadApplicationMode()), this._parser.registerEscHandler({
                            final: ">"
                        }, ()=>this.keypadNumericMode()), this._parser.registerEscHandler({
                            final: "c"
                        }, ()=>this.fullReset()), this._parser.registerEscHandler({
                            final: "n"
                        }, ()=>this.setgLevel(2)), this._parser.registerEscHandler({
                            final: "o"
                        }, ()=>this.setgLevel(3)), this._parser.registerEscHandler({
                            final: "|"
                        }, ()=>this.setgLevel(3)), this._parser.registerEscHandler({
                            final: "}"
                        }, ()=>this.setgLevel(2)), this._parser.registerEscHandler({
                            final: "~"
                        }, ()=>this.setgLevel(1)), this._parser.registerEscHandler({
                            intermediates: "%",
                            final: "@"
                        }, ()=>this.selectDefaultCharset()), this._parser.registerEscHandler({
                            intermediates: "%",
                            final: "G"
                        }, ()=>this.selectDefaultCharset());
                        for(const e in o.CHARSETS)this._parser.registerEscHandler({
                            intermediates: "(",
                            final: e
                        }, ()=>this.selectCharset("(" + e)), this._parser.registerEscHandler({
                            intermediates: ")",
                            final: e
                        }, ()=>this.selectCharset(")" + e)), this._parser.registerEscHandler({
                            intermediates: "*",
                            final: e
                        }, ()=>this.selectCharset("*" + e)), this._parser.registerEscHandler({
                            intermediates: "+",
                            final: e
                        }, ()=>this.selectCharset("+" + e)), this._parser.registerEscHandler({
                            intermediates: "-",
                            final: e
                        }, ()=>this.selectCharset("-" + e)), this._parser.registerEscHandler({
                            intermediates: ".",
                            final: e
                        }, ()=>this.selectCharset("." + e)), this._parser.registerEscHandler({
                            intermediates: "/",
                            final: e
                        }, ()=>this.selectCharset("/" + e));
                        this._parser.registerEscHandler({
                            intermediates: "#",
                            final: "8"
                        }, ()=>this.screenAlignmentPattern()), this._parser.setErrorHandler((e)=>(this._logService.error("Parsing error: ", e), e)), this._parser.registerDcsHandler({
                            intermediates: "$",
                            final: "q"
                        }, new p.DcsHandler((e, t)=>this.requestStatusString(e, t)));
                    }
                    getAttrData() {
                        return this._curAttrData;
                    }
                    _preserveStack(e, t, i, s) {
                        this._parseStack.paused = !0, this._parseStack.cursorStartX = e, this._parseStack.cursorStartY = t, this._parseStack.decodedLength = i, this._parseStack.position = s;
                    }
                    _logSlowResolvingAsync(e) {
                        this._logService.logLevel <= v.LogLevelEnum.WARN && Promise.race([
                            e,
                            new Promise((e, t)=>setTimeout(()=>t("#SLOW_TIMEOUT"), 5e3))
                        ]).catch((e)=>{
                            if ("#SLOW_TIMEOUT" !== e) throw e;
                            console.warn("async parser handler taking longer than 5000 ms");
                        });
                    }
                    _getCurrentLinkId() {
                        return this._curAttrData.extended.urlId;
                    }
                    parse(e, t) {
                        let i, s = this._activeBuffer.x, r = this._activeBuffer.y, n = 0;
                        const o = this._parseStack.paused;
                        if (o) {
                            if (i = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, t)) return this._logSlowResolvingAsync(i), i;
                            s = this._parseStack.cursorStartX, r = this._parseStack.cursorStartY, this._parseStack.paused = !1, e.length > C && (n = this._parseStack.position + C);
                        }
                        if (this._logService.logLevel <= v.LogLevelEnum.DEBUG && this._logService.debug("parsing data" + ("string" == typeof e ? ` "${e}"` : ` "${Array.prototype.map.call(e, (e)=>String.fromCharCode(e)).join("")}"`), "string" == typeof e ? e.split("").map((e)=>e.charCodeAt(0)) : e), this._parseBuffer.length < e.length && this._parseBuffer.length < C && (this._parseBuffer = new Uint32Array(Math.min(e.length, C))), o || this._dirtyRowTracker.clearRange(), e.length > C) for(let t = n; t < e.length; t += C){
                            const n = t + C < e.length ? t + C : e.length, o = "string" == typeof e ? this._stringDecoder.decode(e.substring(t, n), this._parseBuffer) : this._utf8Decoder.decode(e.subarray(t, n), this._parseBuffer);
                            if (i = this._parser.parse(this._parseBuffer, o)) return this._preserveStack(s, r, o, t), this._logSlowResolvingAsync(i), i;
                        }
                        else if (!o) {
                            const t = "string" == typeof e ? this._stringDecoder.decode(e, this._parseBuffer) : this._utf8Decoder.decode(e, this._parseBuffer);
                            if (i = this._parser.parse(this._parseBuffer, t)) return this._preserveStack(s, r, t, 0), this._logSlowResolvingAsync(i), i;
                        }
                        this._activeBuffer.x === s && this._activeBuffer.y === r || this._onCursorMove.fire(), this._onRequestRefreshRows.fire(this._dirtyRowTracker.start, this._dirtyRowTracker.end);
                    }
                    print(e, t, i) {
                        let s, r;
                        const n = this._charsetService.charset, o = this._optionsService.rawOptions.screenReaderMode, a = this._bufferService.cols, h = this._coreService.decPrivateModes.wraparound, l = this._coreService.modes.insertMode, d = this._curAttrData;
                        let u = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                        this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && i - t > 0 && 2 === u.getWidth(this._activeBuffer.x - 1) && u.setCellFromCodePoint(this._activeBuffer.x - 1, 0, 1, d.fg, d.bg, d.extended);
                        for(let f = t; f < i; ++f){
                            if (s = e[f], r = this._unicodeService.wcwidth(s), s < 127 && n) {
                                const e = n[String.fromCharCode(s)];
                                e && (s = e.charCodeAt(0));
                            }
                            if (o && this._onA11yChar.fire((0, c.stringFromCodePoint)(s)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), r || !this._activeBuffer.x) {
                                if (this._activeBuffer.x + r - 1 >= a) {
                                    if (h) {
                                        for(; this._activeBuffer.x < a;)u.setCellFromCodePoint(this._activeBuffer.x++, 0, 1, d.fg, d.bg, d.extended);
                                        this._activeBuffer.x = 0, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), !0)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !0), u = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                                    } else if (this._activeBuffer.x = a - 1, 2 === r) continue;
                                }
                                if (l && (u.insertCells(this._activeBuffer.x, r, this._activeBuffer.getNullCell(d), d), 2 === u.getWidth(a - 1) && u.setCellFromCodePoint(a - 1, _.NULL_CELL_CODE, _.NULL_CELL_WIDTH, d.fg, d.bg, d.extended)), u.setCellFromCodePoint(this._activeBuffer.x++, s, r, d.fg, d.bg, d.extended), r > 0) for(; --r;)u.setCellFromCodePoint(this._activeBuffer.x++, 0, 0, d.fg, d.bg, d.extended);
                            } else u.getWidth(this._activeBuffer.x - 1) ? u.addCodepointToCell(this._activeBuffer.x - 1, s) : u.addCodepointToCell(this._activeBuffer.x - 2, s);
                        }
                        i - t > 0 && (u.loadCell(this._activeBuffer.x - 1, this._workCell), 2 === this._workCell.getWidth() || this._workCell.getCode() > 65535 ? this._parser.precedingCodepoint = 0 : this._workCell.isCombined() ? this._parser.precedingCodepoint = this._workCell.getChars().charCodeAt(0) : this._parser.precedingCodepoint = this._workCell.content), this._activeBuffer.x < a && i - t > 0 && 0 === u.getWidth(this._activeBuffer.x) && !u.hasContent(this._activeBuffer.x) && u.setCellFromCodePoint(this._activeBuffer.x, 0, 1, d.fg, d.bg, d.extended), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
                    }
                    registerCsiHandler(e, t) {
                        return "t" !== e.final || e.prefix || e.intermediates ? this._parser.registerCsiHandler(e, t) : this._parser.registerCsiHandler(e, (e)=>!b(e.params[0], this._optionsService.rawOptions.windowOptions) || t(e));
                    }
                    registerDcsHandler(e, t) {
                        return this._parser.registerDcsHandler(e, new p.DcsHandler(t));
                    }
                    registerEscHandler(e, t) {
                        return this._parser.registerEscHandler(e, t);
                    }
                    registerOscHandler(e, t) {
                        return this._parser.registerOscHandler(e, new g.OscHandler(t));
                    }
                    bell() {
                        return this._onRequestBell.fire(), !0;
                    }
                    lineFeed() {
                        return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), !0;
                    }
                    carriageReturn() {
                        return this._activeBuffer.x = 0, !0;
                    }
                    backspace() {
                        var e;
                        if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, !0;
                        if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
                        else if (0 === this._activeBuffer.x && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && (null === (e = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)) || void 0 === e ? void 0 : e.isWrapped)) {
                            this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !1, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
                            const e = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                            e.hasWidth(this._activeBuffer.x) && !e.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
                        }
                        return this._restrictCursor(), !0;
                    }
                    tab() {
                        if (this._activeBuffer.x >= this._bufferService.cols) return !0;
                        const e = this._activeBuffer.x;
                        return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e), !0;
                    }
                    shiftOut() {
                        return this._charsetService.setgLevel(1), !0;
                    }
                    shiftIn() {
                        return this._charsetService.setgLevel(0), !0;
                    }
                    _restrictCursor(e = this._bufferService.cols - 1) {
                        this._activeBuffer.x = Math.min(e, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
                    }
                    _setCursor(e, t) {
                        this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e, this._activeBuffer.y = this._activeBuffer.scrollTop + t) : (this._activeBuffer.x = e, this._activeBuffer.y = t), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
                    }
                    _moveCursor(e, t) {
                        this._restrictCursor(), this._setCursor(this._activeBuffer.x + e, this._activeBuffer.y + t);
                    }
                    cursorUp(e) {
                        const t = this._activeBuffer.y - this._activeBuffer.scrollTop;
                        return t >= 0 ? this._moveCursor(0, -Math.min(t, e.params[0] || 1)) : this._moveCursor(0, -(e.params[0] || 1)), !0;
                    }
                    cursorDown(e) {
                        const t = this._activeBuffer.scrollBottom - this._activeBuffer.y;
                        return t >= 0 ? this._moveCursor(0, Math.min(t, e.params[0] || 1)) : this._moveCursor(0, e.params[0] || 1), !0;
                    }
                    cursorForward(e) {
                        return this._moveCursor(e.params[0] || 1, 0), !0;
                    }
                    cursorBackward(e) {
                        return this._moveCursor(-(e.params[0] || 1), 0), !0;
                    }
                    cursorNextLine(e) {
                        return this.cursorDown(e), this._activeBuffer.x = 0, !0;
                    }
                    cursorPrecedingLine(e) {
                        return this.cursorUp(e), this._activeBuffer.x = 0, !0;
                    }
                    cursorCharAbsolute(e) {
                        return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), !0;
                    }
                    cursorPosition(e) {
                        return this._setCursor(e.length >= 2 ? (e.params[1] || 1) - 1 : 0, (e.params[0] || 1) - 1), !0;
                    }
                    charPosAbsolute(e) {
                        return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), !0;
                    }
                    hPositionRelative(e) {
                        return this._moveCursor(e.params[0] || 1, 0), !0;
                    }
                    linePosAbsolute(e) {
                        return this._setCursor(this._activeBuffer.x, (e.params[0] || 1) - 1), !0;
                    }
                    vPositionRelative(e) {
                        return this._moveCursor(0, e.params[0] || 1), !0;
                    }
                    hVPosition(e) {
                        return this.cursorPosition(e), !0;
                    }
                    tabClear(e) {
                        const t = e.params[0];
                        return 0 === t ? delete this._activeBuffer.tabs[this._activeBuffer.x] : 3 === t && (this._activeBuffer.tabs = {}), !0;
                    }
                    cursorForwardTab(e) {
                        if (this._activeBuffer.x >= this._bufferService.cols) return !0;
                        let t = e.params[0] || 1;
                        for(; t--;)this._activeBuffer.x = this._activeBuffer.nextStop();
                        return !0;
                    }
                    cursorBackwardTab(e) {
                        if (this._activeBuffer.x >= this._bufferService.cols) return !0;
                        let t = e.params[0] || 1;
                        for(; t--;)this._activeBuffer.x = this._activeBuffer.prevStop();
                        return !0;
                    }
                    selectProtected(e) {
                        const t = e.params[0];
                        return 1 === t && (this._curAttrData.bg |= 536870912), 2 !== t && 0 !== t || (this._curAttrData.bg &= -536870913), !0;
                    }
                    _eraseInBufferLine(e, t, i, s = !1, r = !1) {
                        const n = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
                        n.replaceCells(t, i, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData(), r), s && (n.isWrapped = !1);
                    }
                    _resetBufferLine(e, t = !1) {
                        const i = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
                        i.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), t), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e), i.isWrapped = !1;
                    }
                    eraseInDisplay(e, t = !1) {
                        let i;
                        switch(this._restrictCursor(this._bufferService.cols), e.params[0]){
                            case 0:
                                for(i = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i), this._eraseInBufferLine(i++, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t); i < this._bufferService.rows; i++)this._resetBufferLine(i, t);
                                this._dirtyRowTracker.markDirty(i);
                                break;
                            case 1:
                                for(i = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i), this._eraseInBufferLine(i, 0, this._activeBuffer.x + 1, !0, t), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(i + 1).isWrapped = !1); i--;)this._resetBufferLine(i, t);
                                this._dirtyRowTracker.markDirty(0);
                                break;
                            case 2:
                                for(i = this._bufferService.rows, this._dirtyRowTracker.markDirty(i - 1); i--;)this._resetBufferLine(i, t);
                                this._dirtyRowTracker.markDirty(0);
                                break;
                            case 3:
                                const e1 = this._activeBuffer.lines.length - this._bufferService.rows;
                                e1 > 0 && (this._activeBuffer.lines.trimStart(e1), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - e1, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - e1, 0), this._onScroll.fire(0));
                        }
                        return !0;
                    }
                    eraseInLine(e, t = !1) {
                        switch(this._restrictCursor(this._bufferService.cols), e.params[0]){
                            case 0:
                                this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t);
                                break;
                            case 1:
                                this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, !1, t);
                                break;
                            case 2:
                                this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, !0, t);
                        }
                        return this._dirtyRowTracker.markDirty(this._activeBuffer.y), !0;
                    }
                    insertLines(e) {
                        this._restrictCursor();
                        let t = e.params[0] || 1;
                        if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
                        const i = this._activeBuffer.ybase + this._activeBuffer.y, s = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, r = this._bufferService.rows - 1 + this._activeBuffer.ybase - s + 1;
                        for(; t--;)this._activeBuffer.lines.splice(r - 1, 1), this._activeBuffer.lines.splice(i, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
                        return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, !0;
                    }
                    deleteLines(e) {
                        this._restrictCursor();
                        let t = e.params[0] || 1;
                        if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
                        const i = this._activeBuffer.ybase + this._activeBuffer.y;
                        let s;
                        for(s = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, s = this._bufferService.rows - 1 + this._activeBuffer.ybase - s; t--;)this._activeBuffer.lines.splice(i, 1), this._activeBuffer.lines.splice(s, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
                        return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, !0;
                    }
                    insertChars(e) {
                        this._restrictCursor();
                        const t = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                        return t && (t.insertCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
                    }
                    deleteChars(e) {
                        this._restrictCursor();
                        const t = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                        return t && (t.deleteCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
                    }
                    scrollUp(e) {
                        let t = e.params[0] || 1;
                        for(; t--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
                        return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
                    }
                    scrollDown(e) {
                        let t = e.params[0] || 1;
                        for(; t--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(l.DEFAULT_ATTR_DATA));
                        return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
                    }
                    scrollLeft(e) {
                        if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
                        const t = e.params[0] || 1;
                        for(let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e){
                            const i = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
                            i.deleteCells(0, t, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i.isWrapped = !1;
                        }
                        return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
                    }
                    scrollRight(e) {
                        if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
                        const t = e.params[0] || 1;
                        for(let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e){
                            const i = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
                            i.insertCells(0, t, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i.isWrapped = !1;
                        }
                        return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
                    }
                    insertColumns(e) {
                        if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
                        const t = e.params[0] || 1;
                        for(let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e){
                            const i = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
                            i.insertCells(this._activeBuffer.x, t, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i.isWrapped = !1;
                        }
                        return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
                    }
                    deleteColumns(e) {
                        if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
                        const t = e.params[0] || 1;
                        for(let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e){
                            const i = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
                            i.deleteCells(this._activeBuffer.x, t, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i.isWrapped = !1;
                        }
                        return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
                    }
                    eraseChars(e) {
                        this._restrictCursor();
                        const t = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                        return t && (t.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
                    }
                    repeatPrecedingCharacter(e) {
                        if (!this._parser.precedingCodepoint) return !0;
                        const t = e.params[0] || 1, i = new Uint32Array(t);
                        for(let e = 0; e < t; ++e)i[e] = this._parser.precedingCodepoint;
                        return this.print(i, 0, i.length), !0;
                    }
                    sendDeviceAttributesPrimary(e) {
                        return e.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(n.C0.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(n.C0.ESC + "[?6c")), !0;
                    }
                    sendDeviceAttributesSecondary(e) {
                        return e.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(n.C0.ESC + "[>83;40003;0c")), !0;
                    }
                    _is(e) {
                        return 0 === (this._optionsService.rawOptions.termName + "").indexOf(e);
                    }
                    setMode(e) {
                        for(let t = 0; t < e.length; t++)switch(e.params[t]){
                            case 4:
                                this._coreService.modes.insertMode = !0;
                                break;
                            case 20:
                                this._optionsService.options.convertEol = !0;
                        }
                        return !0;
                    }
                    setModePrivate(e) {
                        for(let t = 0; t < e.length; t++)switch(e.params[t]){
                            case 1:
                                this._coreService.decPrivateModes.applicationCursorKeys = !0;
                                break;
                            case 2:
                                this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), this._charsetService.setgCharset(1, o.DEFAULT_CHARSET), this._charsetService.setgCharset(2, o.DEFAULT_CHARSET), this._charsetService.setgCharset(3, o.DEFAULT_CHARSET);
                                break;
                            case 3:
                                this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
                                break;
                            case 6:
                                this._coreService.decPrivateModes.origin = !0, this._setCursor(0, 0);
                                break;
                            case 7:
                                this._coreService.decPrivateModes.wraparound = !0;
                                break;
                            case 12:
                                this._optionsService.options.cursorBlink = !0;
                                break;
                            case 45:
                                this._coreService.decPrivateModes.reverseWraparound = !0;
                                break;
                            case 66:
                                this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = !0, this._onRequestSyncScrollBar.fire();
                                break;
                            case 9:
                                this._coreMouseService.activeProtocol = "X10";
                                break;
                            case 1e3:
                                this._coreMouseService.activeProtocol = "VT200";
                                break;
                            case 1002:
                                this._coreMouseService.activeProtocol = "DRAG";
                                break;
                            case 1003:
                                this._coreMouseService.activeProtocol = "ANY";
                                break;
                            case 1004:
                                this._coreService.decPrivateModes.sendFocus = !0, this._onRequestSendFocus.fire();
                                break;
                            case 1005:
                                this._logService.debug("DECSET 1005 not supported (see #2507)");
                                break;
                            case 1006:
                                this._coreMouseService.activeEncoding = "SGR";
                                break;
                            case 1015:
                                this._logService.debug("DECSET 1015 not supported (see #2507)");
                                break;
                            case 1016:
                                this._coreMouseService.activeEncoding = "SGR_PIXELS";
                                break;
                            case 25:
                                this._coreService.isCursorHidden = !1;
                                break;
                            case 1048:
                                this.saveCursor();
                                break;
                            case 1049:
                                this.saveCursor();
                            case 47:
                            case 1047:
                                this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = !0, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
                                break;
                            case 2004:
                                this._coreService.decPrivateModes.bracketedPasteMode = !0;
                        }
                        return !0;
                    }
                    resetMode(e) {
                        for(let t = 0; t < e.length; t++)switch(e.params[t]){
                            case 4:
                                this._coreService.modes.insertMode = !1;
                                break;
                            case 20:
                                this._optionsService.options.convertEol = !1;
                        }
                        return !0;
                    }
                    resetModePrivate(e) {
                        for(let t = 0; t < e.length; t++)switch(e.params[t]){
                            case 1:
                                this._coreService.decPrivateModes.applicationCursorKeys = !1;
                                break;
                            case 3:
                                this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
                                break;
                            case 6:
                                this._coreService.decPrivateModes.origin = !1, this._setCursor(0, 0);
                                break;
                            case 7:
                                this._coreService.decPrivateModes.wraparound = !1;
                                break;
                            case 12:
                                this._optionsService.options.cursorBlink = !1;
                                break;
                            case 45:
                                this._coreService.decPrivateModes.reverseWraparound = !1;
                                break;
                            case 66:
                                this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = !1, this._onRequestSyncScrollBar.fire();
                                break;
                            case 9:
                            case 1e3:
                            case 1002:
                            case 1003:
                                this._coreMouseService.activeProtocol = "NONE";
                                break;
                            case 1004:
                                this._coreService.decPrivateModes.sendFocus = !1;
                                break;
                            case 1005:
                                this._logService.debug("DECRST 1005 not supported (see #2507)");
                                break;
                            case 1006:
                            case 1016:
                                this._coreMouseService.activeEncoding = "DEFAULT";
                                break;
                            case 1015:
                                this._logService.debug("DECRST 1015 not supported (see #2507)");
                                break;
                            case 25:
                                this._coreService.isCursorHidden = !0;
                                break;
                            case 1048:
                                this.restoreCursor();
                                break;
                            case 1049:
                            case 47:
                            case 1047:
                                this._bufferService.buffers.activateNormalBuffer(), 1049 === e.params[t] && this.restoreCursor(), this._coreService.isCursorInitialized = !0, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
                                break;
                            case 2004:
                                this._coreService.decPrivateModes.bracketedPasteMode = !1;
                        }
                        return !0;
                    }
                    requestMode(e, t) {
                        const i = this._coreService.decPrivateModes, { activeProtocol: s , activeEncoding: r  } = this._coreMouseService, o = this._coreService, { buffers: a , cols: h  } = this._bufferService, { active: c , alt: l  } = a, d = this._optionsService.rawOptions, _ = (e)=>e ? 1 : 2, u = e.params[0];
                        var f, v;
                        return f = u, v = t ? 2 === u ? 3 : 4 === u ? _(o.modes.insertMode) : 12 === u ? 4 : 20 === u ? _(d.convertEol) : 0 : 1 === u ? _(i.applicationCursorKeys) : 3 === u ? d.windowOptions.setWinLines ? 80 === h ? 2 : 132 === h ? 1 : 0 : 0 : 6 === u ? _(i.origin) : 7 === u ? _(i.wraparound) : 8 === u ? 3 : 9 === u ? _("X10" === s) : 12 === u ? _(d.cursorBlink) : 25 === u ? _(!o.isCursorHidden) : 45 === u ? _(i.reverseWraparound) : 66 === u ? _(i.applicationKeypad) : 1e3 === u ? _("VT200" === s) : 1002 === u ? _("DRAG" === s) : 1003 === u ? _("ANY" === s) : 1004 === u ? _(i.sendFocus) : 1005 === u ? 4 : 1006 === u ? _("SGR" === r) : 1015 === u ? 4 : 1016 === u ? _("SGR_PIXELS" === r) : 1048 === u ? 1 : 47 === u || 1047 === u || 1049 === u ? _(c === l) : 2004 === u ? _(i.bracketedPasteMode) : 0, o.triggerDataEvent(`${n.C0.ESC}[${t ? "" : "?"}${f};${v}$y`), !0;
                    }
                    _updateAttrColor(e, t, i, s, r) {
                        return 2 === t ? (e |= 50331648, e &= -16777216, e |= f.AttributeData.fromColorRGB([
                            i,
                            s,
                            r
                        ])) : 5 === t && (e &= -50331904, e |= 33554432 | 255 & i), e;
                    }
                    _extractColor(e, t, i) {
                        const s = [
                            0,
                            0,
                            -1,
                            0,
                            0,
                            0
                        ];
                        let r = 0, n = 0;
                        do {
                            if (s[n + r] = e.params[t + n], e.hasSubParams(t + n)) {
                                const i = e.getSubParams(t + n);
                                let o = 0;
                                do 5 === s[1] && (r = 1), s[n + o + 1 + r] = i[o];
                                while (++o < i.length && o + n + 1 + r < s.length);
                                break;
                            }
                            if (5 === s[1] && n + r >= 2 || 2 === s[1] && n + r >= 5) break;
                            s[1] && (r = 1);
                        }while (++n + t < e.length && n + r < s.length);
                        for(let e = 2; e < s.length; ++e)-1 === s[e] && (s[e] = 0);
                        switch(s[0]){
                            case 38:
                                i.fg = this._updateAttrColor(i.fg, s[1], s[3], s[4], s[5]);
                                break;
                            case 48:
                                i.bg = this._updateAttrColor(i.bg, s[1], s[3], s[4], s[5]);
                                break;
                            case 58:
                                i.extended = i.extended.clone(), i.extended.underlineColor = this._updateAttrColor(i.extended.underlineColor, s[1], s[3], s[4], s[5]);
                        }
                        return n;
                    }
                    _processUnderline(e, t) {
                        t.extended = t.extended.clone(), (!~e || e > 5) && (e = 1), t.extended.underlineStyle = e, t.fg |= 268435456, 0 === e && (t.fg &= -268435457), t.updateExtended();
                    }
                    _processSGR0(e) {
                        e.fg = l.DEFAULT_ATTR_DATA.fg, e.bg = l.DEFAULT_ATTR_DATA.bg, e.extended = e.extended.clone(), e.extended.underlineStyle = 0, e.extended.underlineColor &= -67108864, e.updateExtended();
                    }
                    charAttributes(e) {
                        if (1 === e.length && 0 === e.params[0]) return this._processSGR0(this._curAttrData), !0;
                        const t = e.length;
                        let i;
                        const s = this._curAttrData;
                        for(let r = 0; r < t; r++)i = e.params[r], i >= 30 && i <= 37 ? (s.fg &= -50331904, s.fg |= 16777216 | i - 30) : i >= 40 && i <= 47 ? (s.bg &= -50331904, s.bg |= 16777216 | i - 40) : i >= 90 && i <= 97 ? (s.fg &= -50331904, s.fg |= 16777224 | i - 90) : i >= 100 && i <= 107 ? (s.bg &= -50331904, s.bg |= 16777224 | i - 100) : 0 === i ? this._processSGR0(s) : 1 === i ? s.fg |= 134217728 : 3 === i ? s.bg |= 67108864 : 4 === i ? (s.fg |= 268435456, this._processUnderline(e.hasSubParams(r) ? e.getSubParams(r)[0] : 1, s)) : 5 === i ? s.fg |= 536870912 : 7 === i ? s.fg |= 67108864 : 8 === i ? s.fg |= 1073741824 : 9 === i ? s.fg |= 2147483648 : 2 === i ? s.bg |= 134217728 : 21 === i ? this._processUnderline(2, s) : 22 === i ? (s.fg &= -134217729, s.bg &= -134217729) : 23 === i ? s.bg &= -67108865 : 24 === i ? (s.fg &= -268435457, this._processUnderline(0, s)) : 25 === i ? s.fg &= -536870913 : 27 === i ? s.fg &= -67108865 : 28 === i ? s.fg &= -1073741825 : 29 === i ? s.fg &= 2147483647 : 39 === i ? (s.fg &= -67108864, s.fg |= 16777215 & l.DEFAULT_ATTR_DATA.fg) : 49 === i ? (s.bg &= -67108864, s.bg |= 16777215 & l.DEFAULT_ATTR_DATA.bg) : 38 === i || 48 === i || 58 === i ? r += this._extractColor(e, r, s) : 59 === i ? (s.extended = s.extended.clone(), s.extended.underlineColor = -1, s.updateExtended()) : 100 === i ? (s.fg &= -67108864, s.fg |= 16777215 & l.DEFAULT_ATTR_DATA.fg, s.bg &= -67108864, s.bg |= 16777215 & l.DEFAULT_ATTR_DATA.bg) : this._logService.debug("Unknown SGR attribute: %d.", i);
                        return !0;
                    }
                    deviceStatus(e) {
                        switch(e.params[0]){
                            case 5:
                                this._coreService.triggerDataEvent(`${n.C0.ESC}[0n`);
                                break;
                            case 6:
                                const e1 = this._activeBuffer.y + 1, t = this._activeBuffer.x + 1;
                                this._coreService.triggerDataEvent(`${n.C0.ESC}[${e1};${t}R`);
                        }
                        return !0;
                    }
                    deviceStatusPrivate(e) {
                        if (6 === e.params[0]) {
                            const e = this._activeBuffer.y + 1, t = this._activeBuffer.x + 1;
                            this._coreService.triggerDataEvent(`${n.C0.ESC}[?${e};${t}R`);
                        }
                        return !0;
                    }
                    softReset(e) {
                        return this._coreService.isCursorHidden = !1, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = !1, !0;
                    }
                    setCursorStyle(e) {
                        const t = e.params[0] || 1;
                        switch(t){
                            case 1:
                            case 2:
                                this._optionsService.options.cursorStyle = "block";
                                break;
                            case 3:
                            case 4:
                                this._optionsService.options.cursorStyle = "underline";
                                break;
                            case 5:
                            case 6:
                                this._optionsService.options.cursorStyle = "bar";
                        }
                        const i = t % 2 == 1;
                        return this._optionsService.options.cursorBlink = i, !0;
                    }
                    setScrollRegion(e) {
                        const t = e.params[0] || 1;
                        let i;
                        return (e.length < 2 || (i = e.params[1]) > this._bufferService.rows || 0 === i) && (i = this._bufferService.rows), i > t && (this._activeBuffer.scrollTop = t - 1, this._activeBuffer.scrollBottom = i - 1, this._setCursor(0, 0)), !0;
                    }
                    windowOptions(e) {
                        if (!b(e.params[0], this._optionsService.rawOptions.windowOptions)) return !0;
                        const t = e.length > 1 ? e.params[1] : 0;
                        switch(e.params[0]){
                            case 14:
                                2 !== t && this._onRequestWindowsOptionsReport.fire(y.GET_WIN_SIZE_PIXELS);
                                break;
                            case 16:
                                this._onRequestWindowsOptionsReport.fire(y.GET_CELL_SIZE_PIXELS);
                                break;
                            case 18:
                                this._bufferService && this._coreService.triggerDataEvent(`${n.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
                                break;
                            case 22:
                                0 !== t && 2 !== t || (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > 10 && this._windowTitleStack.shift()), 0 !== t && 1 !== t || (this._iconNameStack.push(this._iconName), this._iconNameStack.length > 10 && this._iconNameStack.shift());
                                break;
                            case 23:
                                0 !== t && 2 !== t || this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), 0 !== t && 1 !== t || this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
                        }
                        return !0;
                    }
                    saveCursor(e) {
                        return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, !0;
                    }
                    restoreCursor(e) {
                        return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), !0;
                    }
                    setTitle(e) {
                        return this._windowTitle = e, this._onTitleChange.fire(e), !0;
                    }
                    setIconName(e) {
                        return this._iconName = e, !0;
                    }
                    setOrReportIndexedColor(e) {
                        const t = [], i = e.split(";");
                        for(; i.length > 1;){
                            const e = i.shift(), s = i.shift();
                            if (/^\d+$/.exec(e)) {
                                const i = parseInt(e);
                                if (0 <= i && i < 256) {
                                    if ("?" === s) t.push({
                                        type: 0,
                                        index: i
                                    });
                                    else {
                                        const e = (0, S.parseColor)(s);
                                        e && t.push({
                                            type: 1,
                                            index: i,
                                            color: e
                                        });
                                    }
                                }
                            }
                        }
                        return t.length && this._onColor.fire(t), !0;
                    }
                    setHyperlink(e) {
                        const t = e.split(";");
                        return !(t.length < 2) && (t[1] ? this._createHyperlink(t[0], t[1]) : !t[0] && this._finishHyperlink());
                    }
                    _createHyperlink(e, t) {
                        this._getCurrentLinkId() && this._finishHyperlink();
                        const i = e.split(":");
                        let s;
                        const r = i.findIndex((e)=>e.startsWith("id="));
                        return -1 !== r && (s = i[r].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({
                            id: s,
                            uri: t
                        }), this._curAttrData.updateExtended(), !0;
                    }
                    _finishHyperlink() {
                        return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), !0;
                    }
                    _setOrReportSpecialColor(e, t) {
                        const i = e.split(";");
                        for(let e = 0; e < i.length && !(t >= this._specialColors.length); ++e, ++t)if ("?" === i[e]) this._onColor.fire([
                            {
                                type: 0,
                                index: this._specialColors[t]
                            }
                        ]);
                        else {
                            const s = (0, S.parseColor)(i[e]);
                            s && this._onColor.fire([
                                {
                                    type: 1,
                                    index: this._specialColors[t],
                                    color: s
                                }
                            ]);
                        }
                        return !0;
                    }
                    setOrReportFgColor(e) {
                        return this._setOrReportSpecialColor(e, 0);
                    }
                    setOrReportBgColor(e) {
                        return this._setOrReportSpecialColor(e, 1);
                    }
                    setOrReportCursorColor(e) {
                        return this._setOrReportSpecialColor(e, 2);
                    }
                    restoreIndexedColor(e) {
                        if (!e) return this._onColor.fire([
                            {
                                type: 2
                            }
                        ]), !0;
                        const t = [], i = e.split(";");
                        for(let e = 0; e < i.length; ++e)if (/^\d+$/.exec(i[e])) {
                            const s = parseInt(i[e]);
                            0 <= s && s < 256 && t.push({
                                type: 2,
                                index: s
                            });
                        }
                        return t.length && this._onColor.fire(t), !0;
                    }
                    restoreFgColor(e) {
                        return this._onColor.fire([
                            {
                                type: 2,
                                index: 256
                            }
                        ]), !0;
                    }
                    restoreBgColor(e) {
                        return this._onColor.fire([
                            {
                                type: 2,
                                index: 257
                            }
                        ]), !0;
                    }
                    restoreCursorColor(e) {
                        return this._onColor.fire([
                            {
                                type: 2,
                                index: 258
                            }
                        ]), !0;
                    }
                    nextLine() {
                        return this._activeBuffer.x = 0, this.index(), !0;
                    }
                    keypadApplicationMode() {
                        return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = !0, this._onRequestSyncScrollBar.fire(), !0;
                    }
                    keypadNumericMode() {
                        return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = !1, this._onRequestSyncScrollBar.fire(), !0;
                    }
                    selectDefaultCharset() {
                        return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), !0;
                    }
                    selectCharset(e) {
                        return 2 !== e.length ? (this.selectDefaultCharset(), !0) : ("/" === e[0] || this._charsetService.setgCharset(m[e[0]], o.CHARSETS[e[1]] || o.DEFAULT_CHARSET), !0);
                    }
                    index() {
                        return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), !0;
                    }
                    tabSet() {
                        return this._activeBuffer.tabs[this._activeBuffer.x] = !0, !0;
                    }
                    reverseIndex() {
                        if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
                            const e = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
                            this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
                        } else this._activeBuffer.y--, this._restrictCursor();
                        return !0;
                    }
                    fullReset() {
                        return this._parser.reset(), this._onRequestReset.fire(), !0;
                    }
                    reset() {
                        this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = l.DEFAULT_ATTR_DATA.clone();
                    }
                    _eraseAttrData() {
                        return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= 67108863 & this._curAttrData.bg, this._eraseAttrDataInternal;
                    }
                    setgLevel(e) {
                        return this._charsetService.setgLevel(e), !0;
                    }
                    screenAlignmentPattern() {
                        const e = new u.CellData;
                        e.content = 4194304 | "E".charCodeAt(0), e.fg = this._curAttrData.fg, e.bg = this._curAttrData.bg, this._setCursor(0, 0);
                        for(let t = 0; t < this._bufferService.rows; ++t){
                            const i = this._activeBuffer.ybase + this._activeBuffer.y + t, s = this._activeBuffer.lines.get(i);
                            s && (s.fill(e), s.isWrapped = !1);
                        }
                        return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), !0;
                    }
                    requestStatusString(e, t) {
                        const i = this._bufferService.buffer, s = this._optionsService.rawOptions;
                        return ((e)=>(this._coreService.triggerDataEvent(`${n.C0.ESC}${e}${n.C0.ESC}\\`), !0))('"q' === e ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : '"p' === e ? 'P1$r61;1"p' : "r" === e ? `P1$r${i.scrollTop + 1};${i.scrollBottom + 1}r` : "m" === e ? "P1$r0m" : " q" === e ? `P1$r${({
                            block: 2,
                            underline: 4,
                            bar: 6
                        })[s.cursorStyle] - (s.cursorBlink ? 1 : 0)} q` : "P0$r");
                    }
                    markRangeDirty(e, t) {
                        this._dirtyRowTracker.markRangeDirty(e, t);
                    }
                }
                t.InputHandler = E;
                let L = class {
                    constructor(e){
                        this._bufferService = e, this.clearRange();
                    }
                    clearRange() {
                        this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
                    }
                    markDirty(e) {
                        e < this.start ? this.start = e : e > this.end && (this.end = e);
                    }
                    markRangeDirty(e, t) {
                        e > t && (w = e, e = t, t = w), e < this.start && (this.start = e), t > this.end && (this.end = t);
                    }
                    markAllDirty() {
                        this.markRangeDirty(0, this._bufferService.rows - 1);
                    }
                };
                L = s([
                    r(0, v.IBufferService)
                ], L);
            },
            844: (e, t)=>{
                function i(e) {
                    for (const t of e)t.dispose();
                    e.length = 0;
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.getDisposeArrayDisposable = t.disposeArray = t.toDisposable = t.Disposable = void 0, t.Disposable = class {
                    constructor(){
                        this._disposables = [], this._isDisposed = !1;
                    }
                    dispose() {
                        this._isDisposed = !0;
                        for (const e of this._disposables)e.dispose();
                        this._disposables.length = 0;
                    }
                    register(e) {
                        return this._disposables.push(e), e;
                    }
                    unregister(e) {
                        const t = this._disposables.indexOf(e);
                        -1 !== t && this._disposables.splice(t, 1);
                    }
                }, t.toDisposable = function(e) {
                    return {
                        dispose: e
                    };
                }, t.disposeArray = i, t.getDisposeArrayDisposable = function(e) {
                    return {
                        dispose: ()=>i(e)
                    };
                };
            },
            1505: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.FourKeyMap = t.TwoKeyMap = void 0;
                class i {
                    constructor(){
                        this._data = {};
                    }
                    set(e, t, i) {
                        this._data[e] || (this._data[e] = {}), this._data[e][t] = i;
                    }
                    get(e, t) {
                        return this._data[e] ? this._data[e][t] : void 0;
                    }
                    clear() {
                        this._data = {};
                    }
                }
                t.TwoKeyMap = i, t.FourKeyMap = class {
                    constructor(){
                        this._data = new i;
                    }
                    set(e, t, s, r, n) {
                        this._data.get(e, t) || this._data.set(e, t, new i), this._data.get(e, t).set(s, r, n);
                    }
                    get(e, t, i, s) {
                        var r;
                        return null === (r = this._data.get(e, t)) || void 0 === r ? void 0 : r.get(i, s);
                    }
                    clear() {
                        this._data.clear();
                    }
                };
            },
            6114: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.isChromeOS = t.isLinux = t.isWindows = t.isIphone = t.isIpad = t.isMac = t.getSafariVersion = t.isSafari = t.isLegacyEdge = t.isFirefox = t.isNode = void 0, t.isNode = "undefined" == typeof navigator;
                const i = t.isNode ? "node" : navigator.userAgent, s = t.isNode ? "node" : navigator.platform;
                t.isFirefox = i.includes("Firefox"), t.isLegacyEdge = i.includes("Edge"), t.isSafari = /^((?!chrome|android).)*safari/i.test(i), t.getSafariVersion = function() {
                    if (!t.isSafari) return 0;
                    const e = i.match(/Version\/(\d+)/);
                    return null === e || e.length < 2 ? 0 : parseInt(e[1]);
                }, t.isMac = [
                    "Macintosh",
                    "MacIntel",
                    "MacPPC",
                    "Mac68K"
                ].includes(s), t.isIpad = "iPad" === s, t.isIphone = "iPhone" === s, t.isWindows = [
                    "Windows",
                    "Win16",
                    "Win32",
                    "WinCE"
                ].includes(s), t.isLinux = s.indexOf("Linux") >= 0, t.isChromeOS = /\bCrOS\b/.test(i);
            },
            6106: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.SortedList = void 0;
                let i = 0;
                t.SortedList = class {
                    constructor(e){
                        this._getKey = e, this._array = [];
                    }
                    clear() {
                        this._array.length = 0;
                    }
                    insert(e) {
                        0 !== this._array.length ? (i = this._search(this._getKey(e), 0, this._array.length - 1), this._array.splice(i, 0, e)) : this._array.push(e);
                    }
                    delete(e) {
                        if (0 === this._array.length) return !1;
                        const t = this._getKey(e);
                        if (void 0 === t) return !1;
                        if (i = this._search(t, 0, this._array.length - 1), -1 === i) return !1;
                        if (this._getKey(this._array[i]) !== t) return !1;
                        do {
                            if (this._array[i] === e) return this._array.splice(i, 1), !0;
                        }while (++i < this._array.length && this._getKey(this._array[i]) === t);
                        return !1;
                    }
                    *getKeyIterator(e) {
                        if (0 !== this._array.length && (i = this._search(e, 0, this._array.length - 1), !(i < 0 || i >= this._array.length) && this._getKey(this._array[i]) === e)) do yield this._array[i];
                        while (++i < this._array.length && this._getKey(this._array[i]) === e);
                    }
                    forEachByKey(e, t) {
                        if (0 !== this._array.length && (i = this._search(e, 0, this._array.length - 1), !(i < 0 || i >= this._array.length) && this._getKey(this._array[i]) === e)) do t(this._array[i]);
                        while (++i < this._array.length && this._getKey(this._array[i]) === e);
                    }
                    values() {
                        return this._array.values();
                    }
                    _search(e, t, i) {
                        if (i < t) return t;
                        let s = Math.floor((t + i) / 2);
                        const r = this._getKey(this._array[s]);
                        if (r > e) return this._search(e, t, s - 1);
                        if (r < e) return this._search(e, s + 1, i);
                        for(; s > 0 && this._getKey(this._array[s - 1]) === e;)s--;
                        return s;
                    }
                };
            },
            7226: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.DebouncedIdleTask = t.IdleTaskQueue = t.PriorityTaskQueue = void 0;
                const s = i(6114);
                class r {
                    constructor(){
                        this._tasks = [], this._i = 0;
                    }
                    enqueue(e) {
                        this._tasks.push(e), this._start();
                    }
                    flush() {
                        for(; this._i < this._tasks.length;)this._tasks[this._i]() || this._i++;
                        this.clear();
                    }
                    clear() {
                        this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
                    }
                    _start() {
                        this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
                    }
                    _process(e) {
                        this._idleCallback = void 0;
                        let t = 0, i = 0, s = e.timeRemaining(), r = 0;
                        for(; this._i < this._tasks.length;){
                            if (t = Date.now(), this._tasks[this._i]() || this._i++, t = Math.max(1, Date.now() - t), i = Math.max(t, i), r = e.timeRemaining(), 1.5 * i > r) return s - t < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(s - t))}ms`), void this._start();
                            s = r;
                        }
                        this.clear();
                    }
                }
                class n extends r {
                    _requestCallback(e) {
                        return setTimeout(()=>e(this._createDeadline(16)));
                    }
                    _cancelCallback(e) {
                        clearTimeout(e);
                    }
                    _createDeadline(e) {
                        const t = Date.now() + e;
                        return {
                            timeRemaining: ()=>Math.max(0, t - Date.now())
                        };
                    }
                }
                t.PriorityTaskQueue = n, t.IdleTaskQueue = !s.isNode && "requestIdleCallback" in window ? class extends r {
                    _requestCallback(e) {
                        return requestIdleCallback(e);
                    }
                    _cancelCallback(e) {
                        cancelIdleCallback(e);
                    }
                } : n, t.DebouncedIdleTask = class {
                    constructor(){
                        this._queue = new t.IdleTaskQueue;
                    }
                    set(e) {
                        this._queue.clear(), this._queue.enqueue(e);
                    }
                    flush() {
                        this._queue.flush();
                    }
                };
            },
            9282: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.updateWindowsModeWrappedState = void 0;
                const s = i(643);
                t.updateWindowsModeWrappedState = function(e) {
                    const t = e.buffer.lines.get(e.buffer.ybase + e.buffer.y - 1), i = null == t ? void 0 : t.get(e.cols - 1), r = e.buffer.lines.get(e.buffer.ybase + e.buffer.y);
                    r && i && (r.isWrapped = i[s.CHAR_DATA_CODE_INDEX] !== s.NULL_CELL_CODE && i[s.CHAR_DATA_CODE_INDEX] !== s.WHITESPACE_CELL_CODE);
                };
            },
            3734: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ExtendedAttrs = t.AttributeData = void 0;
                class i {
                    constructor(){
                        this.fg = 0, this.bg = 0, this.extended = new s;
                    }
                    static toColorRGB(e) {
                        return [
                            e >>> 16 & 255,
                            e >>> 8 & 255,
                            255 & e
                        ];
                    }
                    static fromColorRGB(e) {
                        return (255 & e[0]) << 16 | (255 & e[1]) << 8 | 255 & e[2];
                    }
                    clone() {
                        const e = new i;
                        return e.fg = this.fg, e.bg = this.bg, e.extended = this.extended.clone(), e;
                    }
                    isInverse() {
                        return 67108864 & this.fg;
                    }
                    isBold() {
                        return 134217728 & this.fg;
                    }
                    isUnderline() {
                        return this.hasExtendedAttrs() && 0 !== this.extended.underlineStyle ? 1 : 268435456 & this.fg;
                    }
                    isBlink() {
                        return 536870912 & this.fg;
                    }
                    isInvisible() {
                        return 1073741824 & this.fg;
                    }
                    isItalic() {
                        return 67108864 & this.bg;
                    }
                    isDim() {
                        return 134217728 & this.bg;
                    }
                    isStrikethrough() {
                        return 2147483648 & this.fg;
                    }
                    isProtected() {
                        return 536870912 & this.bg;
                    }
                    getFgColorMode() {
                        return 50331648 & this.fg;
                    }
                    getBgColorMode() {
                        return 50331648 & this.bg;
                    }
                    isFgRGB() {
                        return 50331648 == (50331648 & this.fg);
                    }
                    isBgRGB() {
                        return 50331648 == (50331648 & this.bg);
                    }
                    isFgPalette() {
                        return 16777216 == (50331648 & this.fg) || 33554432 == (50331648 & this.fg);
                    }
                    isBgPalette() {
                        return 16777216 == (50331648 & this.bg) || 33554432 == (50331648 & this.bg);
                    }
                    isFgDefault() {
                        return 0 == (50331648 & this.fg);
                    }
                    isBgDefault() {
                        return 0 == (50331648 & this.bg);
                    }
                    isAttributeDefault() {
                        return 0 === this.fg && 0 === this.bg;
                    }
                    getFgColor() {
                        switch(50331648 & this.fg){
                            case 16777216:
                            case 33554432:
                                return 255 & this.fg;
                            case 50331648:
                                return 16777215 & this.fg;
                            default:
                                return -1;
                        }
                    }
                    getBgColor() {
                        switch(50331648 & this.bg){
                            case 16777216:
                            case 33554432:
                                return 255 & this.bg;
                            case 50331648:
                                return 16777215 & this.bg;
                            default:
                                return -1;
                        }
                    }
                    hasExtendedAttrs() {
                        return 268435456 & this.bg;
                    }
                    updateExtended() {
                        this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
                    }
                    getUnderlineColor() {
                        if (268435456 & this.bg && ~this.extended.underlineColor) switch(50331648 & this.extended.underlineColor){
                            case 16777216:
                            case 33554432:
                                return 255 & this.extended.underlineColor;
                            case 50331648:
                                return 16777215 & this.extended.underlineColor;
                            default:
                                return this.getFgColor();
                        }
                        return this.getFgColor();
                    }
                    getUnderlineColorMode() {
                        return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 & this.extended.underlineColor : this.getFgColorMode();
                    }
                    isUnderlineColorRGB() {
                        return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 == (50331648 & this.extended.underlineColor) : this.isFgRGB();
                    }
                    isUnderlineColorPalette() {
                        return 268435456 & this.bg && ~this.extended.underlineColor ? 16777216 == (50331648 & this.extended.underlineColor) || 33554432 == (50331648 & this.extended.underlineColor) : this.isFgPalette();
                    }
                    isUnderlineColorDefault() {
                        return 268435456 & this.bg && ~this.extended.underlineColor ? 0 == (50331648 & this.extended.underlineColor) : this.isFgDefault();
                    }
                    getUnderlineStyle() {
                        return 268435456 & this.fg ? 268435456 & this.bg ? this.extended.underlineStyle : 1 : 0;
                    }
                }
                t.AttributeData = i;
                class s {
                    constructor(e = 0, t = 0){
                        this._ext = 0, this._urlId = 0, this._ext = e, this._urlId = t;
                    }
                    get ext() {
                        return this._urlId ? -469762049 & this._ext | this.underlineStyle << 26 : this._ext;
                    }
                    set ext(e) {
                        this._ext = e;
                    }
                    get underlineStyle() {
                        return this._urlId ? 5 : (469762048 & this._ext) >> 26;
                    }
                    set underlineStyle(e) {
                        this._ext &= -469762049, this._ext |= e << 26 & 469762048;
                    }
                    get underlineColor() {
                        return 67108863 & this._ext;
                    }
                    set underlineColor(e) {
                        this._ext &= -67108864, this._ext |= 67108863 & e;
                    }
                    get urlId() {
                        return this._urlId;
                    }
                    set urlId(e) {
                        this._urlId = e;
                    }
                    clone() {
                        return new s(this._ext, this._urlId);
                    }
                    isEmpty() {
                        return 0 === this.underlineStyle && 0 === this._urlId;
                    }
                }
                t.ExtendedAttrs = s;
            },
            9092: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.BufferStringIterator = t.Buffer = t.MAX_BUFFER_SIZE = void 0;
                const s = i(6349), r = i(8437), n = i(511), o = i(643), a = i(4634), h = i(4863), c = i(7116), l = i(3734), d = i(7226);
                t.MAX_BUFFER_SIZE = 4294967295, t.Buffer = class {
                    constructor(e, t, i){
                        this._hasScrollback = e, this._optionsService = t, this._bufferService = i, this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.tabs = {}, this.savedY = 0, this.savedX = 0, this.savedCurAttrData = r.DEFAULT_ATTR_DATA.clone(), this.savedCharset = c.DEFAULT_CHARSET, this.markers = [], this._nullCell = n.CellData.fromCharData([
                            0,
                            o.NULL_CELL_CHAR,
                            o.NULL_CELL_WIDTH,
                            o.NULL_CELL_CODE
                        ]), this._whitespaceCell = n.CellData.fromCharData([
                            0,
                            o.WHITESPACE_CELL_CHAR,
                            o.WHITESPACE_CELL_WIDTH,
                            o.WHITESPACE_CELL_CODE
                        ]), this._isClearing = !1, this._memoryCleanupQueue = new d.IdleTaskQueue, this._memoryCleanupPosition = 0, this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new s.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
                    }
                    getNullCell(e) {
                        return e ? (this._nullCell.fg = e.fg, this._nullCell.bg = e.bg, this._nullCell.extended = e.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new l.ExtendedAttrs), this._nullCell;
                    }
                    getWhitespaceCell(e) {
                        return e ? (this._whitespaceCell.fg = e.fg, this._whitespaceCell.bg = e.bg, this._whitespaceCell.extended = e.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new l.ExtendedAttrs), this._whitespaceCell;
                    }
                    getBlankLine(e, t) {
                        return new r.BufferLine(this._bufferService.cols, this.getNullCell(e), t);
                    }
                    get hasScrollback() {
                        return this._hasScrollback && this.lines.maxLength > this._rows;
                    }
                    get isCursorInViewport() {
                        const e = this.ybase + this.y - this.ydisp;
                        return e >= 0 && e < this._rows;
                    }
                    _getCorrectBufferLength(e) {
                        if (!this._hasScrollback) return e;
                        const i = e + this._optionsService.rawOptions.scrollback;
                        return i > t.MAX_BUFFER_SIZE ? t.MAX_BUFFER_SIZE : i;
                    }
                    fillViewportRows(e) {
                        if (0 === this.lines.length) {
                            void 0 === e && (e = r.DEFAULT_ATTR_DATA);
                            let t = this._rows;
                            for(; t--;)this.lines.push(this.getBlankLine(e));
                        }
                    }
                    clear() {
                        this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new s.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
                    }
                    resize(e, t) {
                        const i = this.getNullCell(r.DEFAULT_ATTR_DATA);
                        let s = 0;
                        const n = this._getCorrectBufferLength(t);
                        if (n > this.lines.maxLength && (this.lines.maxLength = n), this.lines.length > 0) {
                            if (this._cols < e) for(let t = 0; t < this.lines.length; t++)s += +this.lines.get(t).resize(e, i);
                            let o = 0;
                            if (this._rows < t) for(let s = this._rows; s < t; s++)this.lines.length < t + this.ybase && (this._optionsService.rawOptions.windowsMode ? this.lines.push(new r.BufferLine(e, i)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + o + 1 ? (this.ybase--, o++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new r.BufferLine(e, i)));
                            else for(let e = this._rows; e > t; e--)this.lines.length > t + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
                            if (n < this.lines.maxLength) {
                                const e = this.lines.length - n;
                                e > 0 && (this.lines.trimStart(e), this.ybase = Math.max(this.ybase - e, 0), this.ydisp = Math.max(this.ydisp - e, 0), this.savedY = Math.max(this.savedY - e, 0)), this.lines.maxLength = n;
                            }
                            this.x = Math.min(this.x, e - 1), this.y = Math.min(this.y, t - 1), o && (this.y += o), this.savedX = Math.min(this.savedX, e - 1), this.scrollTop = 0;
                        }
                        if (this.scrollBottom = t - 1, this._isReflowEnabled && (this._reflow(e, t), this._cols > e)) for(let t = 0; t < this.lines.length; t++)s += +this.lines.get(t).resize(e, i);
                        this._cols = e, this._rows = t, this._memoryCleanupQueue.clear(), s > .1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue(()=>this._batchedMemoryCleanup()));
                    }
                    _batchedMemoryCleanup() {
                        let e = !0;
                        this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, e = !1);
                        let t = 0;
                        for(; this._memoryCleanupPosition < this.lines.length;)if (t += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), t > 100) return !0;
                        return e;
                    }
                    get _isReflowEnabled() {
                        return this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
                    }
                    _reflow(e, t) {
                        this._cols !== e && (e > this._cols ? this._reflowLarger(e, t) : this._reflowSmaller(e, t));
                    }
                    _reflowLarger(e, t) {
                        const i = (0, a.reflowLargerGetLinesToRemove)(this.lines, this._cols, e, this.ybase + this.y, this.getNullCell(r.DEFAULT_ATTR_DATA));
                        if (i.length > 0) {
                            const s = (0, a.reflowLargerCreateNewLayout)(this.lines, i);
                            (0, a.reflowLargerApplyNewLayout)(this.lines, s.layout), this._reflowLargerAdjustViewport(e, t, s.countRemoved);
                        }
                    }
                    _reflowLargerAdjustViewport(e, t, i) {
                        const s = this.getNullCell(r.DEFAULT_ATTR_DATA);
                        let n = i;
                        for(; n-- > 0;)0 === this.ybase ? (this.y > 0 && this.y--, this.lines.length < t && this.lines.push(new r.BufferLine(e, s))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
                        this.savedY = Math.max(this.savedY - i, 0);
                    }
                    _reflowSmaller(e, t) {
                        const i = this.getNullCell(r.DEFAULT_ATTR_DATA), s = [];
                        let n = 0;
                        for(let o = this.lines.length - 1; o >= 0; o--){
                            let h = this.lines.get(o);
                            if (!h || !h.isWrapped && h.getTrimmedLength() <= e) continue;
                            const c = [
                                h
                            ];
                            for(; h.isWrapped && o > 0;)h = this.lines.get(--o), c.unshift(h);
                            const l = this.ybase + this.y;
                            if (l >= o && l < o + c.length) continue;
                            const d = c[c.length - 1].getTrimmedLength(), _ = (0, a.reflowSmallerGetNewLineLengths)(c, this._cols, e), u = _.length - c.length;
                            let f;
                            f = 0 === this.ybase && this.y !== this.lines.length - 1 ? Math.max(0, this.y - this.lines.maxLength + u) : Math.max(0, this.lines.length - this.lines.maxLength + u);
                            const v = [];
                            for(let e = 0; e < u; e++){
                                const e = this.getBlankLine(r.DEFAULT_ATTR_DATA, !0);
                                v.push(e);
                            }
                            v.length > 0 && (s.push({
                                start: o + c.length + n,
                                newLines: v
                            }), n += v.length), c.push(...v);
                            let g = _.length - 1, p = _[g];
                            0 === p && (g--, p = _[g]);
                            let S = c.length - u - 1, m = d;
                            for(; S >= 0;){
                                const e = Math.min(m, p);
                                if (void 0 === c[g]) break;
                                if (c[g].copyCellsFrom(c[S], m - e, p - e, e, !0), p -= e, 0 === p && (g--, p = _[g]), m -= e, 0 === m) {
                                    S--;
                                    const e = Math.max(S, 0);
                                    m = (0, a.getWrappedLineTrimmedLength)(c, e, this._cols);
                                }
                            }
                            for(let t = 0; t < c.length; t++)_[t] < e && c[t].setCell(_[t], i);
                            let C = u - f;
                            for(; C-- > 0;)0 === this.ybase ? this.y < t - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + n) - t && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
                            this.savedY = Math.min(this.savedY + u, this.ybase + t - 1);
                        }
                        if (s.length > 0) {
                            const e = [], t = [];
                            for(let e = 0; e < this.lines.length; e++)t.push(this.lines.get(e));
                            const i = this.lines.length;
                            let r = i - 1, o = 0, a = s[o];
                            this.lines.length = Math.min(this.lines.maxLength, this.lines.length + n);
                            let h = 0;
                            for(let c = Math.min(this.lines.maxLength - 1, i + n - 1); c >= 0; c--)if (a && a.start > r + h) {
                                for(let e = a.newLines.length - 1; e >= 0; e--)this.lines.set(c--, a.newLines[e]);
                                c++, e.push({
                                    index: r + 1,
                                    amount: a.newLines.length
                                }), h += a.newLines.length, a = s[++o];
                            } else this.lines.set(c, t[r--]);
                            let c = 0;
                            for(let t = e.length - 1; t >= 0; t--)e[t].index += c, this.lines.onInsertEmitter.fire(e[t]), c += e[t].amount;
                            const l = Math.max(0, i + n - this.lines.maxLength);
                            l > 0 && this.lines.onTrimEmitter.fire(l);
                        }
                    }
                    stringIndexToBufferIndex(e, t, i = !1) {
                        for(; t;){
                            const s = this.lines.get(e);
                            if (!s) return [
                                -1,
                                -1
                            ];
                            const r = i ? s.getTrimmedLength() : s.length;
                            for(let i = 0; i < r; ++i)if (s.get(i)[o.CHAR_DATA_WIDTH_INDEX] && (t -= s.get(i)[o.CHAR_DATA_CHAR_INDEX].length || 1), t < 0) return [
                                e,
                                i
                            ];
                            e++;
                        }
                        return [
                            e,
                            0
                        ];
                    }
                    translateBufferLineToString(e, t, i = 0, s) {
                        const r = this.lines.get(e);
                        return r ? r.translateToString(t, i, s) : "";
                    }
                    getWrappedRangeForLine(e) {
                        let t = e, i = e;
                        for(; t > 0 && this.lines.get(t).isWrapped;)t--;
                        for(; i + 1 < this.lines.length && this.lines.get(i + 1).isWrapped;)i++;
                        return {
                            first: t,
                            last: i
                        };
                    }
                    setupTabStops(e) {
                        for(null != e ? this.tabs[e] || (e = this.prevStop(e)) : (this.tabs = {}, e = 0); e < this._cols; e += this._optionsService.rawOptions.tabStopWidth)this.tabs[e] = !0;
                    }
                    prevStop(e) {
                        for(null == e && (e = this.x); !this.tabs[--e] && e > 0;);
                        return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
                    }
                    nextStop(e) {
                        for(null == e && (e = this.x); !this.tabs[++e] && e < this._cols;);
                        return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
                    }
                    clearMarkers(e) {
                        this._isClearing = !0;
                        for(let t = 0; t < this.markers.length; t++)this.markers[t].line === e && (this.markers[t].dispose(), this.markers.splice(t--, 1));
                        this._isClearing = !1;
                    }
                    clearAllMarkers() {
                        this._isClearing = !0;
                        for(let e = 0; e < this.markers.length; e++)this.markers[e].dispose(), this.markers.splice(e--, 1);
                        this._isClearing = !1;
                    }
                    addMarker(e) {
                        const t = new h.Marker(e);
                        return this.markers.push(t), t.register(this.lines.onTrim((e)=>{
                            t.line -= e, t.line < 0 && t.dispose();
                        })), t.register(this.lines.onInsert((e)=>{
                            t.line >= e.index && (t.line += e.amount);
                        })), t.register(this.lines.onDelete((e)=>{
                            t.line >= e.index && t.line < e.index + e.amount && t.dispose(), t.line > e.index && (t.line -= e.amount);
                        })), t.register(t.onDispose(()=>this._removeMarker(t))), t;
                    }
                    _removeMarker(e) {
                        this._isClearing || this.markers.splice(this.markers.indexOf(e), 1);
                    }
                    iterator(e, t, i, s, r) {
                        return new _(this, e, t, i, s, r);
                    }
                };
                class _ {
                    constructor(e, t, i = 0, s = e.lines.length, r = 0, n = 0){
                        this._buffer = e, this._trimRight = t, this._startIndex = i, this._endIndex = s, this._startOverscan = r, this._endOverscan = n, this._startIndex < 0 && (this._startIndex = 0), this._endIndex > this._buffer.lines.length && (this._endIndex = this._buffer.lines.length), this._current = this._startIndex;
                    }
                    hasNext() {
                        return this._current < this._endIndex;
                    }
                    next() {
                        const e = this._buffer.getWrappedRangeForLine(this._current);
                        e.first < this._startIndex - this._startOverscan && (e.first = this._startIndex - this._startOverscan), e.last > this._endIndex + this._endOverscan && (e.last = this._endIndex + this._endOverscan), e.first = Math.max(e.first, 0), e.last = Math.min(e.last, this._buffer.lines.length);
                        let t = "";
                        for(let i = e.first; i <= e.last; ++i)t += this._buffer.translateBufferLineToString(i, this._trimRight);
                        return this._current = e.last + 1, {
                            range: e,
                            content: t
                        };
                    }
                }
                t.BufferStringIterator = _;
            },
            8437: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.BufferLine = t.DEFAULT_ATTR_DATA = void 0;
                const s = i(482), r = i(643), n = i(511), o = i(3734);
                t.DEFAULT_ATTR_DATA = Object.freeze(new o.AttributeData);
                let a = 0;
                class h {
                    constructor(e, t, i = !1){
                        this.isWrapped = i, this._combined = {}, this._extendedAttrs = {}, this._data = new Uint32Array(3 * e);
                        const s = t || n.CellData.fromCharData([
                            0,
                            r.NULL_CELL_CHAR,
                            r.NULL_CELL_WIDTH,
                            r.NULL_CELL_CODE
                        ]);
                        for(let t = 0; t < e; ++t)this.setCell(t, s);
                        this.length = e;
                    }
                    get(e) {
                        const t = this._data[3 * e + 0], i = 2097151 & t;
                        return [
                            this._data[3 * e + 1],
                            2097152 & t ? this._combined[e] : i ? (0, s.stringFromCodePoint)(i) : "",
                            t >> 22,
                            2097152 & t ? this._combined[e].charCodeAt(this._combined[e].length - 1) : i
                        ];
                    }
                    set(e, t) {
                        this._data[3 * e + 1] = t[r.CHAR_DATA_ATTR_INDEX], t[r.CHAR_DATA_CHAR_INDEX].length > 1 ? (this._combined[e] = t[1], this._data[3 * e + 0] = 2097152 | e | t[r.CHAR_DATA_WIDTH_INDEX] << 22) : this._data[3 * e + 0] = t[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | t[r.CHAR_DATA_WIDTH_INDEX] << 22;
                    }
                    getWidth(e) {
                        return this._data[3 * e + 0] >> 22;
                    }
                    hasWidth(e) {
                        return 12582912 & this._data[3 * e + 0];
                    }
                    getFg(e) {
                        return this._data[3 * e + 1];
                    }
                    getBg(e) {
                        return this._data[3 * e + 2];
                    }
                    hasContent(e) {
                        return 4194303 & this._data[3 * e + 0];
                    }
                    getCodePoint(e) {
                        const t = this._data[3 * e + 0];
                        return 2097152 & t ? this._combined[e].charCodeAt(this._combined[e].length - 1) : 2097151 & t;
                    }
                    isCombined(e) {
                        return 2097152 & this._data[3 * e + 0];
                    }
                    getString(e) {
                        const t = this._data[3 * e + 0];
                        return 2097152 & t ? this._combined[e] : 2097151 & t ? (0, s.stringFromCodePoint)(2097151 & t) : "";
                    }
                    isProtected(e) {
                        return 536870912 & this._data[3 * e + 2];
                    }
                    loadCell(e, t) {
                        return a = 3 * e, t.content = this._data[a + 0], t.fg = this._data[a + 1], t.bg = this._data[a + 2], 2097152 & t.content && (t.combinedData = this._combined[e]), 268435456 & t.bg && (t.extended = this._extendedAttrs[e]), t;
                    }
                    setCell(e, t) {
                        2097152 & t.content && (this._combined[e] = t.combinedData), 268435456 & t.bg && (this._extendedAttrs[e] = t.extended), this._data[3 * e + 0] = t.content, this._data[3 * e + 1] = t.fg, this._data[3 * e + 2] = t.bg;
                    }
                    setCellFromCodePoint(e, t, i, s, r, n) {
                        268435456 & r && (this._extendedAttrs[e] = n), this._data[3 * e + 0] = t | i << 22, this._data[3 * e + 1] = s, this._data[3 * e + 2] = r;
                    }
                    addCodepointToCell(e, t) {
                        let i = this._data[3 * e + 0];
                        2097152 & i ? this._combined[e] += (0, s.stringFromCodePoint)(t) : (2097151 & i ? (this._combined[e] = (0, s.stringFromCodePoint)(2097151 & i) + (0, s.stringFromCodePoint)(t), i &= -2097152, i |= 2097152) : i = t | 4194304, this._data[3 * e + 0] = i);
                    }
                    insertCells(e, t, i, s) {
                        if ((e %= this.length) && 2 === this.getWidth(e - 1) && this.setCellFromCodePoint(e - 1, 0, 1, (null == s ? void 0 : s.fg) || 0, (null == s ? void 0 : s.bg) || 0, (null == s ? void 0 : s.extended) || new o.ExtendedAttrs), t < this.length - e) {
                            const s = new n.CellData;
                            for(let i = this.length - e - t - 1; i >= 0; --i)this.setCell(e + t + i, this.loadCell(e + i, s));
                            for(let s = 0; s < t; ++s)this.setCell(e + s, i);
                        } else for(let t = e; t < this.length; ++t)this.setCell(t, i);
                        2 === this.getWidth(this.length - 1) && this.setCellFromCodePoint(this.length - 1, 0, 1, (null == s ? void 0 : s.fg) || 0, (null == s ? void 0 : s.bg) || 0, (null == s ? void 0 : s.extended) || new o.ExtendedAttrs);
                    }
                    deleteCells(e, t, i, s) {
                        if (e %= this.length, t < this.length - e) {
                            const s = new n.CellData;
                            for(let i = 0; i < this.length - e - t; ++i)this.setCell(e + i, this.loadCell(e + t + i, s));
                            for(let e = this.length - t; e < this.length; ++e)this.setCell(e, i);
                        } else for(let t = e; t < this.length; ++t)this.setCell(t, i);
                        e && 2 === this.getWidth(e - 1) && this.setCellFromCodePoint(e - 1, 0, 1, (null == s ? void 0 : s.fg) || 0, (null == s ? void 0 : s.bg) || 0, (null == s ? void 0 : s.extended) || new o.ExtendedAttrs), 0 !== this.getWidth(e) || this.hasContent(e) || this.setCellFromCodePoint(e, 0, 1, (null == s ? void 0 : s.fg) || 0, (null == s ? void 0 : s.bg) || 0, (null == s ? void 0 : s.extended) || new o.ExtendedAttrs);
                    }
                    replaceCells(e, t, i, s, r = !1) {
                        if (r) for(e && 2 === this.getWidth(e - 1) && !this.isProtected(e - 1) && this.setCellFromCodePoint(e - 1, 0, 1, (null == s ? void 0 : s.fg) || 0, (null == s ? void 0 : s.bg) || 0, (null == s ? void 0 : s.extended) || new o.ExtendedAttrs), t < this.length && 2 === this.getWidth(t - 1) && !this.isProtected(t) && this.setCellFromCodePoint(t, 0, 1, (null == s ? void 0 : s.fg) || 0, (null == s ? void 0 : s.bg) || 0, (null == s ? void 0 : s.extended) || new o.ExtendedAttrs); e < t && e < this.length;)this.isProtected(e) || this.setCell(e, i), e++;
                        else for(e && 2 === this.getWidth(e - 1) && this.setCellFromCodePoint(e - 1, 0, 1, (null == s ? void 0 : s.fg) || 0, (null == s ? void 0 : s.bg) || 0, (null == s ? void 0 : s.extended) || new o.ExtendedAttrs), t < this.length && 2 === this.getWidth(t - 1) && this.setCellFromCodePoint(t, 0, 1, (null == s ? void 0 : s.fg) || 0, (null == s ? void 0 : s.bg) || 0, (null == s ? void 0 : s.extended) || new o.ExtendedAttrs); e < t && e < this.length;)this.setCell(e++, i);
                    }
                    resize(e, t) {
                        if (e === this.length) return 4 * this._data.length * 2 < this._data.buffer.byteLength;
                        const i = 3 * e;
                        if (e > this.length) {
                            if (this._data.buffer.byteLength >= 4 * i) this._data = new Uint32Array(this._data.buffer, 0, i);
                            else {
                                const e = new Uint32Array(i);
                                e.set(this._data), this._data = e;
                            }
                            for(let i = this.length; i < e; ++i)this.setCell(i, t);
                        } else {
                            this._data = this._data.subarray(0, i);
                            const t = Object.keys(this._combined);
                            for(let i = 0; i < t.length; i++){
                                const s = parseInt(t[i], 10);
                                s >= e && delete this._combined[s];
                            }
                            const s = Object.keys(this._extendedAttrs);
                            for(let t = 0; t < s.length; t++){
                                const i = parseInt(s[t], 10);
                                i >= e && delete this._extendedAttrs[i];
                            }
                        }
                        return this.length = e, 4 * i * 2 < this._data.buffer.byteLength;
                    }
                    cleanupMemory() {
                        if (4 * this._data.length * 2 < this._data.buffer.byteLength) {
                            const e = new Uint32Array(this._data.length);
                            return e.set(this._data), this._data = e, 1;
                        }
                        return 0;
                    }
                    fill(e, t = !1) {
                        if (t) for(let t = 0; t < this.length; ++t)this.isProtected(t) || this.setCell(t, e);
                        else {
                            this._combined = {}, this._extendedAttrs = {};
                            for(let t = 0; t < this.length; ++t)this.setCell(t, e);
                        }
                    }
                    copyFrom(e) {
                        this.length !== e.length ? this._data = new Uint32Array(e._data) : this._data.set(e._data), this.length = e.length, this._combined = {};
                        for(const t in e._combined)this._combined[t] = e._combined[t];
                        this._extendedAttrs = {};
                        for(const t in e._extendedAttrs)this._extendedAttrs[t] = e._extendedAttrs[t];
                        this.isWrapped = e.isWrapped;
                    }
                    clone() {
                        const e = new h(0);
                        e._data = new Uint32Array(this._data), e.length = this.length;
                        for(const t in this._combined)e._combined[t] = this._combined[t];
                        for(const t in this._extendedAttrs)e._extendedAttrs[t] = this._extendedAttrs[t];
                        return e.isWrapped = this.isWrapped, e;
                    }
                    getTrimmedLength() {
                        for(let e = this.length - 1; e >= 0; --e)if (4194303 & this._data[3 * e + 0]) return e + (this._data[3 * e + 0] >> 22);
                        return 0;
                    }
                    copyCellsFrom(e, t, i, s, r) {
                        const n = e._data;
                        if (r) for(let r = s - 1; r >= 0; r--){
                            for(let e = 0; e < 3; e++)this._data[3 * (i + r) + e] = n[3 * (t + r) + e];
                            268435456 & n[3 * (t + r) + 2] && (this._extendedAttrs[i + r] = e._extendedAttrs[t + r]);
                        }
                        else for(let r = 0; r < s; r++){
                            for(let e = 0; e < 3; e++)this._data[3 * (i + r) + e] = n[3 * (t + r) + e];
                            268435456 & n[3 * (t + r) + 2] && (this._extendedAttrs[i + r] = e._extendedAttrs[t + r]);
                        }
                        const o = Object.keys(e._combined);
                        for(let s = 0; s < o.length; s++){
                            const r = parseInt(o[s], 10);
                            r >= t && (this._combined[r - t + i] = e._combined[r]);
                        }
                    }
                    translateToString(e = !1, t = 0, i = this.length) {
                        e && (i = Math.min(i, this.getTrimmedLength()));
                        let n = "";
                        for(; t < i;){
                            const e = this._data[3 * t + 0], i = 2097151 & e;
                            n += 2097152 & e ? this._combined[t] : i ? (0, s.stringFromCodePoint)(i) : r.WHITESPACE_CELL_CHAR, t += e >> 22 || 1;
                        }
                        return n;
                    }
                }
                t.BufferLine = h;
            },
            4841: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.getRangeLength = void 0, t.getRangeLength = function(e, t) {
                    if (e.start.y > e.end.y) throw new Error(`Buffer range end (${e.end.x}, ${e.end.y}) cannot be before start (${e.start.x}, ${e.start.y})`);
                    return t * (e.end.y - e.start.y) + (e.end.x - e.start.x + 1);
                };
            },
            4634: (e, t)=>{
                function i(e, t, i) {
                    if (t === e.length - 1) return e[t].getTrimmedLength();
                    const s = !e[t].hasContent(i - 1) && 1 === e[t].getWidth(i - 1), r = 2 === e[t + 1].getWidth(0);
                    return s && r ? i - 1 : i;
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.getWrappedLineTrimmedLength = t.reflowSmallerGetNewLineLengths = t.reflowLargerApplyNewLayout = t.reflowLargerCreateNewLayout = t.reflowLargerGetLinesToRemove = void 0, t.reflowLargerGetLinesToRemove = function(e, t, s, r, n) {
                    const o = [];
                    for(let a = 0; a < e.length - 1; a++){
                        let h = a, c = e.get(++h);
                        if (!c.isWrapped) continue;
                        const l = [
                            e.get(a)
                        ];
                        for(; h < e.length && c.isWrapped;)l.push(c), c = e.get(++h);
                        if (r >= a && r < h) {
                            a += l.length - 1;
                            continue;
                        }
                        let d = 0, _ = i(l, d, t), u = 1, f = 0;
                        for(; u < l.length;){
                            const e = i(l, u, t), r = e - f, o = s - _, a = Math.min(r, o);
                            l[d].copyCellsFrom(l[u], f, _, a, !1), _ += a, _ === s && (d++, _ = 0), f += a, f === e && (u++, f = 0), 0 === _ && 0 !== d && 2 === l[d - 1].getWidth(s - 1) && (l[d].copyCellsFrom(l[d - 1], s - 1, _++, 1, !1), l[d - 1].setCell(s - 1, n));
                        }
                        l[d].replaceCells(_, s, n);
                        let v = 0;
                        for(let e = l.length - 1; e > 0 && (e > d || 0 === l[e].getTrimmedLength()); e--)v++;
                        v > 0 && (o.push(a + l.length - v), o.push(v)), a += l.length - 1;
                    }
                    return o;
                }, t.reflowLargerCreateNewLayout = function(e, t) {
                    const i = [];
                    let s = 0, r = t[s], n = 0;
                    for(let o = 0; o < e.length; o++)if (r === o) {
                        const i = t[++s];
                        e.onDeleteEmitter.fire({
                            index: o - n,
                            amount: i
                        }), o += i - 1, n += i, r = t[++s];
                    } else i.push(o);
                    return {
                        layout: i,
                        countRemoved: n
                    };
                }, t.reflowLargerApplyNewLayout = function(e, t) {
                    const i = [];
                    for(let s = 0; s < t.length; s++)i.push(e.get(t[s]));
                    for(let t = 0; t < i.length; t++)e.set(t, i[t]);
                    e.length = t.length;
                }, t.reflowSmallerGetNewLineLengths = function(e, t, s) {
                    const r = [], n = e.map((s, r)=>i(e, r, t)).reduce((e, t)=>e + t);
                    let o = 0, a = 0, h = 0;
                    for(; h < n;){
                        if (n - h < s) {
                            r.push(n - h);
                            break;
                        }
                        o += s;
                        const c = i(e, a, t);
                        o > c && (o -= c, a++);
                        const l = 2 === e[a].getWidth(o - 1);
                        l && o--;
                        const d = l ? s - 1 : s;
                        r.push(d), h += d;
                    }
                    return r;
                }, t.getWrappedLineTrimmedLength = i;
            },
            5295: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.BufferSet = void 0;
                const s = i(9092), r = i(8460), n = i(844);
                class o extends n.Disposable {
                    constructor(e, t){
                        super(), this._optionsService = e, this._bufferService = t, this._onBufferActivate = this.register(new r.EventEmitter), this.onBufferActivate = this._onBufferActivate.event, this.reset(), this.register(this._optionsService.onSpecificOptionChange("scrollback", ()=>this.resize(this._bufferService.cols, this._bufferService.rows))), this.register(this._optionsService.onSpecificOptionChange("tabStopWidth", ()=>this.setupTabStops()));
                    }
                    reset() {
                        this._normal = new s.Buffer(!0, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new s.Buffer(!1, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({
                            activeBuffer: this._normal,
                            inactiveBuffer: this._alt
                        }), this.setupTabStops();
                    }
                    get alt() {
                        return this._alt;
                    }
                    get active() {
                        return this._activeBuffer;
                    }
                    get normal() {
                        return this._normal;
                    }
                    activateNormalBuffer() {
                        this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({
                            activeBuffer: this._normal,
                            inactiveBuffer: this._alt
                        }));
                    }
                    activateAltBuffer(e) {
                        this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({
                            activeBuffer: this._alt,
                            inactiveBuffer: this._normal
                        }));
                    }
                    resize(e, t) {
                        this._normal.resize(e, t), this._alt.resize(e, t), this.setupTabStops(e);
                    }
                    setupTabStops(e) {
                        this._normal.setupTabStops(e), this._alt.setupTabStops(e);
                    }
                }
                t.BufferSet = o;
            },
            511: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.CellData = void 0;
                const s = i(482), r = i(643), n = i(3734);
                class o extends n.AttributeData {
                    constructor(){
                        super(...arguments), this.content = 0, this.fg = 0, this.bg = 0, this.extended = new n.ExtendedAttrs, this.combinedData = "";
                    }
                    static fromCharData(e) {
                        const t = new o;
                        return t.setFromCharData(e), t;
                    }
                    isCombined() {
                        return 2097152 & this.content;
                    }
                    getWidth() {
                        return this.content >> 22;
                    }
                    getChars() {
                        return 2097152 & this.content ? this.combinedData : 2097151 & this.content ? (0, s.stringFromCodePoint)(2097151 & this.content) : "";
                    }
                    getCode() {
                        return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : 2097151 & this.content;
                    }
                    setFromCharData(e) {
                        this.fg = e[r.CHAR_DATA_ATTR_INDEX], this.bg = 0;
                        let t = !1;
                        if (e[r.CHAR_DATA_CHAR_INDEX].length > 2) t = !0;
                        else if (2 === e[r.CHAR_DATA_CHAR_INDEX].length) {
                            const i = e[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
                            if (55296 <= i && i <= 56319) {
                                const s = e[r.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
                                56320 <= s && s <= 57343 ? this.content = 1024 * (i - 55296) + s - 56320 + 65536 | e[r.CHAR_DATA_WIDTH_INDEX] << 22 : t = !0;
                            } else t = !0;
                        } else this.content = e[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | e[r.CHAR_DATA_WIDTH_INDEX] << 22;
                        t && (this.combinedData = e[r.CHAR_DATA_CHAR_INDEX], this.content = 2097152 | e[r.CHAR_DATA_WIDTH_INDEX] << 22);
                    }
                    getAsCharData() {
                        return [
                            this.fg,
                            this.getChars(),
                            this.getWidth(),
                            this.getCode()
                        ];
                    }
                }
                t.CellData = o;
            },
            643: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.WHITESPACE_CELL_CODE = t.WHITESPACE_CELL_WIDTH = t.WHITESPACE_CELL_CHAR = t.NULL_CELL_CODE = t.NULL_CELL_WIDTH = t.NULL_CELL_CHAR = t.CHAR_DATA_CODE_INDEX = t.CHAR_DATA_WIDTH_INDEX = t.CHAR_DATA_CHAR_INDEX = t.CHAR_DATA_ATTR_INDEX = t.DEFAULT_EXT = t.DEFAULT_ATTR = t.DEFAULT_COLOR = void 0, t.DEFAULT_COLOR = 0, t.DEFAULT_ATTR = 256 | t.DEFAULT_COLOR << 9, t.DEFAULT_EXT = 0, t.CHAR_DATA_ATTR_INDEX = 0, t.CHAR_DATA_CHAR_INDEX = 1, t.CHAR_DATA_WIDTH_INDEX = 2, t.CHAR_DATA_CODE_INDEX = 3, t.NULL_CELL_CHAR = "", t.NULL_CELL_WIDTH = 1, t.NULL_CELL_CODE = 0, t.WHITESPACE_CELL_CHAR = " ", t.WHITESPACE_CELL_WIDTH = 1, t.WHITESPACE_CELL_CODE = 32;
            },
            4863: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Marker = void 0;
                const s = i(8460), r = i(844);
                class n {
                    constructor(e){
                        this.line = e, this.isDisposed = !1, this._disposables = [], this._id = n._nextId++, this._onDispose = this.register(new s.EventEmitter), this.onDispose = this._onDispose.event;
                    }
                    get id() {
                        return this._id;
                    }
                    dispose() {
                        this.isDisposed || (this.isDisposed = !0, this.line = -1, this._onDispose.fire(), (0, r.disposeArray)(this._disposables), this._disposables.length = 0);
                    }
                    register(e) {
                        return this._disposables.push(e), e;
                    }
                }
                t.Marker = n, n._nextId = 1;
            },
            7116: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.DEFAULT_CHARSET = t.CHARSETS = void 0, t.CHARSETS = {}, t.DEFAULT_CHARSET = t.CHARSETS.B, t.CHARSETS[0] = {
                    "`": "◆",
                    a: "▒",
                    b: "␉",
                    c: "␌",
                    d: "␍",
                    e: "␊",
                    f: "\xb0",
                    g: "\xb1",
                    h: "␤",
                    i: "␋",
                    j: "┘",
                    k: "┐",
                    l: "┌",
                    m: "└",
                    n: "┼",
                    o: "⎺",
                    p: "⎻",
                    q: "─",
                    r: "⎼",
                    s: "⎽",
                    t: "├",
                    u: "┤",
                    v: "┴",
                    w: "┬",
                    x: "│",
                    y: "≤",
                    z: "≥",
                    "{": "π",
                    "|": "≠",
                    "}": "\xa3",
                    "~": "\xb7"
                }, t.CHARSETS.A = {
                    "#": "\xa3"
                }, t.CHARSETS.B = void 0, t.CHARSETS[4] = {
                    "#": "\xa3",
                    "@": "\xbe",
                    "[": "ij",
                    "\\": "\xbd",
                    "]": "|",
                    "{": "\xa8",
                    "|": "f",
                    "}": "\xbc",
                    "~": "\xb4"
                }, t.CHARSETS.C = t.CHARSETS[5] = {
                    "[": "\xc4",
                    "\\": "\xd6",
                    "]": "\xc5",
                    "^": "\xdc",
                    "`": "\xe9",
                    "{": "\xe4",
                    "|": "\xf6",
                    "}": "\xe5",
                    "~": "\xfc"
                }, t.CHARSETS.R = {
                    "#": "\xa3",
                    "@": "\xe0",
                    "[": "\xb0",
                    "\\": "\xe7",
                    "]": "\xa7",
                    "{": "\xe9",
                    "|": "\xf9",
                    "}": "\xe8",
                    "~": "\xa8"
                }, t.CHARSETS.Q = {
                    "@": "\xe0",
                    "[": "\xe2",
                    "\\": "\xe7",
                    "]": "\xea",
                    "^": "\xee",
                    "`": "\xf4",
                    "{": "\xe9",
                    "|": "\xf9",
                    "}": "\xe8",
                    "~": "\xfb"
                }, t.CHARSETS.K = {
                    "@": "\xa7",
                    "[": "\xc4",
                    "\\": "\xd6",
                    "]": "\xdc",
                    "{": "\xe4",
                    "|": "\xf6",
                    "}": "\xfc",
                    "~": "\xdf"
                }, t.CHARSETS.Y = {
                    "#": "\xa3",
                    "@": "\xa7",
                    "[": "\xb0",
                    "\\": "\xe7",
                    "]": "\xe9",
                    "`": "\xf9",
                    "{": "\xe0",
                    "|": "\xf2",
                    "}": "\xe8",
                    "~": "\xec"
                }, t.CHARSETS.E = t.CHARSETS[6] = {
                    "@": "\xc4",
                    "[": "\xc6",
                    "\\": "\xd8",
                    "]": "\xc5",
                    "^": "\xdc",
                    "`": "\xe4",
                    "{": "\xe6",
                    "|": "\xf8",
                    "}": "\xe5",
                    "~": "\xfc"
                }, t.CHARSETS.Z = {
                    "#": "\xa3",
                    "@": "\xa7",
                    "[": "\xa1",
                    "\\": "\xd1",
                    "]": "\xbf",
                    "{": "\xb0",
                    "|": "\xf1",
                    "}": "\xe7"
                }, t.CHARSETS.H = t.CHARSETS[7] = {
                    "@": "\xc9",
                    "[": "\xc4",
                    "\\": "\xd6",
                    "]": "\xc5",
                    "^": "\xdc",
                    "`": "\xe9",
                    "{": "\xe4",
                    "|": "\xf6",
                    "}": "\xe5",
                    "~": "\xfc"
                }, t.CHARSETS["="] = {
                    "#": "\xf9",
                    "@": "\xe0",
                    "[": "\xe9",
                    "\\": "\xe7",
                    "]": "\xea",
                    "^": "\xee",
                    _: "\xe8",
                    "`": "\xf4",
                    "{": "\xe4",
                    "|": "\xf6",
                    "}": "\xfc",
                    "~": "\xfb"
                };
            },
            2584: (e, t)=>{
                var i, s;
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.C1_ESCAPED = t.C1 = t.C0 = void 0, function(e) {
                    e.NUL = "\0", e.SOH = "\x01", e.STX = "\x02", e.ETX = "\x03", e.EOT = "\x04", e.ENQ = "\x05", e.ACK = "\x06", e.BEL = "\x07", e.BS = "\b", e.HT = "	", e.LF = "\n", e.VT = "\v", e.FF = "\f", e.CR = "\r", e.SO = "\x0e", e.SI = "\x0f", e.DLE = "\x10", e.DC1 = "\x11", e.DC2 = "\x12", e.DC3 = "\x13", e.DC4 = "\x14", e.NAK = "\x15", e.SYN = "\x16", e.ETB = "\x17", e.CAN = "\x18", e.EM = "\x19", e.SUB = "\x1a", e.ESC = "\x1b", e.FS = "\x1c", e.GS = "\x1d", e.RS = "\x1e", e.US = "\x1f", e.SP = " ", e.DEL = "\x7f";
                }(i = t.C0 || (t.C0 = {})), (s = t.C1 || (t.C1 = {})).PAD = "\x80", s.HOP = "\x81", s.BPH = "\x82", s.NBH = "\x83", s.IND = "\x84", s.NEL = "\x85", s.SSA = "\x86", s.ESA = "\x87", s.HTS = "\x88", s.HTJ = "\x89", s.VTS = "\x8a", s.PLD = "\x8b", s.PLU = "\x8c", s.RI = "\x8d", s.SS2 = "\x8e", s.SS3 = "\x8f", s.DCS = "\x90", s.PU1 = "\x91", s.PU2 = "\x92", s.STS = "\x93", s.CCH = "\x94", s.MW = "\x95", s.SPA = "\x96", s.EPA = "\x97", s.SOS = "\x98", s.SGCI = "\x99", s.SCI = "\x9a", s.CSI = "\x9b", s.ST = "\x9c", s.OSC = "\x9d", s.PM = "\x9e", s.APC = "\x9f", (t.C1_ESCAPED || (t.C1_ESCAPED = {})).ST = `${i.ESC}\\`;
            },
            7399: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.evaluateKeyboardEvent = void 0;
                const s = i(2584), r = {
                    48: [
                        "0",
                        ")"
                    ],
                    49: [
                        "1",
                        "!"
                    ],
                    50: [
                        "2",
                        "@"
                    ],
                    51: [
                        "3",
                        "#"
                    ],
                    52: [
                        "4",
                        "$"
                    ],
                    53: [
                        "5",
                        "%"
                    ],
                    54: [
                        "6",
                        "^"
                    ],
                    55: [
                        "7",
                        "&"
                    ],
                    56: [
                        "8",
                        "*"
                    ],
                    57: [
                        "9",
                        "("
                    ],
                    186: [
                        ";",
                        ":"
                    ],
                    187: [
                        "=",
                        "+"
                    ],
                    188: [
                        ",",
                        "<"
                    ],
                    189: [
                        "-",
                        "_"
                    ],
                    190: [
                        ".",
                        ">"
                    ],
                    191: [
                        "/",
                        "?"
                    ],
                    192: [
                        "`",
                        "~"
                    ],
                    219: [
                        "[",
                        "{"
                    ],
                    220: [
                        "\\",
                        "|"
                    ],
                    221: [
                        "]",
                        "}"
                    ],
                    222: [
                        "'",
                        '"'
                    ]
                };
                t.evaluateKeyboardEvent = function(e, t, i, n) {
                    const o = {
                        type: 0,
                        cancel: !1,
                        key: void 0
                    }, a = (e.shiftKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.ctrlKey ? 4 : 0) | (e.metaKey ? 8 : 0);
                    switch(e.keyCode){
                        case 0:
                            "UIKeyInputUpArrow" === e.key ? o.key = t ? s.C0.ESC + "OA" : s.C0.ESC + "[A" : "UIKeyInputLeftArrow" === e.key ? o.key = t ? s.C0.ESC + "OD" : s.C0.ESC + "[D" : "UIKeyInputRightArrow" === e.key ? o.key = t ? s.C0.ESC + "OC" : s.C0.ESC + "[C" : "UIKeyInputDownArrow" === e.key && (o.key = t ? s.C0.ESC + "OB" : s.C0.ESC + "[B");
                            break;
                        case 8:
                            if (e.altKey) {
                                o.key = s.C0.ESC + s.C0.DEL;
                                break;
                            }
                            o.key = s.C0.DEL;
                            break;
                        case 9:
                            if (e.shiftKey) {
                                o.key = s.C0.ESC + "[Z";
                                break;
                            }
                            o.key = s.C0.HT, o.cancel = !0;
                            break;
                        case 13:
                            o.key = e.altKey ? s.C0.ESC + s.C0.CR : s.C0.CR, o.cancel = !0;
                            break;
                        case 27:
                            o.key = s.C0.ESC, e.altKey && (o.key = s.C0.ESC + s.C0.ESC), o.cancel = !0;
                            break;
                        case 37:
                            if (e.metaKey) break;
                            a ? (o.key = s.C0.ESC + "[1;" + (a + 1) + "D", o.key === s.C0.ESC + "[1;3D" && (o.key = s.C0.ESC + (i ? "b" : "[1;5D"))) : o.key = t ? s.C0.ESC + "OD" : s.C0.ESC + "[D";
                            break;
                        case 39:
                            if (e.metaKey) break;
                            a ? (o.key = s.C0.ESC + "[1;" + (a + 1) + "C", o.key === s.C0.ESC + "[1;3C" && (o.key = s.C0.ESC + (i ? "f" : "[1;5C"))) : o.key = t ? s.C0.ESC + "OC" : s.C0.ESC + "[C";
                            break;
                        case 38:
                            if (e.metaKey) break;
                            a ? (o.key = s.C0.ESC + "[1;" + (a + 1) + "A", i || o.key !== s.C0.ESC + "[1;3A" || (o.key = s.C0.ESC + "[1;5A")) : o.key = t ? s.C0.ESC + "OA" : s.C0.ESC + "[A";
                            break;
                        case 40:
                            if (e.metaKey) break;
                            a ? (o.key = s.C0.ESC + "[1;" + (a + 1) + "B", i || o.key !== s.C0.ESC + "[1;3B" || (o.key = s.C0.ESC + "[1;5B")) : o.key = t ? s.C0.ESC + "OB" : s.C0.ESC + "[B";
                            break;
                        case 45:
                            e.shiftKey || e.ctrlKey || (o.key = s.C0.ESC + "[2~");
                            break;
                        case 46:
                            o.key = a ? s.C0.ESC + "[3;" + (a + 1) + "~" : s.C0.ESC + "[3~";
                            break;
                        case 36:
                            o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "H" : t ? s.C0.ESC + "OH" : s.C0.ESC + "[H";
                            break;
                        case 35:
                            o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "F" : t ? s.C0.ESC + "OF" : s.C0.ESC + "[F";
                            break;
                        case 33:
                            e.shiftKey ? o.type = 2 : e.ctrlKey ? o.key = s.C0.ESC + "[5;" + (a + 1) + "~" : o.key = s.C0.ESC + "[5~";
                            break;
                        case 34:
                            e.shiftKey ? o.type = 3 : e.ctrlKey ? o.key = s.C0.ESC + "[6;" + (a + 1) + "~" : o.key = s.C0.ESC + "[6~";
                            break;
                        case 112:
                            o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "P" : s.C0.ESC + "OP";
                            break;
                        case 113:
                            o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "Q" : s.C0.ESC + "OQ";
                            break;
                        case 114:
                            o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "R" : s.C0.ESC + "OR";
                            break;
                        case 115:
                            o.key = a ? s.C0.ESC + "[1;" + (a + 1) + "S" : s.C0.ESC + "OS";
                            break;
                        case 116:
                            o.key = a ? s.C0.ESC + "[15;" + (a + 1) + "~" : s.C0.ESC + "[15~";
                            break;
                        case 117:
                            o.key = a ? s.C0.ESC + "[17;" + (a + 1) + "~" : s.C0.ESC + "[17~";
                            break;
                        case 118:
                            o.key = a ? s.C0.ESC + "[18;" + (a + 1) + "~" : s.C0.ESC + "[18~";
                            break;
                        case 119:
                            o.key = a ? s.C0.ESC + "[19;" + (a + 1) + "~" : s.C0.ESC + "[19~";
                            break;
                        case 120:
                            o.key = a ? s.C0.ESC + "[20;" + (a + 1) + "~" : s.C0.ESC + "[20~";
                            break;
                        case 121:
                            o.key = a ? s.C0.ESC + "[21;" + (a + 1) + "~" : s.C0.ESC + "[21~";
                            break;
                        case 122:
                            o.key = a ? s.C0.ESC + "[23;" + (a + 1) + "~" : s.C0.ESC + "[23~";
                            break;
                        case 123:
                            o.key = a ? s.C0.ESC + "[24;" + (a + 1) + "~" : s.C0.ESC + "[24~";
                            break;
                        default:
                            if (!e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
                                if (i && !n || !e.altKey || e.metaKey) !i || e.altKey || e.ctrlKey || e.shiftKey || !e.metaKey ? e.key && !e.ctrlKey && !e.altKey && !e.metaKey && e.keyCode >= 48 && 1 === e.key.length ? o.key = e.key : e.key && e.ctrlKey && ("_" === e.key && (o.key = s.C0.US), "@" === e.key && (o.key = s.C0.NUL)) : 65 === e.keyCode && (o.type = 1);
                                else {
                                    const t = r[e.keyCode], i = null == t ? void 0 : t[e.shiftKey ? 1 : 0];
                                    if (i) o.key = s.C0.ESC + i;
                                    else if (e.keyCode >= 65 && e.keyCode <= 90) {
                                        const t = e.ctrlKey ? e.keyCode - 64 : e.keyCode + 32;
                                        let i = String.fromCharCode(t);
                                        e.shiftKey && (i = i.toUpperCase()), o.key = s.C0.ESC + i;
                                    } else if (32 === e.keyCode) o.key = s.C0.ESC + (e.ctrlKey ? s.C0.NUL : " ");
                                    else if ("Dead" === e.key && e.code.startsWith("Key")) {
                                        let t = e.code.slice(3, 4);
                                        e.shiftKey || (t = t.toLowerCase()), o.key = s.C0.ESC + t, o.cancel = !0;
                                    }
                                }
                            } else e.keyCode >= 65 && e.keyCode <= 90 ? o.key = String.fromCharCode(e.keyCode - 64) : 32 === e.keyCode ? o.key = s.C0.NUL : e.keyCode >= 51 && e.keyCode <= 55 ? o.key = String.fromCharCode(e.keyCode - 51 + 27) : 56 === e.keyCode ? o.key = s.C0.DEL : 219 === e.keyCode ? o.key = s.C0.ESC : 220 === e.keyCode ? o.key = s.C0.FS : 221 === e.keyCode && (o.key = s.C0.GS);
                    }
                    return o;
                };
            },
            482: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Utf8ToUtf32 = t.StringToUtf32 = t.utf32ToString = t.stringFromCodePoint = void 0, t.stringFromCodePoint = function(e) {
                    return e > 65535 ? (e -= 65536, String.fromCharCode(55296 + (e >> 10)) + String.fromCharCode(e % 1024 + 56320)) : String.fromCharCode(e);
                }, t.utf32ToString = function(e, t = 0, i = e.length) {
                    let s = "";
                    for(let r = t; r < i; ++r){
                        let t = e[r];
                        t > 65535 ? (t -= 65536, s += String.fromCharCode(55296 + (t >> 10)) + String.fromCharCode(t % 1024 + 56320)) : s += String.fromCharCode(t);
                    }
                    return s;
                }, t.StringToUtf32 = class {
                    constructor(){
                        this._interim = 0;
                    }
                    clear() {
                        this._interim = 0;
                    }
                    decode(e, t) {
                        const i = e.length;
                        if (!i) return 0;
                        let s = 0, r = 0;
                        if (this._interim) {
                            const i = e.charCodeAt(r++);
                            56320 <= i && i <= 57343 ? t[s++] = 1024 * (this._interim - 55296) + i - 56320 + 65536 : (t[s++] = this._interim, t[s++] = i), this._interim = 0;
                        }
                        for(let n = r; n < i; ++n){
                            const r = e.charCodeAt(n);
                            if (55296 <= r && r <= 56319) {
                                if (++n >= i) return this._interim = r, s;
                                const o = e.charCodeAt(n);
                                56320 <= o && o <= 57343 ? t[s++] = 1024 * (r - 55296) + o - 56320 + 65536 : (t[s++] = r, t[s++] = o);
                            } else 65279 !== r && (t[s++] = r);
                        }
                        return s;
                    }
                }, t.Utf8ToUtf32 = class {
                    constructor(){
                        this.interim = new Uint8Array(3);
                    }
                    clear() {
                        this.interim.fill(0);
                    }
                    decode(e, t) {
                        const i = e.length;
                        if (!i) return 0;
                        let s, r, n, o, a = 0, h = 0, c = 0;
                        if (this.interim[0]) {
                            let s = !1, r = this.interim[0];
                            r &= 192 == (224 & r) ? 31 : 224 == (240 & r) ? 15 : 7;
                            let n, o = 0;
                            for(; (n = 63 & this.interim[++o]) && o < 4;)r <<= 6, r |= n;
                            const h = 192 == (224 & this.interim[0]) ? 2 : 224 == (240 & this.interim[0]) ? 3 : 4, l = h - o;
                            for(; c < l;){
                                if (c >= i) return 0;
                                if (n = e[c++], 128 != (192 & n)) {
                                    c--, s = !0;
                                    break;
                                }
                                this.interim[o++] = n, r <<= 6, r |= 63 & n;
                            }
                            s || (2 === h ? r < 128 ? c-- : t[a++] = r : 3 === h ? r < 2048 || r >= 55296 && r <= 57343 || 65279 === r || (t[a++] = r) : r < 65536 || r > 1114111 || (t[a++] = r)), this.interim.fill(0);
                        }
                        const l = i - 4;
                        let d = c;
                        for(; d < i;){
                            for(; !(!(d < l) || 128 & (s = e[d]) || 128 & (r = e[d + 1]) || 128 & (n = e[d + 2]) || 128 & (o = e[d + 3]));)t[a++] = s, t[a++] = r, t[a++] = n, t[a++] = o, d += 4;
                            if (s = e[d++], s < 128) t[a++] = s;
                            else if (192 == (224 & s)) {
                                if (d >= i) return this.interim[0] = s, a;
                                if (r = e[d++], 128 != (192 & r)) {
                                    d--;
                                    continue;
                                }
                                if (h = (31 & s) << 6 | 63 & r, h < 128) {
                                    d--;
                                    continue;
                                }
                                t[a++] = h;
                            } else if (224 == (240 & s)) {
                                if (d >= i) return this.interim[0] = s, a;
                                if (r = e[d++], 128 != (192 & r)) {
                                    d--;
                                    continue;
                                }
                                if (d >= i) return this.interim[0] = s, this.interim[1] = r, a;
                                if (n = e[d++], 128 != (192 & n)) {
                                    d--;
                                    continue;
                                }
                                if (h = (15 & s) << 12 | (63 & r) << 6 | 63 & n, h < 2048 || h >= 55296 && h <= 57343 || 65279 === h) continue;
                                t[a++] = h;
                            } else if (240 == (248 & s)) {
                                if (d >= i) return this.interim[0] = s, a;
                                if (r = e[d++], 128 != (192 & r)) {
                                    d--;
                                    continue;
                                }
                                if (d >= i) return this.interim[0] = s, this.interim[1] = r, a;
                                if (n = e[d++], 128 != (192 & n)) {
                                    d--;
                                    continue;
                                }
                                if (d >= i) return this.interim[0] = s, this.interim[1] = r, this.interim[2] = n, a;
                                if (o = e[d++], 128 != (192 & o)) {
                                    d--;
                                    continue;
                                }
                                if (h = (7 & s) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & o, h < 65536 || h > 1114111) continue;
                                t[a++] = h;
                            }
                        }
                        return a;
                    }
                };
            },
            225: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.UnicodeV6 = void 0;
                const i = [
                    [
                        768,
                        879
                    ],
                    [
                        1155,
                        1158
                    ],
                    [
                        1160,
                        1161
                    ],
                    [
                        1425,
                        1469
                    ],
                    [
                        1471,
                        1471
                    ],
                    [
                        1473,
                        1474
                    ],
                    [
                        1476,
                        1477
                    ],
                    [
                        1479,
                        1479
                    ],
                    [
                        1536,
                        1539
                    ],
                    [
                        1552,
                        1557
                    ],
                    [
                        1611,
                        1630
                    ],
                    [
                        1648,
                        1648
                    ],
                    [
                        1750,
                        1764
                    ],
                    [
                        1767,
                        1768
                    ],
                    [
                        1770,
                        1773
                    ],
                    [
                        1807,
                        1807
                    ],
                    [
                        1809,
                        1809
                    ],
                    [
                        1840,
                        1866
                    ],
                    [
                        1958,
                        1968
                    ],
                    [
                        2027,
                        2035
                    ],
                    [
                        2305,
                        2306
                    ],
                    [
                        2364,
                        2364
                    ],
                    [
                        2369,
                        2376
                    ],
                    [
                        2381,
                        2381
                    ],
                    [
                        2385,
                        2388
                    ],
                    [
                        2402,
                        2403
                    ],
                    [
                        2433,
                        2433
                    ],
                    [
                        2492,
                        2492
                    ],
                    [
                        2497,
                        2500
                    ],
                    [
                        2509,
                        2509
                    ],
                    [
                        2530,
                        2531
                    ],
                    [
                        2561,
                        2562
                    ],
                    [
                        2620,
                        2620
                    ],
                    [
                        2625,
                        2626
                    ],
                    [
                        2631,
                        2632
                    ],
                    [
                        2635,
                        2637
                    ],
                    [
                        2672,
                        2673
                    ],
                    [
                        2689,
                        2690
                    ],
                    [
                        2748,
                        2748
                    ],
                    [
                        2753,
                        2757
                    ],
                    [
                        2759,
                        2760
                    ],
                    [
                        2765,
                        2765
                    ],
                    [
                        2786,
                        2787
                    ],
                    [
                        2817,
                        2817
                    ],
                    [
                        2876,
                        2876
                    ],
                    [
                        2879,
                        2879
                    ],
                    [
                        2881,
                        2883
                    ],
                    [
                        2893,
                        2893
                    ],
                    [
                        2902,
                        2902
                    ],
                    [
                        2946,
                        2946
                    ],
                    [
                        3008,
                        3008
                    ],
                    [
                        3021,
                        3021
                    ],
                    [
                        3134,
                        3136
                    ],
                    [
                        3142,
                        3144
                    ],
                    [
                        3146,
                        3149
                    ],
                    [
                        3157,
                        3158
                    ],
                    [
                        3260,
                        3260
                    ],
                    [
                        3263,
                        3263
                    ],
                    [
                        3270,
                        3270
                    ],
                    [
                        3276,
                        3277
                    ],
                    [
                        3298,
                        3299
                    ],
                    [
                        3393,
                        3395
                    ],
                    [
                        3405,
                        3405
                    ],
                    [
                        3530,
                        3530
                    ],
                    [
                        3538,
                        3540
                    ],
                    [
                        3542,
                        3542
                    ],
                    [
                        3633,
                        3633
                    ],
                    [
                        3636,
                        3642
                    ],
                    [
                        3655,
                        3662
                    ],
                    [
                        3761,
                        3761
                    ],
                    [
                        3764,
                        3769
                    ],
                    [
                        3771,
                        3772
                    ],
                    [
                        3784,
                        3789
                    ],
                    [
                        3864,
                        3865
                    ],
                    [
                        3893,
                        3893
                    ],
                    [
                        3895,
                        3895
                    ],
                    [
                        3897,
                        3897
                    ],
                    [
                        3953,
                        3966
                    ],
                    [
                        3968,
                        3972
                    ],
                    [
                        3974,
                        3975
                    ],
                    [
                        3984,
                        3991
                    ],
                    [
                        3993,
                        4028
                    ],
                    [
                        4038,
                        4038
                    ],
                    [
                        4141,
                        4144
                    ],
                    [
                        4146,
                        4146
                    ],
                    [
                        4150,
                        4151
                    ],
                    [
                        4153,
                        4153
                    ],
                    [
                        4184,
                        4185
                    ],
                    [
                        4448,
                        4607
                    ],
                    [
                        4959,
                        4959
                    ],
                    [
                        5906,
                        5908
                    ],
                    [
                        5938,
                        5940
                    ],
                    [
                        5970,
                        5971
                    ],
                    [
                        6002,
                        6003
                    ],
                    [
                        6068,
                        6069
                    ],
                    [
                        6071,
                        6077
                    ],
                    [
                        6086,
                        6086
                    ],
                    [
                        6089,
                        6099
                    ],
                    [
                        6109,
                        6109
                    ],
                    [
                        6155,
                        6157
                    ],
                    [
                        6313,
                        6313
                    ],
                    [
                        6432,
                        6434
                    ],
                    [
                        6439,
                        6440
                    ],
                    [
                        6450,
                        6450
                    ],
                    [
                        6457,
                        6459
                    ],
                    [
                        6679,
                        6680
                    ],
                    [
                        6912,
                        6915
                    ],
                    [
                        6964,
                        6964
                    ],
                    [
                        6966,
                        6970
                    ],
                    [
                        6972,
                        6972
                    ],
                    [
                        6978,
                        6978
                    ],
                    [
                        7019,
                        7027
                    ],
                    [
                        7616,
                        7626
                    ],
                    [
                        7678,
                        7679
                    ],
                    [
                        8203,
                        8207
                    ],
                    [
                        8234,
                        8238
                    ],
                    [
                        8288,
                        8291
                    ],
                    [
                        8298,
                        8303
                    ],
                    [
                        8400,
                        8431
                    ],
                    [
                        12330,
                        12335
                    ],
                    [
                        12441,
                        12442
                    ],
                    [
                        43014,
                        43014
                    ],
                    [
                        43019,
                        43019
                    ],
                    [
                        43045,
                        43046
                    ],
                    [
                        64286,
                        64286
                    ],
                    [
                        65024,
                        65039
                    ],
                    [
                        65056,
                        65059
                    ],
                    [
                        65279,
                        65279
                    ],
                    [
                        65529,
                        65531
                    ]
                ], s = [
                    [
                        68097,
                        68099
                    ],
                    [
                        68101,
                        68102
                    ],
                    [
                        68108,
                        68111
                    ],
                    [
                        68152,
                        68154
                    ],
                    [
                        68159,
                        68159
                    ],
                    [
                        119143,
                        119145
                    ],
                    [
                        119155,
                        119170
                    ],
                    [
                        119173,
                        119179
                    ],
                    [
                        119210,
                        119213
                    ],
                    [
                        119362,
                        119364
                    ],
                    [
                        917505,
                        917505
                    ],
                    [
                        917536,
                        917631
                    ],
                    [
                        917760,
                        917999
                    ]
                ];
                let r;
                t.UnicodeV6 = class {
                    constructor(){
                        if (this.version = "6", !r) {
                            r = new Uint8Array(65536), r.fill(1), r[0] = 0, r.fill(0, 1, 32), r.fill(0, 127, 160), r.fill(2, 4352, 4448), r[9001] = 2, r[9002] = 2, r.fill(2, 11904, 42192), r[12351] = 1, r.fill(2, 44032, 55204), r.fill(2, 63744, 64256), r.fill(2, 65040, 65050), r.fill(2, 65072, 65136), r.fill(2, 65280, 65377), r.fill(2, 65504, 65511);
                            for(let e = 0; e < i.length; ++e)r.fill(0, i[e][0], i[e][1] + 1);
                        }
                    }
                    wcwidth(e) {
                        return e < 32 ? 0 : e < 127 ? 1 : e < 65536 ? r[e] : function(e, t) {
                            let i, s = 0, r = t.length - 1;
                            if (e < t[0][0] || e > t[r][1]) return !1;
                            for(; r >= s;)if (i = s + r >> 1, e > t[i][1]) s = i + 1;
                            else {
                                if (!(e < t[i][0])) return !0;
                                r = i - 1;
                            }
                            return !1;
                        }(e, s) ? 0 : e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141 ? 2 : 1;
                    }
                };
            },
            5981: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.WriteBuffer = void 0;
                const s = i(8460), r = i(844);
                class n extends r.Disposable {
                    constructor(e){
                        super(), this._action = e, this._writeBuffer = [], this._callbacks = [], this._pendingData = 0, this._bufferOffset = 0, this._isSyncWriting = !1, this._syncCalls = 0, this._didUserInput = !1, this._onWriteParsed = this.register(new s.EventEmitter), this.onWriteParsed = this._onWriteParsed.event;
                    }
                    handleUserInput() {
                        this._didUserInput = !0;
                    }
                    writeSync(e, t) {
                        if (void 0 !== t && this._syncCalls > t) return void (this._syncCalls = 0);
                        if (this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
                        let i;
                        for(this._isSyncWriting = !0; i = this._writeBuffer.shift();){
                            this._action(i);
                            const e = this._callbacks.shift();
                            e && e();
                        }
                        this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = !1, this._syncCalls = 0;
                    }
                    write(e, t) {
                        if (this._pendingData > 5e7) throw new Error("write data discarded, use flow control to avoid losing data");
                        if (!this._writeBuffer.length) {
                            if (this._bufferOffset = 0, this._didUserInput) return this._didUserInput = !1, this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(t), void this._innerWrite();
                            setTimeout(()=>this._innerWrite());
                        }
                        this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(t);
                    }
                    _innerWrite(e = 0, t = !0) {
                        const i = e || Date.now();
                        for(; this._writeBuffer.length > this._bufferOffset;){
                            const e = this._writeBuffer[this._bufferOffset], s = this._action(e, t);
                            if (s) {
                                const e = (e)=>Date.now() - i >= 12 ? setTimeout(()=>this._innerWrite(0, e)) : this._innerWrite(i, e);
                                return void s.catch((e)=>(queueMicrotask(()=>{
                                        throw e;
                                    }), Promise.resolve(!1))).then(e);
                            }
                            const r = this._callbacks[this._bufferOffset];
                            if (r && r(), this._bufferOffset++, this._pendingData -= e.length, Date.now() - i >= 12) break;
                        }
                        this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > 50 && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(()=>this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
                    }
                }
                t.WriteBuffer = n;
            },
            5941: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.toRgbString = t.parseColor = void 0;
                const i = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/, s = /^[\da-f]+$/;
                function r(e, t) {
                    const i = e.toString(16), s = i.length < 2 ? "0" + i : i;
                    switch(t){
                        case 4:
                            return i[0];
                        case 8:
                            return s;
                        case 12:
                            return (s + s).slice(0, 3);
                        default:
                            return s + s;
                    }
                }
                t.parseColor = function(e) {
                    if (!e) return;
                    let t = e.toLowerCase();
                    if (0 === t.indexOf("rgb:")) {
                        t = t.slice(4);
                        const e = i.exec(t);
                        if (e) {
                            const t = e[1] ? 15 : e[4] ? 255 : e[7] ? 4095 : 65535;
                            return [
                                Math.round(parseInt(e[1] || e[4] || e[7] || e[10], 16) / t * 255),
                                Math.round(parseInt(e[2] || e[5] || e[8] || e[11], 16) / t * 255),
                                Math.round(parseInt(e[3] || e[6] || e[9] || e[12], 16) / t * 255)
                            ];
                        }
                    } else if (0 === t.indexOf("#") && (t = t.slice(1), s.exec(t) && [
                        3,
                        6,
                        9,
                        12
                    ].includes(t.length))) {
                        const e = t.length / 3, i = [
                            0,
                            0,
                            0
                        ];
                        for(let s = 0; s < 3; ++s){
                            const r = parseInt(t.slice(e * s, e * s + e), 16);
                            i[s] = 1 === e ? r << 4 : 2 === e ? r : 3 === e ? r >> 4 : r >> 8;
                        }
                        return i;
                    }
                }, t.toRgbString = function(e, t = 16) {
                    const [i, s, n] = e;
                    return `rgb:${r(i, t)}/${r(s, t)}/${r(n, t)}`;
                };
            },
            5770: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.PAYLOAD_LIMIT = void 0, t.PAYLOAD_LIMIT = 1e7;
            },
            6351: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.DcsHandler = t.DcsParser = void 0;
                const s = i(482), r = i(8742), n = i(5770), o = [];
                t.DcsParser = class {
                    constructor(){
                        this._handlers = Object.create(null), this._active = o, this._ident = 0, this._handlerFb = ()=>{}, this._stack = {
                            paused: !1,
                            loopPosition: 0,
                            fallThrough: !1
                        };
                    }
                    dispose() {
                        this._handlers = Object.create(null), this._handlerFb = ()=>{}, this._active = o;
                    }
                    registerHandler(e, t) {
                        void 0 === this._handlers[e] && (this._handlers[e] = []);
                        const i = this._handlers[e];
                        return i.push(t), {
                            dispose: ()=>{
                                const e = i.indexOf(t);
                                -1 !== e && i.splice(e, 1);
                            }
                        };
                    }
                    clearHandler(e) {
                        this._handlers[e] && delete this._handlers[e];
                    }
                    setHandlerFallback(e) {
                        this._handlerFb = e;
                    }
                    reset() {
                        if (this._active.length) for(let e = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e >= 0; --e)this._active[e].unhook(!1);
                        this._stack.paused = !1, this._active = o, this._ident = 0;
                    }
                    hook(e, t) {
                        if (this.reset(), this._ident = e, this._active = this._handlers[e] || o, this._active.length) for(let e = this._active.length - 1; e >= 0; e--)this._active[e].hook(t);
                        else this._handlerFb(this._ident, "HOOK", t);
                    }
                    put(e, t, i) {
                        if (this._active.length) for(let s = this._active.length - 1; s >= 0; s--)this._active[s].put(e, t, i);
                        else this._handlerFb(this._ident, "PUT", (0, s.utf32ToString)(e, t, i));
                    }
                    unhook(e, t = !0) {
                        if (this._active.length) {
                            let i = !1, s = this._active.length - 1, r = !1;
                            if (this._stack.paused && (s = this._stack.loopPosition - 1, i = t, r = this._stack.fallThrough, this._stack.paused = !1), !r && !1 === i) {
                                for(; s >= 0 && (i = this._active[s].unhook(e), !0 !== i); s--)if (i instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s, this._stack.fallThrough = !1, i;
                                s--;
                            }
                            for(; s >= 0; s--)if (i = this._active[s].unhook(!1), i instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s, this._stack.fallThrough = !0, i;
                        } else this._handlerFb(this._ident, "UNHOOK", e);
                        this._active = o, this._ident = 0;
                    }
                };
                const a = new r.Params;
                a.addParam(0), t.DcsHandler = class {
                    constructor(e){
                        this._handler = e, this._data = "", this._params = a, this._hitLimit = !1;
                    }
                    hook(e) {
                        this._params = e.length > 1 || e.params[0] ? e.clone() : a, this._data = "", this._hitLimit = !1;
                    }
                    put(e, t, i) {
                        this._hitLimit || (this._data += (0, s.utf32ToString)(e, t, i), this._data.length > n.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = !0));
                    }
                    unhook(e) {
                        let t = !1;
                        if (this._hitLimit) t = !1;
                        else if (e && (t = this._handler(this._data, this._params), t instanceof Promise)) return t.then((e)=>(this._params = a, this._data = "", this._hitLimit = !1, e));
                        return this._params = a, this._data = "", this._hitLimit = !1, t;
                    }
                };
            },
            2015: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.EscapeSequenceParser = t.VT500_TRANSITION_TABLE = t.TransitionTable = void 0;
                const s = i(844), r = i(8742), n = i(6242), o = i(6351);
                class a {
                    constructor(e){
                        this.table = new Uint8Array(e);
                    }
                    setDefault(e, t) {
                        this.table.fill(e << 4 | t);
                    }
                    add(e, t, i, s) {
                        this.table[t << 8 | e] = i << 4 | s;
                    }
                    addMany(e, t, i, s) {
                        for(let r = 0; r < e.length; r++)this.table[t << 8 | e[r]] = i << 4 | s;
                    }
                }
                t.TransitionTable = a;
                const h = 160;
                t.VT500_TRANSITION_TABLE = function() {
                    const e = new a(4095), t = Array.apply(null, Array(256)).map((e, t)=>t), i = (e, i)=>t.slice(e, i), s = i(32, 127), r = i(0, 24);
                    r.push(25), r.push.apply(r, i(28, 32));
                    const n = i(0, 14);
                    let o;
                    for(o in e.setDefault(1, 0), e.addMany(s, 0, 2, 0), n)e.addMany([
                        24,
                        26,
                        153,
                        154
                    ], o, 3, 0), e.addMany(i(128, 144), o, 3, 0), e.addMany(i(144, 152), o, 3, 0), e.add(156, o, 0, 0), e.add(27, o, 11, 1), e.add(157, o, 4, 8), e.addMany([
                        152,
                        158,
                        159
                    ], o, 0, 7), e.add(155, o, 11, 3), e.add(144, o, 11, 9);
                    return e.addMany(r, 0, 3, 0), e.addMany(r, 1, 3, 1), e.add(127, 1, 0, 1), e.addMany(r, 8, 0, 8), e.addMany(r, 3, 3, 3), e.add(127, 3, 0, 3), e.addMany(r, 4, 3, 4), e.add(127, 4, 0, 4), e.addMany(r, 6, 3, 6), e.addMany(r, 5, 3, 5), e.add(127, 5, 0, 5), e.addMany(r, 2, 3, 2), e.add(127, 2, 0, 2), e.add(93, 1, 4, 8), e.addMany(s, 8, 5, 8), e.add(127, 8, 5, 8), e.addMany([
                        156,
                        27,
                        24,
                        26,
                        7
                    ], 8, 6, 0), e.addMany(i(28, 32), 8, 0, 8), e.addMany([
                        88,
                        94,
                        95
                    ], 1, 0, 7), e.addMany(s, 7, 0, 7), e.addMany(r, 7, 0, 7), e.add(156, 7, 0, 0), e.add(127, 7, 0, 7), e.add(91, 1, 11, 3), e.addMany(i(64, 127), 3, 7, 0), e.addMany(i(48, 60), 3, 8, 4), e.addMany([
                        60,
                        61,
                        62,
                        63
                    ], 3, 9, 4), e.addMany(i(48, 60), 4, 8, 4), e.addMany(i(64, 127), 4, 7, 0), e.addMany([
                        60,
                        61,
                        62,
                        63
                    ], 4, 0, 6), e.addMany(i(32, 64), 6, 0, 6), e.add(127, 6, 0, 6), e.addMany(i(64, 127), 6, 0, 0), e.addMany(i(32, 48), 3, 9, 5), e.addMany(i(32, 48), 5, 9, 5), e.addMany(i(48, 64), 5, 0, 6), e.addMany(i(64, 127), 5, 7, 0), e.addMany(i(32, 48), 4, 9, 5), e.addMany(i(32, 48), 1, 9, 2), e.addMany(i(32, 48), 2, 9, 2), e.addMany(i(48, 127), 2, 10, 0), e.addMany(i(48, 80), 1, 10, 0), e.addMany(i(81, 88), 1, 10, 0), e.addMany([
                        89,
                        90,
                        92
                    ], 1, 10, 0), e.addMany(i(96, 127), 1, 10, 0), e.add(80, 1, 11, 9), e.addMany(r, 9, 0, 9), e.add(127, 9, 0, 9), e.addMany(i(28, 32), 9, 0, 9), e.addMany(i(32, 48), 9, 9, 12), e.addMany(i(48, 60), 9, 8, 10), e.addMany([
                        60,
                        61,
                        62,
                        63
                    ], 9, 9, 10), e.addMany(r, 11, 0, 11), e.addMany(i(32, 128), 11, 0, 11), e.addMany(i(28, 32), 11, 0, 11), e.addMany(r, 10, 0, 10), e.add(127, 10, 0, 10), e.addMany(i(28, 32), 10, 0, 10), e.addMany(i(48, 60), 10, 8, 10), e.addMany([
                        60,
                        61,
                        62,
                        63
                    ], 10, 0, 11), e.addMany(i(32, 48), 10, 9, 12), e.addMany(r, 12, 0, 12), e.add(127, 12, 0, 12), e.addMany(i(28, 32), 12, 0, 12), e.addMany(i(32, 48), 12, 9, 12), e.addMany(i(48, 64), 12, 0, 11), e.addMany(i(64, 127), 12, 12, 13), e.addMany(i(64, 127), 10, 12, 13), e.addMany(i(64, 127), 9, 12, 13), e.addMany(r, 13, 13, 13), e.addMany(s, 13, 13, 13), e.add(127, 13, 0, 13), e.addMany([
                        27,
                        156,
                        24,
                        26
                    ], 13, 14, 0), e.add(h, 0, 2, 0), e.add(h, 8, 5, 8), e.add(h, 6, 0, 6), e.add(h, 11, 0, 11), e.add(h, 13, 13, 13), e;
                }();
                class c extends s.Disposable {
                    constructor(e = t.VT500_TRANSITION_TABLE){
                        super(), this._transitions = e, this._parseStack = {
                            state: 0,
                            handlers: [],
                            handlerPos: 0,
                            transition: 0,
                            chunkPos: 0
                        }, this.initialState = 0, this.currentState = this.initialState, this._params = new r.Params, this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0, this._printHandlerFb = (e, t, i)=>{}, this._executeHandlerFb = (e)=>{}, this._csiHandlerFb = (e, t)=>{}, this._escHandlerFb = (e)=>{}, this._errorHandlerFb = (e)=>e, this._printHandler = this._printHandlerFb, this._executeHandlers = Object.create(null), this._csiHandlers = Object.create(null), this._escHandlers = Object.create(null), this.register((0, s.toDisposable)(()=>{
                            this._csiHandlers = Object.create(null), this._executeHandlers = Object.create(null), this._escHandlers = Object.create(null);
                        })), this._oscParser = this.register(new n.OscParser), this._dcsParser = this.register(new o.DcsParser), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({
                            final: "\\"
                        }, ()=>!0);
                    }
                    _identifier(e, t = [
                        64,
                        126
                    ]) {
                        let i = 0;
                        if (e.prefix) {
                            if (e.prefix.length > 1) throw new Error("only one byte as prefix supported");
                            if (i = e.prefix.charCodeAt(0), i && 60 > i || i > 63) throw new Error("prefix must be in range 0x3c .. 0x3f");
                        }
                        if (e.intermediates) {
                            if (e.intermediates.length > 2) throw new Error("only two bytes as intermediates are supported");
                            for(let t = 0; t < e.intermediates.length; ++t){
                                const s = e.intermediates.charCodeAt(t);
                                if (32 > s || s > 47) throw new Error("intermediate must be in range 0x20 .. 0x2f");
                                i <<= 8, i |= s;
                            }
                        }
                        if (1 !== e.final.length) throw new Error("final must be a single byte");
                        const s = e.final.charCodeAt(0);
                        if (t[0] > s || s > t[1]) throw new Error(`final must be in range ${t[0]} .. ${t[1]}`);
                        return i <<= 8, i |= s, i;
                    }
                    identToString(e) {
                        const t = [];
                        for(; e;)t.push(String.fromCharCode(255 & e)), e >>= 8;
                        return t.reverse().join("");
                    }
                    setPrintHandler(e) {
                        this._printHandler = e;
                    }
                    clearPrintHandler() {
                        this._printHandler = this._printHandlerFb;
                    }
                    registerEscHandler(e, t) {
                        const i = this._identifier(e, [
                            48,
                            126
                        ]);
                        void 0 === this._escHandlers[i] && (this._escHandlers[i] = []);
                        const s = this._escHandlers[i];
                        return s.push(t), {
                            dispose: ()=>{
                                const e = s.indexOf(t);
                                -1 !== e && s.splice(e, 1);
                            }
                        };
                    }
                    clearEscHandler(e) {
                        this._escHandlers[this._identifier(e, [
                            48,
                            126
                        ])] && delete this._escHandlers[this._identifier(e, [
                            48,
                            126
                        ])];
                    }
                    setEscHandlerFallback(e) {
                        this._escHandlerFb = e;
                    }
                    setExecuteHandler(e, t) {
                        this._executeHandlers[e.charCodeAt(0)] = t;
                    }
                    clearExecuteHandler(e) {
                        this._executeHandlers[e.charCodeAt(0)] && delete this._executeHandlers[e.charCodeAt(0)];
                    }
                    setExecuteHandlerFallback(e) {
                        this._executeHandlerFb = e;
                    }
                    registerCsiHandler(e, t) {
                        const i = this._identifier(e);
                        void 0 === this._csiHandlers[i] && (this._csiHandlers[i] = []);
                        const s = this._csiHandlers[i];
                        return s.push(t), {
                            dispose: ()=>{
                                const e = s.indexOf(t);
                                -1 !== e && s.splice(e, 1);
                            }
                        };
                    }
                    clearCsiHandler(e) {
                        this._csiHandlers[this._identifier(e)] && delete this._csiHandlers[this._identifier(e)];
                    }
                    setCsiHandlerFallback(e) {
                        this._csiHandlerFb = e;
                    }
                    registerDcsHandler(e, t) {
                        return this._dcsParser.registerHandler(this._identifier(e), t);
                    }
                    clearDcsHandler(e) {
                        this._dcsParser.clearHandler(this._identifier(e));
                    }
                    setDcsHandlerFallback(e) {
                        this._dcsParser.setHandlerFallback(e);
                    }
                    registerOscHandler(e, t) {
                        return this._oscParser.registerHandler(e, t);
                    }
                    clearOscHandler(e) {
                        this._oscParser.clearHandler(e);
                    }
                    setOscHandlerFallback(e) {
                        this._oscParser.setHandlerFallback(e);
                    }
                    setErrorHandler(e) {
                        this._errorHandler = e;
                    }
                    clearErrorHandler() {
                        this._errorHandler = this._errorHandlerFb;
                    }
                    reset() {
                        this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0, 0 !== this._parseStack.state && (this._parseStack.state = 2, this._parseStack.handlers = []);
                    }
                    _preserveStack(e, t, i, s, r) {
                        this._parseStack.state = e, this._parseStack.handlers = t, this._parseStack.handlerPos = i, this._parseStack.transition = s, this._parseStack.chunkPos = r;
                    }
                    parse(e, t, i) {
                        let s, r = 0, n = 0, o = 0;
                        if (this._parseStack.state) {
                            if (2 === this._parseStack.state) this._parseStack.state = 0, o = this._parseStack.chunkPos + 1;
                            else {
                                if (void 0 === i || 1 === this._parseStack.state) throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
                                const t = this._parseStack.handlers;
                                let n = this._parseStack.handlerPos - 1;
                                switch(this._parseStack.state){
                                    case 3:
                                        if (!1 === i && n > -1) {
                                            for(; n >= 0 && (s = t[n](this._params), !0 !== s); n--)if (s instanceof Promise) return this._parseStack.handlerPos = n, s;
                                        }
                                        this._parseStack.handlers = [];
                                        break;
                                    case 4:
                                        if (!1 === i && n > -1) {
                                            for(; n >= 0 && (s = t[n](), !0 !== s); n--)if (s instanceof Promise) return this._parseStack.handlerPos = n, s;
                                        }
                                        this._parseStack.handlers = [];
                                        break;
                                    case 6:
                                        if (r = e[this._parseStack.chunkPos], s = this._dcsParser.unhook(24 !== r && 26 !== r, i), s) return s;
                                        27 === r && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
                                        break;
                                    case 5:
                                        if (r = e[this._parseStack.chunkPos], s = this._oscParser.end(24 !== r && 26 !== r, i), s) return s;
                                        27 === r && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
                                }
                                this._parseStack.state = 0, o = this._parseStack.chunkPos + 1, this.precedingCodepoint = 0, this.currentState = 15 & this._parseStack.transition;
                            }
                        }
                        for(let i = o; i < t; ++i){
                            switch(r = e[i], n = this._transitions.table[this.currentState << 8 | (r < 160 ? r : h)], n >> 4){
                                case 2:
                                    for(let s = i + 1;; ++s){
                                        if (s >= t || (r = e[s]) < 32 || r > 126 && r < h) {
                                            this._printHandler(e, i, s), i = s - 1;
                                            break;
                                        }
                                        if (++s >= t || (r = e[s]) < 32 || r > 126 && r < h) {
                                            this._printHandler(e, i, s), i = s - 1;
                                            break;
                                        }
                                        if (++s >= t || (r = e[s]) < 32 || r > 126 && r < h) {
                                            this._printHandler(e, i, s), i = s - 1;
                                            break;
                                        }
                                        if (++s >= t || (r = e[s]) < 32 || r > 126 && r < h) {
                                            this._printHandler(e, i, s), i = s - 1;
                                            break;
                                        }
                                    }
                                    break;
                                case 3:
                                    this._executeHandlers[r] ? this._executeHandlers[r]() : this._executeHandlerFb(r), this.precedingCodepoint = 0;
                                    break;
                                case 0:
                                    break;
                                case 1:
                                    if (this._errorHandler({
                                        position: i,
                                        code: r,
                                        currentState: this.currentState,
                                        collect: this._collect,
                                        params: this._params,
                                        abort: !1
                                    }).abort) return;
                                    break;
                                case 7:
                                    const o = this._csiHandlers[this._collect << 8 | r];
                                    let a = o ? o.length - 1 : -1;
                                    for(; a >= 0 && (s = o[a](this._params), !0 !== s); a--)if (s instanceof Promise) return this._preserveStack(3, o, a, n, i), s;
                                    a < 0 && this._csiHandlerFb(this._collect << 8 | r, this._params), this.precedingCodepoint = 0;
                                    break;
                                case 8:
                                    do switch(r){
                                        case 59:
                                            this._params.addParam(0);
                                            break;
                                        case 58:
                                            this._params.addSubParam(-1);
                                            break;
                                        default:
                                            this._params.addDigit(r - 48);
                                    }
                                    while (++i < t && (r = e[i]) > 47 && r < 60);
                                    i--;
                                    break;
                                case 9:
                                    this._collect <<= 8, this._collect |= r;
                                    break;
                                case 10:
                                    const c = this._escHandlers[this._collect << 8 | r];
                                    let l = c ? c.length - 1 : -1;
                                    for(; l >= 0 && (s = c[l](), !0 !== s); l--)if (s instanceof Promise) return this._preserveStack(4, c, l, n, i), s;
                                    l < 0 && this._escHandlerFb(this._collect << 8 | r), this.precedingCodepoint = 0;
                                    break;
                                case 11:
                                    this._params.reset(), this._params.addParam(0), this._collect = 0;
                                    break;
                                case 12:
                                    this._dcsParser.hook(this._collect << 8 | r, this._params);
                                    break;
                                case 13:
                                    for(let s = i + 1;; ++s)if (s >= t || 24 === (r = e[s]) || 26 === r || 27 === r || r > 127 && r < h) {
                                        this._dcsParser.put(e, i, s), i = s - 1;
                                        break;
                                    }
                                    break;
                                case 14:
                                    if (s = this._dcsParser.unhook(24 !== r && 26 !== r), s) return this._preserveStack(6, [], 0, n, i), s;
                                    27 === r && (n |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0;
                                    break;
                                case 4:
                                    this._oscParser.start();
                                    break;
                                case 5:
                                    for(let s = i + 1;; s++)if (s >= t || (r = e[s]) < 32 || r > 127 && r < h) {
                                        this._oscParser.put(e, i, s), i = s - 1;
                                        break;
                                    }
                                    break;
                                case 6:
                                    if (s = this._oscParser.end(24 !== r && 26 !== r), s) return this._preserveStack(5, [], 0, n, i), s;
                                    27 === r && (n |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0;
                            }
                            this.currentState = 15 & n;
                        }
                    }
                }
                t.EscapeSequenceParser = c;
            },
            6242: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.OscHandler = t.OscParser = void 0;
                const s = i(5770), r = i(482), n = [];
                t.OscParser = class {
                    constructor(){
                        this._state = 0, this._active = n, this._id = -1, this._handlers = Object.create(null), this._handlerFb = ()=>{}, this._stack = {
                            paused: !1,
                            loopPosition: 0,
                            fallThrough: !1
                        };
                    }
                    registerHandler(e, t) {
                        void 0 === this._handlers[e] && (this._handlers[e] = []);
                        const i = this._handlers[e];
                        return i.push(t), {
                            dispose: ()=>{
                                const e = i.indexOf(t);
                                -1 !== e && i.splice(e, 1);
                            }
                        };
                    }
                    clearHandler(e) {
                        this._handlers[e] && delete this._handlers[e];
                    }
                    setHandlerFallback(e) {
                        this._handlerFb = e;
                    }
                    dispose() {
                        this._handlers = Object.create(null), this._handlerFb = ()=>{}, this._active = n;
                    }
                    reset() {
                        if (2 === this._state) for(let e = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e >= 0; --e)this._active[e].end(!1);
                        this._stack.paused = !1, this._active = n, this._id = -1, this._state = 0;
                    }
                    _start() {
                        if (this._active = this._handlers[this._id] || n, this._active.length) for(let e = this._active.length - 1; e >= 0; e--)this._active[e].start();
                        else this._handlerFb(this._id, "START");
                    }
                    _put(e, t, i) {
                        if (this._active.length) for(let s = this._active.length - 1; s >= 0; s--)this._active[s].put(e, t, i);
                        else this._handlerFb(this._id, "PUT", (0, r.utf32ToString)(e, t, i));
                    }
                    start() {
                        this.reset(), this._state = 1;
                    }
                    put(e, t, i) {
                        if (3 !== this._state) {
                            if (1 === this._state) for(; t < i;){
                                const i = e[t++];
                                if (59 === i) {
                                    this._state = 2, this._start();
                                    break;
                                }
                                if (i < 48 || 57 < i) return void (this._state = 3);
                                -1 === this._id && (this._id = 0), this._id = 10 * this._id + i - 48;
                            }
                            2 === this._state && i - t > 0 && this._put(e, t, i);
                        }
                    }
                    end(e, t = !0) {
                        if (0 !== this._state) {
                            if (3 !== this._state) {
                                if (1 === this._state && this._start(), this._active.length) {
                                    let i = !1, s = this._active.length - 1, r = !1;
                                    if (this._stack.paused && (s = this._stack.loopPosition - 1, i = t, r = this._stack.fallThrough, this._stack.paused = !1), !r && !1 === i) {
                                        for(; s >= 0 && (i = this._active[s].end(e), !0 !== i); s--)if (i instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s, this._stack.fallThrough = !1, i;
                                        s--;
                                    }
                                    for(; s >= 0; s--)if (i = this._active[s].end(!1), i instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = s, this._stack.fallThrough = !0, i;
                                } else this._handlerFb(this._id, "END", e);
                            }
                            this._active = n, this._id = -1, this._state = 0;
                        }
                    }
                }, t.OscHandler = class {
                    constructor(e){
                        this._handler = e, this._data = "", this._hitLimit = !1;
                    }
                    start() {
                        this._data = "", this._hitLimit = !1;
                    }
                    put(e, t, i) {
                        this._hitLimit || (this._data += (0, r.utf32ToString)(e, t, i), this._data.length > s.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = !0));
                    }
                    end(e) {
                        let t = !1;
                        if (this._hitLimit) t = !1;
                        else if (e && (t = this._handler(this._data), t instanceof Promise)) return t.then((e)=>(this._data = "", this._hitLimit = !1, e));
                        return this._data = "", this._hitLimit = !1, t;
                    }
                };
            },
            8742: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Params = void 0;
                const i = 2147483647;
                class s {
                    constructor(e = 32, t = 32){
                        if (this.maxLength = e, this.maxSubParamsLength = t, t > 256) throw new Error("maxSubParamsLength must not be greater than 256");
                        this.params = new Int32Array(e), this.length = 0, this._subParams = new Int32Array(t), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(e), this._rejectDigits = !1, this._rejectSubDigits = !1, this._digitIsSub = !1;
                    }
                    static fromArray(e) {
                        const t = new s;
                        if (!e.length) return t;
                        for(let i = Array.isArray(e[0]) ? 1 : 0; i < e.length; ++i){
                            const s = e[i];
                            if (Array.isArray(s)) for(let e = 0; e < s.length; ++e)t.addSubParam(s[e]);
                            else t.addParam(s);
                        }
                        return t;
                    }
                    clone() {
                        const e = new s(this.maxLength, this.maxSubParamsLength);
                        return e.params.set(this.params), e.length = this.length, e._subParams.set(this._subParams), e._subParamsLength = this._subParamsLength, e._subParamsIdx.set(this._subParamsIdx), e._rejectDigits = this._rejectDigits, e._rejectSubDigits = this._rejectSubDigits, e._digitIsSub = this._digitIsSub, e;
                    }
                    toArray() {
                        const e = [];
                        for(let t = 0; t < this.length; ++t){
                            e.push(this.params[t]);
                            const i = this._subParamsIdx[t] >> 8, s = 255 & this._subParamsIdx[t];
                            s - i > 0 && e.push(Array.prototype.slice.call(this._subParams, i, s));
                        }
                        return e;
                    }
                    reset() {
                        this.length = 0, this._subParamsLength = 0, this._rejectDigits = !1, this._rejectSubDigits = !1, this._digitIsSub = !1;
                    }
                    addParam(e) {
                        if (this._digitIsSub = !1, this.length >= this.maxLength) this._rejectDigits = !0;
                        else {
                            if (e < -1) throw new Error("values lesser than -1 are not allowed");
                            this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = e > i ? i : e;
                        }
                    }
                    addSubParam(e) {
                        if (this._digitIsSub = !0, this.length) {
                            if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) this._rejectSubDigits = !0;
                            else {
                                if (e < -1) throw new Error("values lesser than -1 are not allowed");
                                this._subParams[this._subParamsLength++] = e > i ? i : e, this._subParamsIdx[this.length - 1]++;
                            }
                        }
                    }
                    hasSubParams(e) {
                        return (255 & this._subParamsIdx[e]) - (this._subParamsIdx[e] >> 8) > 0;
                    }
                    getSubParams(e) {
                        const t = this._subParamsIdx[e] >> 8, i = 255 & this._subParamsIdx[e];
                        return i - t > 0 ? this._subParams.subarray(t, i) : null;
                    }
                    getSubParamsAll() {
                        const e = {};
                        for(let t = 0; t < this.length; ++t){
                            const i = this._subParamsIdx[t] >> 8, s = 255 & this._subParamsIdx[t];
                            s - i > 0 && (e[t] = this._subParams.slice(i, s));
                        }
                        return e;
                    }
                    addDigit(e) {
                        let t;
                        if (this._rejectDigits || !(t = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
                        const s = this._digitIsSub ? this._subParams : this.params, r = s[t - 1];
                        s[t - 1] = ~r ? Math.min(10 * r + e, i) : e;
                    }
                }
                t.Params = s;
            },
            5741: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.AddonManager = void 0, t.AddonManager = class {
                    constructor(){
                        this._addons = [];
                    }
                    dispose() {
                        for(let e = this._addons.length - 1; e >= 0; e--)this._addons[e].instance.dispose();
                    }
                    loadAddon(e, t) {
                        const i = {
                            instance: t,
                            dispose: t.dispose,
                            isDisposed: !1
                        };
                        this._addons.push(i), t.dispose = ()=>this._wrappedAddonDispose(i), t.activate(e);
                    }
                    _wrappedAddonDispose(e) {
                        if (e.isDisposed) return;
                        let t = -1;
                        for(let i = 0; i < this._addons.length; i++)if (this._addons[i] === e) {
                            t = i;
                            break;
                        }
                        if (-1 === t) throw new Error("Could not dispose an addon that has not been loaded");
                        e.isDisposed = !0, e.dispose.apply(e.instance), this._addons.splice(t, 1);
                    }
                };
            },
            8771: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.BufferApiView = void 0;
                const s = i(3785), r = i(511);
                t.BufferApiView = class {
                    constructor(e, t){
                        this._buffer = e, this.type = t;
                    }
                    init(e) {
                        return this._buffer = e, this;
                    }
                    get cursorY() {
                        return this._buffer.y;
                    }
                    get cursorX() {
                        return this._buffer.x;
                    }
                    get viewportY() {
                        return this._buffer.ydisp;
                    }
                    get baseY() {
                        return this._buffer.ybase;
                    }
                    get length() {
                        return this._buffer.lines.length;
                    }
                    getLine(e) {
                        const t = this._buffer.lines.get(e);
                        if (t) return new s.BufferLineApiView(t);
                    }
                    getNullCell() {
                        return new r.CellData;
                    }
                };
            },
            3785: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.BufferLineApiView = void 0;
                const s = i(511);
                t.BufferLineApiView = class {
                    constructor(e){
                        this._line = e;
                    }
                    get isWrapped() {
                        return this._line.isWrapped;
                    }
                    get length() {
                        return this._line.length;
                    }
                    getCell(e, t) {
                        if (!(e < 0 || e >= this._line.length)) return t ? (this._line.loadCell(e, t), t) : this._line.loadCell(e, new s.CellData);
                    }
                    translateToString(e, t, i) {
                        return this._line.translateToString(e, t, i);
                    }
                };
            },
            8285: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.BufferNamespaceApi = void 0;
                const s = i(8771), r = i(8460);
                t.BufferNamespaceApi = class {
                    constructor(e){
                        this._core = e, this._onBufferChange = new r.EventEmitter, this.onBufferChange = this._onBufferChange.event, this._normal = new s.BufferApiView(this._core.buffers.normal, "normal"), this._alternate = new s.BufferApiView(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(()=>this._onBufferChange.fire(this.active));
                    }
                    get active() {
                        if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
                        if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
                        throw new Error("Active buffer is neither normal nor alternate");
                    }
                    get normal() {
                        return this._normal.init(this._core.buffers.normal);
                    }
                    get alternate() {
                        return this._alternate.init(this._core.buffers.alt);
                    }
                };
            },
            7975: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ParserApi = void 0, t.ParserApi = class {
                    constructor(e){
                        this._core = e;
                    }
                    registerCsiHandler(e, t) {
                        return this._core.registerCsiHandler(e, (e)=>t(e.toArray()));
                    }
                    addCsiHandler(e, t) {
                        return this.registerCsiHandler(e, t);
                    }
                    registerDcsHandler(e, t) {
                        return this._core.registerDcsHandler(e, (e, i)=>t(e, i.toArray()));
                    }
                    addDcsHandler(e, t) {
                        return this.registerDcsHandler(e, t);
                    }
                    registerEscHandler(e, t) {
                        return this._core.registerEscHandler(e, t);
                    }
                    addEscHandler(e, t) {
                        return this.registerEscHandler(e, t);
                    }
                    registerOscHandler(e, t) {
                        return this._core.registerOscHandler(e, t);
                    }
                    addOscHandler(e, t) {
                        return this.registerOscHandler(e, t);
                    }
                };
            },
            7090: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.UnicodeApi = void 0, t.UnicodeApi = class {
                    constructor(e){
                        this._core = e;
                    }
                    register(e) {
                        this._core.unicodeService.register(e);
                    }
                    get versions() {
                        return this._core.unicodeService.versions;
                    }
                    get activeVersion() {
                        return this._core.unicodeService.activeVersion;
                    }
                    set activeVersion(e) {
                        this._core.unicodeService.activeVersion = e;
                    }
                };
            },
            744: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.BufferService = t.MINIMUM_ROWS = t.MINIMUM_COLS = void 0;
                const n = i(2585), o = i(5295), a = i(8460), h = i(844);
                t.MINIMUM_COLS = 2, t.MINIMUM_ROWS = 1;
                let c = class extends h.Disposable {
                    constructor(e){
                        super(), this.isUserScrolling = !1, this._onResize = this.register(new a.EventEmitter), this.onResize = this._onResize.event, this._onScroll = this.register(new a.EventEmitter), this.onScroll = this._onScroll.event, this.cols = Math.max(e.rawOptions.cols || 0, t.MINIMUM_COLS), this.rows = Math.max(e.rawOptions.rows || 0, t.MINIMUM_ROWS), this.buffers = this.register(new o.BufferSet(e, this));
                    }
                    get buffer() {
                        return this.buffers.active;
                    }
                    resize(e, t) {
                        this.cols = e, this.rows = t, this.buffers.resize(e, t), this._onResize.fire({
                            cols: e,
                            rows: t
                        });
                    }
                    reset() {
                        this.buffers.reset(), this.isUserScrolling = !1;
                    }
                    scroll(e, t = !1) {
                        const i = this.buffer;
                        let s;
                        s = this._cachedBlankLine, s && s.length === this.cols && s.getFg(0) === e.fg && s.getBg(0) === e.bg || (s = i.getBlankLine(e, t), this._cachedBlankLine = s), s.isWrapped = t;
                        const r = i.ybase + i.scrollTop, n = i.ybase + i.scrollBottom;
                        if (0 === i.scrollTop) {
                            const e = i.lines.isFull;
                            n === i.lines.length - 1 ? e ? i.lines.recycle().copyFrom(s) : i.lines.push(s.clone()) : i.lines.splice(n + 1, 0, s.clone()), e ? this.isUserScrolling && (i.ydisp = Math.max(i.ydisp - 1, 0)) : (i.ybase++, this.isUserScrolling || i.ydisp++);
                        } else {
                            const e = n - r + 1;
                            i.lines.shiftElements(r + 1, e - 1, -1), i.lines.set(n, s.clone());
                        }
                        this.isUserScrolling || (i.ydisp = i.ybase), this._onScroll.fire(i.ydisp);
                    }
                    scrollLines(e, t, i) {
                        const s = this.buffer;
                        if (e < 0) {
                            if (0 === s.ydisp) return;
                            this.isUserScrolling = !0;
                        } else e + s.ydisp >= s.ybase && (this.isUserScrolling = !1);
                        const r = s.ydisp;
                        s.ydisp = Math.max(Math.min(s.ydisp + e, s.ybase), 0), r !== s.ydisp && (t || this._onScroll.fire(s.ydisp));
                    }
                    scrollPages(e) {
                        this.scrollLines(e * (this.rows - 1));
                    }
                    scrollToTop() {
                        this.scrollLines(-this.buffer.ydisp);
                    }
                    scrollToBottom() {
                        this.scrollLines(this.buffer.ybase - this.buffer.ydisp);
                    }
                    scrollToLine(e) {
                        const t = e - this.buffer.ydisp;
                        0 !== t && this.scrollLines(t);
                    }
                };
                c = s([
                    r(0, n.IOptionsService)
                ], c), t.BufferService = c;
            },
            7994: (e, t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.CharsetService = void 0, t.CharsetService = class {
                    constructor(){
                        this.glevel = 0, this._charsets = [];
                    }
                    reset() {
                        this.charset = void 0, this._charsets = [], this.glevel = 0;
                    }
                    setgLevel(e) {
                        this.glevel = e, this.charset = this._charsets[e];
                    }
                    setgCharset(e, t) {
                        this._charsets[e] = t, this.glevel === e && (this.charset = t);
                    }
                };
            },
            1753: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.CoreMouseService = void 0;
                const n = i(2585), o = i(8460), a = i(844), h = {
                    NONE: {
                        events: 0,
                        restrict: ()=>!1
                    },
                    X10: {
                        events: 1,
                        restrict: (e)=>4 !== e.button && 1 === e.action && (e.ctrl = !1, e.alt = !1, e.shift = !1, !0)
                    },
                    VT200: {
                        events: 19,
                        restrict: (e)=>32 !== e.action
                    },
                    DRAG: {
                        events: 23,
                        restrict: (e)=>32 !== e.action || 3 !== e.button
                    },
                    ANY: {
                        events: 31,
                        restrict: (e)=>!0
                    }
                };
                function c(e, t) {
                    let i = (e.ctrl ? 16 : 0) | (e.shift ? 4 : 0) | (e.alt ? 8 : 0);
                    return 4 === e.button ? (i |= 64, i |= e.action) : (i |= 3 & e.button, 4 & e.button && (i |= 64), 8 & e.button && (i |= 128), 32 === e.action ? i |= 32 : 0 !== e.action || t || (i |= 3)), i;
                }
                const l = String.fromCharCode, d = {
                    DEFAULT: (e)=>{
                        const t = [
                            c(e, !1) + 32,
                            e.col + 32,
                            e.row + 32
                        ];
                        return t[0] > 255 || t[1] > 255 || t[2] > 255 ? "" : `[M${l(t[0])}${l(t[1])}${l(t[2])}`;
                    },
                    SGR: (e)=>{
                        const t = 0 === e.action && 4 !== e.button ? "m" : "M";
                        return `[<${c(e, !0)};${e.col};${e.row}${t}`;
                    },
                    SGR_PIXELS: (e)=>{
                        const t = 0 === e.action && 4 !== e.button ? "m" : "M";
                        return `[<${c(e, !0)};${e.x};${e.y}${t}`;
                    }
                };
                let _ = class extends a.Disposable {
                    constructor(e, t){
                        super(), this._bufferService = e, this._coreService = t, this._protocols = {}, this._encodings = {}, this._activeProtocol = "", this._activeEncoding = "", this._lastEvent = null, this._onProtocolChange = this.register(new o.EventEmitter), this.onProtocolChange = this._onProtocolChange.event;
                        for (const e of Object.keys(h))this.addProtocol(e, h[e]);
                        for (const e of Object.keys(d))this.addEncoding(e, d[e]);
                        this.reset();
                    }
                    addProtocol(e, t) {
                        this._protocols[e] = t;
                    }
                    addEncoding(e, t) {
                        this._encodings[e] = t;
                    }
                    get activeProtocol() {
                        return this._activeProtocol;
                    }
                    get areMouseEventsActive() {
                        return 0 !== this._protocols[this._activeProtocol].events;
                    }
                    set activeProtocol(e) {
                        if (!this._protocols[e]) throw new Error(`unknown protocol "${e}"`);
                        this._activeProtocol = e, this._onProtocolChange.fire(this._protocols[e].events);
                    }
                    get activeEncoding() {
                        return this._activeEncoding;
                    }
                    set activeEncoding(e) {
                        if (!this._encodings[e]) throw new Error(`unknown encoding "${e}"`);
                        this._activeEncoding = e;
                    }
                    reset() {
                        this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null;
                    }
                    triggerMouseEvent(e) {
                        if (e.col < 0 || e.col >= this._bufferService.cols || e.row < 0 || e.row >= this._bufferService.rows) return !1;
                        if (4 === e.button && 32 === e.action) return !1;
                        if (3 === e.button && 32 !== e.action) return !1;
                        if (4 !== e.button && (2 === e.action || 3 === e.action)) return !1;
                        if (e.col++, e.row++, 32 === e.action && this._lastEvent && this._equalEvents(this._lastEvent, e, "SGR_PIXELS" === this._activeEncoding)) return !1;
                        if (!this._protocols[this._activeProtocol].restrict(e)) return !1;
                        const t = this._encodings[this._activeEncoding](e);
                        return t && ("DEFAULT" === this._activeEncoding ? this._coreService.triggerBinaryEvent(t) : this._coreService.triggerDataEvent(t, !0)), this._lastEvent = e, !0;
                    }
                    explainEvents(e) {
                        return {
                            down: !!(1 & e),
                            up: !!(2 & e),
                            drag: !!(4 & e),
                            move: !!(8 & e),
                            wheel: !!(16 & e)
                        };
                    }
                    _equalEvents(e, t, i) {
                        if (i) {
                            if (e.x !== t.x) return !1;
                            if (e.y !== t.y) return !1;
                        } else {
                            if (e.col !== t.col) return !1;
                            if (e.row !== t.row) return !1;
                        }
                        return e.button === t.button && e.action === t.action && e.ctrl === t.ctrl && e.alt === t.alt && e.shift === t.shift;
                    }
                };
                _ = s([
                    r(0, n.IBufferService),
                    r(1, n.ICoreService)
                ], _), t.CoreMouseService = _;
            },
            6975: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.CoreService = void 0;
                const n = i(2585), o = i(8460), a = i(1439), h = i(844), c = Object.freeze({
                    insertMode: !1
                }), l = Object.freeze({
                    applicationCursorKeys: !1,
                    applicationKeypad: !1,
                    bracketedPasteMode: !1,
                    origin: !1,
                    reverseWraparound: !1,
                    sendFocus: !1,
                    wraparound: !0
                });
                let d = class extends h.Disposable {
                    constructor(e, t, i){
                        super(), this._bufferService = e, this._logService = t, this._optionsService = i, this.isCursorInitialized = !1, this.isCursorHidden = !1, this._onData = this.register(new o.EventEmitter), this.onData = this._onData.event, this._onUserInput = this.register(new o.EventEmitter), this.onUserInput = this._onUserInput.event, this._onBinary = this.register(new o.EventEmitter), this.onBinary = this._onBinary.event, this._onRequestScrollToBottom = this.register(new o.EventEmitter), this.onRequestScrollToBottom = this._onRequestScrollToBottom.event, this.modes = (0, a.clone)(c), this.decPrivateModes = (0, a.clone)(l);
                    }
                    reset() {
                        this.modes = (0, a.clone)(c), this.decPrivateModes = (0, a.clone)(l);
                    }
                    triggerDataEvent(e, t = !1) {
                        if (this._optionsService.rawOptions.disableStdin) return;
                        const i = this._bufferService.buffer;
                        t && this._optionsService.rawOptions.scrollOnUserInput && i.ybase !== i.ydisp && this._onRequestScrollToBottom.fire(), t && this._onUserInput.fire(), this._logService.debug(`sending data "${e}"`, ()=>e.split("").map((e)=>e.charCodeAt(0))), this._onData.fire(e);
                    }
                    triggerBinaryEvent(e) {
                        this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e}"`, ()=>e.split("").map((e)=>e.charCodeAt(0))), this._onBinary.fire(e));
                    }
                };
                d = s([
                    r(0, n.IBufferService),
                    r(1, n.ILogService),
                    r(2, n.IOptionsService)
                ], d), t.CoreService = d;
            },
            9074: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.DecorationService = void 0;
                const s = i(8055), r = i(8460), n = i(844), o = i(6106);
                let a = 0, h = 0;
                class c extends n.Disposable {
                    constructor(){
                        super(), this._decorations = new o.SortedList((e)=>null == e ? void 0 : e.marker.line), this._onDecorationRegistered = this.register(new r.EventEmitter), this.onDecorationRegistered = this._onDecorationRegistered.event, this._onDecorationRemoved = this.register(new r.EventEmitter), this.onDecorationRemoved = this._onDecorationRemoved.event, this.register((0, n.toDisposable)(()=>{
                            for (const e of this._decorations.values())this._onDecorationRemoved.fire(e);
                            this.reset();
                        }));
                    }
                    get decorations() {
                        return this._decorations.values();
                    }
                    registerDecoration(e) {
                        if (e.marker.isDisposed) return;
                        const t = new l(e);
                        if (t) {
                            const e = t.marker.onDispose(()=>t.dispose());
                            t.onDispose(()=>{
                                t && (this._decorations.delete(t) && this._onDecorationRemoved.fire(t), e.dispose());
                            }), this._decorations.insert(t), this._onDecorationRegistered.fire(t);
                        }
                        return t;
                    }
                    reset() {
                        for (const e of this._decorations.values())e.dispose();
                        this._decorations.clear();
                    }
                    *getDecorationsAtCell(e, t, i) {
                        var s, r, n;
                        let o = 0, a = 0;
                        for (const h of this._decorations.getKeyIterator(t))o = null !== (s = h.options.x) && void 0 !== s ? s : 0, a = o + (null !== (r = h.options.width) && void 0 !== r ? r : 1), e >= o && e < a && (!i || (null !== (n = h.options.layer) && void 0 !== n ? n : "bottom") === i) && (yield h);
                    }
                    forEachDecorationAtCell(e, t, i, s) {
                        this._decorations.forEachByKey(t, (t)=>{
                            var r, n, o;
                            a = null !== (r = t.options.x) && void 0 !== r ? r : 0, h = a + (null !== (n = t.options.width) && void 0 !== n ? n : 1), e >= a && e < h && (!i || (null !== (o = t.options.layer) && void 0 !== o ? o : "bottom") === i) && s(t);
                        });
                    }
                    dispose() {
                        for (const e of this._decorations.values())this._onDecorationRemoved.fire(e);
                        this.reset();
                    }
                }
                t.DecorationService = c;
                class l extends n.Disposable {
                    constructor(e){
                        super(), this.options = e, this.isDisposed = !1, this.onRenderEmitter = this.register(new r.EventEmitter), this.onRender = this.onRenderEmitter.event, this._onDispose = this.register(new r.EventEmitter), this.onDispose = this._onDispose.event, this._cachedBg = null, this._cachedFg = null, this.marker = e.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
                    }
                    get backgroundColorRGB() {
                        return null === this._cachedBg && (this.options.backgroundColor ? this._cachedBg = s.css.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
                    }
                    get foregroundColorRGB() {
                        return null === this._cachedFg && (this.options.foregroundColor ? this._cachedFg = s.css.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
                    }
                    dispose() {
                        this._onDispose.fire(), super.dispose();
                    }
                }
            },
            4348: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.InstantiationService = t.ServiceCollection = void 0;
                const s = i(2585), r = i(8343);
                class n {
                    constructor(...e){
                        this._entries = new Map;
                        for (const [t, i] of e)this.set(t, i);
                    }
                    set(e, t) {
                        const i = this._entries.get(e);
                        return this._entries.set(e, t), i;
                    }
                    forEach(e) {
                        for (const [t, i] of this._entries.entries())e(t, i);
                    }
                    has(e) {
                        return this._entries.has(e);
                    }
                    get(e) {
                        return this._entries.get(e);
                    }
                }
                t.ServiceCollection = n, t.InstantiationService = class {
                    constructor(){
                        this._services = new n, this._services.set(s.IInstantiationService, this);
                    }
                    setService(e, t) {
                        this._services.set(e, t);
                    }
                    getService(e) {
                        return this._services.get(e);
                    }
                    createInstance(e, ...t) {
                        const i = (0, r.getServiceDependencies)(e).sort((e, t)=>e.index - t.index), s = [];
                        for (const t of i){
                            const i = this._services.get(t.id);
                            if (!i) throw new Error(`[createInstance] ${e.name} depends on UNKNOWN service ${t.id}.`);
                            s.push(i);
                        }
                        const n = i.length > 0 ? i[0].index : t.length;
                        if (t.length !== n) throw new Error(`[createInstance] First service dependency of ${e.name} at position ${n + 1} conflicts with ${t.length} static arguments`);
                        return new e(...[
                            ...t,
                            ...s
                        ]);
                    }
                };
            },
            7866: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.LogService = void 0;
                const n = i(844), o = i(2585), a = {
                    debug: o.LogLevelEnum.DEBUG,
                    info: o.LogLevelEnum.INFO,
                    warn: o.LogLevelEnum.WARN,
                    error: o.LogLevelEnum.ERROR,
                    off: o.LogLevelEnum.OFF
                };
                let h = class extends n.Disposable {
                    constructor(e){
                        super(), this._optionsService = e, this.logLevel = o.LogLevelEnum.OFF, this._updateLogLevel(), this.register(this._optionsService.onSpecificOptionChange("logLevel", ()=>this._updateLogLevel()));
                    }
                    _updateLogLevel() {
                        this.logLevel = a[this._optionsService.rawOptions.logLevel];
                    }
                    _evalLazyOptionalParams(e) {
                        for(let t = 0; t < e.length; t++)"function" == typeof e[t] && (e[t] = e[t]());
                    }
                    _log(e, t, i) {
                        this._evalLazyOptionalParams(i), e.call(console, "xterm.js: " + t, ...i);
                    }
                    debug(e, ...t) {
                        this.logLevel <= o.LogLevelEnum.DEBUG && this._log(console.log, e, t);
                    }
                    info(e, ...t) {
                        this.logLevel <= o.LogLevelEnum.INFO && this._log(console.info, e, t);
                    }
                    warn(e, ...t) {
                        this.logLevel <= o.LogLevelEnum.WARN && this._log(console.warn, e, t);
                    }
                    error(e, ...t) {
                        this.logLevel <= o.LogLevelEnum.ERROR && this._log(console.error, e, t);
                    }
                };
                h = s([
                    r(0, o.IOptionsService)
                ], h), t.LogService = h;
            },
            7302: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.OptionsService = t.DEFAULT_OPTIONS = void 0;
                const s = i(8460), r = i(6114), n = i(844);
                t.DEFAULT_OPTIONS = {
                    cols: 80,
                    rows: 24,
                    cursorBlink: !1,
                    cursorStyle: "block",
                    cursorWidth: 1,
                    customGlyphs: !0,
                    drawBoldTextInBrightColors: !0,
                    fastScrollModifier: "alt",
                    fastScrollSensitivity: 5,
                    fontFamily: "courier-new, courier, monospace",
                    fontSize: 15,
                    fontWeight: "normal",
                    fontWeightBold: "bold",
                    lineHeight: 1,
                    letterSpacing: 0,
                    linkHandler: null,
                    logLevel: "info",
                    scrollback: 1e3,
                    scrollOnUserInput: !0,
                    scrollSensitivity: 1,
                    screenReaderMode: !1,
                    smoothScrollDuration: 0,
                    macOptionIsMeta: !1,
                    macOptionClickForcesSelection: !1,
                    minimumContrastRatio: 1,
                    disableStdin: !1,
                    allowProposedApi: !1,
                    allowTransparency: !1,
                    tabStopWidth: 8,
                    theme: {},
                    rightClickSelectsWord: r.isMac,
                    windowOptions: {},
                    windowsMode: !1,
                    wordSeparator: " ()[]{}',\"`",
                    altClickMovesCursor: !0,
                    convertEol: !1,
                    termName: "xterm",
                    cancelEvents: !1,
                    overviewRulerWidth: 0
                };
                const o = [
                    "normal",
                    "bold",
                    "100",
                    "200",
                    "300",
                    "400",
                    "500",
                    "600",
                    "700",
                    "800",
                    "900"
                ];
                class a extends n.Disposable {
                    constructor(e){
                        super(), this._onOptionChange = this.register(new s.EventEmitter), this.onOptionChange = this._onOptionChange.event;
                        const i = Object.assign({}, t.DEFAULT_OPTIONS);
                        for(const t in e)if (t in i) try {
                            const s = e[t];
                            i[t] = this._sanitizeAndValidateOption(t, s);
                        } catch (e) {
                            console.error(e);
                        }
                        this.rawOptions = i, this.options = Object.assign({}, i), this._setupOptions();
                    }
                    onSpecificOptionChange(e, t) {
                        return this.onOptionChange((i)=>{
                            i === e && t(this.rawOptions[e]);
                        });
                    }
                    onMultipleOptionChange(e, t) {
                        return this.onOptionChange((i)=>{
                            -1 !== e.indexOf(i) && t();
                        });
                    }
                    _setupOptions() {
                        const e = (e)=>{
                            if (!(e in t.DEFAULT_OPTIONS)) throw new Error(`No option with key "${e}"`);
                            return this.rawOptions[e];
                        }, i = (e, i)=>{
                            if (!(e in t.DEFAULT_OPTIONS)) throw new Error(`No option with key "${e}"`);
                            i = this._sanitizeAndValidateOption(e, i), this.rawOptions[e] !== i && (this.rawOptions[e] = i, this._onOptionChange.fire(e));
                        };
                        for(const t in this.rawOptions){
                            const s = {
                                get: e.bind(this, t),
                                set: i.bind(this, t)
                            };
                            Object.defineProperty(this.options, t, s);
                        }
                    }
                    _sanitizeAndValidateOption(e, i) {
                        switch(e){
                            case "cursorStyle":
                                if (i || (i = t.DEFAULT_OPTIONS[e]), !function(e) {
                                    return "block" === e || "underline" === e || "bar" === e;
                                }(i)) throw new Error(`"${i}" is not a valid value for ${e}`);
                                break;
                            case "wordSeparator":
                                i || (i = t.DEFAULT_OPTIONS[e]);
                                break;
                            case "fontWeight":
                            case "fontWeightBold":
                                if ("number" == typeof i && 1 <= i && i <= 1e3) break;
                                i = o.includes(i) ? i : t.DEFAULT_OPTIONS[e];
                                break;
                            case "cursorWidth":
                                i = Math.floor(i);
                            case "lineHeight":
                            case "tabStopWidth":
                                if (i < 1) throw new Error(`${e} cannot be less than 1, value: ${i}`);
                                break;
                            case "minimumContrastRatio":
                                i = Math.max(1, Math.min(21, Math.round(10 * i) / 10));
                                break;
                            case "scrollback":
                                if ((i = Math.min(i, 4294967295)) < 0) throw new Error(`${e} cannot be less than 0, value: ${i}`);
                                break;
                            case "fastScrollSensitivity":
                            case "scrollSensitivity":
                                if (i <= 0) throw new Error(`${e} cannot be less than or equal to 0, value: ${i}`);
                            case "rows":
                            case "cols":
                                if (!i && 0 !== i) throw new Error(`${e} must be numeric, value: ${i}`);
                        }
                        return i;
                    }
                }
                t.OptionsService = a;
            },
            2660: function(e, t, i) {
                var s = this && this.__decorate || function(e, t, i, s) {
                    var r, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
                    else for(var a = e.length - 1; a >= 0; a--)(r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o);
                    return n > 3 && o && Object.defineProperty(t, i, o), o;
                }, r = this && this.__param || function(e, t) {
                    return function(i, s) {
                        t(i, s, e);
                    };
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.OscLinkService = void 0;
                const n = i(2585);
                let o = class {
                    constructor(e){
                        this._bufferService = e, this._nextId = 1, this._entriesWithId = new Map, this._dataByLinkId = new Map;
                    }
                    registerLink(e) {
                        const t = this._bufferService.buffer;
                        if (void 0 === e.id) {
                            const i = t.addMarker(t.ybase + t.y), s = {
                                data: e,
                                id: this._nextId++,
                                lines: [
                                    i
                                ]
                            };
                            return i.onDispose(()=>this._removeMarkerFromLink(s, i)), this._dataByLinkId.set(s.id, s), s.id;
                        }
                        const i = e, s = this._getEntryIdKey(i), r = this._entriesWithId.get(s);
                        if (r) return this.addLineToLink(r.id, t.ybase + t.y), r.id;
                        const n = t.addMarker(t.ybase + t.y), o = {
                            id: this._nextId++,
                            key: this._getEntryIdKey(i),
                            data: i,
                            lines: [
                                n
                            ]
                        };
                        return n.onDispose(()=>this._removeMarkerFromLink(o, n)), this._entriesWithId.set(o.key, o), this._dataByLinkId.set(o.id, o), o.id;
                    }
                    addLineToLink(e, t) {
                        const i = this._dataByLinkId.get(e);
                        if (i && i.lines.every((e)=>e.line !== t)) {
                            const e = this._bufferService.buffer.addMarker(t);
                            i.lines.push(e), e.onDispose(()=>this._removeMarkerFromLink(i, e));
                        }
                    }
                    getLinkData(e) {
                        var t;
                        return null === (t = this._dataByLinkId.get(e)) || void 0 === t ? void 0 : t.data;
                    }
                    _getEntryIdKey(e) {
                        return `${e.id};;${e.uri}`;
                    }
                    _removeMarkerFromLink(e, t) {
                        const i = e.lines.indexOf(t);
                        -1 !== i && (e.lines.splice(i, 1), 0 === e.lines.length && (void 0 !== e.data.id && this._entriesWithId.delete(e.key), this._dataByLinkId.delete(e.id)));
                    }
                };
                o = s([
                    r(0, n.IBufferService)
                ], o), t.OscLinkService = o;
            },
            8343: (e, t)=>{
                function i(e, t, i) {
                    t.di$target === t ? t.di$dependencies.push({
                        id: e,
                        index: i
                    }) : (t.di$dependencies = [
                        {
                            id: e,
                            index: i
                        }
                    ], t.di$target = t);
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.createDecorator = t.getServiceDependencies = t.serviceRegistry = void 0, t.serviceRegistry = new Map, t.getServiceDependencies = function(e) {
                    return e.di$dependencies || [];
                }, t.createDecorator = function(e) {
                    if (t.serviceRegistry.has(e)) return t.serviceRegistry.get(e);
                    const s = function(e, t, r) {
                        if (3 !== arguments.length) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
                        i(s, e, r);
                    };
                    return s.toString = ()=>e, t.serviceRegistry.set(e, s), s;
                };
            },
            2585: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.IDecorationService = t.IUnicodeService = t.IOscLinkService = t.IOptionsService = t.ILogService = t.LogLevelEnum = t.IInstantiationService = t.ICharsetService = t.ICoreService = t.ICoreMouseService = t.IBufferService = void 0;
                const s = i(8343);
                var r;
                t.IBufferService = (0, s.createDecorator)("BufferService"), t.ICoreMouseService = (0, s.createDecorator)("CoreMouseService"), t.ICoreService = (0, s.createDecorator)("CoreService"), t.ICharsetService = (0, s.createDecorator)("CharsetService"), t.IInstantiationService = (0, s.createDecorator)("InstantiationService"), (r = t.LogLevelEnum || (t.LogLevelEnum = {}))[r.DEBUG = 0] = "DEBUG", r[r.INFO = 1] = "INFO", r[r.WARN = 2] = "WARN", r[r.ERROR = 3] = "ERROR", r[r.OFF = 4] = "OFF", t.ILogService = (0, s.createDecorator)("LogService"), t.IOptionsService = (0, s.createDecorator)("OptionsService"), t.IOscLinkService = (0, s.createDecorator)("OscLinkService"), t.IUnicodeService = (0, s.createDecorator)("UnicodeService"), t.IDecorationService = (0, s.createDecorator)("DecorationService");
            },
            1480: (e, t, i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.UnicodeService = void 0;
                const s = i(8460), r = i(225);
                t.UnicodeService = class {
                    constructor(){
                        this._providers = Object.create(null), this._active = "", this._onChange = new s.EventEmitter, this.onChange = this._onChange.event;
                        const e = new r.UnicodeV6;
                        this.register(e), this._active = e.version, this._activeProvider = e;
                    }
                    dispose() {
                        this._onChange.dispose();
                    }
                    get versions() {
                        return Object.keys(this._providers);
                    }
                    get activeVersion() {
                        return this._active;
                    }
                    set activeVersion(e) {
                        if (!this._providers[e]) throw new Error(`unknown Unicode version "${e}"`);
                        this._active = e, this._activeProvider = this._providers[e], this._onChange.fire(e);
                    }
                    register(e) {
                        this._providers[e.version] = e;
                    }
                    wcwidth(e) {
                        return this._activeProvider.wcwidth(e);
                    }
                    getStringCellWidth(e) {
                        let t = 0;
                        const i = e.length;
                        for(let s = 0; s < i; ++s){
                            let r = e.charCodeAt(s);
                            if (55296 <= r && r <= 56319) {
                                if (++s >= i) return t + this.wcwidth(r);
                                const n = e.charCodeAt(s);
                                56320 <= n && n <= 57343 ? r = 1024 * (r - 55296) + n - 56320 + 65536 : t += this.wcwidth(n);
                            }
                            t += this.wcwidth(r);
                        }
                        return t;
                    }
                };
            }
        }, t = {};
        function i(s) {
            var r = t[s];
            if (void 0 !== r) return r.exports;
            var n = t[s] = {
                exports: {}
            };
            return e[s].call(n.exports, n, n.exports, i), n.exports;
        }
        var s = {};
        return (()=>{
            var e = s;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Terminal = void 0;
            const t = i(3236), r = i(9042), n = i(7975), o = i(7090), a = i(5741), h = i(8285), c = [
                "cols",
                "rows"
            ];
            e.Terminal = class {
                constructor(e){
                    this._core = new t.Terminal(e), this._addonManager = new a.AddonManager, this._publicOptions = Object.assign({}, this._core.options);
                    const i = (e)=>this._core.options[e], s = (e, t)=>{
                        this._checkReadonlyOptions(e), this._core.options[e] = t;
                    };
                    for(const e in this._core.options){
                        const t = {
                            get: i.bind(this, e),
                            set: s.bind(this, e)
                        };
                        Object.defineProperty(this._publicOptions, e, t);
                    }
                }
                _checkReadonlyOptions(e) {
                    if (c.includes(e)) throw new Error(`Option "${e}" can only be set in the constructor`);
                }
                _checkProposedApi() {
                    if (!this._core.optionsService.rawOptions.allowProposedApi) throw new Error("You must set the allowProposedApi option to true to use proposed API");
                }
                get onBell() {
                    return this._core.onBell;
                }
                get onBinary() {
                    return this._core.onBinary;
                }
                get onCursorMove() {
                    return this._core.onCursorMove;
                }
                get onData() {
                    return this._core.onData;
                }
                get onKey() {
                    return this._core.onKey;
                }
                get onLineFeed() {
                    return this._core.onLineFeed;
                }
                get onRender() {
                    return this._core.onRender;
                }
                get onResize() {
                    return this._core.onResize;
                }
                get onScroll() {
                    return this._core.onScroll;
                }
                get onSelectionChange() {
                    return this._core.onSelectionChange;
                }
                get onTitleChange() {
                    return this._core.onTitleChange;
                }
                get onWriteParsed() {
                    return this._core.onWriteParsed;
                }
                get element() {
                    return this._core.element;
                }
                get parser() {
                    return this._parser || (this._parser = new n.ParserApi(this._core)), this._parser;
                }
                get unicode() {
                    return this._checkProposedApi(), new o.UnicodeApi(this._core);
                }
                get textarea() {
                    return this._core.textarea;
                }
                get rows() {
                    return this._core.rows;
                }
                get cols() {
                    return this._core.cols;
                }
                get buffer() {
                    return this._buffer || (this._buffer = new h.BufferNamespaceApi(this._core)), this._buffer;
                }
                get markers() {
                    return this._checkProposedApi(), this._core.markers;
                }
                get modes() {
                    const e = this._core.coreService.decPrivateModes;
                    let t = "none";
                    switch(this._core.coreMouseService.activeProtocol){
                        case "X10":
                            t = "x10";
                            break;
                        case "VT200":
                            t = "vt200";
                            break;
                        case "DRAG":
                            t = "drag";
                            break;
                        case "ANY":
                            t = "any";
                    }
                    return {
                        applicationCursorKeysMode: e.applicationCursorKeys,
                        applicationKeypadMode: e.applicationKeypad,
                        bracketedPasteMode: e.bracketedPasteMode,
                        insertMode: this._core.coreService.modes.insertMode,
                        mouseTrackingMode: t,
                        originMode: e.origin,
                        reverseWraparoundMode: e.reverseWraparound,
                        sendFocusMode: e.sendFocus,
                        wraparoundMode: e.wraparound
                    };
                }
                get options() {
                    return this._publicOptions;
                }
                set options(e) {
                    for(const t in e)this._publicOptions[t] = e[t];
                }
                blur() {
                    this._core.blur();
                }
                focus() {
                    this._core.focus();
                }
                resize(e, t) {
                    this._verifyIntegers(e, t), this._core.resize(e, t);
                }
                open(e) {
                    this._core.open(e);
                }
                attachCustomKeyEventHandler(e) {
                    this._core.attachCustomKeyEventHandler(e);
                }
                registerLinkProvider(e) {
                    return this._core.registerLinkProvider(e);
                }
                registerCharacterJoiner(e) {
                    return this._checkProposedApi(), this._core.registerCharacterJoiner(e);
                }
                deregisterCharacterJoiner(e) {
                    this._checkProposedApi(), this._core.deregisterCharacterJoiner(e);
                }
                registerMarker(e = 0) {
                    return this._verifyIntegers(e), this._core.addMarker(e);
                }
                registerDecoration(e) {
                    var t, i, s;
                    return this._checkProposedApi(), this._verifyPositiveIntegers(null !== (t = e.x) && void 0 !== t ? t : 0, null !== (i = e.width) && void 0 !== i ? i : 0, null !== (s = e.height) && void 0 !== s ? s : 0), this._core.registerDecoration(e);
                }
                hasSelection() {
                    return this._core.hasSelection();
                }
                select(e, t, i) {
                    this._verifyIntegers(e, t, i), this._core.select(e, t, i);
                }
                getSelection() {
                    return this._core.getSelection();
                }
                getSelectionPosition() {
                    return this._core.getSelectionPosition();
                }
                clearSelection() {
                    this._core.clearSelection();
                }
                selectAll() {
                    this._core.selectAll();
                }
                selectLines(e, t) {
                    this._verifyIntegers(e, t), this._core.selectLines(e, t);
                }
                dispose() {
                    this._addonManager.dispose(), this._core.dispose();
                }
                scrollLines(e) {
                    this._verifyIntegers(e), this._core.scrollLines(e);
                }
                scrollPages(e) {
                    this._verifyIntegers(e), this._core.scrollPages(e);
                }
                scrollToTop() {
                    this._core.scrollToTop();
                }
                scrollToBottom() {
                    this._core.scrollToBottom();
                }
                scrollToLine(e) {
                    this._verifyIntegers(e), this._core.scrollToLine(e);
                }
                clear() {
                    this._core.clear();
                }
                write(e, t) {
                    this._core.write(e, t);
                }
                writeln(e, t) {
                    this._core.write(e), this._core.write("\r\n", t);
                }
                paste(e) {
                    this._core.paste(e);
                }
                refresh(e, t) {
                    this._verifyIntegers(e, t), this._core.refresh(e, t);
                }
                reset() {
                    this._core.reset();
                }
                clearTextureAtlas() {
                    this._core.clearTextureAtlas();
                }
                loadAddon(e) {
                    return this._addonManager.loadAddon(this, e);
                }
                static get strings() {
                    return r;
                }
                _verifyIntegers(...e) {
                    for (const t of e)if (t === 1 / 0 || isNaN(t) || t % 1 != 0) throw new Error("This API only accepts integers");
                }
                _verifyPositiveIntegers(...e) {
                    for (const t of e)if (t && (t === 1 / 0 || isNaN(t) || t % 1 != 0 || t < 0)) throw new Error("This API only accepts positive integers");
                }
            };
        })(), s;
    })();
});

},{}],"a5mjI":[function(require,module,exports) {
!function(e, t) {
    module.exports = t();
}(self, function() {
    return (()=>{
        "use strict";
        var e = {};
        return (()=>{
            var t = e;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.FitAddon = void 0, t.FitAddon = class {
                constructor(){}
                activate(e) {
                    this._terminal = e;
                }
                dispose() {}
                fit() {
                    const e = this.proposeDimensions();
                    if (!e || !this._terminal || isNaN(e.cols) || isNaN(e.rows)) return;
                    const t = this._terminal._core;
                    this._terminal.rows === e.rows && this._terminal.cols === e.cols || (t._renderService.clear(), this._terminal.resize(e.cols, e.rows));
                }
                proposeDimensions() {
                    if (!this._terminal) return;
                    if (!this._terminal.element || !this._terminal.element.parentElement) return;
                    const e = this._terminal._core, t = e._renderService.dimensions;
                    if (0 === t.css.cell.width || 0 === t.css.cell.height) return;
                    const r = 0 === this._terminal.options.scrollback ? 0 : e.viewport.scrollBarWidth, i = window.getComputedStyle(this._terminal.element.parentElement), o = parseInt(i.getPropertyValue("height")), s = Math.max(0, parseInt(i.getPropertyValue("width"))), n = window.getComputedStyle(this._terminal.element), l = o - (parseInt(n.getPropertyValue("padding-top")) + parseInt(n.getPropertyValue("padding-bottom"))), a = s - (parseInt(n.getPropertyValue("padding-right")) + parseInt(n.getPropertyValue("padding-left"))) - r;
                    return {
                        cols: Math.max(2, Math.floor(a / t.css.cell.width)),
                        rows: Math.max(1, Math.floor(l / t.css.cell.height))
                    };
                }
            };
        })(), e;
    })();
});

},{}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["iIoW5","8lqZg"], "8lqZg", "parcelRequired186")

//# sourceMappingURL=chatpage.975ef6c8.js.map
