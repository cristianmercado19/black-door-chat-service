import { CreateRoomService } from 'black-door-chat-mvc/dist/create-room/service/create-room.service.interface';
import { RoomService } from 'black-door-chat-mvc/dist/room/service/room.service.interface';
import { RoomJoinService } from 'black-door-chat-mvc/dist/room-join/service/room-join.service.interface';
import { MessageBuilder } from '../message-builder/message-builder.interface';
export declare class ChatService implements CreateRoomService, RoomService, RoomJoinService {
    private readonly iceServerUrls;
    private readonly pingNotifyPeriodInSeconds;
    private readonly pingNotifyPeriodInMilliseconds;
    private pingTimeout;
    private messageBuilder;
    private localConnection;
    private dataChannel;
    private resolveOffer;
    private offerPromise;
    onNewMessageArriveObserver: (newMessage: string) => void;
    onPingObserver: () => void;
    onOtherIsTypingObserver: () => void;
    onChannelIsOpenedObserver: () => void;
    onDisconnectObserver: () => void;
    constructor(messageBuilder: MessageBuilder);
    initialize(): void;
    private cleanDataChannel;
    private setupOfferPromise;
    private setupLocalConnection;
    private setupSignaling;
    private onIceCandidate;
    private onConnectionStateChange;
    private onSignalingStateChange;
    private onIceConnectionStateChange;
    private onIceGatheringStateChange;
    creatNewOffer(): Promise<string>;
    setupAnswer(jsonAnswer: string): Promise<void>;
    createAnAnswer(remoteOffer: string): Promise<string>;
    private setRemoteDesc;
    private onDataChannel;
    private createNewChannel;
    private setupChannel;
    private onOpen;
    private setupPingPeriodically;
    private cleanPingInterval;
    private onMessage;
    private onClose;
    private notifyOnPingArrived;
    private notifyOnChannelIsOpened;
    private notifyOnOtherIsTyping;
    private notifyOnNewMessageArrive;
    private notifyOnDisconnect;
    sendMessage(message: string): void;
    disconnect(): void;
    private sendUserHasEnteredInTheRoom;
    sendPing(): void;
    sendIsTypingMessage(): void;
    subscribeOnNewMessageArrive(func: (newMessage: string) => void): void;
    subscribeOnPing(func: () => void): void;
    subscribeOnOtherIsTyping(func: () => void): void;
    subscribeOnChannelIsOpened(func: () => void): void;
    subscribeOnDisconnect(func: () => void): void;
}