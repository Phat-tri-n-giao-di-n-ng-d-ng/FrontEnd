# 📋 Configuration Guide

## Environment Variables

### Backend Configuration

Create file: `backend/src/main/resources/application-local.yml`

```yaml
spring:
  application:
    name: shop-online
  
  # Database
  datasource:
    url: jdbc:mysql://localhost:3306/shoplaptop?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
    username: root
    password: your_mysql_password
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000

  # JPA/Hibernate
  jpa:
    hibernate:
      ddl-auto: validate  # Options: validate, update, create, create-drop
    show-sql: false
    properties:
      hibernate:
        format_sql: true
        use_sql_comments: true
        jdbc:
          batch_size: 20
          fetch_size: 50
        order_inserts: true
        order_updates: true

  # Redis Cache
  redis:
    host: localhost
    port: 6379
    password: 
    database: 0
    timeout: 2000
    jedis:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0

  # JWT Token
  jwt:
    secret: your_super_secret_key_min_32_characters_long_here
    expiration: 86400000  # 24 hours in milliseconds
    refresh-token-expiration: 604800000  # 7 days

  # OAuth2 Google
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: your_google_client_id.apps.googleusercontent.com
            client-secret: your_google_client_secret
            scope: openid, email, profile

  # Email Configuration (Gmail)
  mail:
    host: smtp.gmail.com
    port: 587
    username: your_email@gmail.com
    password: your_app_specific_password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
            required: true
          connectiontimeout: 5000
          timeout: 5000
          writetimeout: 5000

  # OpenAI Configuration
  ai:
    openai:
      api-key: sk-your_openai_api_key_here
      model: gpt-3.5-turbo

# Server Configuration
server:
  port: 8080
  servlet:
    context-path: /api
  compression:
    enabled: true
    mime-types: application/json,application/xml,text/html,text/xml,text/plain

# Logging
logging:
  level:
    root: INFO
    com.iuh.fit: DEBUG
    org.springframework.web: DEBUG
    org.hibernate.SQL: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %logger{36} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/application.log
    max-size: 10MB
    max-history: 10

# Bucket4j Rate Limiting
bucket4j:
  enabled: true
  filters:
    - cache-name: buckets
      url-patterns:
        - /api/**
      http-response-body: '{"status":429,"error":"Too many requests"}'
      metrics:
        tags:
          - key: method
            value: method
          - key: status
            value: status

# Actuator (Health checks)
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized

# Swagger/OpenAPI
springdoc:
  api-docs:
    path: /v3/api-docs
  swagger-ui:
    path: /swagger-ui.html
    enabled: true
    urls:
      - name: ShopLaptop API
        url: /v3/api-docs
```

### Frontend Configuration

Create file: `frontend/.env.local`

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WEBSOCKET_URL=ws://localhost:8080

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Maps API
VITE_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_token_here

# Features
VITE_ENABLE_CHAT=true
VITE_ENABLE_APPOINTMENTS=true
VITE_ENABLE_AI_SUPPORT=true

# Analytics (optional)
VITE_GA_TRACKING_ID=G-your_google_analytics_id

# App Info
VITE_APP_NAME=ShopLaptop
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Online PC Sales Platform
```

Create file: `frontend/.env.production`

```env
VITE_API_BASE_URL=https://api.shoplaptop.com
VITE_WEBSOCKET_URL=wss://api.shoplaptop.com
VITE_GOOGLE_CLIENT_ID=your_production_google_client_id.apps.googleusercontent.com
VITE_MAPBOX_ACCESS_TOKEN=pk.your_production_mapbox_token
VITE_ENABLE_CHAT=true
VITE_ENABLE_APPOINTMENTS=true
VITE_ENABLE_AI_SUPPORT=true
VITE_GA_TRACKING_ID=G-your_production_ga_id
```

### Create MySQL Database

```sql
-- Connect to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE shoplaptop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user for application
CREATE USER 'shoplaptop'@'localhost' IDENTIFIED BY 'secure_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON shoplaptop.* TO 'shoplaptop'@'localhost';
FLUSH PRIVILEGES;

-- Exit
EXIT;
```

---

## Development Environment Setup

### Prerequisites
- Java 21 JDK
- Maven 3.8+
- Node.js 18+
- MySQL 8.0+
- Redis 6.0+ (optional but recommended)

### Step-by-Step Setup

#### 1. Clone & Navigate
```bash
git clone https://github.com/yourusername/ShopLaptop.git
cd ShopLaptop
```

#### 2. Backend Setup

```bash
cd backend

# Copy example config
cp src/main/resources/application.yml src/main/resources/application-local.yml

# Edit configuration
# Edit file: src/main/resources/application-local.yml
# Set your MySQL password, JWT secret, OAuth2 credentials, etc.

# Install dependencies & build
mvn clean install

# Run migrations
mvn flyway:migrate -Dspring.profiles.active=local

# Start development server
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=local"

# Backend will be available at: http://localhost:8080/api
# Swagger UI: http://localhost:8080/api/swagger-ui.html
```

#### 3. Frontend Setup

```bash
cd frontend

