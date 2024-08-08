import mongoose, { Document, Schema } from 'mongoose';

interface INotification extends Document {
  userId: string;
  message: string;
  type: 'registration' | 'order-status' | 'other';
  status: 'unread' | 'read';
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['registration', 'order-status', 'other'], required: true },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  createdAt: { type: Date, default: Date.now },
});

const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);
export default NotificationModel;
