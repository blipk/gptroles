/**
 * Types for the application interfaces
 * @module
 */



/** Message from the Qt Bus */
interface BusMessage {
    id: string; // Set by python, to track replies
    cmd: string;
    args: string[]; // Messages come as strings from python so need to be parsed
    actioned?: boolean;
}

//** replies to BusMessages */
interface BusResponse {
    id: string;
    sourceMessageId: string
    message: string | null
}

/** Data representing a chat message */
interface MessageData {
    // From python via bus messages
    id: string;
    receivedAt: string; // This is python time.time() as a string
    username: string;
    content: string;

    // Set in webapp
    updatedAt?: Date;    // this is set in the webapp on updated message
}

export type { BusMessage, BusResponse, MessageData }