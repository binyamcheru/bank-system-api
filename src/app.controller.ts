import express, { NextFunction, Request, Response } from "express"

const app = express()

const port = process.env.PORT || 3000

export const bootstrap = () => {

    app.use(express.json())

    app.get("/", (req: Request, res: Response) => {
        res.json({ message: "Welcome to the Bank System..." })
    })

    app.listen(port, () => {
        console.log(`server is running at port ${port} .......`);
    })

}
