/**
 * Typings for the Qt QWebChannel and application global
 * @module
 */

import type { Dispatch, SetStateAction } from "react";

declare global {
    interface Window {
        /** For messaging with the Qt webChannelTransport bridge */
        addBusMessage: Dispatch<SetStateAction<BusMessage | undefined>>;
        bridge: any;    // WebChannel.objects.bridge
    }
}

declare module "../static/qwebchannel.js" {
    declare namespace QWebChannel {
        // Define the generic type for the callback functions
        type Callback = (data: any) => void;

        interface Transport {
            send(data: string): void;
            onmessage: (message: { data: string }) => void;
        }

        interface WebChannel {
            new (transport: Transport, callback: Callback): WebChannel;
            transport: Transport;
            exec(data: string): void;
            exec({ type: string, data: any }): void;
            send(data: any): void;
            onmessage(data: any): void;
            objects: { [key: string]: any };
        }
    }
}