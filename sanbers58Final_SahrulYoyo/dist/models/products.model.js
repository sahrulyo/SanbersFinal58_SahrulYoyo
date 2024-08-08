"use strict";
// import mongoose from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const Schema = mongoose.Schema;
// const ProductsSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     images: {
//       type: [String],
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     qty: {
//       type: Number,
//       required: true,
//     },
//     categoryId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// const ProductsModel = mongoose.model("Products", ProductsSchema);
// export default ProductsModel;
//kode diubah untuk menambahkan "model kategori"
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        min: [1, "Quantity cannot be less than 1"],
    },
    slug: {
        type: String,
        unique: true,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Categories",
    },
}, {
    timestamps: true,
});
ProductsSchema.pre("save", function (next) {
    const product = this;
    if (!product.slug) {
        product.slug = product.name.toLowerCase().split(" ").join("-");
    }
    next();
});
const ProductsModel = mongoose_1.default.model("Products", ProductsSchema);
exports.default = ProductsModel;
//# sourceMappingURL=products.model.js.map