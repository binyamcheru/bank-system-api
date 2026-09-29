import { Router } from "express";
import { Validation } from "../../common/middleware/validation";
import * as UV  from "./auth.validation";
import authService from "./auth.service";
import { Authentication } from "../../common/middleware/authentication";
const authRouter = Router({strict:true})


/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, password]
 *             properties:
 *               fullName: { type: string, minLength: 3, maxLength: 25, example: "John Doe" }
 *               email: { type: string, format: email, example: "john@example.com" }
 *               password: { type: string, format: password, example: "Passw0rd!" }
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       409: { description: User already exists, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
authRouter.post("/register",Validation(UV.signupSchema),authService.signUP)

/**
 * @swagger
 * /auth/signup/gmail:
 *   post:
 *     tags: [Auth]
 *     summary: Sign up or sign in using a Google ID token
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [idToken]
 *             properties:
 *               idToken: { type: string, description: "Google Sign-In ID token" }
 *     responses:
 *       200:
 *         description: Sign in successful, returns an access token
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       409: { description: Existing system-provider account with this email }
 */
authRouter.post("/signup/gmail",authService.SignUpWithGmail)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       200:
 *         description: User logged in successfully, returns access_token and refresh_token
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { description: Invalid password }
 *       404: { description: User not found or not confirmed }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
authRouter.post("/login",Validation(UV.signinSchema),authService.signIN)

/**
 * @swagger
 * /auth/confirm-email:
 *   post:
 *     tags: [Auth]
 *     summary: Confirm email using the OTP sent at registration
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, code]
 *             properties:
 *               email: { type: string, format: email }
 *               code: { type: string, minLength: 6, maxLength: 6, example: "123456" }
 *     responses:
 *       200: { description: Email confirmed successfully }
 *       409: { description: OTP expired, invalid, or user not found }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
authRouter.post("/confirm-email",Validation(UV.confirmEmailSchema),authService.confirmEmail)

/**
 * @swagger
 * /auth/resend-otp:
 *   post:
 *     tags: [Auth]
 *     summary: Resend the email confirmation OTP
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: OTP sent }
 *       409: { description: User does not exist or is already confirmed }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
authRouter.post("/resend-otp",Validation(UV.resendOtpSchema),authService.resendOtp)

/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     tags: [Auth]
 *     summary: Request an OTP to reset a forgotten password
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: OTP sent }
 *       409: { description: User not found }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
authRouter.post("/forget-password",Validation(UV.forgetPasswordSchema),authService.forgetPassword)

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password using the OTP from forget-password
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, code, nPassword]
 *             properties:
 *               email: { type: string, format: email }
 *               code: { type: string, example: "123456" }
 *               nPassword: { type: string, format: password }
 *     responses:
 *       200: { description: Password reset successfully }
 *       409: { description: OTP expired, invalid, or user not found }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
authRouter.post("/reset-password",Validation(UV.resetPasswordSchema),authService.resetPassword)

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     tags: [Auth]
 *     summary: Get a new access token using a refresh token
 *     security:
 *       - bearerAuth: []
 *     description: Send the refresh token in the Authorization header instead of an access token.
 *     responses:
 *       200: { description: New access token issued }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 */
authRouter.post("/refresh-token",authService.refreshToken)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout current device, or all devices with ?flag=All
 *     parameters:
 *       - in: query
 *         name: flag
 *         schema: { type: string, enum: [All] }
 *         required: false
 *         description: Pass "All" to revoke all refresh tokens for the user
 *     responses:
 *       200: { description: Logged out successfully }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 */
authRouter.post("/logout",Authentication,authService.logOut)



export default authRouter 