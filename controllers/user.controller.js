import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Job from "../models/Job.js";

class UserController {
      /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   * @returns {import("express").Response}
   */
  static async current_user(request, response) {
    const {user} = request;
    return response.status(StatusCodes.OK).json({user});
  }

    /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   * @returns {import("express").Response}
   */
  static async update_user(request, response) {
    const {id: userId} = request.user;
    const {name, email, lastName, location} = request.body;
    const user = await User.findByIdAndUpdate(userId, {name, email, lastName, location}, {new: true, runValidators: true});
    return response.status(StatusCodes.OK).json({user})
  }

     /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   * @returns {import("express").Response}
   */
     static async app_stats(request, response) {
        const jobs =  await Job.countDocuments();
        const users = await User.countDocuments();
        return response.status(StatusCodes.OK).json({
            jobs: jobs,
            users: users, 
        })
      }
}

export default UserController;