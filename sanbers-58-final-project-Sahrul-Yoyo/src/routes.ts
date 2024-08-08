import express from "express";
import categoriesController from "./controllers/categories.controller";
import authController from "./controllers/auth.controller";
import uploadMiddleware from "./middlewares/upload.middleware";
import uploadController from "./controllers/upload.controller";
import productsController from "./controllers/products.controller";
import authMiddleware from "./middlewares/auth.middleware";
import authorizeRoles from "./middlewares/acl.midllewares";
import { createOrder, getOrderStatuses, getUserOrders } from "./controllers/order.controller";
import { getUserNotifications, markNotificationAsRead } from './controllers/notification.controller';
import {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  getCart,
  clearCart
} from './controllers/cart.controller';


const router = express.Router();

router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);

// CRUD Categories
router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

router.post("/auth/login", authController.login);

router.post("/auth/register", authController.register);

// Register Admin (only accessible by admin)
router.post(
    "/register/admin",
    authMiddleware,
    authorizeRoles(["admin"]),  
    authController.registerAdmin
  );
  
// mendapatkan detail user (logged) saat ini
router.get("/auth/me", [authMiddleware, authorizeRoles(["admin", "user"])], authController.me);

// Update user profile
router.put("/auth/profile", authMiddleware, authController.profile);

// Mendapatkan semua pengguna(hanya diakses oleh admin)
router.get("/auth/users", authMiddleware, authorizeRoles(["admin"]), authController.getAll)

// untuk admin pertama kali registrasi/rahasia
router.post("/auth/register-admin", authController.registerAdmin);

router.post('/order', authMiddleware, createOrder);

router.get('/order/history', authMiddleware, getUserOrders);

router.get('/order/statuses', getOrderStatuses);

// Mengambil Notifikasi Berdasarkan User ID
router.get('/notifications/:userId', getUserNotifications);

// Menandai Notifikasi sebagai Dibaca
router.put('/notifications/:notificationId/read', markNotificationAsRead);

router.post('/cart/add', authMiddleware, addItemToCart);
router.delete('/cart/:productId', authMiddleware, removeItemFromCart);
router.put('/cart/update', authMiddleware, updateCartItemQuantity);
router.get('/cart', authMiddleware, getCart);
router.delete('/cart/clear', authMiddleware, clearCart);

export default router;
