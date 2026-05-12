# 📡 API Documentation

## Overview

ShopLaptop REST API được xây dựng với Spring Boot 3 và tuân thủ RESTful conventions. Tất cả responses được trả về dưới dạng JSON.

- **Base URL**: `http://localhost:8080/api`
- **API Version**: v1
- **Authentication**: JWT Token (Bearer Token)
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`

---

## Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response 200:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "...",
    "user": {
      "userId": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "roles": ["USER"]
    }
  }
}
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "SecurePass123",
  "firstName": "Jane",
  "lastName": "Smith"
}

Response 201:
{
  "success": true,
  "data": {
    "userId": 2,
    "email": "newuser@example.com",
    "message": "User registered successfully"
  }
}
```

### Google Sign-In
```http
POST /api/auth/google
Content-Type: application/json

{
  "googleToken": "google_id_token_here"
}

Response 200:
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": { ... }
  }
}
```

### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}

Response 200:
{
  "success": true,
  "data": {
    "token": "new_jwt_token",
    "refreshToken": "new_refresh_token"
  }
}
```

---

## Products

### Get All Products (with Pagination & Filter)
```http
GET /api/products?page=0&size=12&sort=createdAt,desc&category=1&minPrice=5000000&maxPrice=50000000&search=gaming

Response 200:
{
  "success": true,
  "data": {
    "content": [
      {
        "productId": 1,
        "productName": "Dell XPS 13",
        "slug": "dell-xps-13",
        "price": 25000000,
        "costPrice": 20000000,
        "rating": 4.8,
        "reviewCount": 125,
        "stockQuantity": 50,
        "isFeatured": true,
        "thumbnailUrl": "https://...",
        "category": {
          "categoryId": 1,
          "categoryName": "Laptops"
        },
        "brand": {
          "brandId": 1,
          "brandName": "Dell"
        }
      }
    ],
    "pageNumber": 0,
    "pageSize": 12,
    "totalElements": 245,
    "totalPages": 21,
    "isFirst": true,
    "isLast": false
  }
}
```

### Get Product Detail
```http
GET /api/products/:productId

Response 200:
{
  "success": true,
  "data": {
    "productId": 1,
    "productName": "Dell XPS 13",
    "description": "...",
    "price": 25000000,
    "costPrice": 20000000,
    "stockQuantity": 50,
    "rating": 4.8,
    "reviewCount": 125,
    "isFeatured": true,
    "category": { ... },
    "brand": { ... },
    "images": [
      { "imageId": 1, "imageUrl": "...", "isPrimary": true },
      { "imageId": 2, "imageUrl": "...", "isPrimary": false }
    ],
    "specs": [
      { "specId": 1, "specName": "CPU", "specValue": "Intel Core i7-13700H" },
      { "specId": 2, "specName": "RAM", "specValue": "16GB DDR4" }
    ]
  }
}
```

### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "productName": "New Gaming Laptop",
  "description": "...",
  "categoryId": 1,
  "brandId": 2,
  "sku": "DELL-XPS-15-2024",
  "price": 35000000,
  "costPrice": 28000000,
  "stockQuantity": 100
}

Response 201:
{
  "success": true,
  "data": { ... }
}
```

### Update Product (Admin Only)
```http
PUT /api/products/:productId
Authorization: Bearer {token}
Content-Type: application/json

{
  "productName": "Updated Name",
  "price": 34000000,
  "stockQuantity": 95
}

Response 200:
{
  "success": true,
  "data": { ... }
}
```

### Delete Product (Admin Only)
```http
DELETE /api/products/:productId
Authorization: Bearer {token}

Response 204: No Content
```

---

## Categories

