import { Router } from "express";
import { Authentication } from "../../common/middleware/authentication";
import cardService from "./card.service";
import { Validation } from "../../common/middleware/validation";
import  * as  CV from "./card.validation";

const creditCardRouter = Router({strict:true})


/**
 * @swagger
 * /card/AddCard:
 *   post:
 *     tags: [Card]
 *     summary: Add a new credit card (and its linked bank account)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bankName, password]
 *             properties:
 *               bankName: { type: string, minLength: 3 }
 *               cardType: { type: string, enum: [visa, mastercard], default: visa }
 *               password: { type: string, minLength: 4, maxLength: 4, description: "4-digit card PIN" }
 *               cardNumber: { type: string, minLength: 16, maxLength: 16, description: "Optional, auto-generated if omitted" }
 *     responses:
 *       200:
 *         description: Card added
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
creditCardRouter.post("/AddCard",Authentication,Validation(CV.addCaredSchema),cardService.addCard)

/**
 * @swagger
 * /card/getAllCards:
 *   get:
 *     tags: [Card]
 *     summary: Get all of the current user's credit cards
 *     responses:
 *       200:
 *         description: Cards retrieved
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 */
creditCardRouter.get("/getAllCards",Authentication,cardService.getAllCards)

/**
 * @swagger
 * /card/setDefaultCard/{cardId}:
 *   patch:
 *     tags: [Card]
 *     summary: Set a card as the default card
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Default card updated }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       404: { $ref: "#/components/responses/NotFound" }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
creditCardRouter.patch("/setDefaultCard/:cardId",Authentication,Validation(CV.setDefaultCardSchema),cardService.setDefaultCard)

/**
 * @swagger
 * /card/deleteCard/{cardId}:
 *   delete:
 *     tags: [Card]
 *     summary: Delete a card and its linked account
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Card deleted }
 *       401: { $ref: "#/components/responses/Unauthorized" }
 *       404: { $ref: "#/components/responses/NotFound" }
 *       422: { $ref: "#/components/responses/ValidationError" }
 */
creditCardRouter.delete("/deleteCard/:cardId",Authentication,Validation(CV.delCardSchema),cardService.deleteCard)

export default creditCardRouter  