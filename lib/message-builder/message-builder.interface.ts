export interface MessageBuilder {
  getFromJson(messageJson: string): Message;
  toJson(): string;
  addText(message: string): void;
  createNewMessage(): void;
}

export class Message {
  message: string;

  constructor(messageParsed?: any){
    
    if (messageParsed){
      this.message = messageParsed.message;
    }
  }

  isPing(): boolean {
    return (this.message === MessageKeys.PING);
  }

  isTyping(): boolean {
    return (this.message === MessageKeys.IS_TYPING);
  }

  isDisconnecting(): boolean {
    return (this.message === MessageKeys.GUEST_DISCONNECTED);
  }
}

export enum MessageKeys {
  PING = '*__PING__*',
  IS_TYPING = "*__IS_TYPING__*",
  GUEST_IN_THE_ROOM = "*__GUEST_IN_THE_ROOM__*",
  GUEST_DISCONNECTED = "*__GUEST_DISCONNECTED__*"
}