### Get All Categories
```http
GET /api/categories

Response 200:
{
  "success": true,
  "data": [
    {
      "categoryId": 1,
      "categoryName": "Laptops",
      "slug": "laptops",
      "iconUrl": "...",
      "imageUrl": "...",
      "displayOrder": 1,
      "isActive": true
    },
    {
      "categoryId": 2,
      "categoryName": "Desktops",
      "slug": "desktops",
      "displayOrder": 2
    }
  ]
}
```

### Create Category (Admin Only)
```http
POST /api/categories
Authorization: Bearer {token}
Content-Type: application/json

{
  "categoryName": "Gaming Peripherals",
  "slug": "gaming-peripherals",
  "description": "...",
  "displayOrder": 5
}

Response 201:
{
  "success": true,
  "data": { ... }
}
```

---

## Cart

### Get Cart
```http
GET /api/cart
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "cartId": 1,
    "user": { "userId": 1, "email": "user@example.com" },
    "items": [
      {
        "cartId": 1,
        "product": {
          "productId": 1,
          "productName": "Dell XPS 13",
          "price": 25000000,
          "thumbnailUrl": "..."
        },
        "quantity": 2,
        "totalPrice": 50000000
      }
    ],
    "subTotal": 50000000,
    "totalItems": 2
  }
}
```

### Add to Cart
```http
POST /api/cart/items
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": 1,
  "quantity": 1
}

Response 201:
{
  "success": true,
  "data": { ... }
}
```

### Update Cart Item
```http
PUT /api/cart/items/:cartItemId
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 3
}

Response 200:
{
  "success": true,
  "data": { ... }
}
```

### Remove from Cart
```http
DELETE /api/cart/items/:cartItemId
Authorization: Bearer {token}

Response 204: No Content
```

### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer {token}

Response 204: No Content
```

---

## Orders

### Create Order (Checkout)
```http
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "recipientName": "John Doe",
  "recipientPhone": "0912345678",
  "recipientEmail": "john@example.com",
  "recipientAddress": "123 Main St",
  "recipientWard": "Ward 1",
  "recipientDistrict": "District 1",
  "recipientCity": "Ho Chi Minh",
  "paymentMethod": "CREDIT_CARD",
  "discountCode": "SAVE20" (optional),
  "notes": "Please deliver in morning"
}

