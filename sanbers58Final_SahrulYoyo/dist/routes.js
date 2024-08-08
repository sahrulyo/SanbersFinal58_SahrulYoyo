"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = __importDefault(require("./controllers/categories.controller"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const upload_middleware_1 = __importDefault(require("./middlewares/upload.middleware"));
const upload_controller_1 = __importDefault(require("./controllers/upload.controller"));
const products_controller_1 = __importDefault(require("./controllers/products.controller"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const acl_midllewares_1 = __importDefault(require("./middlewares/acl.midllewares"));
const order_controller_1 = require("./controllers/order.controller");
const notification_controller_1 = require("./controllers/notification.controller");
const cart_controller_1 = require("./controllers/cart.controller");
const router = express_1.default.Router();
router.get("/products", products_controller_1.default.findAll);
router.post("/products", products_controller_1.default.create);
router.get("/products/:id", products_controller_1.default.findOne);
router.put("/products/:id", products_controller_1.default.update);
router.delete("/products/:id", products_controller_1.default.delete);
router.post("/upload", upload_middleware_1.default.single, upload_controller_1.default.single);
router.post("/uploads", upload_middleware_1.default.multiple, upload_controller_1.default.multiple);
// CRUD Categories
router.get("/categories", categories_controller_1.default.findAll);
router.post("/categories", categories_controller_1.default.create);
router.get("/categories/:id", categories_controller_1.default.findOne);
router.put("/categories/:id", categories_controller_1.default.update);
router.delete("/categories/:id", categories_controller_1.default.delete);
router.post("/auth/login", auth_controller_1.default.login);
router.post("/auth/register", auth_controller_1.default.register);
// Register Admin (only accessible by admin)
router.post("/register/admin", auth_middleware_1.default, (0, acl_midllewares_1.default)(["admin"]), auth_controller_1.default.registerAdmin);
// mendapatkan detail user (logged) saat ini
router.get("/auth/me", [auth_middleware_1.default, (0, acl_midllewares_1.default)(["admin", "user"])], auth_controller_1.default.me);
// Update user profile
router.put("/auth/profile", auth_middleware_1.default, auth_controller_1.default.profile);
// Mendapatkan semua pengguna(hanya diakses oleh admin)
router.get("/auth/users", auth_middleware_1.default, (0, acl_midllewares_1.default)(["admin"]), auth_controller_1.default.getAll);
// untuk admin pertama kali registrasi/rahasia
router.post("/auth/register-admin", auth_controller_1.default.registerAdmin);
router.post('/order', auth_middleware_1.default, order_controller_1.createOrder);
router.get('/order/history', auth_middleware_1.default, order_controller_1.getUserOrders);
router.get('/order/statuses', order_controller_1.getOrderStatuses);
// Mengambil Notifikasi Berdasarkan User ID
router.get('/notifications/:userId', notification_controller_1.getUserNotifications);
// Menandai Notifikasi sebagai Dibaca
router.put('/notifications/:notificationId/read', notification_controller_1.markNotificationAsRead);
router.post('/cart/add', auth_middleware_1.default, cart_controller_1.addItemToCart);
router.delete('/cart/:productId', auth_middleware_1.default, cart_controller_1.removeItemFromCart);
router.put('/cart/update', auth_middleware_1.default, cart_controller_1.updateCartItemQuantity);
router.get('/cart', auth_middleware_1.default, cart_controller_1.getCart);
router.delete('/cart/clear', auth_middleware_1.default, cart_controller_1.clearCart);
exports.default = router;
//# sourceMappingURL=routes.js.map