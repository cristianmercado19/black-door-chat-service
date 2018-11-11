"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var message_builder_interface_1 = require("../message-builder/message-builder.interface");
require('webrtc-adapter/out/adapter.js');
var ChatService = /** @class */ (function () {
    function ChatService(messageBuilder) {
        this.iceServerUrls = 'stun:stun.l.google.com:19302';
        this.pingNotifyPeriodInSeconds = 5;
        this.pingNotifyPeriodInMilliseconds = this.pingNotifyPeriodInSeconds * 1000;
        this.messageBuilder = messageBuilder;
        this.initialize();
    }
    ChatService.prototype.initialize = function () {
        this.cleanPingInterval();
        this.cleanDataChannel();
        this.setupOfferPromise();
        this.setupLocalConnection();
        this.setupSignaling();
    };
    ChatService.prototype.cleanDataChannel = function () {
        if (this.dataChannel) {
            this.dataChannel.close();
        }
        this.dataChannel = null;
    };
    ChatService.prototype.setupOfferPromise = function () {
        var _this = this;
        this.offerPromise = new Promise(function (resolve) {
            _this.resolveOffer = resolve;
        });
    };
    ChatService.prototype.setupLocalConnection = function () {
        var config = {};
        config.iceServers = [{ urls: this.iceServerUrls }];
        this.localConnection = new RTCPeerConnection(config);
    };
    ChatService.prototype.setupSignaling = function () {
        var _this = this;
        this.localConnection.onicecandidate = function (ev) { _this.onIceCandidate(ev); };
        this.localConnection.onconnectionstatechange = function (ev) { _this.onConnectionStateChange(ev); };
        this.localConnection.onsignalingstatechange = function (ev) { _this.onSignalingStateChange(ev); };
        this.localConnection.oniceconnectionstatechange = function (ev) { _this.onIceConnectionStateChange(ev); };
        this.localConnection.onicegatheringstatechange = function (ev) { _this.onIceGatheringStateChange(ev); };
    };
    ChatService.prototype.onIceCandidate = function (ev) {
        var offerIsSetup = (ev.candidate == null);
        if (offerIsSetup) {
            // we can take the offer only NOW
            var desc = JSON.stringify(this.localConnection.localDescription);
            this.resolveOffer(desc);
        }
    };
    ;
    ChatService.prototype.onConnectionStateChange = function (e) { };
    ChatService.prototype.onSignalingStateChange = function (e) { };
    ChatService.prototype.onIceConnectionStateChange = function (e) { };
    ChatService.prototype.onIceGatheringStateChange = function (e) { };
    ChatService.prototype.creatNewOffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempLocalOffer, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.createNewChannel();
                        return [4 /*yield*/, this.localConnection.createOffer()];
                    case 1:
                        tempLocalOffer = _a.sent();
                        this.localConnection.setLocalDescription(tempLocalOffer);
                        return [2 /*return*/, this.offerPromise];
                    case 2:
                        error_1 = _a.sent();
                        throw "creatNewOffer-generic-error";
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatService.prototype.setupAnswer = function (jsonAnswer) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.setRemoteDesc(jsonAnswer)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        throw "setupAnswer-generic-error";
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatService.prototype.createAnAnswer = function (remoteOffer) {
        return __awaiter(this, void 0, void 0, function () {
            var answer;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setRemoteDesc(remoteOffer)];
                    case 1:
                        _a.sent();
                        this.localConnection.ondatachannel = function (ev) { _this.onDataChannel(ev); };
                        return [4 /*yield*/, this.localConnection.createAnswer()];
                    case 2:
                        answer = _a.sent();
                        this.localConnection.setLocalDescription(answer);
                        return [2 /*return*/, this.offerPromise];
                }
            });
        });
    };
    ChatService.prototype.setRemoteDesc = function (jsonDesc) {
        return __awaiter(this, void 0, void 0, function () {
            var desc, remoteDesc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        desc = JSON.parse(jsonDesc);
                        remoteDesc = new RTCSessionDescription(desc);
                        return [4 /*yield*/, this.localConnection.setRemoteDescription(remoteDesc)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatService.prototype.onDataChannel = function (ev) {
        var newChannel = ev.channel;
        this.setupChannel(newChannel);
    };
    ChatService.prototype.createNewChannel = function () {
        var channelName = 'back-door-chat-channel';
        var newDataChannel = this.localConnection.createDataChannel(channelName);
        this.setupChannel(newDataChannel);
    };
    ChatService.prototype.setupChannel = function (newDataChannel) {
        var _this = this;
        this.dataChannel = newDataChannel;
        this.dataChannel.onopen = function (ev) { _this.onOpen(ev); };
        this.dataChannel.onmessage = function (ev) { _this.onMessage(ev); };
        this.dataChannel.onclose = function (ev) { _this.onClose(ev); };
    };
    ChatService.prototype.onOpen = function (ev) {
        this.notifyOnChannelIsOpened();
        this.setupPingPeriodically();
    };
    ChatService.prototype.setupPingPeriodically = function () {
        var _this = this;
        this.pingTimeout = setInterval(function () { _this.sendPing(); }, this.pingNotifyPeriodInMilliseconds);
    };
    ChatService.prototype.cleanPingInterval = function () {
        if (this.pingTimeout) {
            clearInterval(this.pingTimeout);
        }
        this.pingTimeout = null;
    };
    ChatService.prototype.onMessage = function (ev) {
        var messageJson = ev.data;
        var message = this.messageBuilder.getFromJson(messageJson);
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
    };
    ChatService.prototype.onClose = function (ev) { };
    ChatService.prototype.notifyOnPingArrived = function () {
        if (this.onPingObserver)
            this.onPingObserver();
    };
    ChatService.prototype.notifyOnChannelIsOpened = function () {
        this.sendUserHasEnteredInTheRoom();
        if (this.onChannelIsOpenedObserver)
            this.onChannelIsOpenedObserver();
    };
    ChatService.prototype.notifyOnOtherIsTyping = function () {
        if (this.onOtherIsTypingObserver)
            this.onOtherIsTypingObserver();
    };
    ChatService.prototype.notifyOnNewMessageArrive = function (text) {
        if (this.onNewMessageArriveObserver)
            this.onNewMessageArriveObserver(text);
    };
    ChatService.prototype.notifyOnDisconnect = function () {
        if (this.onDisconnectObserver) {
            this.onDisconnectObserver();
        }
    };
    ChatService.prototype.sendMessage = function (message) {
        this.messageBuilder.createNewMessage();
        this.messageBuilder.addText(message);
        var json = this.messageBuilder.toJson();
        this.dataChannel.send(json);
    };
    ChatService.prototype.disconnect = function () {
        this.sendMessage(message_builder_interface_1.MessageKeys.GUEST_DISCONNECTED);
        this.initialize();
    };
    ChatService.prototype.sendUserHasEnteredInTheRoom = function () {
        this.sendMessage(message_builder_interface_1.MessageKeys.GUEST_IN_THE_ROOM);
    };
    ChatService.prototype.sendPing = function () {
        this.sendMessage(message_builder_interface_1.MessageKeys.PING);
    };
    ChatService.prototype.sendIsTypingMessage = function () {
        this.sendMessage(message_builder_interface_1.MessageKeys.IS_TYPING);
    };
    ChatService.prototype.subscribeOnNewMessageArrive = function (func) {
        this.onNewMessageArriveObserver = func;
    };
    ChatService.prototype.subscribeOnPing = function (func) {
        this.onPingObserver = func;
    };
    ChatService.prototype.subscribeOnOtherIsTyping = function (func) {
        this.onOtherIsTypingObserver = func;
    };
    ChatService.prototype.subscribeOnChannelIsOpened = function (func) {
        this.onChannelIsOpenedObserver = func;
    };
    ChatService.prototype.subscribeOnDisconnect = function (func) {
        this.onDisconnectObserver = func;
    };
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat-service.js.map