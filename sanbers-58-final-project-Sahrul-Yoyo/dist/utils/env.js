"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZOHO_MAIL_PASS = exports.ZOHO_MAIL_USER = exports.SECRET = exports.DATABASE_URL = exports.CLOUDINARY_CLOUD_NAME = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = void 0;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "591414958112898";
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "_NIwX9_Aa8dWWaZYegl2s9XAe9k";
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dy20rzw1l";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://yoyoptr:RjzIUXvKsnQbwmgW@cluster01.ynwnlxc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01";
exports.SECRET = process.env.SECRET || "secret";
exports.ZOHO_MAIL_USER = process.env.ZOHO_MAIL_USER || "yoyo.ptr@zohomail.com";
exports.ZOHO_MAIL_PASS = process.env.ZOHO_MAIL_PASS || "Ulyasar10389&";
//# sourceMappingURL=env.js.map