/// <reference path="./global.d.ts" />

import React, { useEffect, useState, useRef } from 'react';

import { v4 as uuidv4 } from "uuid";
import { QWebChannel } from "../static/qwebchannel.js";

import 'highlight.js/styles/default.css';

import Message from "./Message.tsx";
import type { BusMessage, MessageData, BusResponse } from "./Interfaces.jsx";


interface ChatPageProps { }

const ChatPage: React.FC<ChatPageProps> = () => {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [busMessages, setBusMessages] = useState<BusMessage[]>([]);
    const [busResponses, setBusResponses] = useState<BusResponse[]>([]);


    const chatLogRef = useRef<HTMLDivElement>(null);
    const bridgeRef = useRef<QWebChannel>(undefined);

    const clearMessages = () => {
        console.log("clearing messages");
        setMessages([]);
    };

    const addBusMessage = (busMessage: string) => {
        // Parse the bus messages before using in the component functions
        setBusMessages([...busMessages, JSON.parse(busMessage)])
    };

    useEffect(() => {
        window.addBusMessage = addBusMessage; // GLOBAL called from qt
        console.log("START");
        clearMessages();

        // Set up bridge to python app via QWebChannel
        if (typeof bridgeRef.current === "undefined" && typeof QWebChannel !== "undefined") {
            new QWebChannel(qt.webChannelTransport, function (channel: typeof QWebChannel.objects) {
                const bridge = channel.objects.bridge;
                bridgeRef.current = bridge;
                window.bridge = bridge; // GLOBAL
                console.log("bridge created", bridge);
            });
        }
    }, []);

    // Watch for busMessage state changes, action them and reply
    useEffect(() => {
        const latestMessage = busMessages[busMessages.length-1]
        const busResponse = handleBusMessage(latestMessage);
        bridgeRef.current.setData(JSON.stringify(busResponse));
        setBusResponses([...busResponses, busResponse])
    }, [busMessages]);


    // Handle BusMessages from python
    const handleBusMessage = (busMessage: BusMessage): BusResponse => {
        // Args is an array of strings - needs to be destructued properly in the local function arguments
        const { cmd, args } = busMessage
        console.log("Handling BusMessage", busMessage);


        let busResponse: BusResponse = {
            id: uuidv4(),
            sourceMessageId: busMessage.id,
            message: null
        }

        if (busMessage.actioned === true) {
            busResponse.message = "already_actioned"
            return busResponse
        }


        if (cmd === "addMessage") {
            // [
            //     chat_message.id,
            //     chat_message.receivedAt,
            //     html.escape(chat_message.username),
            //     chat_message_content,
            // ],
            const [id, receivedAt, username, content] = args
            const newMessage: MessageData = {
                id, username, content, receivedAt
            }
            addMessage(newMessage);
        } else if (busMessage?.cmd === "lastMessage") {
            busResponse.message = JSON.stringify(getLastMessage());
        } else {
            console.warn("Received unknown message", busMessage);
             busResponse.message = "Javascript didn't understand your message: " + busMessage
        }


        busMessage.actioned = true
        return busResponse;
    };


    /** Bus Commands */
    const addMessage = (newMessage: MessageData) => {
        setMessages([...messages, newMessage]);
        chatLogRef.current?.scrollTo(0, chatLogRef.current.scrollHeight);
    };

    const updateMessage = (msgid: number, content: string, updatedAt?: Date) => {
        updatedAt ||= new Date()
        const msg = messages.find(message => message.id === id)
        if (!msg)
            return;
        msg.content = content
        msg.updatedAt = updatedAt
    };

    const getLastMessage = () => {
        return messages[messages.length - 1];
    };



    /** Component */
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




    return (
        <div id="chat-container">
            <div id="chat-log" ref={chatLogRef}>
                { messages.map( message => <Message {...message} key={message.id} /> ) }
            </div>
        </div>
    );
};

export default ChatPage;