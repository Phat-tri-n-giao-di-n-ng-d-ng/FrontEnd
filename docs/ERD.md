# 🗄️ Database Schema & ERD

## Entity Relationships Summary

| From Table | To Table | Relationship | Cardinality |
|-----------|----------|--------------|------------|
| users | roles | Many-to-Many | N:N |
| users | orders | One-to-Many | 1:N |
| users | cart | One-to-Many | 1:N |
| users | reviews | One-to-Many | 1:N |
| users | favorites | One-to-Many | 1:N |
| users | appointments | One-to-Many | 1:N |
| categories | products | One-to-Many | 1:N |
| brands | products | One-to-Many | 1:N |
| products | reviews | One-to-Many | 1:N |
| products | cart | One-to-Many | 1:N |
| products | order_items | One-to-Many | 1:N |
| products | product_images | One-to-Many | 1:N |
| products | product_specs | One-to-Many | 1:N |
| orders | order_items | One-to-Many | 1:N |
| discounts | user_discounts | One-to-Many | 1:N |
| users | conversations | One-to-Many | 1:N |
| conversations | messages | One-to-Many | 1:N |

---

## Database Tables

### 1. **users** - Người dùng
```sql
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    date_of_birth DATE,
    google_id VARCHAR(255) UNIQUE,
    is_email_verified BOOLEAN DEFAULT false,
    status ENUM('ACTIVE', 'INACTIVE', 'BANNED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

### 2. **roles** - Vai trò
```sql
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name ENUM('ADMIN', 'USER', 'MODERATOR') UNIQUE,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. **user_roles** - Gán vai trò cho người dùng
```sql
CREATE TABLE user_roles (
    user_role_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);
```

### 4. **categories** - Danh mục sản phẩm
```sql
CREATE TABLE categories (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255),
    description TEXT,
    icon_url VARCHAR(500),
    image_url VARCHAR(500),
    parent_id BIGINT,
    is_active BOOLEAN DEFAULT true,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(category_id)
);
```

### 5. **brands** - Thương hiệu
```sql
CREATE TABLE brands (
    brand_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255),
    logo_url VARCHAR(500),
    website VARCHAR(500),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 6. **products** - Sản phẩm
```sql
CREATE TABLE products (
    product_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    description TEXT,
    category_id BIGINT NOT NULL,
    brand_id BIGINT,
    sku VARCHAR(50) UNIQUE,
    price DECIMAL(12, 2) NOT NULL,
    cost_price DECIMAL(12, 2),
    stock_quantity INT DEFAULT 0,
    rating DECIMAL(3, 2),
    review_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    thumbnail_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id),
    INDEX idx_category (category_id),
    INDEX idx_brand (brand_id),
    INDEX idx_slug (slug)
);
```

### 7. **product_images** - Ảnh sản phẩm
```sql
CREATE TABLE product_images (
    image_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);
```

### 8. **product_specs** - Thông số kỹ thuật sản phẩm
```sql
CREATE TABLE product_specs (
    spec_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    spec_name VARCHAR(100),
    spec_value VARCHAR(500),
    display_order INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);
```

### 9. **cart** - Giỏ hàng
```sql
CREATE TABLE cart (
    cart_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);
```

### 10. **orders** - Đơn hàng
```sql
CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    order_code VARCHAR(50) UNIQUE,
    total_amount DECIMAL(12, 2) NOT NULL,
    discount_amount DECIMAL(12, 2) DEFAULT 0,
    final_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    payment_method ENUM('CREDIT_CARD', 'BANK_TRANSFER', 'CASH_ON_DELIVERY') DEFAULT 'CASH_ON_DELIVERY',
    payment_status ENUM('UNPAID', 'PAID', 'REFUNDED') DEFAULT 'UNPAID',
    
    -- Shipping info
    recipient_name VARCHAR(255),
    recipient_phone VARCHAR(20),
    recipient_email VARCHAR(255),
    recipient_address TEXT,
    recipient_ward VARCHAR(100),
    recipient_district VARCHAR(100),
    recipient_city VARCHAR(100),
    
    shipping_fee DECIMAL(10, 2) DEFAULT 0,
    delivery_date DATE,
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
);
```

### 11. **order_items** - Chi tiết đơn hàng
```sql
CREATE TABLE order_items (
    order_item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(255),
    quantity INT NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### 12. **reviews** - Đánh giá sản phẩm
```sql
CREATE TABLE reviews (
    review_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    order_id BIGINT,
    
    rating INT CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    
    helpful_count INT DEFAULT 0,
    unhelpful_count INT DEFAULT 0,
    is_verified_purchase BOOLEAN DEFAULT false,
    
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
```

### 13. **favorites** - Danh sách yêu thích
```sql
CREATE TABLE favorites (
    favorite_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);
```

### 14. **discounts** - Khuyến mãi/Voucher
```sql
CREATE TABLE discounts (
    discount_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type ENUM('PERCENTAGE', 'FIXED_AMOUNT') DEFAULT 'PERCENTAGE',
    discount_value DECIMAL(10, 2) NOT NULL,
    max_discount_amount DECIMAL(12, 2),
    min_order_value DECIMAL(12, 2),
    
    usage_limit INT,
    used_count INT DEFAULT 0,
    usage_per_user INT DEFAULT 1,
    
    valid_from DATETIME NOT NULL,
    valid_to DATETIME NOT NULL,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 15. **user_discounts** - Voucher của người dùng
```sql
CREATE TABLE user_discounts (
    user_discount_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    discount_id BIGINT NOT NULL,
    status ENUM('AVAILABLE', 'USED') DEFAULT 'AVAILABLE',
    used_at TIMESTAMP NULL,
    used_order_id BIGINT,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (discount_id) REFERENCES discounts(discount_id),
    FOREIGN KEY (used_order_id) REFERENCES orders(order_id)
);
```

### 16. **appointments** - Đặt lịch hẹn
```sql
CREATE TABLE appointments (
    appointment_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    appointment_code VARCHAR(50) UNIQUE,
    
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT DEFAULT 30,
    
    service_type VARCHAR(255),
    description TEXT,
    location VARCHAR(500),
    
    status ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    assigned_staff_id BIGINT,
    
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (assigned_staff_id) REFERENCES users(user_id)
);
```

### 17. **conversations** - Cuộc trò chuyện
```sql
CREATE TABLE conversations (
    conversation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    support_staff_id BIGINT,
    
    conversation_type ENUM('CUSTOMER_SUPPORT', 'SALES_INQUIRY', 'COMPLAINT') DEFAULT 'CUSTOMER_SUPPORT',
    status ENUM('OPEN', 'CLOSED', 'PENDING') DEFAULT 'OPEN',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    closed_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (support_staff_id) REFERENCES users(user_id)
);
```

### 18. **messages** - Tin nhắn
```sql
CREATE TABLE messages (
    message_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    
    message_text TEXT NOT NULL,
    message_type ENUM('TEXT', 'IMAGE', 'FILE', 'AI_RESPONSE') DEFAULT 'TEXT',
    file_url VARCHAR(500),
    
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(user_id)
);
```

---

## Indexes & Performance

```sql
-- User queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_status ON users(status);

-- Product queries
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(is_active);

-- Order queries
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(created_at);

-- Review queries
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_status ON reviews(status);
```

---

## Migration Script (Flyway)

Files nằm trong: `backend/src/main/resources/db/migration/`

Ví dụ:
```sql
-- V1__Initial_Schema.sql
-- V2__Add_Users_Table.sql
-- V3__Add_Products_Table.sql
-- V4__Add_Orders_Table.sql
```

---
