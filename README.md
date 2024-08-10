# sanber-be-58-final-project-Sahrul-Yoyo
A final project Sanbercode


## Endpoints e-commerce

Products
GET /products
POST /products
GET /products/:id
PUT /products/:id
DELETE /products/:id

Uploads
POST /upload
POST /uploads

Categories
GET /categories
POST /categories
GET /categories/:id
PUT /categories/:id
DELETE /categories/:id

Auth
POST /auth/login
POST /auth/register
POST /register/admin - (Admin only)
GET /auth/me - (Admin & User)
PUT /auth/profile
GET /auth/users - (Admin only)
POST /auth/register-admin - (First-time admin registration)

Orders
POST /order
GET /order/history
GET /order/statuses

Notifications
GET /notifications/:userId
PUT /notifications/:notificationId/read

Cart
POST /cart/add
DELETE /cart/:productId
PUT /cart/update -
GET /cart
DELETE /cart/clear

