import React, { useEffect, useState, useRef } from "react"

import { v4 as uuidv4 } from "uuid"
import { QWebChannel } from "../lib/qwebchannel.js"

import "highlight.js/styles/default.css"

import Message from "./Message.tsx"
import type { BusMessage, MessageData, BusResponse } from "./Interfaces.jsx"


interface ChatPageProps { }

const ChatPage: React.FC<ChatPageProps> = () => {
    const [ messages, setMessages ] = useState<MessageData[]>( [] )
    const [ busMessages, setBusMessages ] = useState<BusMessage[]>( [] )
    const [ busResponses, setBusResponses ] = useState<BusResponse[]>( [] )


    const chatLogRef = useRef<HTMLDivElement>( null )
    const bridgeRef = useRef<any>( undefined )
    const webChannelRef = useRef<any>( undefined )


    const clearMessages = () => {
        console.log( "clearing messages" )
        setMessages( [] )
    }

    const addBusMessage = ( busMessage: BusMessage ) => {
        // Parse the bus messages before using in the component functions
        console.log( "Received bus message:", busMessage )
        if ( !bridgeRef.current ) {
            // Wait at startup for our bridgeRef to be set in the QWebChannel init callback
            console.log( "Repeating bus message in 1s - waiting for QWebChannel bridge" )
            setTimeout( () => { addBusMessage( busMessage ) }, 1000 )
            return
        }
        setBusMessages( [ ...busMessages, busMessage ] )
    }

    useEffect( () => {
        window.addBusMessage = addBusMessage // GLOBAL called from qt
        console.log( "START" )
        clearMessages()

        // Set up bridge to python app via QWebChannel
        console.log( "Starting...", webChannelRef.current, bridgeRef.current )

        if ( bridgeRef.current || webChannelRef.current ) return

        webChannelRef.current = new QWebChannel( qt.webChannelTransport, function ( channel: typeof QWebChannel.objects ) {
            const bridge = channel.objects.bridge
            bridgeRef.current = bridge
            window.bridge = bridge // GLOBAL
            console.log( "bridge created", bridge )
        } )
    }, [] )

    // Watch for busMessage state changes, action them and reply
    useEffect( () => {

        if ( !busMessages.length ) return

        const latestMessage = busMessages[ busMessages.length-1 ]

        if ( !latestMessage ) return

        const busResponse = handleBusMessage( latestMessage )
        bridgeRef.current.setData( JSON.stringify( busResponse ) )
        setBusResponses( [ ...busResponses, busResponse ] )
    }, [ busMessages ] )


    // Handle BusMessages from python
    const handleBusMessage = ( busMessage: BusMessage ): BusResponse => {
        // Args is an array of strings - needs to be destructued properly in the local function arguments
        console.log( busMessage )
        const { cmd, args } = busMessage
        console.log( "Handling BusMessage", busMessage )


        const busResponse: BusResponse = {
            id              : uuidv4(),
            sourceMessageId : busMessage.id,
            message         : null
        }

        if ( busMessage.actioned === true ) {
            busResponse.message = "already_actioned"
            return busResponse
        }


        if ( cmd === "addMessage" ) {
            const [ id, receivedAt, username, content, isInContext ] = args
            const newMessage: MessageData = {
                id,
                receivedAt,
                username,
                content,
                isInContext: Boolean(isInContext)
            }
            addMessage( newMessage )

            busResponse.message = "message_added"
        } else if ( busMessage.cmd === "lastMessage" ) {
            busResponse.message = JSON.stringify( getLastMessage() )
        } else if ( busMessage.cmd === "updateMessage" ) {
            const [ msgid, newContent, username ] = args
            const updatedMessage = updateMessage( msgid, newContent, username )

            busResponse.message = JSON.stringify( updatedMessage )
        } else if (busMessage.cmd === "updateBlockOutput") {
            busResponse.message = "not_reimplemented"
        } else {
            console.warn( "Received unknown message", busMessage )

            busResponse.message = "Javascript didn't understand your message: " + busMessage
        }

        busResponse.message ||= "unprocessed message"
        busMessage.actioned = true
        return busResponse
    }


    /** Bus Commands */
    const addMessage = ( newMessage: MessageData ) => {
        setMessages( [ ...messages, newMessage ] )
        chatLogRef.current?.scrollTo( 0, chatLogRef.current.scrollHeight )
    }

    const updateMessage = ( msgid: string, newContent: string, username?: string ) => {
        const msg = messages.find( message => message.id === msgid )
        if ( !msg )
            return msg
        msg.username = username || msg.username
        msg.content = newContent
        msg.updatedAt = new Date()
        return msg
    }

    const getLastMessage = () => {
        return messages[ messages.length - 1 ]
    }


    return (
        <div id="chat-container">
            <div id="chat-log" ref={chatLogRef}>
                { messages.map( message => <Message {...message} key={message.id} /> ) }
            </div>
        </div>
    )
}

export default ChatPage