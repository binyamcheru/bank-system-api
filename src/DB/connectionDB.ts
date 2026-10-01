import mongoose from "mongoose";
import { DB_URI_ONLINE, LOCAL_URI_DB } from "../config/config.service";

// never log the raw URI: it contains the DB credentials
const redactUri = (uri: string) => uri.replace(/\/\/([^:@/]+):([^@/]+)@/, "//***:***@")

export const checkConnectionDB = async () => {
    try {
        await mongoose.connect(DB_URI_ONLINE)
        console.log(`Database ${redactUri(DB_URI_ONLINE)} connected successfully......`)
    } catch (error) {
        console.log(error)
    }
}
