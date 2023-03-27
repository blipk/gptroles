import { initTerm } from "./term.js"

const $ = (params) => document.querySelector(params)
const $$ = (params) => document.querySelectorAll(params)

class ChatPage {
    constructor() {
        this.username = "You"
        this.chatLog = $(".chat-container")
    }

    copyText(text) {
        const copyText = document.createElement("textarea")
        copyText.setAttribute("style", "width:1px;border:0;opacity:0;")
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
        const notification = document.createElement("div")
        notification.setAttribute("class", "notification")
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
        const msg = marked.parse(text.replaceAll("|TICK|", "`").replaceAll('$|{', '${'))
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

    updateMessage(id, text, blockIndex=null, time = (Date.now()/1000)) {
        const msg = $(`.chat-message-msg[x-msg-id="${id}"]`)
        if (!msg)
            return
        if (blockIndex !== null) {
            const block = msg.querySelectorAll("pre code")[parseInt(blockIndex, 10)]
            block.textContent = text
        } else {
            msg.innerHTML = marked.parse(text)
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
            const newButtons = document.createElement("div")
            newButtons.setAttribute("class", "message-buttons")
            newButtons.innerHTML = `<input type="button" class="message-button" value="⚙️"/>`
            el.prepend(newButtons)
        })
    }

    applyMarkdownButtons() {
        [...$$(".chat-message-msg")].forEach(chatMessageEl => {
            [...chatMessageEl.querySelectorAll("pre code")].forEach((el, i) => {
                const codeButtons = el.querySelector(".code-buttons")
                const msg = el.parentElement.parentElement
                const msgId = msg.getAttribute("x-msg-id")
                el.setAttribute("x-block-index", i)
                if (codeButtons)
                    codeButtons.parentNode.removeChild(codeButtons)
                const lang = [...el.classList].find(c => c.includes("language"))?.replace("language-", "")
                const newButtons = document.createElement("div")
                newButtons.setAttribute("class", "code-buttons")
                if (["python", "shell", "sh", "bash"].includes(lang)) {
                    newButtons.innerHTML = `<input type="button" class="code-button play-button" value="▶️"/>`
                    newButtons.innerHTML += `<input type="button" class="code-button edit-button" value="✏️"/>`
                }
                newButtons.innerHTML += `<input type="button" class="code-button save-button" value="💾"/>`
                newButtons.innerHTML += `<input type="button" class="code-button copy-button" value="📋"/>`
                el.prepend(newButtons)
                const playButton = el.querySelector(".play-button")
                const editButton = el.querySelector(".edit-button")
                const saveButton = el.querySelector(".save-button")
                const copyButton = el.querySelector(".copy-button")
                copyButton?.addEventListener("click", (e) => {
                    e.preventDefault()
                    this.copyText(el.textContent)
                    this.notification("Copied!", copyButton.parentElement)
                })
                playButton?.addEventListener("click", (e) => {
                    e.preventDefault()
                    window.bridge.setData(["run_code", msgId, i, lang, el.textContent])
                })
                saveButton?.addEventListener("click", (e) => {
                    e.preventDefault()
                    window.bridge.setData(["save", msgId, i, lang, el.textContent])
                    //TODO add open in editor icon after saving
                })
                editButton?.addEventListener("click", (e) => {
                    e.preventDefault()
                    // window.bridge.setData(["save", msgId, i, lang, el.textContent])
                    //TODO edit internally or open in editor on alternate click
                })
            })
        });
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
        // window.chatPage.clear()
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

    // initTerm()
}