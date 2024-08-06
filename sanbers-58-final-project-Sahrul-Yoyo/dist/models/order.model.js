"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.OrderModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "pending";
    OrderStatus["Completed"] = "completed";
    OrderStatus["Cancelled"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
const OrderItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    productId: { type: mongoose_1.default.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 }
});
const OrderSchema = new mongoose_1.Schema({
    grandTotal: { type: Number, required: true },
    orderItems: { type: [OrderItemSchema], required: true },
    createdBy: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: OrderStatus, default: OrderStatus.Pending }
}, { timestamps: true });
const OrderModel = mongoose_1.default.model('Order', OrderSchema);
exports.OrderModel = OrderModel;
//# sourceMappingURL=order.model.js.map