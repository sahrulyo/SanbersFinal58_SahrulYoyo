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
exports.getUserOrders = exports.createOrder = void 0;
const order_model_1 = require("../models/order.model");
const products_model_1 = __importDefault(require("../models/products.model"));
// Buat Order Baru
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { orderItems } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'Order items are required' });
    }
    try {
        let grandTotal = 0;
        for (const item of orderItems) {
            if (!item.productId || !item.quantity || !item.price) {
                return res.status(400).json({ message: 'Each order item must have productId, quantity, and price' });
            }
            const product = yield products_model_1.default.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }
            if (item.quantity > product.qty) {
                return res.status(400).json({ message: `Insufficient product quantity for: ${item.productId}` });
            }
            grandTotal += item.price * item.quantity;
            product.qty -= item.quantity;
            yield product.save();
        }
        const newOrder = new order_model_1.OrderModel({
            grandTotal,
            orderItems,
            createdBy: userId,
            status: order_model_1.OrderStatus.Pending,
        });
        yield newOrder.save();
        // Kirim invoice email
        // const user = await UserModel.findById(userId);
        // if (user) {
        //     await mail.sendEmail(user.email, newOrder);
        // }
        res.status(201).json({ message: 'Order created successfully', data: newOrder });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error creating order', data: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});
exports.createOrder = createOrder;
// Menampilkan Riwayat Order berdasarkan Pengguna (User)
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    const { page = '1', limit = '10' } = req.query;
    const pageNumber = typeof page === 'string' ? parseInt(page, 10) : 1;
    const limitNumber = typeof limit === 'string' ? parseInt(limit, 10) : 10;
    if (isNaN(pageNumber) || isNaN(limitNumber)) {
        return res.status(400).json({ message: 'Invalid page or limit' });
    }
    try {
        const orders = yield order_model_1.OrderModel.find({ createdBy: userId })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const count = yield order_model_1.OrderModel.countDocuments({ createdBy: userId });
        res.status(200).json({
            data: orders,
            totalPages: Math.ceil(count / limitNumber),
            currentPage: pageNumber,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error retrieving orders', data: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});
exports.getUserOrders = getUserOrders;
//# sourceMappingURL=order.controller.js.map