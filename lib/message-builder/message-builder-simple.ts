import { MessageBuilder, Message } from "./message-builder.interface";

export class MessageBuilderSimple implements MessageBuilder {
  
  private message: Message;

  toJson(): string {
    const json = JSON.stringify(this.message);

    return json;
  }
  
  addText(text: string): void {
    this.message.message = text;
  }
  
  createNewMessage(): void {
    this.message = new Message();
  }

  getFromJson(messageJson: string): Message {
    const messageParsed = JSON.parse(messageJson);

    const message = new Message(messageParsed);

    return message;
  }

}