Response 201:
{
  "success": true,
  "data": {
    "orderId": 1,
    "orderCode": "ORD-2024-001",
    "totalAmount": 50000000,
    "discountAmount": 5000000,
    "finalAmount": 45000000,
    "status": "PENDING",
    "paymentStatus": "UNPAID",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get My Orders
```http
GET /api/orders?page=0&size=10&sort=createdAt,desc&status=DELIVERED
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "content": [
      {
        "orderId": 1,
        "orderCode": "ORD-2024-001",
        "totalAmount": 50000000,
        "finalAmount": 45000000,
        "status": "DELIVERED",
        "paymentStatus": "PAID",
        "items": [
          {
            "productId": 1,
            "productName": "Dell XPS 13",
            "quantity": 2,
            "unitPrice": 25000000
          }
        ],
        "createdAt": "2024-01-15T10:30:00Z",
        "deliveryDate": "2024-01-20"
      }
    ]
  }
}
```

### Get Order Detail
```http
GET /api/orders/:orderId
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "orderId": 1,
    "orderCode": "ORD-2024-001",
    "status": "SHIPPED",
    "items": [ ... ],
    "shippingAddress": { ... },
    "timeline": [
      {
        "status": "PENDING",
        "timestamp": "2024-01-15T10:30:00Z",
        "description": "Order created"
      },
      {
        "status": "CONFIRMED",
        "timestamp": "2024-01-15T11:00:00Z",
        "description": "Payment confirmed"
      }
    ]
  }
}
```

### Update Order Status (Admin Only)
```http
PATCH /api/orders/:orderId/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "SHIPPED",
  "deliveryDate": "2024-01-20"
}

Response 200:
{
  "success": true,
  "data": { ... }
}
```

### Cancel Order
```http
POST /api/orders/:orderId/cancel
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Change my mind"
}

Response 200:
{
  "success": true,
  "data": { ... }
}
```

---

## Reviews

### Get Product Reviews
```http
GET /api/reviews/product/:productId?page=0&size=10&sort=createdAt,desc

Response 200:
{
  "success": true,
  "data": {
    "content": [
      {
        "reviewId": 1,
        "rating": 5,
        "title": "Excellent laptop!",
        "comment": "Great performance and build quality...",
        "user": {
          "userId": 1,
          "firstName": "John"
        },
        "isVerifiedPurchase": true,
        "helpfulCount": 15,
        "unhelpfulCount": 2,
        "createdAt": "2024-01-10T15:30:00Z"
      }
    ],
    "averageRating": 4.7,
    "ratingDistribution": {
      "5": 120,
      "4": 45,
      "3": 20,
      "2": 5,
      "1": 3
    }
  }
}
```

### Create Review (Post-Purchase)
```http
POST /api/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": 1,
  "orderId": 1,
  "rating": 5,
  "title": "Amazing product",
  "comment": "Exceeded my expectations. Fast delivery too!"
}

Response 201:
{
  "success": true,
  "data": {
    "reviewId": 1,
    "status": "PENDING"
  }
}
```

### Mark Review Helpful
```http
POST /api/reviews/:reviewId/helpful
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "helpfulCount": 16
  }
}
```

---

## Favorites (Wishlist)

### Get My Favorites
```http
GET /api/favorites
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [
    {
      "favoriteId": 1,
      "product": {
        "productId": 1,
        "productName": "Dell XPS 13",
        "price": 25000000,
        "rating": 4.8,
        "thumbnailUrl": "..."
      },
      "addedAt": "2024-01-10T15:30:00Z"
    }
  ]
}
```

### Add to Favorites
```http
POST /api/favorites
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": 1
}

Response 201:
{
  "success": true,
  "data": { ... }
}
```

### Remove from Favorites
```http
DELETE /api/favorites/:favoriteId
Authorization: Bearer {token}

Response 204: No Content
```

---

## Appointments

### Create Appointment
```http
POST /api/appointments
Authorization: Bearer {token}
Content-Type: application/json

{
  "appointmentDate": "2024-02-15",
  "appointmentTime": "14:00",
  "serviceType": "Product Consultation",
  "description": "Want to know about gaming laptops",
  "location": "HQ Store"
}

Response 201:
{
  "success": true,
  "data": {
    "appointmentId": 1,
    "appointmentCode": "APT-2024-001",
    "status": "PENDING",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get My Appointments
```http
GET /api/appointments?status=CONFIRMED
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [
    {
      "appointmentId": 1,
      "appointmentCode": "APT-2024-001",
      "appointmentDate": "2024-02-15",
      "appointmentTime": "14:00",
      "status": "CONFIRMED",
      "serviceType": "Product Consultation"
    }
  ]
}
```

### Cancel Appointment
```http
POST /api/appointments/:appointmentId/cancel
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": { ... }
}
```

---

## Discounts & Vouchers

### Get Available Discounts
```http
GET /api/discounts/available?orderValue=10000000

Response 200:
{
  "success": true,
  "data": [
    {
      "discountId": 1,
      "code": "SAVE20",
      "description": "Save 20% on all products",
      "discountType": "PERCENTAGE",
      "discountValue": 20,
      "maxDiscountAmount": 5000000,
      "validFrom": "2024-01-01T00:00:00Z",
      "validTo": "2024-12-31T23:59:59Z"
    }
  ]
}
```

### Validate Discount Code
```http
POST /api/discounts/validate
Content-Type: application/json

{
  "code": "SAVE20",
  "orderAmount": 10000000
}

Response 200:
{
  "success": true,
  "data": {
    "isValid": true,
    "discountType": "PERCENTAGE",
    "discountValue": 20,
    "discountAmount": 2000000,
    "finalAmount": 8000000
  }
}

