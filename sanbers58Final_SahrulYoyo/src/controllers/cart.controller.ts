import { Request, Response } from 'express';
import CartModel from '../models/cart.model';
import ProductModel from '../models/products.model';
import { IReqUser } from '../utils/interfaces';

// Tambah item ke keranjang ------------------------------------------------------>
export const addItemToCart = async (req: Request, res: Response) => {
    const userId = (req as IReqUser).user?.id;

    console.log('User ID:', userId); 

    const { productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: 'User ID, Product ID, and quantity are required' });
    }

    try {
        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            cart = new CartModel({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', data: cart });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error adding item to cart', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Hapus item dari keranjang ------------------------------------------------------------>
export const removeItemFromCart = async (req: Request, res: Response) => {
    const userId = (req as IReqUser).user?.id;
    const { productId } = req.params;

    try {
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', data: cart });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error removing item from cart', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Update jumlah item dalam keranjang ------------------------------------------------------>
export const updateCartItemQuantity = async (req: Request, res: Response) => {
    const userId = (req as IReqUser).user?.id;
    const { productId, quantity } = req.body;

    try {
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);
        if (item) {
            item.quantity = quantity;
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        await cart.save();
        res.status(200).json({ message: 'Cart item updated', data: cart });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating cart item', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Ambil informasi keranjang -------------------------------------------------------------->
export const getCart = async (req: Request, res: Response) => {
    const userId = (req as IReqUser).user?.id;

    try {
        const cart = await CartModel.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ data: cart });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error retrieving cart', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// Kosongkan keranjang --------------------------------------------------------------->
export const clearCart = async (req: Request, res: Response) => {
    const userId = (req as IReqUser).user?.id;

    try {
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();
        res.status(200).json({ message: 'Cart cleared', data: cart });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error clearing cart', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};