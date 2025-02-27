import { Model, model, Schema } from "mongoose";
import { USER_ROLE } from "../utils/constants.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const UserSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      select: false,
    },
    lastName: {
      type: Schema.Types.String,
      default: "Last Name",
    },
    location: {
      type: Schema.Types.String,
      default: "Earth",
    },
    role: {
      type: Schema.Types.String,
      enum: Object.values(USER_ROLE), // Admin can create, update, delete jobs, while user can only view jobs.
      default: USER_ROLE.USER,
    },
  },
  {
    methods: {
      async comparedPassword(password) {
        const isValid = await bcrypt.compare(password, this.password);
        return isValid;
      },
      createJWT() {
        return jwt.sign({id: this._id, name: this.name, role: this.role, location: this.location}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
      }
    },
  }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * @type {Model}
 */
const User = model("User", UserSchema);

export default User;
