import {config} from "dotenv"
import { resolve } from "node:path"


const NODE_ENV : string= process.env.NODE_ENV!

config({
    path:(resolve(process.cwd(),`.env.${NODE_ENV}`))
})

export const PORT :number = Number(process.env.PORT)
export const LOCAL_URI_DB :string = process.env.LOCAL_URI_DB!
export const DB_URI_ONLINE :string = process.env.DB_URI_ONLINE!
