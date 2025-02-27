import { body, validationResult, param } from "express-validator";
import CustomError from "../errors/custom-error.js";
import { StatusCodes } from "http-status-codes";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import Job from "../models/Job.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (request, response, next) => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        const errorsValues = errors.array().map((err) => err.msg);
        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: errorsValues });
      }
      next();
    },
  ];
};

export const validateTest = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 6 })
    .withMessage("Name must be between 3 and 6 characters")
    .trim(),
]);

export const validateJob = withValidationErrors([
  body("company")
    .notEmpty()
    .withMessage("Please provide company name...")
    .trim(),
  body("position")
    .notEmpty()
    .withMessage("Please provide job position...")
    .trim(),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Job Status invalid"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Job Type invalid"),
  body("jobLocation")
    .notEmpty()
    .withMessage("Please provide job location...")
    .trim(),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (id, {req}) => {
    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if(!isValidId) throw new CustomError('Invalid MongoDB Id', StatusCodes.BAD_REQUEST);

    const job = await Job.findById(id);
    if(!job) throw new CustomError('Job not found', StatusCodes.NOT_FOUND);
    const isAdmin = req.user.role === 'admin';
    const isOwner = job.createdBy.toString() === req.user.id;
    if(!isAdmin && !isOwner) throw new CustomError('Unauthorized', StatusCodes.FORBIDDEN);
  })
]);

export const validateUserRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required").trim(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async email => {
        const user = await User.findOne({email});
        if(user) throw new CustomError("Email already exists");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 chars")
    ,
  body("location").trim().notEmpty().withMessage("Location is required"),
]);


export const validateUserLoginInput = withValidationErrors([
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("invalid email format"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 chars")
      ,
  ]);
  

  export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('please provide name...').trim(),
    body('email').notEmpty().withMessage('please provide email...').isEmail().withMessage('Invalid Email Format...').custom(async (email, {req}) => {
      const user = await User.findOne({email})
      if(user && user._id.toString()!== req.user.id) throw new CustomError("Email already exists");
    }),
    body('location').notEmpty().withMessage('please provide location...').trim(),
    body('lastName').notEmpty().withMessage('please provide lastName...').trim(),
  ])