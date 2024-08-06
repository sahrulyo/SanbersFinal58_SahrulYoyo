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
exports.sendRegisterSuccessEmail = exports.sendOrderInvoiceEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const env_1 = require("../env");
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: env_1.ZOHO_MAIL_USER,
        pass: env_1.ZOHO_MAIL_PASS,
    },
});
const sendEmail = (to, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: env_1.ZOHO_MAIL_USER,
        to,
        subject,
        text,
        html,
    };
    try {
        return yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
});
const sendOrderInvoiceEmail = (to, order) => __awaiter(void 0, void 0, void 0, function* () {
    const templatePath = path_1.default.resolve(__dirname, 'templates', 'invoice.ejs');
    try {
        const html = yield ejs_1.default.renderFile(templatePath, { order });
        yield sendEmail(to, 'Your Order Invoice', 'Thank you for your order!', html);
    }
    catch (error) {
        console.error('Error sending order invoice email:', error);
        throw error;
    }
});
exports.sendOrderInvoiceEmail = sendOrderInvoiceEmail;
const sendRegisterSuccessEmail = (to, name) => __awaiter(void 0, void 0, void 0, function* () {
    const templatePath = path_1.default.resolve(__dirname, 'templates', 'register-success.ejs');
    try {
        const html = yield ejs_1.default.renderFile(templatePath, { name });
        yield sendEmail(to, 'Registration Successful', 'Welcome to our service!', html);
    }
    catch (error) {
        console.error('Error sending registration success email:', error);
        throw error;
    }
});
exports.sendRegisterSuccessEmail = sendRegisterSuccessEmail;
exports.default = sendEmail;
//# sourceMappingURL=mail.js.map