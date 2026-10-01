# 🏦 Bank System API

A production-grade RESTful banking API built with **Node.js**, **TypeScript**, **Express 5**, and **MongoDB**. Supports user registration with email OTP verification, Google sign-in, JWT authentication with refresh tokens, bank account management, credit cards, deposits/withdrawals, atomic transfers, beneficiaries, an admin panel, and interactive Swagger API docs.

🔗 **Live API docs:** [bank-system-api-nm3l.onrender.com/api-docs](https://bank-system-api-nm3l.onrender.com/api-docs/)
> Hosted on Render's free tier — the instance spins down after inactivity, so the first request may take ~30-60s to wake it up.

---

## 📸 Screenshots

Swagger UI (`/api-docs`) showing the full API surface:

| Auth & root | User / Account / Card | Beneficiary & Admin |
|---|---|---|
| ![Swagger - Auth](./screenshots/Screenshot%20From%202026-10-01%2008-18-25.png) | ![Swagger - User/Account/Card](./screenshots/Screenshot%20From%202026-10-01%2008-18-32.png) | ![Swagger - Beneficiary/Admin](./screenshots/Screenshot%20From%202026-10-01%2008-18-38.png) |


---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express 5
- **Database:** MongoDB + Mongoose
- **Cache:** Redis (Upstash)
- **Authentication:** JWT (Access Token + Refresh Token) & Google OAuth
- **Validation:** Zod
- **Security:** bcrypt, helmet, cors, express-rate-limit, express-mongo-sanitize
- **Docs:** Swagger / OpenAPI (swagger-jsdoc + swagger-ui-express)

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Redis](https://upstash.com/) (Upstash or local)
- npm

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/binyamcheru/bank-system-api.git
cd bank-system-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.development` file in the project root (see [Environment Variables](#-environment-variables) below) and a `.env.production` for production.

### 4. Run the project

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

The server starts on the port defined in your `.env` file (default `3000`).

---

## 🔐 Environment Variables

| Variable               | Description                              | Example                          |
|-------------------------|-------------------------------------------|-----------------------------------|
| `PORT`                  | Port the server runs on                  | `3000`                            |
| `LOCAL_URI_DB`          | MongoDB local connection string          | `mongodb://localhost:27017/bank`  |
| `DB_URI_ONLINE`         | MongoDB Atlas connection string          | `mongodb+srv://...`               |
| `SALT_ROUNDS`           | bcrypt salt rounds                       | `12`                              |
| `ACCESS_TOKEN_KEY`      | Secret key for signing access tokens     | `your_strong_secret`              |
| `ACCESS_TOKEN_EXPIRY`   | Access token lifetime                     | `1h`                              |
| `REFRESH_TOKEN_KEY`     | Secret key for signing refresh tokens    | `your_strong_secret`              |
| `REFRESH_TOKEN_EXPIRY`  | Refresh token lifetime                    | `7d`                              |
| `PREFIX`                | Authorization header prefix              | `Bearer`                          |
| `REDIS_URL`             | Redis connection string                  | `rediss://...`                    |
| `WHITE_LIST`            | Allowed CORS origins (comma-separated)   | `http://localhost:5173`           |
| `EMAIL`                 | Sender email for OTP/notifications       | `your@email.com`                  |
| `PASSWORD`              | Email app password                       | `your_app_password`               |
| `CLIENT_ID`             | Google OAuth client ID                   | `xxx.apps.googleusercontent.com`  |

> ⚠️ Never commit your real `.env` files to version control.

---

## 📖 API Documentation

Interactive Swagger docs are served once the app is running:

- **Swagger UI:** `GET /api-docs` ([live demo](https://bank-system-api-nm3l.onrender.com/api-docs/))
- **OpenAPI JSON:** `GET /api-docs.json`

### Postman Collection

Import [`Bank System.postman_collection.json`](./Bank%20System.postman_collection.json) directly into Postman (File → Import) to get every endpoint ready to run. The collection ships with its own variables (`local_host`, `prefix`, `access_token`, `refresh_token`) — no separate environment needed, and `log in` auto-fills the tokens for every other request.

The collection is organized into one folder per module, mirroring the route structure:

```
Bank System/
├── Auth/                 # register, signup/gmail, login, confirm-email,
│                         # resend-otp, forget-password, reset-password,
│                         # refresh-token, logout
├── user/                 # get profile, get accounts, update-info,
│                         # update-password, delete account
├── account/              # create, get, status (statement)
├── card/                 # add, get all, set default, delete
├── transaction/          # deposit, withdraw, transfer, my, my/summary,
│                         # get by id
├── Beneficiary/          # add, get all, delete
└── Admin/
    ├── user/             # list, get, block, unblock, delete
    ├── account/          # list, block, unblock
    ├── cards/            # list, block
    ├── transaction/      # list
    └── dashBoard/        # stats
```

Each folder's requests run in the order shown above, and `log in` auto-saves `access_token` / `refresh_token` into the Postman environment so subsequent requests in the collection stay authenticated.

---

## 📁 Project Structure

```
src/
├── index.ts                        # Entry point
├── app.controller.ts               # Express setup, middleware, routes
├── config/
│   ├── config.service.ts           # Environment variables
│   └── swagger.config.ts           # Swagger/OpenAPI spec
├── DB/
│   ├── connectionDB.ts             # MongoDB connection
│   └── model/                      # Mongoose models
│       ├── user.model.ts
│       ├── bankAccount.model.ts
│       ├── creditCard.model.ts
│       ├── transaction.model.ts
│       └── beneficiary.model.ts
├── common/
│   ├── enum/                       # Shared enums (roles, statuses, types...)
│   ├── middleware/
│   │   ├── authentication.ts       # JWT verification + Redis token revocation
│   │   ├── authorization.ts        # Role-based access control
│   │   └── validation.ts           # Zod validation
│   ├── service/
│   │   └── redis.service.ts        # Redis cache service
│   └── utils/
│       ├── success.Responsive.ts
│       ├── error.global.handler.ts
│       ├── email/                  # OTP email templates & sending
│       └── security/
│           ├── hash.security.ts    # bcrypt hash & compare
│           └── token.service.ts    # JWT sign & verify
├── modules/
│   ├── auth/
│   ├── user/
│   ├── account/
│   ├── card/
│   ├── transaction/
│   ├── beneficiary/
│   └── admin/
└── repositories/
    └── base.repository.ts          # Generic CRUD operations
```

---

## 📡 API Endpoints

### Auth — `/auth`

| Method | Endpoint               | Description                        | Auth |
|--------|------------------------|-------------------------------------|------|
| POST   | `/auth/register`       | Register a new user                | ❌   |
| POST   | `/auth/signup/gmail`   | Sign up / sign in with Google       | ❌   |
| POST   | `/auth/login`          | Login & get access + refresh token | ❌   |
| POST   | `/auth/confirm-email`  | Confirm email using OTP             | ❌   |
| POST   | `/auth/resend-otp`     | Resend the email confirmation OTP   | ❌   |
| POST   | `/auth/forget-password`| Request an OTP to reset password    | ❌   |
| POST   | `/auth/reset-password` | Reset password using OTP            | ❌   |
| POST   | `/auth/refresh-token`  | Get new access token               | 🔄   |
| POST   | `/auth/logout`         | Logout (current or all devices)    | ✅   |

> 🔄 = requires Refresh Token in Authorization header
>
> **Logout all devices:** `POST /auth/logout?flag=All`

### User — `/user`

| Method | Endpoint                 | Description                     | Auth |
|--------|--------------------------|-----------------------------------|------|
| GET    | `/user/me`               | Get current user profile        | ✅   |
| GET    | `/user/me/accounts`      | Get accounts with linked cards  | ✅   |
| PATCH  | `/user/update-info`      | Update full name                | ✅   |
| PATCH  | `/user/update-password`  | Change password                 | ✅   |
| DELETE | `/user/me`               | Delete account (zero balance)   | ✅   |

### Account — `/account`

| Method | Endpoint          | Description                         | Auth |
|--------|-------------------|---------------------------------------|------|
| POST   | `/account/create` | Create a bank account               | ✅   |
| GET    | `/account/me`     | Get current user's account(s)       | ✅   |
| GET    | `/account/status` | Get account statement by date range | ✅   |

**Query params for `/account/status`:**
```
?from=2024-01-01&to=2024-12-31
```

### Credit Cards — `/card`

| Method | Endpoint                       | Description                      | Auth |
|--------|---------------------------------|-----------------------------------|------|
| POST   | `/card/AddCard`                | Add a new credit card            | ✅   |
| GET    | `/card/getAllCards`            | Get all user's cards             | ✅   |
| PATCH  | `/card/setDefaultCard/:cardId` | Set card as default              | ✅   |
| DELETE | `/card/deleteCard/:cardId`     | Delete card and linked account   | ✅   |

### Transactions — `/transaction`

| Method | Endpoint                  | Description                     | Auth |
|--------|----------------------------|------------------------------------|------|
| PATCH  | `/transaction/deposit`    | Deposit money                   | ✅   |
| PATCH  | `/transaction/withdraw`   | Withdraw money                  | ✅   |
| POST   | `/transaction/transfer`   | Atomic transfer to beneficiary  | ✅   |
| GET    | `/transaction/my`         | Get my transactions (paginated) | ✅   |
| GET    | `/transaction/my/summary` | Get transactions summary        | ✅   |
| GET    | `/transaction/:id`        | Get single transaction          | ✅   |

**Query params for `/transaction/my`:**
```
?page=1&limit=10
```

### Beneficiary — `/beneficiary`

| Method | Endpoint                              | Description              | Auth |
|--------|-----------------------------------------|-----------------------------|------|
| POST   | `/beneficiary/addBeneficiary`          | Add a new beneficiary    | ✅   |
| GET    | `/beneficiary/getAllBeneficiary`       | Get all beneficiaries    | ✅   |
| DELETE | `/beneficiary/deleteBeneficiary/:id`   | Delete a beneficiary     | ✅   |

### Admin — `/admin` 🔒 (requires `ADMIN` role)

| Method | Endpoint                          | Description                  | Auth |
|--------|-------------------------------------|---------------------------------|------|
| GET    | `/admin/users`                    | Get all users (paginated)    | ✅   |
| GET    | `/admin/user/:userId`             | Get a single user            | ✅   |
| PATCH  | `/admin/user/:userId/block`       | Block a user                 | ✅   |
| PATCH  | `/admin/user/:userId/unBlock`     | Unblock a user                | ✅   |
| DELETE | `/admin/user/:userId/delete`      | Delete a user                 | ✅   |
| GET    | `/admin/accounts`                 | Get all accounts             | ✅   |
| PATCH  | `/admin/accounts/:accountId/block`| Block an account             | ✅   |
| PATCH  | `/admin/accounts/:accountId/unBlock`| Unblock an account          | ✅   |
| GET    | `/admin/cards`                    | Get all credit cards         | ✅   |
| PATCH  | `/admin/cards/:cardId/block`      | Block a credit card          | ✅   |
| GET    | `/admin/transaction`              | Get all transactions         | ✅   |
| GET    | `/admin/dashBoard`                | Admin dashboard stats         | ✅   |

---

## 🛡️ Security

- Passwords hashed with **bcrypt**
- **JWT** access + refresh tokens, with revocation tracked in Redis
- **helmet** for secure HTTP headers
- **express-rate-limit** to throttle abusive requests
- **express-mongo-sanitize** to strip NoSQL injection operators from `body`/`params`/`query`
- **CORS** allow-list via `WHITE_LIST`
- Request validation with **Zod** on every route that accepts input

---

## 📄 License

ISC
