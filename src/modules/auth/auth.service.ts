import { NextFunction, Request, Response } from "express"
import { AppError } from "../../common/utils/error.global.handler"
import { Compare, Hash } from "../../common/utils/security/hash.security"
import { successResponse } from "../../common/utils/success.Responsive"
import { randomUUID } from "node:crypto"
import { GenerateToken, VerfiyToken } from "../../common/utils/security/token.service"
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_KEY, PREFIX, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_KEY} from "../../config/config.service"
import UserRepository from "./user.repository"
import { ISignUpType, ISignInType } from "./auth.dto"


class AuthService {

    private readonly _userModel = new UserRepository()

    constructor() { }

    signUP = async (req: Request, res: Response, next: NextFunction) => {
        const { fullName, email, password  } : ISignUpType = req.body

        if (await this._userModel.findOne({ filter: { email } })) {
            throw new AppError("User already exists", 409)
        }

        const user = await this._userModel.create({
            fullName,
            email,
            password: await Hash({ plainText: password }),
        })

        successResponse({ res, message: "User created successfully", data: { user } })
    }

    signIN = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } : ISignInType = req.body

        const user = await this._userModel.findOneWithPassword({ email })
        if (!user) {
            throw new AppError("User not found", 404)
        }

        if (!await Compare({ plainText: password, cipherText: user.password })) {
            throw new AppError("Invalid password", 401)
        }

        const jwtid = randomUUID()
        const access_token = GenerateToken({
            payload: { id: user._id, email: user.email },
            secretOrPrivateKey: ACCESS_TOKEN_KEY,
            options: { expiresIn: ACCESS_TOKEN_EXPIRY as any, jwtid }
        })

        const refresh_token = GenerateToken({
            payload: { id: user._id, email: user.email },
            secretOrPrivateKey: REFRESH_TOKEN_KEY,
            options: { expiresIn: REFRESH_TOKEN_EXPIRY as any, jwtid }
        })

        successResponse({ res, message: "User logged in successfully", data: { access_token, refresh_token } })
    }

    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers
        if (!authorization) {
            throw new AppError("Token Not Found",404)
        }
        const [prefix, token]: string[] = authorization.split(" ")
        if (prefix !== PREFIX) {
            throw new AppError("inValid Prefix",401)
        }
        const decoded = VerfiyToken({ token: token!, secretOrPublicKey: REFRESH_TOKEN_KEY })
        if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
            throw new AppError("inValid token payload",401)
        }

        const user = await this._userModel.findOne({ filter: { _id: decoded.id } })
        if (!user) {
            throw new AppError("User Not Found", 409)
        }

        const jwtid = randomUUID()
        const access_token = GenerateToken({
            payload: {
                id: user._id,
                email: user.email
            },
            secretOrPrivateKey: ACCESS_TOKEN_KEY,
            options: {
                expiresIn: ACCESS_TOKEN_EXPIRY as any,
                jwtid
            }
        })

        successResponse({ res, message: "Token refreshed successfully", data:  {access_token}  })
    }


    logOut = async (req:Request,res:Response,next:NextFunction)=>{
        const {flag} = req.query

        if (flag == "All") {
            req.user.changeCredential = new Date()
            await req.user.save()
        }
        successResponse({res,message:"User logged out successfully"})
    }

}

export default new AuthService()
