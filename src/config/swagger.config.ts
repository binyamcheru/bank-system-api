import swaggerJSDoc from "swagger-jsdoc"
import { resolve } from "node:path"
import { PORT } from "./config.service"

const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: "Bank System API",
        version: "1.0.0",
        description: "REST API for user registration, authentication, accounts, credit cards, transactions, beneficiaries and admin management.",
    },
    servers: [
        { url: `http://localhost:${PORT || 3000}`, description: "Local server" },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Send as `Authorization: Bearer <token>` (prefix configurable via PREFIX env var)",
            },
        },
        schemas: {
            SuccessResponse: {
                type: "object",
                properties: {
                    message: { type: "string", example: "Done" },
                    data: { type: "object" },
                },
            },
            ErrorResponse: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    statusCode: { type: "number" },
                    stack: { type: "string" },
                },
            },
            User: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    fullName: { type: "string" },
                    email: { type: "string", format: "email" },
                    role: { type: "string", enum: ["user", "admin"] },
                    status: { type: "string", enum: ["Active", "Block"] },
                    provider: { type: "string", enum: ["System", "Google"] },
                    confirmed: { type: "boolean" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            Account: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    userId: { type: "string" },
                    accountNumber: { type: "string" },
                    balance: { type: "number" },
                    currency: { type: "string", enum: ["EGP", "USD"] },
                    status: { type: "string", enum: ["active", "blocked"] },
                    default: { type: "boolean" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            CreditCard: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    accountId: { type: "string" },
                    bankName: { type: "string" },
                    cardType: { type: "string", enum: ["visa", "mastercard"] },
                    cardNumber: { type: "string" },
                    status: { type: "string", enum: ["active", "blocked"] },
                    default: { type: "boolean" },
                },
            },
            Transaction: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    userId: { type: "string" },
                    accountId: { type: "string" },
                    amount: { type: "number" },
                    balanceBefore: { type: "number" },
                    balanceAfter: { type: "number" },
                    type: { type: "string", enum: ["deposit", "withdrawal", "transfer"] },
                    status: { type: "string", enum: ["pending", "success", "failed"] },
                    createdAt: { type: "string", format: "date-time" },
                },
            },
            Beneficiary: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    userId: { type: "string" },
                    accountNumber: { type: "string" },
                    bankName: { type: "string" },
                    nickName: { type: "string" },
                },
            },
        },
        responses: {
            Unauthorized: {
                description: "Missing/invalid token",
                content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
            },
            NotFound: {
                description: "Resource not found",
                content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
            },
            ValidationError: {
                description: "Request validation failed",
                content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
            },
        },
    },
    security: [{ bearerAuth: [] }],
    tags: [
        { name: "Auth", description: "Registration, login, email confirmation, password reset" },
        { name: "User", description: "Current user profile management" },
        { name: "Account", description: "Bank account management" },
        { name: "Card", description: "Credit card management" },
        { name: "Transaction", description: "Deposits, withdrawals and transfers" },
        { name: "Beneficiary", description: "Saved transfer beneficiaries" },
        { name: "Admin", description: "Admin-only management endpoints" },
    ],
}

// JSDoc comments are read from the .ts sources (they're stripped from compiled dist output).
export const swaggerSpec = swaggerJSDoc({
    definition: swaggerDefinition,
    apis: [
        resolve(process.cwd(), "src/modules/**/*.controller.ts"),
        resolve(process.cwd(), "src/app.controller.ts"),
    ],
})
