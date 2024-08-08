"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markNotificationAsRead = exports.getUserNotifications = exports.createNotification = void 0;
const notification_model_1 = __importDefault(require("../models/notification.model"));
// Membuat Notifikasi Baru ------------------------------------------>
const createNotification = (userId, message, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = new notification_model_1.default({
            userId,
            message,
            type,
            status: 'unread',
        });
        yield notification.save();
        console.log("Notification created:", notification);
    }
    catch (error) {
        console.error("Error creating notification:", error);
    }
});
exports.createNotification = createNotification;
// Endpoint untuk Mengambil Notifikasi ---------------------------------------->
const getUserNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const notifications = yield notification_model_1.default.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ data: notifications });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error retrieving notifications', data: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});
exports.getUserNotifications = getUserNotifications;
// Endpoint untuk Menandai Notifikasi sebagai Dibaca ---------------------------->
const markNotificationAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notificationId = req.params.notificationId;
    try {
        const notification = yield notification_model_1.default.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        notification.status = 'read';
        yield notification.save();
        res.status(200).json({ message: 'Notification marked as read', data: notification });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error marking notification as read', data: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});
exports.markNotificationAsRead = markNotificationAsRead;
//# sourceMappingURL=notification.controller.js.map