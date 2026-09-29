import { Router } from "express";
import BeneficiaryService from "./beneficiary.service";
import { Authentication } from "../../common/middleware/authentication";
import { Validation } from "../../common/middleware/validation";
import * as BV from "./beneficiary.validation"

const beneficiaryRouter = Router();


/**
 * @swagger
 * /beneficiary/addBeneficiary:
 *   post:
 *     tags: [Beneficiary]
 *     summary: Add a new beneficiary for transfers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [accountNumber, bankName, nickName]
 *             properties:
 *               accountNumber: { type: string }
 *               bankName: { type: string }
 *               nickName: { type: string }
 *     responses:
 *       200:
 *         description: Beneficiary added
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
beneficiaryRouter.post("/addBeneficiary",Authentication,Validation(BV.createBeneSchema),BeneficiaryService.createBeneficiary)

/**
 * @swagger
 * /beneficiary/getAllBeneficiary:
 *   get:
 *     tags: [Beneficiary]
 *     summary: Get all beneficiaries for the current user
 *     responses:
 *       200:
 *         description: Beneficiaries retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 */
beneficiaryRouter.get("/getAllBeneficiary",Authentication,BeneficiaryService.getAllBeneficiary)

/**
 * @swagger
 * /beneficiary/deleteBeneficiary/{id}:
 *   delete:
 *     tags: [Beneficiary]
 *     summary: Delete a beneficiary
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Beneficiary deleted }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       404: { $ref: "#/components/responses/NotFound" }
 */
beneficiaryRouter.delete("/deleteBeneficiary/:id",Authentication,BeneficiaryService.deleteBeneficiary)


export default beneficiaryRouter; 