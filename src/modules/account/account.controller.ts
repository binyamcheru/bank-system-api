import { Router } from "express";
import AccountService from "./account.service";
import { Authentication } from "../../common/middleware/authentication";
import { Validation } from "../../common/middleware/validation";
import  * as AV from "./account.validation"
const accountRouter =  Router()

/**
 * @swagger
 * /account/create:
 *   post:
 *     tags: [Account]
 *     summary: Create a new bank account for the current user
 *     responses:
 *       200:
 *         description: Account created
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 */
accountRouter.post("/create",Authentication,AccountService.create)

/**
 * @swagger
 * /account/me:
 *   get:
 *     tags: [Account]
 *     summary: Get the current user's account(s)
 *     responses:
 *       200:
 *         description: Account(s) retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 */
accountRouter.get("/me",Authentication,AccountService.getAccount)

/**
 * @swagger
 * /account/status:
 *   get:
 *     tags: [Account]
 *     summary: Get the account statement for a date range
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema: { type: string, example: "2024-01-01" }
 *       - in: query
 *         name: to
 *         required: true
 *         schema: { type: string, example: "2024-12-31" }
 *     responses:
 *       200:
 *         description: Statement retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
accountRouter.get("/status",Authentication,Validation(AV.statusSchema),AccountService.status)

export default accountRouter
