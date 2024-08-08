import { Request, Response } from 'express';
export declare const createNotification: (userId: string, message: string, type: 'registration' | 'order-status' | 'other') => Promise<void>;
export declare const getUserNotifications: (req: Request, res: Response) => Promise<void>;
export declare const markNotificationAsRead: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=notification.controller.d.ts.map