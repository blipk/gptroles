

import React from "react"


import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
import rehypeRaw from "rehype-raw"
import { defaultSchema, type Schema } from "hast-util-sanitize"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus as SyntaxHighlighterTheme } from "react-syntax-highlighter/dist/esm/styles/prism"


import type { MessageData } from "./Interfaces.jsx"
// import MarkdownPre from "./MarkdownPre.js"

// import TurndownService from "turndown"
// const turndownService = new TurndownService()


const Message: React.FC<MessageData> = ( { id, username, content, receivedAt } ) => {
    const usersName = "You"

    // useEffect( () => {

    // }, [] )

    const unescape = ( text: string ): string => {
        // Extra escaping to pass template literals through qt bridge
        return text.replaceAll( "|TICK|", "`" ).replaceAll( "$|{", "${" )
    }


    // This will need to be added to a subcomponent - MessageData will be need to updated, so will the bridge between ChatPage and the qt python app
    // const updateBlockOutput = (msgid, text, blockIndex, error_code = null, time = (Date.now() / 1000)) => {
    //     const msg = $(`.chat-message-msg[x-msg-id="${msgid}"]`);
    //     if (!msg)
    //         return;
    //     const block = msg.querySelectorAll("pre code")[parseInt(blockIndex, 10)];
    //     const blockOutput = block.querySelector(".output-container");
    //     blockOutput.setAttribute("x-output-updated", time);
    //     const outputTag = error_code ? `[!error ${error_code}] ` : "[#output] ";
    //     blockOutput.setAttribute("x-output-tag", outputTag);
    //     // window.getComputedStyle(blockOutput, ":before").setProperty("content", outputTag)
    //     blockOutput.textContent = text;
    //     blockOutput.style.display = "block";
    // };

    const sanitizeSchema: Schema = {
        ...defaultSchema,
        tagNames   : [ ...( defaultSchema.tagNames || [] ), "img" ],
        attributes : {
            ...defaultSchema.attributes,
            img: [
                [ "src", /.*/ ], "alt", "title", "width", "height",
            ],
        },
        protocols: {
            ...defaultSchema.protocols,
            src: [ ...( defaultSchema.protocols?.src || [] ), "data", "data:image/png", "http", "https" ],
        },
    }

    const parsedContent =  unescape( content )
    // const _parsedContent = turndownService.turndown( unescape( content ) )
    console.log( "parsedContent:", [ parsedContent ] )

    return (
        <>
            <div className={"chat-message" + ( username === usersName ? " chat-message-self" : "" )} key={id}>
                <div className="message-buttons"><input type="button" className="message-button" value="⚙️" /></div>
                <div className="message-header">
                    <span className={"username" + ( username === usersName ? " username-self" : "" )}>{username}</span>
                    <span className={"timestamp" + ( username === usersName ? " timestamp-self" : "" )}>
                        {new Date( Number( receivedAt ) * 1000 ).toLocaleTimeString()}
                    </span>
                </div>
                <div className="message-content">
                    <Markdown
                        remarkPlugins={[ [ remarkGfm, { singleTilde: false } ] ]}
                        rehypePlugins={[ rehypeRaw, [ rehypeSanitize, sanitizeSchema ] ]}
                        components={{
                            code( props ) {
                                const { children, className, node, key, ref, ...rest } = props
                                const match = /language-(\w+)/.exec( className || "" )
                                console.log( "match", match, node )
                                return match ? (
                                    <SyntaxHighlighter
                                        // PreTag={MarkdownPre} // Can make this a component
                                        // CodeTag
                                        children={String( children ).replace( /\n$/, "" )}
                                        language={match[ 1 ]}
                                        style={SyntaxHighlighterTheme}
                                    />
                                ) : (
                                    <code {...rest} className={className}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        { parsedContent }
                    </Markdown>
                </div>
            </div>
        </>
    )
}

export default Message