# Create .env.local
cp .env.example .env.local

# Edit configuration
# Edit file: .env.local
# Set your API URL and API keys

# Install dependencies
npm install

# Start dev server
npm run dev

# Frontend will be available at: http://localhost:5173
```

#### 4. Verify Installation

Open browser and check:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api/health
- Swagger UI: http://localhost:8080/api/swagger-ui.html

---

## IDE Configuration

### VSCode (Frontend)

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsx]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["javascript", "javascriptreact"],
  "eslint.format.enable": true
}
```

Recommended Extensions:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Thunder Client (or REST Client)

### IntelliJ IDEA (Backend)

1. **Import Project**
   - File → Open → select `pom.xml`
   - Choose "Open as Project"

2. **Configure JDK**
   - File → Project Structure
   - Set Project SDK to Java 21

3. **Run Configuration**
   - Run → Edit Configurations
   - Add Spring Boot Application
   - Main class: `iuh.fit.ShopOnlineApplication`
   - VM options: `-Dspring.profiles.active=local`

4. **Enable Annotation Processing**
   - File → Settings → Build → Compiler → Annotation Processors
   - Enable annotation processing

---

## Database Migrations

### Flyway Configuration

Location: `backend/src/main/resources/db/migration/`

Convention: `V{version}__{description}.sql`

Example migrations:
```bash
V1__Initial_Schema.sql
V2__Add_Users_Table.sql
V3__Add_Products_Table.sql
V4__Add_Orders_Table.sql
V5__Add_Indexes.sql
V6__Add_Discount_Tables.sql
```

### Running Migrations

```bash
# Automatic on application startup
mvn spring-boot:run

# Manual execution
mvn flyway:migrate -Dspring.profiles.active=local

# Validate migrations
mvn flyway:validate

# Info about migrations
mvn flyway:info

# Undo last migration (Enterprise only)
mvn flyway:undo
```

---

## Git Configuration

Create `.gitignore`:
```
# IDE
.idea/
.vscode/
*.swp
*.swo
*~

# Build
target/
dist/
node_modules/
.nuxt/

# Environment
.env
.env.local
.env.*.local

# Logs
logs/
*.log

# OS
.DS_Store
Thumbs.db

# Secrets
private_keys/
secrets/
```

---

## Code Quality Tools

### Frontend - ESLint

Run eslint:
```bash
npm run lint
npm run lint -- --fix
```

### Frontend - Prettier

Format code:
```bash
npx prettier --write "src/**/*.{js,jsx,css}"
```

### Backend - Checkstyle

Add to `pom.xml`:
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-checkstyle-plugin</artifactId>
    <version>3.3.0</version>
    <configuration>
        <configLocation>checkstyle.xml</configLocation>
    </configuration>
</plugin>
```

Run:
```bash
mvn checkstyle:check
```

---

## Testing

### Backend Unit Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=ProductServiceTest

# Run with coverage
mvn test jacoco:report
```

### Backend Integration Tests

```bash
# Run integration tests
mvn verify

# With specific profile
mvn verify -Dspring.profiles.active=test
```

### Frontend Tests

Setup Jest & React Testing Library:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test

# Run with coverage
npm run test -- --coverage
```

---

## Debugging

### Backend Debugging

1. **Set breakpoint** in IntelliJ IDEA
2. **Run in debug mode**:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005"
   ```
3. Click debug button in IDE

### Frontend Debugging

1. **Open DevTools**: F12 or Ctrl+Shift+I
2. **React DevTools**: Install browser extension
3. **Redux DevTools**: Install browser extension
4. Use `console.log()` or debugger breakpoints

---

## Performance Tuning

### Backend Optimization

```yaml
spring:
  jpa:
    properties:
      hibernate:
        jdbc:
          batch_size: 25
          fetch_size: 50
        order_inserts: true
        order_updates: true
  redis:
    jedis:
      pool:
        max-active: 16
```

### Frontend Optimization

1. **Code Splitting**:
   ```javascript
   const ProductList = lazy(() => import('./ProductList'));
   ```

2. **Image Optimization**:
   - Use WebP format
   - Lazy load images
   - Optimize for mobile

3. **Bundle Analysis**:
   ```bash
   npm install --save-dev rollup-plugin-visualizer
   ```

---

## Troubleshooting

### Common Issues

**1. Port already in use**
```bash
# Windows - Find process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux
lsof -i :8080
kill -9 <PID>
```

**2. MySQL connection refused**
```bash
# Check if MySQL is running
mysqld --version

# Start MySQL service
net start MySQL80  # Windows
brew services start mysql  # macOS
sudo systemctl start mysql  # Linux
```

**3. Redis connection refused**
```bash
# Start Redis
redis-server

# Or use Docker
docker run -d -p 6379:6379 redis:latest
```

**4. JWT Secret not set**
Generate a secure secret:
```bash
echo $(openssl rand -base64 32)
```

**5. Node modules issues**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## Production Configuration

See [DEPLOYMENT.md](DEPLOYMENT.md) for production environment setup.
