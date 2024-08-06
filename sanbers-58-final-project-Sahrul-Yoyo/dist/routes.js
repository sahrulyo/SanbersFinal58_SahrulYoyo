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
// Get current user details
router.get("/auth/me", [auth_middleware_1.default, (0, acl_midllewares_1.default)(["admin", "user"])], auth_controller_1.default.me);
// Update user profile
router.put("/auth/profile", auth_middleware_1.default, auth_controller_1.default.profile);
// Get all users (only accessible by admin)
router.get("/auth/users", auth_middleware_1.default, (0, acl_midllewares_1.default)(["admin"]), auth_controller_1.default.getAll);
router.post("/auth/register-admin", auth_controller_1.default.registerAdmin);
router.post('/order', auth_middleware_1.default, order_controller_1.createOrder);
router.get('/order/history', auth_middleware_1.default, order_controller_1.getUserOrders);
exports.default = router;
//# sourceMappingURL=routes.js.map