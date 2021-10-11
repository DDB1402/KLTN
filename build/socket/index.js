"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketManager = exports.socketList = void 0;
const constants_1 = require("../common/constants");
const authenticate_1 = require("../middlewares/authenticate");
const UserSocket_1 = require("./UserSocket");
const ConversationSocket_1 = require("./ConversationSocket");
const NotificationSocket_1 = require("./NotificationSocket");
exports.socketList = {};
const socketManager = (io, decodeData) => {
    exports.socketList[constants_1.SOCKET_NAMESPACE.CONVERSATION] = io
        .of(constants_1.SOCKET_NAMESPACE.CONVERSATION)
        .use((0, authenticate_1.bindSocketData)(decodeData));
    exports.socketList[constants_1.SOCKET_NAMESPACE.USER] = io
        .of(constants_1.SOCKET_NAMESPACE.USER)
        .use((0, authenticate_1.bindSocketData)(decodeData));
    exports.socketList[constants_1.SOCKET_NAMESPACE.NOTIFICATION] = io
        .of(constants_1.SOCKET_NAMESPACE.NOTIFICATION)
        .use((0, authenticate_1.bindSocketData)(decodeData));
    (0, UserSocket_1.UserSocket)(exports.socketList[constants_1.SOCKET_NAMESPACE.USER]);
    (0, ConversationSocket_1.ConversationSocket)(exports.socketList[constants_1.SOCKET_NAMESPACE.CONVERSATION]);
    (0, NotificationSocket_1.NotificationSocket)(exports.socketList[constants_1.SOCKET_NAMESPACE.NOTIFICATION]);
    // Initial action here
    return exports.socketList;
};
exports.socketManager = socketManager;
