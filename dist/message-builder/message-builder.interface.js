"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message(messageParsed) {
        if (messageParsed) {
            this.message = messageParsed.message;
        }
    }
    Message.prototype.isPing = function () {
        return (this.message === MessageKeys.PING);
    };
    Message.prototype.isTyping = function () {
        return (this.message === MessageKeys.IS_TYPING);
    };
    Message.prototype.isDisconnecting = function () {
        return (this.message === MessageKeys.GUEST_DISCONNECTED);
    };
    return Message;
}());
exports.Message = Message;
var MessageKeys;
(function (MessageKeys) {
    MessageKeys["PING"] = "*__PING__*";
    MessageKeys["IS_TYPING"] = "*__IS_TYPING__*";
    MessageKeys["GUEST_IN_THE_ROOM"] = "*__GUEST_IN_THE_ROOM__*";
    MessageKeys["GUEST_DISCONNECTED"] = "*__GUEST_DISCONNECTED__*";
})(MessageKeys = exports.MessageKeys || (exports.MessageKeys = {}));
//# sourceMappingURL=message-builder.interface.js.map