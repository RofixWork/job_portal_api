import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/custom-error.js";
import jwt from 'jsonwebtoken'
import User from "../models/User.js";
/**
 * Description
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 * @returns {import("express").Response}
 */
const authenticationMiddleware = async (request, response, next) => {
    const {token} = request.signedCookies;
    if(!token) {
        throw new CustomError('Authentication failed!', StatusCodes.UNAUTHORIZED);
    }

    try {
        const {id: userId} = jwt.verify(token , process.env.JWT_SECRET);
        
        const user = await User.findOne({_id:userId});
        
        if(!user) {
            throw new CustomError('Authentication failed!', StatusCodes.UNAUTHORIZED);
        }
        const {name, role, location} = user;
        request.user = {id: userId, name, role, location};
        next();
    } catch (error) {
        throw new CustomError('Authentication failed!', StatusCodes.UNAUTHORIZED);
    }
}

const authorizePermissions = (...roles) => {
    return (request, response, next) => {
        if (!roles.includes(request.user.role)) {
            throw new CustomError('Unauthorized!', StatusCodes.FORBIDDEN);
        }
        next();
    }
}

export {authenticationMiddleware, authorizePermissions};