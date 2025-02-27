import { Model, model, Schema } from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const JobSchema = new Schema({
    company: {
        type: Schema.Types.String,
        trim: true,
        lowercase: true,
        required: [true, 'Company name is required']
    },
    position: {
        type: Schema.Types.String,
        trim: true,
        lowercase: true,
        required: [true, 'Position name is required']
    },
    jobStatus: {
      type: Schema.Types.String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: Schema.Types.String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: Schema.Types.String,
      default: 'my city',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
}, {timestamps: true})

/**
 * @type {Model}
 */
const Job = model('Job', JobSchema);

export default Job;