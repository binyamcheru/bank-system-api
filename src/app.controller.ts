import express, { NextFunction, Request, Response } from "express"
import { AppError, globalErrorHandler } from "./common/utils/error.global.handler"
import { successResponse } from "./common/utils/success.Responsive"
import { PORT } from "./config/config.service"
import { checkConnectionDB } from "./DB/connectionDB"

const app = express()

const port = PORT

export const bootstrap = () => {

    app.use(express.json())

    checkConnectionDB()

    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        successResponse({ res, message: "Welcome to the Bank System..." })
    })

    app.use("{/*demo}", (req: Request, res: Response, next: NextFunction) => {
        throw new AppError(`404 ${req.method} ${req.url} Not Found...`, 404)
    })

    app.use(globalErrorHandler)

    app.listen(port, () => {
        console.log(`server is running at port ${port} .......`);
    })

}
