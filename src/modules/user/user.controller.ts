import { Router } from "express";
import { Authentication } from "../../common/middleware/authentication";
import { Validation } from "../../common/middleware/validation";
import userService from "./user.service";
import  * as UV from "./user.validation"

const userRouter = Router()
 

/**
 * @swagger
 * /user/me:
 *   get:
 *     tags: [User]
 *     summary: Get the current user's profile
 *     responses:
 *       200:
 *         description: User profile retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 */
userRouter.get("/me",Authentication,userService.getUser)

/**
 * @swagger
 * /user/me/accounts:
 *   get:
 *     tags: [User]
 *     summary: Get the current user's accounts with linked cards
 *     responses:
 *       200:
 *         description: Accounts retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 */
userRouter.get("/me/accounts",Authentication,userService.getAllAccounts)

/**
 * @swagger
 * /user/update-info:
 *   patch:
 *     tags: [User]
 *     summary: Update the current user's full name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName]
 *             properties:
 *               fullName: { type: string, minLength: 3, maxLength: 20 }
 *     responses:
 *       200: { description: Info updated }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
userRouter.patch("/update-info",Authentication,Validation(UV.updateInfoSchema),userService.updateInfo)

/**
 * @swagger
 * /user/update-password:
 *   patch:
 *     tags: [User]
 *     summary: Change the current user's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password, nPassword, cPassword]
 *             properties:
 *               password: { type: string, format: password, description: "Current password" }
 *               nPassword: { type: string, format: password, description: "New password" }
 *               cPassword: { type: string, format: password, description: "Confirm new password" }
 *     responses:
 *       200: { description: Password updated }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
userRouter.patch("/update-password",Authentication,Validation(UV.updatePasswordSchema),userService.updatePassword)

/**
 * @swagger
 * /user/me:
 *   delete:
 *     tags: [User]
 *     summary: Delete the current user's account (requires zero balance)
 *     responses:
 *       200: { description: User deleted }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 */
userRouter.delete("/me",Authentication,userService.deleteUser)



export default userRouter