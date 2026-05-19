# Portfolio Backend API

A scalable backend service powering a personal fullstack developer portfolio with secure admin content management.

This backend is designed as a **content management API** rather than a static portfolio data source, enabling dynamic portfolio updates through authenticated admin operations while exposing optimized public endpoints for frontend consumption.

---

## Overview

This backend provides:

- Public portfolio data delivery
- Secure admin authentication
- Protected content management APIs
- Modular domain-based architecture
- MongoDB-based persistence
- JWT-based authorization
- Password hashing for admin security

The system follows a clean separation between:

- **Public read APIs**
- **Protected admin write APIs**

This allows the frontend portfolio to consume a single optimized endpoint while the admin dashboard manages all content independently.

---

## Core Features

### Public Portfolio Access
Expose portfolio data for frontend rendering through a consolidated API layer.

Supports:

- profile details
- skills
- education
- projects
- contact information

Optimized for fast frontend rendering.

---

### Admin Authentication
Secure admin-only access using:

- email/password authentication
- bcrypt password hashing
- JWT session tokens
- protected route authorization

Since the platform is intended for a single administrator, the authentication system is simplified while maintaining production-grade security patterns.

---

### Content Management
Authenticated admin routes allow management of:

- profile details
- technical skills
- education history
- project portfolio
- contact information

Supports full CRUD workflows for content management.

---

## Architecture Philosophy

This backend is structured as a **modular service-based API**.

Principles followed:

- separation of concerns
- service-layer abstraction
- domain-driven modular organization
- secure middleware-based authorization
- frontend-ready API responses

Instead of exposing raw database collections directly, the architecture focuses on delivering meaningful API contracts.

---

## Tech Stack

**Runtime**
- Node.js

**Framework**
- Express.js

**Database**
- MongoDB

**ODM**
- Mongoose

**Authentication**
- JWT (JSON Web Tokens)

**Security**
- bcrypt

**Environment Management**
- dotenv

---

## Project Structure

```bash
src/
│
├── config/
│   └── Database and application configuration
│
├── middleware/
│   └── Authentication and authorization middleware
│
├── modules/
│   │
│   ├── admin/
│   │   ├── model/
│   │   ├── routes/
│   │   └── service/
│   │
│   ├── portfolio/
│   │   ├── routes/
│   │   └── service/
│   │
│   ├── user/
│   │   ├── model/
│   │   ├── routes/
│   │   └── service/
│   │
│   ├── skills/
│   │   ├── model/
│   │   ├── routes/
│   │   └── service/
│   │
│   ├── education/
│   │   ├── model/
│   │   ├── routes/
│   │   └── service/
│   │
│   ├── projects/
│   │   ├── model/
│   │   ├── routes/
│   │   └── service/
│   │
│   └── contacts/
│       ├── model/
│       ├── routes/
│       └── service/
│
├── app.js
└── server.js
```

---

## Directory Explanation

### config/
Contains application-level configuration logic.

Examples:
- database connection setup
- environment initialization
- application constants

---

### middleware/
Contains reusable request processing logic.

Responsibilities:
- JWT authentication validation
- access control
- request authorization

Ensures protected APIs remain inaccessible to unauthorized users.

---

### modules/
Core application business domains.

Each module follows:

```bash
model/
routes/
service/
```

This keeps business logic isolated and maintainable.

---

### model/
Database schema definitions.

Responsible for:
- data structure definition
- validation rules
- schema relationships

---

### routes/
API endpoint declarations.

Responsible for:
- request handling
- endpoint mapping
- middleware chaining
- response delegation

---

### service/
Business logic layer.

Responsible for:
- database operations
- authentication workflows
- validation orchestration
- API response shaping

This keeps routes lightweight and maintainable.

---

### app.js
Application bootstrap layer.

Responsible for:
- middleware registration
- route mounting
- public/private route segregation

---

### server.js
Application entry point.

Responsible for:
- server initialization
- database connection startup
- environment bootstrapping

---

## Security Model

Authentication strategy includes:

### Password Security
Admin credentials are securely hashed before persistence.

Provides protection against:
- plaintext password leaks
- credential exposure
- basic database compromise risks

---

### JWT Authorization
Protected APIs require valid JWT tokens.

Used for:

- admin dashboard access
- protected CRUD operations
- authenticated session validation

---

### Role Protection
Admin-only routes are isolated from public APIs.

Prevents unauthorized access to content management endpoints.

---

## API Design Approach

### Public Layer
Read-only optimized endpoints for frontend portfolio rendering.

Purpose:
- fast content delivery
- frontend simplicity
- minimal request complexity

---

### Admin Layer
Authenticated write-access APIs for dashboard operations.

Purpose:
- secure content management
- content updates
- controlled administrative actions

---

## Current Capabilities

Implemented:

✅ Portfolio data aggregation  
✅ Admin login authentication  
✅ JWT-protected admin access  
✅ Password hashing  
✅ Skills management  
✅ Education management  
✅ Project management  
✅ Contact management  
✅ Profile management  
✅ Password change workflow  

---

## Environment Variables

Required environment configuration:

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

---

## Running the Project

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run production:

```bash
npm start
```

---

## Future Improvements

### Refresh Token Authentication
Current JWT sessions rely on expiration windows.

Future upgrade:
- access tokens
- refresh tokens
- token rotation

Improves security significantly.

---

### Rate Limiting
Protect authentication routes against abuse.

Potential additions:
- login throttling
- brute force protection
- request limiting

Suggested tools:
- express-rate-limit

---

### Input Validation Layer
Introduce centralized request validation.

Benefits:
- cleaner controllers
- safer payload handling
- stronger API consistency

Suggested:
- Joi
- Zod
- express-validator

---

### File Upload Management
Current architecture can evolve to support media assets.

Examples:
- resume uploads
- project images
- skill icons

Suggested:
- Multer
- Cloudinary
- AWS S3

---

### Logging & Monitoring
Improve observability.

Potential additions:
- request logs
- error tracking
- audit logs

Suggested:
- Winston
- Morgan
- Sentry

---

### Admin Profile Management
Expand admin capabilities:

- update profile info
- username management
- email change workflows

---

### Role-Based Access Control
Current implementation assumes a single admin.

Future scaling:
- editor roles
- admin roles
- granular permissions

---

### API Documentation
Improve developer usability.

Suggested:
- Swagger/OpenAPI
- Postman collections

---

### Testing Suite
Add test coverage.

Tools:
- unit tests
- integration tests
- API endpoint testing

---

### Caching Layer
Optimize repeated portfolio reads.

Suggested:
- Redis caching

Useful if traffic increases.

---

### Deployment Enhancements
Production readiness upgrades:

- Docker containerization
- CI/CD pipelines
- environment staging
- health checks

---

## Long-Term Vision

This backend can evolve from a portfolio API into a lightweight personal CMS platform supporting:

- dynamic content publishing
- multi-admin management
- media asset workflows
- analytics integrations
- project showcase automation

---

## License

Personal project / portfolio backend.