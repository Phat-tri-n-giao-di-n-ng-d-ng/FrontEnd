# 🏗️ System Architecture

## High-Level Architecture

```
┌───────────────────────────────────────────┐
│         FRONTEND (Client Browser)         │
│                                           │
│  React 19 + Vite + TailwindCSS            │
│  Redux Toolkit (State Management)         │
│  Axios (HTTP Client)                      │
│                                           │
│  http://localhost:5173                    │
└───────────────┬─────────────────────────  ┘
                │
                │ 
                │
┌───────────────▼─────────────────────────┐
│       BACKEND (Spring Boot API)         │
│                                         │
│  Controllers → Services → Repositories  │
│  Authentication: JWT + OAuth2           │
│  Rate Limiting & CORS                   │
│                                         │
│  http://localhost:8080/api              |
│                                         │
│  http://localhost:8080/api              │
└───────────────┬─────────────────────────┘
                │
       ┌────────|
       │        │         
    ┌─────┐ ┌──────┐
    │MySQL│ │Redis │ 
    │  DB │ │Cache │  
    └─────┘ └──────┘
```

**Data Flow**:
1. User interacts with Frontend (React UI)
2. Frontend sends HTTP/WebSocket requests to Backend
3. Backend processes requests & accesses data from MySQL/Redis
4. Backend returns JSON responses to Frontend
5. Frontend updates UI with new data

---

## Frontend Architecture

### Tech Stack
- **Framework**: React 19 (Functional Components + Hooks)
- **Build Tool**: Vite 6.3.2
- **Styling**: TailwindCSS 4.1.4
- **State Management**: Redux Toolkit 2.7.0
- **HTTP Client**: Axios 1.12.2
- **Routing**: React Router 7.5.0
- **Real-time**: Socket.io / Stomp.js
- **Internationalization**: i18next 25.6.0

### Folder Structure
```
frontend/src/
├── components/
│   ├── Admin/              # Admin components
│   ├── Chat/               # Chat components
│   ├── Common/             # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   └── ...
│   ├── Product/            # Product-related components
│   ├── Order/              # Order-related components
│   ├── Cart/               # Shopping cart components
│   └── ...
│
├── pages/
│   ├── AdminLayout/        # Admin dashboard pages
│   ├── All_Products/
│   ├── Appointments/
│   ├── Profile/
│   ├── Cart/
│   ├── Checkout/
│   └── ...
│
├── services/
│   └── api.js              # API client setup
│
├── apis/
│   ├── productApi.jsx      # Product endpoints
│   ├── orderApi.jsx        # Order endpoints
│   ├── userApi.jsx         # User endpoints
│   ├── cartApi.jsx         # Cart endpoints
│   └── ...
│
├── hooks/
│   ├── useCart.jsx         # Cart custom hook
│   ├── useFavorites.js     # Favorites hook
│   └── ...
│
├── context/
│   ├── UserContext.jsx     # User data context
│   ├── LanguageContext.jsx # i18n context
│   └── ...
│
├── store/                  # Redux store (if separate)
│   ├── slices/
│   ├── actions/
│   └── ...
│
├── utils/
│   ├── helpers.js          # Utility functions
│   ├── validators.js       # Validation functions
│   └── ...
│
├── i18n/
│   ├── config.js           # i18next config
│   └── locales/
│       ├── en.json
│       └── vi.json
│
├── constants/
│   └── path.jsx            # Route paths
│
├── assets/
│   ├── images/
│   └── svg/
│
├── App.jsx                 # Root component
├── main.jsx                # Entry point
└── index.css
```

### Component Hierarchy
```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── SearchBar
│   │   ├── CartDropdown
│   │   └── UserMenu
│   ├── Navigation
│   │   └── CategoryMenu
│   ├── Main Router
│   │   ├── HomePage
│   │   ├── ProductListPage
│   │   ├── ProductDetailPage
│   │   ├── CartPage
│   │   ├── CheckoutPage
│   │   ├── OrderPage
│   │   ├── ProfilePage
│   │   ├── AdminDashboard
│   │   └── ...
│   └── Footer
├── Toast Container (react-toastify)
├── Chat Widget
└── Support Chat
```

---

## Backend Architecture

### Tech Stack
- **Framework**: Spring Boot 3.5.5 (Java 21)
- **ORM**: Spring Data JPA + Hibernate
- **Database**: MySQL 8.0+
- **Cache**: Redis
- **Authentication**: Spring Security + JWT + OAuth2
- **API Docs**: Springdoc OpenAPI 2.6.0
- **AI Integration**: Spring AI (OpenAI)
- **Rate Limiting**: Bucket4j
- **Build Tool**: Maven 3.8+

### Layered Architecture
```
┌─────────────────────────────────┐
│   REST Controller Layer          │
│  (HTTP Requests/Responses)       │
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│   Service Layer                 │
│  (Business Logic & Rules)       │
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│   Repository Layer              │
│  (Data Access & Queries)        │
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│   Database Layer                │
│  (MySQL, Redis)                 │
└─────────────────────────────────┘
```

