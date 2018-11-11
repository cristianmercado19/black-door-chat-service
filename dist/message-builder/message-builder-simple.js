"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_builder_interface_1 = require("./message-builder.interface");
var MessageBuilderSimple = /** @class */ (function () {
    function MessageBuilderSimple() {
    }
    MessageBuilderSimple.prototype.toJson = function () {
        var json = JSON.stringify(this.message);
        return json;
    };
    MessageBuilderSimple.prototype.addText = function (text) {
        this.message.message = text;
    };
    MessageBuilderSimple.prototype.createNewMessage = function () {
        this.message = new message_builder_interface_1.Message();
    };
    MessageBuilderSimple.prototype.getFromJson = function (messageJson) {
        var messageParsed = JSON.parse(messageJson);
        var message = new message_builder_interface_1.Message(messageParsed);
        return message;
    };
    return MessageBuilderSimple;
}());
exports.MessageBuilderSimple = MessageBuilderSimple;
//# sourceMappingURL=message-builder-simple.js.map