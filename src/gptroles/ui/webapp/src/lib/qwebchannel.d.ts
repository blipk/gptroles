/**
 * Typings for the local qwebchannel source
 * @module
 */

// declare module "qwebchannel.js" {
    declare namespace qwebchannel {
        // Define the generic type for the callback functions
        type Callback = ( data: any ) => void;

        interface Transport {
            send( data: string ): void;
            onmessage: ( message: { data: string } ) => void;
        }

        interface WebChannel {
            new ( transport: Transport, callback: Callback ): WebChannel;
            transport: Transport;
            exec( data: string ): void;
            exec( { type: string, data: any } ): void;
            send( data: any ): void;
            onmessage( data: any ): void;
            objects: Record<string, any>;
        }

        export type { Callback, Transport, WebChannel }
    }
export { QWebChannel }
// }