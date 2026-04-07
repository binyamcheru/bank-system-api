import express, { NextFunction, Request, Response } from "express"
import { PORT } from "./config/config.service"

const app = express()

const port = PORT

export const bootstrap = () => {

    app.use(express.json())

    app.get("/", (req: Request, res: Response) => {
        res.json({ message: "Welcome to the Bank System..." })
    })

    app.listen(port, () => {
        console.log(`server is running at port ${port} .......`);
    })

}
