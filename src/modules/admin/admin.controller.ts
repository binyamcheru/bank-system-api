import { Router } from "express";
import { Authentication } from "../../common/middleware/authentication";
import { Authorization } from "../../common/middleware/authorization";
import { RoleEnum } from "../../common/enum/user.enum";
import adminService from "./admin.service";
import { Validation } from "../../common/middleware/validation";
import * as AV from "./admin.validation"
const adminRouter = Router()

adminRouter.use(Authentication,
    Authorization(RoleEnum.ADMIN)
)


// user
/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: Get all users (paginated)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Users retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 */
adminRouter.get("/users",Validation(AV.getAllUsersSchema),adminService.getAllUsers)

/**
 * @swagger
 * /admin/user/{userId}:
 *   get:
 *     tags: [Admin]
 *     summary: Get a single user by id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 *       409: { description: User not found }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
adminRouter.get("/user/:userId",Validation(AV.getUserSchema),adminService.getUser)

/**
 * @swagger
 * /admin/user/{userId}/block:
 *   patch:
 *     tags: [Admin]
 *     summary: Block a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: User blocked successfully }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 *       409: { description: User not found }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
adminRouter.patch("/user/:userId/block",Validation(AV.blockUserSchema),adminService.blockUser)

/**
 * @swagger
 * /admin/user/{userId}/unBlock:
 *   patch:
 *     tags: [Admin]
 *     summary: Unblock a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: User activated successfully }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 *       409: { description: User not found }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
adminRouter.patch("/user/:userId/unBlock",Validation(AV.unBlockUserSchema),adminService.UnblockUser)

/**
 * @swagger
 * /admin/user/{userId}/delete:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: User deleted successfully }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 *       409: { description: User not found }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
adminRouter.delete("/user/:userId/delete",Validation(AV.deleteUserSchema),adminService.deleteUser)

// account
/**
 * @swagger
 * /admin/accounts:
 *   get:
 *     tags: [Admin]
 *     summary: Get all bank accounts (paginated)
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         required: true
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Accounts retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
adminRouter.get("/accounts",Validation(AV.getAllAccountsSchema),adminService.getAllAccounts)

/**
 * @swagger
 * /admin/accounts/{accountId}/block:
 *   patch:
 *     tags: [Admin]
 *     summary: Block a bank account
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Account blocked successfully }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 *       409: { description: Account not found }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
adminRouter.patch("/accounts/:accountId/block",Validation(AV.blockAccountsSchema),adminService.blockAccount)

/**
 * @swagger
 * /admin/accounts/{accountId}/unBlock:
 *   patch:
 *     tags: [Admin]
 *     summary: Unblock a bank account
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Account activated successfully }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 *       409: { description: Account not found }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
adminRouter.patch("/accounts/:accountId/unBlock",Validation(AV.unBlockAccountsSchema),adminService.unBlockAccount)

//card
/**
 * @swagger
 * /admin/cards:
 *   get:
 *     tags: [Admin]
 *     summary: Get all credit cards (paginated)
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         required: true
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Cards retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
adminRouter.get("/cards",Validation(AV.getAllCardsSchema),adminService.getAllCards)

/**
 * @swagger
 * /admin/cards/{cardId}/block:
 *   patch:
 *     tags: [Admin]
 *     summary: Block a credit card
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Card blocked successfully }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 *       409: { description: Card not found }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
adminRouter.patch("/cards/:cardId/block",Validation(AV.blockCardSchema),adminService.blockCard)

// transaction
/**
 * @swagger
 * /admin/transaction:
 *   get:
 *     tags: [Admin]
 *     summary: Get all transactions (paginated)
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         required: true
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Transactions retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
adminRouter.get("/transaction",Validation(AV.getAllTransactionSchema),adminService.getAllTransaction)

// DashBoard
/**
 * @swagger
 * /admin/dashBoard:
 *   get:
 *     tags: [Admin]
 *     summary: Get aggregate dashboard stats (users, accounts, cards, transactions, total volume)
 *     responses:
 *       200:
 *         description: Dashboard data retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       403: { description: Requires admin role }
 */
adminRouter.get("/dashBoard",adminService.Dashboard)

export default adminRouter