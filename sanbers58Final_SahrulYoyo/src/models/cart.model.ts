import mongoose, { Document, Schema, Types } from 'mongoose';

// Interface untuk item di dalam keranjang -------------------------->
export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
}

// Interface untuk keranjang belanja -------------------------------->
export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];
}

// Skema untuk item di dalam keranjang -------------------------------->
const CartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

// Skema untuk keranjang belanja --------------------------------------->
const CartSchema = new Schema<ICart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
      {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
          quantity: { type: Number, required: true }
      }
  ]
});

// Model keranjang belanja --------------------------------------------->
const CartModel = mongoose.model<ICart>('Cart', CartSchema);

export default CartModel;