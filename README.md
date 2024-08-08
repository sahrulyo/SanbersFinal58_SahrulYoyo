# sanber-be-58-final-project-Sahrul-Yoyo
A final project Sanbercode


## Endpoints

### Products

- **GET** `/products`
  - Retrieve all products.
  - **Response:**
    ```json
    [
      {
        "id": "product_id",
        "name": "Product Name",
        "price": 100,
        "description": "Product Description",
        "category": "Category ID"
      }
    ]
    ```

- **POST** `/products`
  - Create a new product.
  - **Request Body:**
    ```json
    {
      "name": "Product Name",
      "price": 100,
      "description": "Product Description",
      "category": "Category ID"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "product_id",
      "name": "Product Name",
      "price": 100,
      "description": "Product Description",
      "category": "Category ID"
    }
    ```

- **GET** `/products/:id`
  - Retrieve a specific product by ID.
  - **Response:**
    ```json
    {
      "id": "product_id",
      "name": "Product Name",
      "price": 100,
      "description": "Product Description",
      "category": "Category ID"
    }
    ```

- **PUT** `/products/:id`
  - Update a product by ID.
  - **Request Body:**
    ```json
    {
      "name": "Updated Product Name",
      "price": 150,
      "description": "Updated Description",
      "category": "Category ID"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "product_id",
      "name": "Updated Product Name",
      "price": 150,
      "description": "Updated Description",
      "category": "Category ID"
    }
    ```

- **DELETE** `/products/:id`
  - Delete a product by ID.
  - **Response:**
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

### Categories

- **GET** `/categories`
  - Retrieve all categories.
  - **Response:**
    ```json
    [
      {
        "id": "category_id",
        "name": "Category Name"
      }
    ]
    ```

- **POST** `/categories`
  - Create a new category.
  - **Request Body:**
    ```json
    {
      "name": "Category Name"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "category_id",
      "name": "Category Name"
    }
    ```

- **GET** `/categories/:id`
  - Retrieve a specific category by ID.
  - **Response:**
    ```json
    {
      "id": "category_id",
      "name": "Category Name"
    }
    ```

- **PUT** `/categories/:id`
  - Update a category by ID.
  - **Request Body:**
    ```json
    {
      "name": "Updated Category Name"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "category_id",
      "name": "Updated Category Name"
    }
    ```

- **DELETE** `/categories/:id`
  - Delete a category by ID.
  - **Response:**
    ```json
    {
      "message": "Category deleted successfully"
    }
    ```

### Authentication

- **POST** `/auth/login`
  - Authenticate a user.
  - **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "jwt_token"
    }
    ```

- **POST** `/auth/register`
  - Register a new user.
  - **Request Body:**
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "User registered successfully"
    }
    ```

### Orders

- **POST** `/order`
  - Create a new order.
  - **Request Body:**
    ```json
    {
      "orderItems": [
        {
          "productId": "product_id",
          "quantity": 1,
          "price": 100
        }
      ]
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Order created successfully",
      "data": {
        "orderId": "order_id",
        "grandTotal": 100,
        "orderItems": [
          {
            "productId": "product_id",
            "quantity": 1,
            "price": 100
          }
        ],
        "status": "pending"
      }
    }
    ```

- **GET** `/order/history`
  - Retrieve order history for the logged-in user.
  - **Response:**
    ```json
    [
      {
        "orderId": "order_id",
        "grandTotal": 100,
        "status": "pending",
        "orderItems": [
          {
            "productId": "product_id",
            "quantity": 1,
            "price": 100
          }
        ]
      }
    ]
    ```

- **GET** `/order/statuses`
  - Retrieve all possible order statuses.
  - **Response:**
    ```json
    [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
      "completed"
    ]
    ```

### Notifications

- **GET** `/notifications/:userId`
  - Retrieve notifications for a specific user.
  - **Response:**
    ```json
    [
      {
        "notificationId": "notification_id",
        "message": "Notification message",
        "status": "unread"
      }
    ]
    ```

- **PUT** `/notifications/:notificationId/read`
  - Mark a notification as read.
  - **Response:**
    ```json
    {
      "message": "Notification marked as read"
    }
    ```

### Cart

- **POST** `/cart/add`
  - Add an item to the cart.
  - **Request Body:**
    ```json
    {
      "productId": "product_id",
      "quantity": 1
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Item added to cart",
      "cart": {
        "items": [
          {
            "productId": "product_id",
            "quantity": 1
          }
        ]
      }
    }
    ```

- **DELETE** `/cart/:productId`
  - Remove an item from the cart.
  - **Response:**
    ```json
    {
      "message": "Item removed from cart"
    }
    ```

- **PUT** `/cart/update`
  - Update the quantity of an item in the cart.
  - **Request Body:**
    ```json
    {
      "productId": "product_id",
      "quantity": 2
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Cart item updated",
      "cart": {
        "items": [
          {
            "productId": "product_id",
            "quantity": 2
          }
        ]
      }
    }
    ```

- **GET** `/cart`
  - Retrieve the current cart.
  - **Response:**
    ```json
    {
      "items": [
        {
          "productId": "product_id",
          "quantity": 1
        }
      ]
    }
    ```

- **DELETE** `/cart/clear`
  - Clear all items from the cart.
  - **Response:**
    ```json
    {
      "message": "Cart cleared"
    }
    ```

