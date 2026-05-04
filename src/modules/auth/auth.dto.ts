import z from "zod"
import { signupSchema, signinSchema } from "./auth.validation"


export type ISignUpType = z.infer<typeof signupSchema.body>
export type ISignInType = z.infer<typeof signinSchema.body>
