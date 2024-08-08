/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import mongoose, { Document } from "mongoose";
declare enum OrderStatus {
    Pending = "pending",
    Completed = "completed",
    Cancelled = "cancelled"
}
interface IOrderItem {
    name: string;
    productId: mongoose.Types.ObjectId;
    price: number;
    quantity: number;
}
interface IOrder extends Document {
    grandTotal: number;
    orderItems: IOrderItem[];
    createdBy: mongoose.Types.ObjectId;
    status: OrderStatus;
}
declare const OrderModel: mongoose.Model<IOrder, {}, {}, {}, mongoose.Document<unknown, {}, IOrder> & IOrder & Required<{
    _id: unknown;
}>, any>;
export { IOrder, OrderModel, OrderStatus };
//# sourceMappingURL=order.model.d.ts.map