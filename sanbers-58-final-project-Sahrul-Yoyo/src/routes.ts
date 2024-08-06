import express from "express";
import categoriesController from "./controllers/categories.controller";
import authController from "./controllers/auth.controller";
import uploadMiddleware from "./middlewares/upload.middleware";
import uploadController from "./controllers/upload.controller";
import productsController from "./controllers/products.controller";
import authMiddleware from "./middlewares/auth.middleware";
import authorizeRoles from "./middlewares/acl.midllewares";
import { createOrder, getUserOrders } from "./controllers/order.controller";

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
  
// Get current user details
router.get("/auth/me", [authMiddleware, authorizeRoles(["admin", "user"])], authController.me);

// Update user profile
router.put("/auth/profile", authMiddleware, authController.profile);

// Get all users (only accessible by admin)
router.get("/auth/users", authMiddleware, authorizeRoles(["admin"]), authController.getAll)

router.post("/auth/register-admin", authController.registerAdmin);

router.post('/order', authMiddleware, createOrder);
router.get('/order/history', authMiddleware, getUserOrders);



export default router;
