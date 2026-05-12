# 🛒 ShopLaptop - Online PC Sales Platform

<div align="center">

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Java](https://img.shields.io/badge/Java-21-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-green.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow.svg)

</div>

## 📋 Mục Lục
- [Mô Tả Dự Án](#mô-tả-dự-án)
- [Tính Năng](#tính-năng)
- [Tech Stack](#tech-stack)
- [Chuẩn Bị](#chuẩn-bị)
- [Setup Chạy Local](#setup-chạy-local)
- [Script NPM](#script-npm)
- [Demo & Tài Khoản](#demo--tài-khoản)
- [Documentation](#documentation)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Đóng Góp](#đóng-góp)

---

## 🎯 Mô Tả Dự Án

**ShopLaptop** là một platform thương mại điện tử toàn diện cho việc mua bán laptop, PC và các thiết bị công nghệ khác. Ứng dụng cung cấp trải nghiệm mua sắm tương tác với các tính năng như:

## ✨ Tính Năng

### 👥 Cho Khách Hàng
- ✅ Duyệt & tìm kiếm sản phẩm
- ✅ Xem chi tiết sản phẩm (specs, reviews, giá so sánh)
- ✅ Giỏ hàng & thanh toán
- ✅ Quản lý đơn hàng & theo dõi trạng thái
- ✅ Hệ thống đánh giá & review sản phẩm
- ✅ Danh sách yêu thích (Wishlist)
- ✅ Quản lý chiết khấu & voucher cá nhân
- ✅ Đa ngôn ngữ (i18n)

### 👨‍💼 Cho Admin
- ✅ Quản lý sản phẩm (CRUD, inventory)
- ✅ Quản lý danh mục & thương hiệu
- ✅ Quản lý đơn hàng (status, shipping)
- ✅ Quản lý người dùng & quyền hạn
- ✅ Tạo & quản lý khuyến mãi/voucher
- ✅ Xem thống kê & báo cáo doanh số
- ✅ Quản lý lịch hẹn
- ✅ Hỗ trợ khách hàng

### 🔐 Bảo Mật
- ✅ OAuth 2.0 / Google Sign-In
- ✅ JWT Authentication
- ✅ Password encryption
- ✅ CORS configuration

---

## 🛠️ Tech Stack



### Frontend
| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|---------|---------|
| **React** | 19 | UI Framework |
| **Vite** | 6.3.2 | Build tool |
| **TailwindCSS** | 4.1.4 | Styling |
| **Redux Toolkit** | 2.7.0 | State Management |
| **React Router** | 7.5.0 | Routing |
| **Axios** | 1.12.2 | HTTP Client |
| **i18next** | 25.6.0 | Internationalization |
| **Recharts** | 2.15.3 | Data Visualization |
| **Mapbox GL** | 3.15.0 | Maps |
| **Socket.io** | - | Real-time Chat |
| **React Slick** | 0.30.3 | Carousel |

### Backend
| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|---------|---------|
| **Java** | 21 LTS | Ngôn ngữ chính |
| **Spring Boot** | 3.5.5 | Framework chính |
| **Spring Data JPA** | - | ORM & Database |
| **Spring Security** | - | Authentication & Authorization |
| **Spring OAuth 2.0** | - | Social Login (Google) |
| **Spring AI** | 1.1.0-M4 | OpenAI Integration |
| **MySQL** | 8.0+ | Database |
| **Redis** | - | Caching & Session |
| **Bucket4j** | 0.8.1 | Rate Limiting |
| **Swagger/OpenAPI** | 2.6.0 | API Documentation |
| **JWT** | 4.4.0 | Token Management |

### Tools & Services
- **Build**: Maven (Backend), Vite (Frontend)
- **API Docs**: Swagger UI (OpenAPI 3.0)
- **Version Control**: Git
- **Database**: MySQL

---

## 📦 Chuẩn Bị

### Yêu Cầu Hệ Thống
```bash
# Backend
- Java 21 LTS
- Maven 3.8+
- MySQL 8.0+
- Redis 6.0+ (tùy chọn)

# Frontend
- Node.js 18+ 
- npm 9+ hoặc yarn
```

### Cài Đặt Prerequisites

**1. Java 21**
```bash
# Windows (sử dụng Chocolatey)
choco install openjdk21

# hoặc download từ: https://adoptium.net/
```

**2. MySQL**
```bash
# Windows (sử dụng Chocolatey)
choco install mysql

# hoặc download từ: https://dev.mysql.com/downloads/
```

**3. Node.js**
```bash
# Windows (sử dụng Chocolatey)
choco install nodejs

# Hoặc download từ: https://nodejs.org/
```

**4. Redis (tùy chọn)**
```bash
# Windows: https://github.com/microsoftarchive/redis/releases
# hoặc sử dụng Docker
docker run -d -p 6379:6379 redis:latest
```

---

## 🚀 Setup Chạy Local

### 1️⃣ Clone Repository
```bash

Clone backend: https://github.com/nguyentrongnghia11/ShopLaptop-Backend.git
Clone frontend: https://github.com/nguyentrongnghia11/ShopLaptop-Frontend.git


cd ShopLaptop
```

### 2️⃣ Setup Backend

```bash
cd backend

# 2.1: Cấu hình Database
# - Tạo database MySQL
mysql -u root -p
> CREATE DATABASE shoplaptop;
> EXIT;

# 2.2: Cấu hình Environment Variables
# Tạo file: backend/src/main/resources/application-local.yml
# (xem mẫu ở docs/CONFIG.md)

# 2.3: Compile & Run
mvn clean install
mvn spring-boot:run

# Backend sẽ chạy trên http://localhost:8080
# Swagger UI: http://localhost:8080/swagger-ui.html
```

### 3️⃣ Setup Frontend

```bash
cd frontend

# 3.1: Cài dependencies
npm install

# 3.2: Cấu hình Environment
# Tạo file: frontend/.env.local
# (xem mẫu ở docs/CONFIG.md)

# 3.3: Chạy dev server
npm run dev

# Frontend sẽ chạy trên http://localhost:5173
```

### 4️⃣ Verify Setup
```bash
# Kiểm tra backend
curl http://localhost:8080/api/health

# Kiểm tra frontend
# Mở trình duyệt: http://localhost:5173
```

---

## 📜 Script NPM

### Frontend Scripts

```bash
# Development
npm run dev              # Chạy dev server (Vite)

# Production
npm run build            # Build optimized
npm run preview          # Preview build

# Quality
npm run lint             # Kiểm tra ESLint
npm run lint --fix       # Fix lint issues tự động

# Cleanup
npm run clean            # Xóa node_modules & dist
npm install              # Cài lại dependencies
```

### Backend Scripts (Maven)

```bash
# Development
mvn spring-boot:run     # Chạy trực tiếp

# Build
mvn clean install       # Build & run tests
mvn clean package       # Tạo JAR file

# Database
mvn flyway:migrate      # Run migrations

# Testing
mvn test                # Chạy unit tests
mvn verify              # Chạy integration tests
```

---

## 🌐 Demo & Tài Khoản

### 🔗 Link Demo
```
Frontend:  https://shoplaptop-demo.vercel.app (Sắp có)
Backend:   https://api-shoplaptop.herokuapp.com (Sắp có)
Swagger:   https://api-shoplaptop.herokuapp.com/swagger-ui.html
```

### 👤 Tài Khoản Demo

#### Admin Account
```
Email:    admin@shoplaptop.com
Password: Admin@123456
Role:     ADMIN
```

#### Customer Account
```
Email:    customer@shoplaptop.com
Password: Customer@123456
Role:     USER
```

#### Test Account (with Wishlist)
```
Email:    test@shoplaptop.com
Password: Test@123456
Role:     USER
```


---

## 📚 Documentation

Tài liệu chi tiết nằm trong thư mục `docs/`:

| File | Nội Dung |
|------|----------|
| **docs/ERD.md** | Entity Relationship Diagram & Database Schema |
| **docs/API.md** | API Specification (endpoints, params, responses) |
| **docs/ARCHITECTURE.md** | Kiến trúc hệ thống & Component Diagram |
| **docs/SETUP.md** | Hướng dẫn setup chi tiết |
| **docs/CONFIG.md** | Environment variables & configuration |
| **docs/DEPLOYMENT.md** | Hướng dẫn deploy lên production |
| **docs/Sprint-1.md** | Sprint 1 Report |
| **docs/Sprint-2.md** | Sprint 2 Report |

---

## 📁 Cấu Trúc Dự Án

```
ShopLaptop/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/iuh/fit/        # Source code
│   │   │   └── resources/            # Config files
│   │   └── test/                     # Tests
│   ├── pom.xml                       # Maven config
│   └── mvnw                          # Maven wrapper
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/               # React components
│   │   ├── pages/                    # Page components
│   │   ├── services/                 # API services
│   │   ├── hooks/                    # Custom hooks
│   │   ├── context/                  # Context API
│   │   ├── i18n/                     # Translations
│   │   ├── utils/                    # Utilities
│   │   └── apis/                     # API clients
│   ├── package.json                  # NPM config
│   ├── vite.config.js                # Vite config
│   └── tailwind.config.js            # TailwindCSS config
│
├── docs/                             # Documentation
│   ├── ERD.md                        # Database schema
│   ├── API.md                        # API specification
│   ├── ARCHITECTURE.md               # Architecture diagram
│   ├── SETUP.md                      # Setup guide
│   ├── CONFIG.md                     # Configuration
│   ├── DEPLOYMENT.md                 # Deployment guide
│   └── Sprint-*.md                   # Sprint reports
│
└── README.md                         # This file
```

---

## 🔧 Thông Tin Liên Hệ & Troubleshooting

### ❓ Vấn Đề Thường Gặp

**Q: Port 8080/5173 đã bị sử dụng**
```bash
# Backend - thay đổi port
# Trong application.yml: server.port=8081

# Frontend - Vite tự động thử port khác
# Hoặc chỉ định: npm run dev -- --port 5174
```

**Q: MySQL connection failed**
```bash
# Kiểm tra MySQL chạy chưa
mysql -u root -p
# Kiểm tra config trong application.yml
```

**Q: Node modules quá lớn**
```bash
npm ci --prefer-offline --no-audit
```

**Q: Port 6379 Redis không available**
```bash
# Start Redis với Docker
docker run -d -p 6379:6379 redis:latest
```

## 👨‍💻 Nhóm Phát Triển

| Vai Trò | Tên | GitHub |
|--------|-----|--------|
| Fullstack | [Nguyen Trong Nghia] | [@yourprofile](https://github.com) |
| Fullstack Lead | [Tran Hai Dang] | [@yourprofile](https://github.com) |


---

<div align="center">

**[⬆ Về đầu](#-shoplaptop---online-pc-sales-platform)**

Made with ❤️ by ShopLaptop Team

</div>