### Folder Structure
```
backend/src/main/java/iuh/fit/
├── controller/
│   ├── AuthController.java          # /api/auth/**
│   ├── ProductController.java        # /api/products/**
│   ├── CartController.java           # /api/cart/**
│   ├── OrderController.java          # /api/orders/**
│   ├── ReviewController.java         # /api/reviews/**
│   ├── UserController.java           # /api/user/**
│   ├── AdminController.java          # /api/admin/**
│   └── ...
│
├── service/
│   ├── AuthService.java
│   ├── ProductService.java
│   ├── OrderService.java
│   ├── PaymentService.java
│   ├── EmailService.java
│   ├── AIService.java                # OpenAI integration
│   ├── ChatService.java              # WebSocket chat
│   └── ...
│
├── repository/
│   ├── UserRepository.java
│   ├── ProductRepository.java
│   ├── OrderRepository.java
│   ├── CartRepository.java
│   ├── ReviewRepository.java
│   └── ...
│
├── entity/                          # JPA Entities
│   ├── User.java
│   ├── Product.java
│   ├── Order.java
│   ├── OrderItem.java
│   ├── Review.java
│   ├── Cart.java
│   └── ...
│
├── dto/                             # Data Transfer Objects
│   ├── UserDTO.java
│   ├── ProductDTO.java
│   ├── OrderDTO.java
│   ├── CartDTO.java
│   └── ...
│
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── CustomException.java
│   ├── ResourceNotFoundException.java
│   └── ...
│
├── config/
│   ├── SecurityConfig.java          # Spring Security
│   ├── CorsConfig.java
│   ├── CacheConfig.java             # Redis
│   ├── OpenAPIConfig.java           # Swagger
│   ├── WebSocketConfig.java         # Chat
│   └── ...
│
├── security/
│   ├── JwtTokenProvider.java
│   ├── CustomUserDetailsService.java
│   ├── JwtAuthenticationFilter.java
│   └── ...
│
├── util/
│   ├── EmailUtil.java
│   ├── ValidationUtil.java
│   ├── PaginationUtil.java
│   └── ...
│
├── mapper/                          # Entity ↔ DTO mapping
│   ├── UserMapper.java
│   ├── ProductMapper.java
│   └── ...
│
└── ShopOnlineApplication.java       # Main entry point

backend/src/main/resources/
├── application.yml                  # Main config
├── application-dev.yml              # Dev config
├── application-prod.yml             # Prod config
└── db/migration/                    # Flyway migrations
    ├── V1__Initial_Schema.sql
    ├── V2__Add_Indexes.sql
    └── ...
```

### Key Design Patterns

#### 1. Service Layer Pattern
```java
@Service
public class ProductService {
    @Autowired
    private ProductRepository repo;
    
    public List<ProductDTO> getAllProducts(int page, int size) {
        // Business logic
    }
}
```

#### 2. DTO Pattern
```java
@Data
public class ProductDTO {
    private Long productId;
    private String productName;
    private BigDecimal price;
    // Only needed fields for API
}
```

#### 3. Repository Pattern
```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
    Page<Product> findByIsActiveTrueAndPriceGreaterThanOrderByCreatedAtDesc(
        BigDecimal price, Pageable pageable);
}
```

---

## Database Architecture

### Connection Pool
```
┌──────────────────────┐
│  HikariCP Pool       │
│  (Default: 10-20)    │
└──────────┬───────────┘
           │
           ├─→ Connection 1 ──→ MySQL Server
           ├─→ Connection 2 ──→ MySQL Server
           └─→ Connection N ──→ MySQL Server
```

### Caching Strategy
```
Application Layer
    │
    ├─ Check Redis Cache
    │   ├─ Cache Hit → Return Data
    │   └─ Cache Miss → Query DB → Cache → Return
    │
    └─ Database Layer (MySQL)
```

---

## Security Architecture

```
┌─────────────────────────────────────┐
│   HTTP Request                      │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│   CORS Filter                       │
│   - Check allowed origins           │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│   JWT Authentication Filter         │
│   - Extract & validate token        │
│   - Set SecurityContext             │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│   Authorization Filter              │
│   - Check user roles/permissions    │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│   Rate Limiter (Bucket4j)          │
│   - Check request quota             │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│   Controller / Service Layer        │
└─────────────────────────────────────┘
```

### Authentication Flow
```
1. User Login
   └─ Credentials → AuthController
                    └─ Verify with DB
                    └─ Generate JWT
                    └─ Return Token

2. Subsequent Requests
   └─ Include Token in Header
      Authorization: Bearer {token}
      └─ JwtAuthenticationFilter
         └─ Parse & Validate
         └─ Set SecurityContext
         └─ Grant Access

3. OAuth2 (Google)
   └─ OAuth2LoginAuthenticationFilter
      └─ Redirect to Google
      └─ Receive code
      └─ Exchange for ID token
      └─ Create/Update user
      └─ Return JWT
```
