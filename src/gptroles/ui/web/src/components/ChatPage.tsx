import React, { useEffect, useState, useRef } from 'react';
import DOMPurify from 'dompurify';
import Marked, { marked } from 'marked';
import hljs from 'highlight.js';
import { QWebChannel } from '../static/qwebchannel.js';
import 'highlight.js/styles/default.css';

interface Message {
    id: string;
    username: string;
    text: string;
    time: string;
}

interface BusMessage {
    cmd: string;
    args: Array<any>;
}


const $ = (params: any) => document.querySelector(params);
const $$ = (params: any) => document.querySelectorAll(params);
const element = (tagName: any, attributes = [], options: ElementCreationOptions | undefined = undefined) => {
    const el = document.createElement(tagName, options);
    for (const attribute of attributes) {
        const [attr, val] = attribute;
        el.setAttribute(attr, val);
    }
    return el;
};

const markedOptions = {
    renderer: new marked.Renderer(),
    highlight: function (code: string, lang: string) {
        console.log("Highlighting", lang);
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
};

interface ChatPageProps { }

const ChatPage: React.FC<ChatPageProps> = () => {
    const usersName = "You";
    const [messages, setMessages] = useState<Message[]>([]);
    const [busMessage, setBusMessage] = useState<BusMessage>();


    const chatLogRef = useRef<HTMLDivElement>(null);
    const bridgeRef = useRef<any>(undefined);

    useEffect(() => {
        window.setBusMessage = setBusMessage;
        console.log("START");
        clear();
        Marked.setOptions(markedOptions);
        // applyMessageButtons();
        // applyMarkdownButtons();

        // Set up bridge to python app via QWebChannel
        if (typeof bridgeRef.current === "undefined" && typeof QWebChannel !== "undefined") {
            new QWebChannel(qt.webChannelTransport, function (channel) {
                const bridge = channel.objects.bridge;
                bridgeRef.current = bridge;
                console.log("bridge created", bridge);
            });
        }
    }, []);

    useEffect(() => {
        busMessage && handleBusMessage(busMessage);
    }, [busMessage]);



    // Messages from python
    const handleBusMessage = function (message: BusMessage) {
        console.log("handling msg", message);
        if (!message) return;

        if (message?.cmd === 'lastMessage') {
            return getLastMessage();
        } else if (message?.cmd === 'addMessage') {
            addMessage.apply(null, message.args);
        } else {
            console.log('Recieved unknown message', message);
            bridgeRef.current.setData("Javascript didn't understand your message: " + message);
        }
        return null;
    };


    // ChatBox
    const getLastMessage = () => {
        return messages[messages.length - 1];
    };

    const unescape = (text: string): string => {
        // Extra escaping to pass template literals through qt bridge
        return text.replaceAll("|TICK|", "`").replaceAll('$|{', '${');
    };

    const sanitize = (text: string): string => {
        return DOMPurify.sanitize(text);
    };

    const copyText = (text: string) => {
        const copyText = document.createElement('textarea');
        copyText.style.width = '1px';
        copyText.style.border = '0';
        copyText.style.opacity = '0';
        document.body.appendChild(copyText);
        copyText.value = text.trim();
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(copyText);
    };

    const notification = (message: string, parent: HTMLElement) => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerText = message;
        parent.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'fadeout 1s';
            setTimeout(() => parent.removeChild(notification), 1000);
        }, 1500);
    };

    const clear = () => {
        console.log("clearing messages");
        setMessages([]);
    };

    const addMessage = (username: string, text: string, time: string, id: string) => {
        const newMessage: Message = { username, text, time, id };
        setMessages([...messages, newMessage]);
        applyMarkdownButtons();
        chatLogRef.current?.scrollTo(0, chatLogRef.current.scrollHeight);

    };

    const updateBlockOutput = (msgid, text, blockIndex, error_code = null, time = (Date.now() / 1000)) => {
        const msg = $(`.chat-message-msg[x-msg-id="${msgid}"]`);
        if (!msg)
            return;
        const block = msg.querySelectorAll("pre code")[parseInt(blockIndex, 10)];
        const blockOutput = block.querySelector(".output-container");
        blockOutput.setAttribute("x-output-updated", time);
        const outputTag = error_code ? `[!error ${error_code}] ` : "[#output] ";
        blockOutput.setAttribute("x-output-tag", outputTag);
        // window.getComputedStyle(blockOutput, ":before").setProperty("content", outputTag)
        blockOutput.textContent = text;
        blockOutput.style.display = "block";
    };

    const updateMessage = (msgid, text, blockIndex = null, time = (Date.now() / 1000)) => {
        const msg = $(`.chat-message-msg[x-msg-id="${msgid}"]`);
        if (!msg)
            return;
        if (blockIndex !== null) {
            const block = msg.querySelectorAll("pre code")[parseInt(blockIndex, 10)];
            block.textContent = text;
        } else {
            msg.innerHTML = sanitize(marked.parse(text));
        }
        msg.setAttribute("x-msg-updated", time);
    };

    const applyMarkdownButtons = () => {
        // This function can be used to apply event listeners to markdown buttons if necessary.
        const chatMessageElements = $$(".chat-message .message-text");


        [...chatMessageElements].forEach(chatMessageEl => {
            [...chatMessageEl.querySelectorAll("pre code")].forEach((codeEl, codeElIndex) => {
                applyMarkdownButton(chatMessageEl, codeEl, codeElIndex);
            });
        });
    };

    const applyMarkdownButton = (chatMessageEl, codeEl, codeElIndex) => {
        // Run output container

        console.log("applyMarkdownButton", chatMessageEl, codeEl, codeElIndex);

        const outputContainer = codeEl.querySelector(".output-container") || element("div", [["class", "output-container"]]);
        if (outputContainer.parentElement !== codeEl)
            codeEl.appendChild(outputContainer);

        // Buttons container
        const codeButtons = codeEl.querySelector(".code-buttons");
        const msg = codeEl.parentElement.parentElement;
        const msgId = msg.getAttribute("x-msg-id");
        codeEl.setAttribute("x-block-index", codeElIndex);
        if (codeButtons)
            codeButtons.parentNode.removeChild(codeButtons);
        const lang = [...codeEl.classList].find(c => c.includes("language"))?.replace("language-", "");
        const newButtons = element("div", [["class", "code-buttons"]]);
        if (["python", "shell", "sh", "bash", "js", "javascript"].includes(lang)) {
            newButtons.innerHTML = `<input type="button" class="code-button play-button" value="▶️"/>`;
            newButtons.innerHTML += `<input type="button" class="code-button edit-button" value="✏️"/>`;
        }

        newButtons.innerHTML += `<input type="button" class="code-button save-button" value="💾"/>`;
        newButtons.innerHTML += `<input type="button" class="code-button copy-button" value="📋"/>`;
        codeEl.prepend(newButtons);
        const playButton = codeEl.querySelector(".play-button");
        const editButton = codeEl.querySelector(".edit-button");
        const saveButton = codeEl.querySelector(".save-button");
        const copyButton = codeEl.querySelector(".copy-button");
        const codeText = codeEl.textContent.replace(outputContainer.textContent, "").trim();
        copyButton?.addEventListener("click", (e) => {
            e.preventDefault();
            this.copyText(codeText);
            this.notification("Copied!", copyButton.parentElement);
        });
        playButton?.addEventListener("click", (e) => {
            e.preventDefault();
            window.bridge.setData(["run_code", msgId, codeElIndex, lang, codeText]);
        });
        saveButton?.addEventListener("click", (e) => {
            e.preventDefault();
            window.bridge.setData(["save", msgId, codeElIndex, lang, codeText]);
            //TODO add open in editor icon after saving
        });
        editButton?.addEventListener("click", (e) => {
            e.preventDefault();
            codeEl.style.display = "none";
            // codeEl.style.visibility = "hidden"
            codeEl.style.height = "0px";
            const editor = element("div", [["class", "markdown-editor"]]);

            const editorAreaContainer = element("div", [["class", "textarea-container"]]);
            const editorArea = element("textarea");
            const editorButtons = element("div", [["class", "editor-buttons"]]);
            editorButtons.innerHTML = `<input type="button" class="code-button close-button" value="❌"/><input type="button" class="code-button editor-save-button" value="✅"/>`;
            editorAreaContainer.appendChild(editorButtons);
            editorAreaContainer.appendChild(editorArea);
            editor.appendChild(editorAreaContainer);

            const lineCount = (codeText.match(/\n/g) || []).length;
            const height = (lineCount * 2) + 5.2;
            // editor.style.height = height + "ch"
            editorArea.style.height = height + "ch";
            console.log(height);
            editorArea.value = codeText;
            codeEl.parentElement.insertBefore(editor, codeEl);
            editorButtons
                .querySelector(".close-button")
                .addEventListener("click", (e) => {
                    codeEl.style.visibility = "revert";
                    codeEl.style.display = "block";
                    codeEl.style.height = "";

                    editor.parentNode.removeChild(editor);
                });
            editorButtons
                .querySelector(".editor-save-button")
                .addEventListener("click", (e) => {
                    codeEl.style.visibility = "revert";
                    codeEl.style.display = "block";
                    codeEl.style.height = "";
                    // codeEl.innerText = editorArea.value
                    const template = document.createElement('template');
                    template.innerHTML = marked.parse(`\`\`\`${lang}\n${editorArea.value}\n\`\`\``);
                    // const newNodes = template.content.childNodes;
                    const newCodeEl = template.content.firstChild;
                    codeEl.parentNode.replaceWith(newCodeEl);
                    editor.parentNode.removeChild(editor);
                    this.applyMarkdownButtons([chatMessageEl]);
                });
        });

        // SVG Display
        if (lang === "svg" || ((lang === "html" || lang === "xml") && codeText.includes("</svg>"))) {
            const svgContainer = element("div", [["class", "svg-container"]]);
            svgContainer.innerHTML = codeText;
            const parentChildren = [...codeEl.parentNode.childNodes];
            const nextNode = parentChildren[parentChildren.indexOf(codeEl) + 1];
            if (nextNode && !([...nextNode.classList].includes("svg-container")))
                codeEl.parentNode.insertBefore(svgContainer, nextNode);
        }
    };

    return (
        <div id="chat-container">
            <div id="chat-log" ref={chatLogRef}>
                {messages.map((message) => (
                    <div className={"chat-message" + (message.username === usersName ? " chat-message-self" : "")}  key={message.id}>
                        <div className="message-buttons"><input type="button" className="message-button" value="⚙️" /></div>
                        <div className="message-header">
                            <span className={"username" + (message.username === usersName ? " username-self" : "")}>{message.username}</span>
                            <span className={"timestamp" + (message.username === usersName ? " timestamp-self" : "")}>{new Date(Number(message.time) * 1000).toLocaleTimeString()}</span>
                        </div>
                        <div
                            className="message-text"
                            dangerouslySetInnerHTML={{ __html: sanitize(marked(unescape(message.text), markedOptions) as string) }}>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatPage;