import {config} from "dotenv"
import { resolve } from "node:path"


const NODE_ENV : string= process.env.NODE_ENV!

config({
    path:(resolve(process.cwd(),`.env.${NODE_ENV}`))
})

export const PORT :number = Number(process.env.PORT)
