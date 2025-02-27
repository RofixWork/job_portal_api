import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import CustomError from "../errors/custom-error.js";

class AuthController {
     /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @returns {import("express").Response}
   */
    static async register(request, response) {
        const user = await User.create({...request.body, role: "user"});
        const token = user.createJWT()
        AuthController.attachCookie(response, token);
        return response.status(StatusCodes.CREATED).json({user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            location: user.location,
        }});
    }

     /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   * @returns {import("express").Response}
   */
     static async login(request, response) {
        const {email, password} = request.body;
        const user = await User.findOne({email}).select('+password');
        if(!user) throw new CustomError("Invalid credentials", StatusCodes.UNAUTHORIZED);
        const isValidPassword = await user.comparedPassword(password);
        if(!isValidPassword) throw new CustomError("Invalid credentials", StatusCodes.UNAUTHORIZED);

        const token = user.createJWT()
        AuthController.attachCookie(response, token);
        
        return response.status(StatusCodes.CREATED).json({user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            location: user.location,
        }});
    }

    static attachCookie(response, token) {
        const cookieLifetime = 1000 * 60 * 60 * 24;
        response.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + cookieLifetime),
            signed: true
        })
    }

     /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   * @returns {import("express").Response}
   */
  static async logout(request, response) {
    response.clearCookie('token', { 
        signed: true ,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    return response.status(StatusCodes.OK).json({
        message: "Logged out successfully"
    })
  }
}
export default AuthController;