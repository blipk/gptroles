const $ = (params) => document.querySelector(params)
const $$ = (params) => document.querySelectorAll(params)

class ChatPage {
    constructor() {
        this.username = "You"
        this.chatLog = $(".chat-container")
    }

    addChatMessage(username, message, time) {
        const chatMessageClasses = username === this.username ? ["chat-message-self"] : []
        const chatNameClasses = username === this.username ? ["chat-message-username-self"] : []
        const msg = marked.parse(message.replaceAll("|TICK|", "`").replaceAll('$|{', '${'))
        if (username === this.lastMessage?.username) {
            this.lastMessage.lastMessageEl.innerHTML += `<div class="chat-message-msg">${msg}</p>`
        } else {
            this.chatLog.innerHTML += `<div class="chat-message ${chatMessageClasses}">
                <span class="chat-message-username ${chatNameClasses}">${username}</span>
                <div class="chat-message-msg">${msg}</p>
                <span class="chat-message-time chat-message-time-self">${time}</span>
            </div>`
        }
        this.chatLog.scrollTo(0, this.chatLog.scrollHeight);
    }

    get lastMessage() {
        const lastMessageEl = this.chatLog.querySelector(".chat-message:last-child")
        if (!lastMessageEl)
            return lastMessageEl
        const usernameEl = lastMessageEl.querySelector(".chat-message-username")
        const msgEl = lastMessageEl.querySelector(".chat-message-msg")
        const timeEl = lastMessageEl.querySelector(".chat-message-time")
        return {
            username: usernameEl.textContent,
            msg: msgEl.textContent,
            time: timeEl.textContent,
            lastMessageEl, msgEl
        }
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
    console.log("ChatPage inititialised")

    // Messages to python
    new QWebChannel(qt.webChannelTransport, function (channel) {
        var bridge = channel.objects.bridge;
        window.bridge = bridge
    });

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
}