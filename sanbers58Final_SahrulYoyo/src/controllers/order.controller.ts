import { Request, Response } from 'express';
import { OrderModel, OrderStatus } from '../models/order.model';
import ProductModel from '../models/products.model';
import { IReqUser } from '../utils/interfaces';
import UserModel from '../models/user.model';
import mail from '../utils/mail/mail';
import NotificationModel from '../models/notification.model';
import { createNotification } from './notification.controller';

// status order ------------------------------------------------------------------------>
const orderStatuses = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
    "completed"
  ];

  export const getOrderStatuses = (req: Request, res: Response) => {
    res.status(200).json(orderStatuses);
  };


// Buat Order Baru --------------------------------------------------------------------->
export const createOrder = async (req: Request, res: Response) => {
    const { orderItems } = req.body;
    const userId = (req as IReqUser).user?.id;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'Order items are required' });
    }

    try {
        let grandTotal = 0;

        for (const item of orderItems) {
            if (!item.productId || !item.quantity || !item.price) {
                return res.status(400).json({ message: 'Each order item must have productId, quantity, and price' });
            }

            const product = await ProductModel.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }

            if (item.quantity > product.qty) {
                return res.status(400).json({ message: `Insufficient product quantity for: ${item.productId}` });
            }

            grandTotal += item.price * item.quantity;
            product.qty -= item.quantity;
            await product.save();
        }

        const newOrder = new OrderModel({
            grandTotal,
            orderItems,
            createdBy: userId,
            status: OrderStatus.Pending,
        });

        await newOrder.save();

// Ambil informasi pengguna untuk mengirim email konfirmasi ------------------------------->
//         const user = await UserModel.findById(userId);
//         if (user) {
//             const content = await mail.render('invoices.ejs', {
//                 username: user.username,
//                 orderItems,
//                 grandTotal,
//                 contactEmail: 'yoyo.ptr@gmail.com', 
//                 companyName: 'Kreatif Pixel Studio', 
//                 year: new Date().getFullYear(),
//             });

//             await mail.sendEmail({
//                 to: user.email,
//                 subject: 'Order Success',
//                 content,
//             });
//             console.log("Order confirmation email sent to", user.email);
//         }

//         res.status(201).json({ message: 'Order created successfully', data: newOrder });
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             res.status(500).json({ message: 'Error creating order', data: error.message });
//         } else {
//             res.status(500).json({ message: 'Unknown error' });
//         }
//     }
// };

    // Mengirim Notifikasi -------------------------------------------------------------------->
    const user = await UserModel.findById(userId);
    if (user) {
        // Buat notifikasi untuk user
        await createNotification(userId as string, 'Your order has been placed successfully and is pending.', 'order-status');

        // Render email content
        const content = await mail.render('invoices.ejs', {
            username: user.username,
            orderItems,
            grandTotal,
            contactEmail: 'yoyo.ptr@gmail.com',
            companyName: 'Kreatif Pixel Studio',
            year: new Date().getFullYear(),
        });

        // Kirim email konfirmasi
        await mail.sendEmail({
            to: user.email,
            subject: 'Order Success',
            content,
        });
        console.log("Order confirmation email sent to", user.email);
    }

    res.status(201).json({ message: 'Order created successfully', data: newOrder });
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(500).json({ message: 'Error creating order', data: error.message });
    } else {
        res.status(500).json({ message: 'Unknown error' });
    }
    }
    };


// Menampilkan Riwayat Order berdasarkan Pengguna (User) -------------------------------->
export const getUserOrders = async (req: Request, res: Response) => {
    const userId = (req as IReqUser).user?.id;
    const { page = '1', limit = '10' } = req.query;

    const pageNumber = typeof page === 'string' ? parseInt(page, 10) : 1;
    const limitNumber = typeof limit === 'string' ? parseInt(limit, 10) : 10;

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
        return res.status(400).json({ message: 'Invalid page or limit' });
    }

    try {
        const orders = await OrderModel.find({ createdBy: userId })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const count = await OrderModel.countDocuments({ createdBy: userId });

        res.status(200).json({
            data: orders,
            totalPages: Math.ceil(count / limitNumber),
            currentPage: pageNumber,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error retrieving orders', data: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
};