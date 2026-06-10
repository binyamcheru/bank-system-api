import express, { NextFunction, Request, Response } from "express"
import { AppError, globalErrorHandler } from "./common/utils/error.global.handler"
import { successResponse } from "./common/utils/success.Responsive"
import { PORT } from "./config/config.service"
import { checkConnectionDB } from "./DB/connectionDB"
import authRouter from "./modules/auth/auth.controller"
import accountRouter from "./modules/account/account.controller"
import transactionRouter from "./modules/transaction/transaction.controller"
import creditCardRouter from "./modules/card/card.controller"
import userRouter from "./modules/user/user.controller"

const app = express()

const port = PORT

export const bootstrap = () => {

    app.use(express.json())

    checkConnectionDB()

    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        successResponse({ res, message: "Welcome to the Bank System..." })
    })

    app.use("/auth", authRouter)
    app.use("/user", userRouter)
    app.use("/account", accountRouter)
    app.use("/transaction", transactionRouter)
    app.use("/card", creditCardRouter)

    app.use("{/*demo}", (req: Request, res: Response, next: NextFunction) => {
        throw new AppError(`404 ${req.method} ${req.url} Not Found...`, 404)
    })

    app.use(globalErrorHandler)

    app.listen(port, () => {
        console.log(`server is running at port ${port} .......`);
    })

}