Response 400:
{
  "success": false,
  "error": "Discount code expired"
}
```

### Get My Vouchers
```http
GET /api/user/vouchers?status=AVAILABLE
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [
    {
      "userDiscountId": 1,
      "discount": { ... },
      "status": "AVAILABLE"
    }
  ]
}
```

---

## Messages & Support Chat

### Get Conversations
```http
GET /api/conversations?status=OPEN
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [
    {
      "conversationId": 1,
      "conversationType": "CUSTOMER_SUPPORT",
      "status": "OPEN",
      "supportStaff": { "userId": 5, "firstName": "Support" },
      "lastMessage": "How can I help?",
      "unreadCount": 2,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Get Messages
```http
GET /api/conversations/:conversationId/messages
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [
    {
      "messageId": 1,
      "sender": { "userId": 1, "firstName": "John" },
      "messageText": "Hello, I need help",
      "messageType": "TEXT",
      "isRead": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Send Message
```http
POST /api/conversations/:conversationId/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "messageText": "Can I return this laptop?",
  "messageType": "TEXT"
}

Response 201:
{
  "success": true,
  "data": { ... }
}
```

---

## User Profile

### Get My Profile
```http
GET /api/user/profile
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "userId": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "0912345678",
    "gender": "MALE",
    "dateOfBirth": "1990-01-15",
    "avatarUrl": "...",
    "isEmailVerified": true,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  }
}
```

### Update Profile
```http
PUT /api/user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Jane",
  "phone": "0912345679",
  "dateOfBirth": "1990-01-15"
}

Response 200:
{
  "success": true,
  "data": { ... }
}
```

### Change Password
```http
POST /api/user/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "OldPass123",
  "newPassword": "NewPass456"
}

Response 200:
{
  "success": true,
  "data": {
    "message": "Password changed successfully"
  }
}
```

---

## Admin Statistics

### Dashboard Stats
```http
GET /api/admin/stats/dashboard
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "totalRevenue": 500000000,
    "totalOrders": 250,
    "totalCustomers": 150,
    "totalProducts": 500,
    "revenueGrowth": 12.5,
    "orderGrowth": 8.3,
    "pendingOrders": 15,
    "lowStockProducts": 8
  }
}
```

### Monthly Revenue
```http
GET /api/admin/stats/revenue?month=1&year=2024
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "daily": [
      { "date": "2024-01-01", "revenue": 5000000 },
      { "date": "2024-01-02", "revenue": 7500000 }
    ],
    "total": 180000000
  }
}
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Validation Error
```json
{
  "success": false,
  "errors": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  },
  "code": "VALIDATION_ERROR"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 204 | No Content - Success but no response body |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Duplicate resource |
| 422 | Unprocessable Entity - Validation error |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Rate Limiting

API endpoints có rate limiting để bảo vệ server:

```
- Authenticated Users: 100 requests/minute
- Public Endpoints: 30 requests/minute
- Admin Endpoints: 200 requests/minute
```

Headers trả về:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1705327800
```

---

## Pagination

Các endpoint list hỗ trợ pagination:

```
GET /api/products?page=0&size=20&sort=createdAt,desc
```

Query Parameters:
- `page`: Page number (0-indexed)
- `size`: Items per page (default: 20, max: 100)
- `sort`: Sort field and direction (field,asc|desc)

---

## Testing API

### Using cURL
```bash
# Get all products
curl -X GET http://localhost:8080/api/products

# Create order with auth
curl -X POST http://localhost:8080/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### Using Postman
1. Import collection từ: `docs/ShopLaptop-API.postman_collection.json`
2. Set environment variables: `base_url`, `token`
3. Run requests

### Using Swagger UI
1. Truy cập: `http://localhost:8080/swagger-ui.html`
2. Click "Authorize" và nhập JWT token
3. Try out các endpoints
