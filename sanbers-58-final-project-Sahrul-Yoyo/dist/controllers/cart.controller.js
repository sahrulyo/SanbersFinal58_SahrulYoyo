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
exports.clearCart = exports.getCart = exports.updateCartItemQuantity = exports.removeItemFromCart = exports.addItemToCart = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
// Tambah item ke keranjang ------------------------------------------------------>
const addItemToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log('User ID:', userId);
    const { productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: 'User ID, Product ID, and quantity are required' });
    }
    try {
        let cart = yield cart_model_1.default.findOne({ userId });
        if (!cart) {
            cart = new cart_model_1.default({ userId, items: [] });
        }
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            cart.items.push({ productId, quantity });
        }
        yield cart.save();
        res.status(200).json({ message: 'Item added to cart', data: cart });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error adding item to cart', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.addItemToCart = addItemToCart;
// Hapus item dari keranjang ------------------------------------------------------------>
const removeItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    const { productId } = req.params;
    try {
        const cart = yield cart_model_1.default.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        yield cart.save();
        res.status(200).json({ message: 'Item removed from cart', data: cart });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error removing item from cart', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.removeItemFromCart = removeItemFromCart;
// Update jumlah item dalam keranjang ------------------------------------------------------>
const updateCartItemQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    const { productId, quantity } = req.body;
    try {
        const cart = yield cart_model_1.default.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const item = cart.items.find(item => item.productId.toString() === productId);
        if (item) {
            item.quantity = quantity;
        }
        else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        yield cart.save();
        res.status(200).json({ message: 'Cart item updated', data: cart });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating cart item', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.updateCartItemQuantity = updateCartItemQuantity;
// Ambil informasi keranjang -------------------------------------------------------------->
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
    try {
        const cart = yield cart_model_1.default.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ data: cart });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error retrieving cart', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.getCart = getCart;
// Kosongkan keranjang --------------------------------------------------------------->
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
    try {
        const cart = yield cart_model_1.default.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = [];
        yield cart.save();
        res.status(200).json({ message: 'Cart cleared', data: cart });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error clearing cart', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.clearCart = clearCart;
//# sourceMappingURL=cart.controller.js.map