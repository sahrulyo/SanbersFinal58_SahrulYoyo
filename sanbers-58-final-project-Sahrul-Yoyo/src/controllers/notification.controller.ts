import { Request, Response } from 'express';
import NotificationModel from '../models/notification.model';

// Membuat Notifikasi Baru ------------------------------------------>
export const createNotification = async (userId: string, message: string, type: 'registration' | 'order-status' | 'other') => {
    try {
        const notification = new NotificationModel({
            userId,
            message,
            type,
            status: 'unread',
        });

        await notification.save();
        console.log("Notification created:", notification);
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

// Endpoint untuk Mengambil Notifikasi ---------------------------------------->
export const getUserNotifications = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const notifications = await NotificationModel.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ data: notifications });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error retrieving notifications', data: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
};

// Endpoint untuk Menandai Notifikasi sebagai Dibaca ---------------------------->
export const markNotificationAsRead = async (req: Request, res: Response) => {
    const notificationId = req.params.notificationId;

    try {
        const notification = await NotificationModel.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.status = 'read';
        await notification.save();
        res.status(200).json({ message: 'Notification marked as read', data: notification });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error marking notification as read', data: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
};
