import { CreateRoomService } from 'black-door-chat-mvc/dist/create-room/service/create-room.service.interface';
import { RoomService } from 'black-door-chat-mvc/dist/room/service/room.service.interface';
import { RoomJoinService } from 'black-door-chat-mvc/dist/room-join/service/room-join.service.interface';
import { MessageBuilder, MessageKeys } from '../message-builder/message-builder.interface';

require('webrtc-adapter/out/adapter.js');

export class ChatService implements CreateRoomService, RoomService, RoomJoinService {

  private readonly iceServerUrls = 'stun:stun.l.google.com:19302';
  private readonly pingNotifyPeriodInSeconds = 5;
  private readonly pingNotifyPeriodInMilliseconds = this.pingNotifyPeriodInSeconds * 1000;
  private pingTimeout: any;

  private messageBuilder: MessageBuilder;
  private localConnection: RTCPeerConnection;
  private dataChannel: RTCDataChannel;

  private resolveOffer: (value?: string | PromiseLike<string> | undefined) => void;

  private offerPromise: Promise<string>;

  onNewMessageArriveObserver: (newMessage: string) => void;
  onPingObserver: () => void;
  onOtherIsTypingObserver: () => void;
  onChannelIsOpenedObserver: () => void;
  onDisconnectObserver: () => void;

  constructor(messageBuilder: MessageBuilder) {
    this.messageBuilder = messageBuilder;
    this.initialize();
  }

  public initialize(): void {
    this.cleanPingInterval();
    this.cleanDataChannel();
    this.setupOfferPromise();
    this.setupLocalConnection();
    this.setupSignaling();
  }

  private cleanDataChannel(): void {
    if (this.dataChannel){
      this.dataChannel.close();
    }
    
    this.dataChannel = null;
  }

  private setupOfferPromise(): void {
    this.offerPromise = new Promise<string>((resolve) => {
      this.resolveOffer = resolve;
    })
  }

  private setupLocalConnection() {
    const config: RTCConfiguration = {};
    config.iceServers = [{ urls: this.iceServerUrls }];

    this.localConnection = new RTCPeerConnection(config);
  }

  private setupSignaling() {
    this.localConnection.onicecandidate = (ev: RTCPeerConnectionIceEvent) => { this.onIceCandidate(ev) };
    this.localConnection.onconnectionstatechange = (ev: Event) => { this.onConnectionStateChange(ev) };
    this.localConnection.onsignalingstatechange = (ev: Event) => { this.onSignalingStateChange(ev) };
    this.localConnection.oniceconnectionstatechange = (ev: Event) => { this.onIceConnectionStateChange(ev) };
    this.localConnection.onicegatheringstatechange = (ev: Event) => { this.onIceGatheringStateChange(ev) };
  }

  private onIceCandidate(ev: RTCPeerConnectionIceEvent) {

    const offerIsSetup = (ev.candidate == null);

    if (offerIsSetup) {
      // we can take the offer only NOW
      const desc = JSON.stringify(this.localConnection.localDescription)
      this.resolveOffer(desc);
    }
  };

  private onConnectionStateChange(e: Event) { }

  private onSignalingStateChange(e: Event) { }

  private onIceConnectionStateChange(e: Event) { }

  private onIceGatheringStateChange(e: Event) { }

  public async creatNewOffer(): Promise<string> {

    try {

      this.createNewChannel();

      const tempLocalOffer = await this.localConnection.createOffer();

      this.localConnection.setLocalDescription(tempLocalOffer);

      return this.offerPromise;
    } catch (error) {
      throw "creatNewOffer-generic-error";
    }

  }

  public async setupAnswer(jsonAnswer: string): Promise<void> {
    try {
      await this.setRemoteDesc(jsonAnswer);
    } catch (error) {
      throw "setupAnswer-generic-error";
    }
  }

  public async createAnAnswer(remoteOffer: string): Promise<string> {

    await this.setRemoteDesc(remoteOffer);

    this.localConnection.ondatachannel = (ev: RTCDataChannelEvent) => { this.onDataChannel(ev); }

    const answer = await this.localConnection.createAnswer();

    this.localConnection.setLocalDescription(answer);

    return this.offerPromise;
  }

