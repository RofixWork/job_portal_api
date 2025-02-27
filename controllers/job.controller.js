import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.js";
import CustomError from '../errors/custom-error.js';
class JobController {
  /**
   * Get all Jobs
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   * @returns {import("express").Response}
   */
  static async all(request, response, next) {
    const {id: userId} = request.user;
    const jobs = await Job.find({createdBy: userId});
    
    return response.status(StatusCodes.OK).json({nbHits: jobs.length, jobs});
  }

  /**
   * Get Single Job
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   * @returns {import("express").Response}
   */
  static async get(request, response, next) {
    const {id} = request.params;
    const job = await Job.findById(id);

    return response.status(StatusCodes.OK).json({job});
  }

  /**
   * Create Job
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   * @returns {import("express").Response}
   */
  static async create(request, response, next) {
    const {id: userId} = request.user;
    const job = await Job.create({...request.body, createdBy: userId});
    return response.status(StatusCodes.CREATED).json({job});
  }

  /**
   * update Job
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   * @returns {import("express").Response}
   */
  static async update(request, response, next) {
    const {id} = request.params;
    /**
     * @type {Job}
     */
    const job = await Job.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});

    return response.status(StatusCodes.OK).json({job});
  }

  /**
   * Delete Job
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   * @returns {import("express").Response}
   */
  static async delete(request, response, next) {
    const {id} = request.params;
    const job = await Job.findByIdAndDelete(id);

    return response.status(StatusCodes.OK).json({
      message: 'Job deleted successfully',
      jobId: job._id,
    });
  }
}

export default JobController;
