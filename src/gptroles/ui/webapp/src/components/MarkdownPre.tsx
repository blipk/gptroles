

import React from "react"

// import TurndownService from "turndown"
// const turndownService = new TurndownService()


const MarkdownPre: React.FC<React.PropsWithChildren> = ( { children } ) => {

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


    /** Markdown Component */
    // const copyText = ( text: string ) => {
    //     const copyText = document.createElement( "textarea" )
    //     copyText.style.width = "1px"
    //     copyText.style.border = "0"
    //     copyText.style.opacity = "0"
    //     document.body.appendChild( copyText )
    //     copyText.value = text.trim()
    //     copyText.select()
    //     copyText.setSelectionRange( 0, 99999 )
    //     document.execCommand( "copy" )
    //     document.body.removeChild( copyText )
    // }


    // const notification = ( message: string, parent: HTMLElement ) => {
    //     const notification = document.createElement( "div" )
    //     notification.className = "notification"
    //     notification.innerText = message
    //     parent.appendChild( notification )
    //     setTimeout( () => {
    //         notification.style.animation = "fadeout 1s"
    //         setTimeout( () => parent.removeChild( notification ), 1000 )
    //     }, 1500 )
    // }


    // const applyMarkdownButton = ( chatMessageEl, codeEl, codeElIndex ) => {
    //     // Run output container

    //     console.log( "applyMarkdownButton", chatMessageEl, codeEl, codeElIndex )

    //     const outputContainer = codeEl.querySelector( ".output-container" ) || element( "div", [ [ "class", "output-container" ] ] )
    //     if ( outputContainer.parentElement !== codeEl )
    //         codeEl.appendChild( outputContainer )

    //     // Buttons container
    //     const codeButtons = codeEl.querySelector( ".code-buttons" )
    //     const msg = codeEl.parentElement.parentElement
    //     const msgId = msg.getAttribute( "x-msg-id" )
    //     codeEl.setAttribute( "x-block-index", codeElIndex )
    //     if ( codeButtons )
    //         codeButtons.parentNode.removeChild( codeButtons )
    //     const lang = [ ...codeEl.classList ].find( c => c.includes( "language" ) )?.replace( "language-", "" )
    //     const newButtons = element( "div", [ [ "class", "code-buttons" ] ] )
    //     if ( [ "python", "shell", "sh", "bash", "js", "javascript" ].includes( lang ) ) {
    //         newButtons.innerHTML = "<input type=\"button\" class=\"code-button play-button\" value=\"▶️\"/>"
    //         newButtons.innerHTML += "<input type=\"button\" class=\"code-button edit-button\" value=\"✏️\"/>"
    //     }

    //     newButtons.innerHTML += "<input type=\"button\" class=\"code-button save-button\" value=\"💾\"/>"
    //     newButtons.innerHTML += "<input type=\"button\" class=\"code-button copy-button\" value=\"📋\"/>"
    //     codeEl.prepend( newButtons )
    //     const playButton = codeEl.querySelector( ".play-button" )
    //     const editButton = codeEl.querySelector( ".edit-button" )
    //     const saveButton = codeEl.querySelector( ".save-button" )
    //     const copyButton = codeEl.querySelector( ".copy-button" )
    //     const codeText = codeEl.textContent.replace( outputContainer.textContent, "" ).trim()
    //     copyButton?.addEventListener( "click", ( e ) => {
    //         e.preventDefault()
    //         copyText( codeText )
    //         notification( "Copied!", copyButton.parentElement )
    //     } )
    //     playButton?.addEventListener( "click", ( e ) => {
    //         e.preventDefault()
    //         window.bridge.setData( [ "run_code", msgId, codeElIndex, lang, codeText ] )
    //     } )
    //     saveButton?.addEventListener( "click", ( e ) => {
    //         e.preventDefault()
    //         window.bridge.setData( [ "save", msgId, codeElIndex, lang, codeText ] )
    //         //TODO add open in editor icon after saving
    //     } )
    //     editButton?.addEventListener( "click", ( e ) => {
    //         e.preventDefault()
    //         codeEl.style.display = "none"
    //         // codeEl.style.visibility = "hidden"
    //         codeEl.style.height = "0px"
    //         const editor = element( "div", [ [ "class", "markdown-editor" ] ] )

    //         const editorAreaContainer = element( "div", [ [ "class", "textarea-container" ] ] )
    //         const editorArea = element( "textarea" )
    //         const editorButtons = element( "div", [ [ "class", "editor-buttons" ] ] )
    //         editorButtons.innerHTML = "<input type=\"button\" class=\"code-button close-button\" value=\"❌\"/><input type=\"button\" class=\"code-button editor-save-button\" value=\"✅\"/>"
    //         editorAreaContainer.appendChild( editorButtons )
    //         editorAreaContainer.appendChild( editorArea )
    //         editor.appendChild( editorAreaContainer )

    //         const lineCount = ( codeText.match( /\n/g ) || [] ).length
    //         const height = ( lineCount * 2 ) + 5.2
    //         // editor.style.height = height + "ch"
    //         editorArea.style.height = height + "ch"
    //         console.log( height )
    //         editorArea.value = codeText
    //         codeEl.parentElement.insertBefore( editor, codeEl )
    //         editorButtons
    //             .querySelector( ".close-button" )
    //             .addEventListener( "click", ( e ) => {
    //                 codeEl.style.visibility = "revert"
    //                 codeEl.style.display = "block"
    //                 codeEl.style.height = ""

    //                 editor.parentNode.removeChild( editor )
    //             } )
    //         editorButtons
    //             .querySelector( ".editor-save-button" )
    //             .addEventListener( "click", ( e ) => {
    //                 codeEl.style.visibility = "revert"
    //                 codeEl.style.display = "block"
    //                 codeEl.style.height = ""
    //                 // codeEl.innerText = editorArea.value
    //                 const template = document.createElement( "template" )
    //                 template.innerHTML = marked.parse( `\`\`\`${lang}\n${editorArea.value}\n\`\`\`` )
    //                 // const newNodes = template.content.childNodes;
    //                 const newCodeEl = template.content.firstChild
    //                 codeEl.parentNode.replaceWith( newCodeEl )
    //                 editor.parentNode.removeChild( editor )
    //                 applyMarkdownButtons( [ chatMessageEl ] )
    //             } )
    //     } )

    //     // SVG Display
    //     if ( lang === "svg" || ( ( lang === "html" || lang === "xml" ) && codeText.includes( "</svg>" ) ) ) {
    //         const svgContainer = element( "div", [ [ "class", "svg-container" ] ] )
    //         svgContainer.innerHTML = codeText
    //         const parentChildren = [ ...codeEl.parentNode.childNodes ]
    //         const nextNode = parentChildren[ parentChildren.indexOf( codeEl ) + 1 ]
    //         if ( nextNode && !( [ ...nextNode.classList ].includes( "svg-container" ) ) )
    //             codeEl.parentNode.insertBefore( svgContainer, nextNode )
    //     }
    // }


    return (
        <>
            {children}
        </>
    )
}

export default MarkdownPre