export interface MessageBuilder {
    getFromJson(messageJson: string): Message;
    toJson(): string;
    addText(message: string): void;
    createNewMessage(): void;
}
export declare class Message {
    message: string;
    constructor(messageParsed?: any);
    isPing(): boolean;
    isTyping(): boolean;
    isDisconnecting(): boolean;
}
export declare enum MessageKeys {
    PING = "*__PING__*",
    IS_TYPING = "*__IS_TYPING__*",
    GUEST_IN_THE_ROOM = "*__GUEST_IN_THE_ROOM__*",
    GUEST_DISCONNECTED = "*__GUEST_DISCONNECTED__*"
}
