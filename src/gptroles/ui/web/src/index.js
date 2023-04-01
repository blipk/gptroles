import { initTerm, openTerm, placeTerm, globalTermEl } from "./term.js"
import * as DOMPurify from 'dompurify';

const $ = (params) => document.querySelector(params)
const $$ = (params) => document.querySelectorAll(params)
const element = (type, attributes = [], options = null) => {
    const el = document.createElement(type, options)
    for (const attribute of attributes) {
        const [attr, val] = attribute
        el.setAttribute(attr, val)
    }
    return el
}

class ChatPage {
    constructor() {
        this.username = "You"
        this.chatLog = $(".chat-container")
    }

    copyText(text) {
        const copyText = element("textarea", [["style", "width:1px;border:0;opacity:0;"]])
        document.body.appendChild(copyText)
        // copyText.innerHTML = text.trim()
        copyText.value = text.trim()
        copyText.select()
        copyText.setSelectionRange(0, 99999)
        // navigator.clipboard.writeText(copyText.value)
        document.execCommand("copy")
        document.body.removeChild(copyText)
    }

    clear() {
        this.chatLog.innerHTML = ""
    }

    notification(message, parent) {
        const notification = element("div", [["class", "notification"]])
        notification.innerText = message
        parent.appendChild(notification)
        setTimeout(() => {
            notification.style.animation = "fadeout 1s"
            setTimeout(() => parent.removeChild(notification), 1000)
        }, 1500)
    }

    addMessage(username, text, time, id) {
        const chatMessageClasses = username === this.username ? ["chat-message-self"] : []
        const chatNameClasses = username === this.username ? ["chat-message-username-self"] : []
        const msg = marked.parse(DOMPurify.sanitize(text.replaceAll("|TICK|", "`").replaceAll('$|{', '${')))
        const newMsgEl = `<div class="chat-message-msg" x-msg-id="${id}" x-msg-time="${time}" x-msg-user="${username}">${msg}</div>`
        if (username === this.lastMessage?.username) {
            this.lastMessage.lastMessageEl.innerHTML += newMsgEl
            this.lastMessage.timeEl.innerHTML = time
        } else {
            this.chatLog.innerHTML += `<div class="chat-message ${chatMessageClasses}">
                <span class="chat-message-username ${chatNameClasses}">${username}</span>
                ${newMsgEl}
                <span class="chat-message-time chat-message-time-self">${time}</span>
            </div>`
        }
        this.applyMarkdownButtons()
        this.applyMessageButtons()
        this.chatLog.scrollTo(0, this.chatLog.scrollHeight);
    }

    updateBlockOutput(msgid, text, blockIndex, error_code = null, time = (Date.now() / 1000)) {
        const msg = $(`.chat-message-msg[x-msg-id="${msgid}"]`)
        if (!msg)
            return
        const block = msg.querySelectorAll("pre code")[parseInt(blockIndex, 10)]
        const blockOutput = block.querySelector(".output-container")
        blockOutput.setAttribute("x-output-updated", time)
        const outputTag = error_code ? `[!error ${error_code}] ` : "[#output] "
        blockOutput.setAttribute("x-output-tag", outputTag)
        // window.getComputedStyle(blockOutput, ":before").setProperty("content", outputTag)
        blockOutput.textContent = text
        blockOutput.style.display = "block"
    }

    updateMessage(msgid, text, blockIndex = null, time = (Date.now() / 1000)) {
        const msg = $(`.chat-message-msg[x-msg-id="${msgid}"]`)
        if (!msg)
            return
        if (blockIndex !== null) {
            const block = msg.querySelectorAll("pre code")[parseInt(blockIndex, 10)]
            block.textContent = text
        } else {
            msg.innerHTML = marked.parse(DOMPurify.sanitize(text))
        }
        msg.setAttribute("x-msg-updated", time)
    }

    get lastMessage() {
        const lastMessageEl = this.chatLog.querySelector(".chat-message:last-child")
        if (!lastMessageEl)
            return lastMessageEl
        const usernameEl = lastMessageEl.querySelector(".chat-message-username")
        const msgEl = lastMessageEl.querySelector(".chat-message-msg:last-child")
        const timeEl = lastMessageEl.querySelector(".chat-message-time")
        return {
            username: usernameEl.textContent,
            msg: msgEl?.textContent,
            time: timeEl.textContent,
            lastMessageEl, msgEl, timeEl
        }
    }

    applyMessageButtons() {
        [...$$(".chat-message")].forEach(el => {
            const buttons = el.querySelector(".message-buttons")
            if (buttons)
                buttons.parentNode.removeChild(buttons)
            const newButtons = element("div", [["class", "message-buttons"]])
            newButtons.innerHTML = `<input type="button" class="message-button" value="⚙️"/>`
            el.prepend(newButtons)
        })
    }


    applyMarkdownButtons(chatMessageElements = undefined) {
        chatMessageElements = chatMessageElements || $$(".chat-message-msg");

        [...chatMessageElements].forEach(chatMessageEl => {
            [...chatMessageEl.querySelectorAll("pre code")].forEach((codeEl, codeElIndex) => {
                this.applyMarkdownButton(chatMessageEl, codeEl, codeElIndex)
            })
        });
    }

