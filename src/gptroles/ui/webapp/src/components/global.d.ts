/**
 * Typings for the application globals added to the Window object
 * @module
 */


import type { Dispatch, SetStateAction } from "react"

declare global {
    interface Window {
        /** For messaging with the Qt webChannelTransport bridge */
        addBusMessage: Dispatch<SetStateAction<BusMessage | undefined>>;
        bridge: object; // WebChannel.objects.bridge
    }

    const qt = {
        webChannelTransport
    }
}
