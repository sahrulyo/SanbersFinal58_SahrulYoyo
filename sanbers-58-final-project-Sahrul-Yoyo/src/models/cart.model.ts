import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: Schema.Types.ObjectId;
  items: ICartItem[];
}

const CartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

const CartModel = mongoose.model<ICart>('Cart', CartSchema);

export default CartModel;