    applyMarkdownButton(chatMessageEl, codeEl, codeElIndex) {
        // Overlay/Terminal container
        // const termContainer = codeEl.querySelector(".inline-container") || element("div", [["class", "inline-container"]])
        // if (termContainer.parentElement !== el)
        //     codeEl.prepend(newContainer)
        //
        // termContainer.addEventListener("mouseenter", (e) => {
        //     placeTerm(currContainer)
        //     globalTermEl.style.display = "block"
        //     termContainer.style.display = "block"
        // })
        // termContainer.addEventListener("mouseleave", (e) => {
        //     globalTermEl.style.display = "none"
        //     termContainer.style.display = "none"
        // })

        // Run output container
        const outputContainer = codeEl.querySelector(".output-container") || element("div", [["class", "output-container"]])
        if (outputContainer.parentElement !== codeEl)
            codeEl.appendChild(outputContainer)

        // Buttons container
        const codeButtons = codeEl.querySelector(".code-buttons")
        const msg = codeEl.parentElement.parentElement
        const msgId = msg.getAttribute("x-msg-id")
        codeEl.setAttribute("x-block-index", codeElIndex)
        if (codeButtons)
            codeButtons.parentNode.removeChild(codeButtons)
        const lang = [...codeEl.classList].find(c => c.includes("language"))?.replace("language-", "")
        const newButtons = element("div", [["class", "code-buttons"]])
        if (["python", "shell", "sh", "bash", "js", "javascript"].includes(lang)) {
            newButtons.innerHTML = `<input type="button" class="code-button play-button" value="▶️"/>`
            newButtons.innerHTML += `<input type="button" class="code-button edit-button" value="✏️"/>`
        }

        newButtons.innerHTML += `<input type="button" class="code-button save-button" value="💾"/>`
        newButtons.innerHTML += `<input type="button" class="code-button copy-button" value="📋"/>`
        codeEl.prepend(newButtons)
        const playButton = codeEl.querySelector(".play-button")
        const editButton = codeEl.querySelector(".edit-button")
        const saveButton = codeEl.querySelector(".save-button")
        const copyButton = codeEl.querySelector(".copy-button")
        const codeText = codeEl.textContent.replace(outputContainer.textContent, "").trim()
        copyButton?.addEventListener("click", (e) => {
            e.preventDefault()
            this.copyText(codeText)
            this.notification("Copied!", copyButton.parentElement)
        })
        playButton?.addEventListener("click", (e) => {
            e.preventDefault()
            window.bridge.setData(["run_code", msgId, codeElIndex, lang, codeText])
        })
        saveButton?.addEventListener("click", (e) => {
            e.preventDefault()
            window.bridge.setData(["save", msgId, codeElIndex, lang, codeText])
            //TODO add open in editor icon after saving
        })
        editButton?.addEventListener("click", (e) => {
            e.preventDefault()
            codeEl.style.display = "none"
            // codeEl.style.visibility = "hidden"
            codeEl.style.height = "0px"
            const editor = element("div", [["class", "markdown-editor"]])

            const editorAreaContainer = element("div", [["class", "textarea-container"]])
            const editorArea = element("textarea")
            const editorButtons = element("div", [["class", "editor-buttons"]])
            editorButtons.innerHTML = `<input type="button" class="code-button close-button" value="❌"/><input type="button" class="code-button editor-save-button" value="✅"/>`
            editorAreaContainer.appendChild(editorButtons)
            editorAreaContainer.appendChild(editorArea)
            editor.appendChild(editorAreaContainer)

            const lineCount = (codeText.match(/\n/g) || []).length
            const height = (lineCount * 2) + 5.2
            // editor.style.height = height + "ch"
            editorArea.style.height = height + "ch"
            console.log(height)
            editorArea.value = codeText
            codeEl.parentElement.insertBefore(editor, codeEl)
            editorButtons
                .querySelector(".close-button")
                .addEventListener("click", (e) => {
                    codeEl.style.visibility = "revert"
                    codeEl.style.display = "block"
                    codeEl.style.height = ""

                    editor.parentNode.removeChild(editor)
                })
            editorButtons
                .querySelector(".editor-save-button")
                .addEventListener("click", (e) => {
                    codeEl.style.visibility = "revert"
                    codeEl.style.display = "block"
                    codeEl.style.height = ""
                    // codeEl.innerText = editorArea.value
                    const template = document.createElement('template');
                    template.innerHTML = marked.parse(`\`\`\`${lang}\n${editorArea.value}\n\`\`\``);
                    // const newNodes = template.content.childNodes;
                    const newCodeEl = template.content.firstChild
                    codeEl.parentNode.replaceWith(newCodeEl)
                    editor.parentNode.removeChild(editor)
                    this.applyMarkdownButtons([chatMessageEl])
                })
        })
    }
}

window.onload = function (e) {
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, lang) {
            console.log("Highlighting", lang)
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartypants: false,
        xhtml: true
    });
    window.chatPage = new ChatPage()
    window.chatPage.applyMessageButtons()
    window.chatPage.applyMarkdownButtons()
    console.log("ChatPage inititialised")

    // Messages to python
    if (typeof QWebChannel !== "undefined") {
        window.chatPage.clear()
        new QWebChannel(qt.webChannelTransport, function (channel) {
            var bridge = channel.objects.bridge;
            window.bridge = bridge
        });
    }


    // Messages from python
    window.handlePyMessage = function (message) {
        if (message?.cmd === "lastMessage") {
            return window.chatPage.lastMessage
        } else {
            console.log("Recieved unknown message", message)
            window.bridge.setData("Javascript didn't understand your message: " + message);
        }
        return null
    }

    initTerm()
}