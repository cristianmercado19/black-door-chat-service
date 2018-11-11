import { MessageBuilder, Message } from "./message-builder.interface";
export declare class MessageBuilderSimple implements MessageBuilder {
    private message;
    toJson(): string;
    addText(text: string): void;
    createNewMessage(): void;
    getFromJson(messageJson: string): Message;
}