  private async setRemoteDesc(jsonDesc: string) {
    const desc = JSON.parse(jsonDesc);
    const remoteDesc = new RTCSessionDescription(desc);

    await this.localConnection.setRemoteDescription(remoteDesc);
  }

  private onDataChannel(ev: RTCDataChannelEvent): void {
    const newChannel = ev.channel;
    this.setupChannel(newChannel)
  }

  private createNewChannel() {
    const channelName = 'back-door-chat-channel';
    const newDataChannel = this.localConnection.createDataChannel(channelName);

    this.setupChannel(newDataChannel);
  }

  private setupChannel(newDataChannel: RTCDataChannel) {
    this.dataChannel = newDataChannel;

    this.dataChannel.onopen = (ev: Event) => { this.onOpen(ev); };
    this.dataChannel.onmessage = (ev: MessageEvent) => { this.onMessage(ev); }
    this.dataChannel.onclose = (ev: Event) => { this.onClose(ev); }
  }

  private onOpen(ev: Event): void {
    this.notifyOnChannelIsOpened();
    this.setupPingPeriodically();
  }

  private setupPingPeriodically(): void {
    this.pingTimeout = setInterval(() => { this.sendPing();}, this.pingNotifyPeriodInMilliseconds);
  }

  private cleanPingInterval(): void {
    if (this.pingTimeout) {
      clearInterval(this.pingTimeout);
    }

    this.pingTimeout = null;
  }

  private onMessage(ev: MessageEvent): void {
    const messageJson = ev.data;

    const message = this.messageBuilder.getFromJson(messageJson);

    if (message.isPing()) {
      this.notifyOnPingArrived();
      return;
    }

    if (message.isTyping()) {
      this.notifyOnOtherIsTyping();
      return;
    }

    if (message.isDisconnecting()) {
      this.notifyOnDisconnect();
      return;
    }

    this.notifyOnNewMessageArrive(message.message);
  }

  private onClose(ev: Event): void {  }

  private notifyOnPingArrived() {
    if (this.onPingObserver)
      this.onPingObserver();
  }

  private notifyOnChannelIsOpened() {
    this.sendUserHasEnteredInTheRoom();

    if (this.onChannelIsOpenedObserver)
      this.onChannelIsOpenedObserver();
  }

  private notifyOnOtherIsTyping() {
    if (this.onOtherIsTypingObserver)
      this.onOtherIsTypingObserver();
  }

  private notifyOnNewMessageArrive(text: string) {
    if (this.onNewMessageArriveObserver)
      this.onNewMessageArriveObserver(text);
  }

  private notifyOnDisconnect() {
    if (this.onDisconnectObserver) {
      this.onDisconnectObserver();
    }
  }

  sendMessage(message: string): void {
    this.messageBuilder.createNewMessage();
    this.messageBuilder.addText(message);
    const json = this.messageBuilder.toJson();

    this.dataChannel.send(json);
  }

  disconnect(): void {
    this.sendMessage(MessageKeys.GUEST_DISCONNECTED);
    this.initialize();
  }

  private sendUserHasEnteredInTheRoom(): void {
    this.sendMessage(MessageKeys.GUEST_IN_THE_ROOM);
  }

  sendPing(): void {
    this.sendMessage(MessageKeys.PING);
  }

  sendIsTypingMessage(): void {
    this.sendMessage(MessageKeys.IS_TYPING);
  }

  subscribeOnNewMessageArrive(func: (newMessage: string) => void): void {
    this.onNewMessageArriveObserver = func;
  }

  subscribeOnPing(func: () => void): void {
    this.onPingObserver = func;
  }

  subscribeOnOtherIsTyping(func: () => void): void {
    this.onOtherIsTypingObserver = func;
  }

  subscribeOnChannelIsOpened(func: () => void): void {
    this.onChannelIsOpenedObserver = func;
  }

  subscribeOnDisconnect(func: () => void): void {
    this.onDisconnectObserver = func;
  }

}