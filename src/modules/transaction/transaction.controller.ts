import { Router } from "express";
import transactionService from "./transaction.service";
import { Validation } from "../../common/middleware/validation";
import * as TV from "./transaction.validation"
import { Authentication } from "../../common/middleware/authentication";

const transactionRouter =  Router()


/**
 * @swagger
 * /transaction/deposit:
 *   patch:
 *     tags: [Transaction]
 *     summary: Deposit money into the current user's account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount: { type: number, minimum: 50 }
 *               cardId: { type: string, description: "Optional, uses default card if omitted" }
 *     responses:
 *       200:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
transactionRouter.patch("/deposit",Authentication,Validation(TV.depositSchema),transactionService.deposit)

/**
 * @swagger
 * /transaction/withdraw:
 *   patch:
 *     tags: [Transaction]
 *     summary: Withdraw money from the current user's account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount: { type: number, minimum: 50 }
 *               cardId: { type: string, description: "Optional, uses default card if omitted" }
 *     responses:
 *       200:
 *         description: Withdrawal successful
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
transactionRouter.patch("/withdraw",Authentication,Validation(TV.withdrawSchema),transactionService.withdraw)

/**
 * @swagger
 * /transaction/transfer:
 *   post:
 *     tags: [Transaction]
 *     summary: Atomic transfer to a beneficiary
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [beneficiaryId, amount]
 *             properties:
 *               beneficiaryId: { type: string }
 *               amount: { type: number, minimum: 50 }
 *               cardId: { type: string, description: "Optional, uses default card if omitted" }
 *     responses:
 *       200:
 *         description: Transfer successful
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
transactionRouter.post("/transfer",Authentication,Validation(TV.transferSchema),transactionService.transfer)

// transaction history
/**
 * @swagger
 * /transaction/my:
 *   get:
 *     tags: [Transaction]
 *     summary: Get the current user's transactions (paginated)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Transactions retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 */
transactionRouter.get("/my",Authentication,transactionService.getAllTransactions)

/**
 * @swagger
 * /transaction/my/summary:
 *   get:
 *     tags: [Transaction]
 *     summary: Get a summary of the current user's transactions
 *     responses:
 *       200:
 *         description: Summary retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 */
transactionRouter.get("/my/summary",Authentication,transactionService.summary)

/**
 * @swagger
 * /transaction/{id}:
 *   get:
 *     tags: [Transaction]
 *     summary: Get a single transaction by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Transaction retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       404: { $ref: "#/components/responses/NotFound" }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
transactionRouter.get("/:id",Authentication,Validation(TV.singleTransactionSchema),transactionService.getSingleTransaction)


export default transactionRouter
  