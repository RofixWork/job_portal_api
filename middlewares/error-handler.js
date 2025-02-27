import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/custom-error.js";

/**
 * This middleware for handling errors
 * @param {CustomError} error
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 * @returns {import("express").Response}
 */
const errorHanlderMiddleware = (error, request, response, next) => {
  const customError = {
    message: error.message || "Something went Wrong",
    timestamp: new Date().toISOString(),
  };

  return response.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(customError);
};

export default errorHanlderMiddleware;