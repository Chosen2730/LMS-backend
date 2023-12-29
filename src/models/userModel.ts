import mongoose, { Document, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface UserDocument extends Document {
  email: string;
  password: string;
  createJWT(): Function;
  comparePasswords(enteredPassword: string): Function;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const UserSchema = new Schema({
  email: {
    type: String,

    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
  },

  firstName: String,
  lastName: String,
  tel: String,
});

UserSchema.pre("save", async function (next) {
  if (this.password === undefined || this.confirmPassword === undefined) {
    return;
  }
  const salt = await bcrypt.genSaltSync(10);
  //@ts-ignore
  const passHash = await bcrypt.hashSync(this.password, salt);
  //@ts-ignore
  const confirmPassHash = await bcrypt.hashSync(this.confirmPassword, salt);
  this.password = passHash;
  this.confirmPassword = confirmPassHash;
  next();
});

UserSchema.methods.createJWT = function (expiresIn: string): string {
  console.log(expiresIn);
  return jwt.sign(
    {
      // @ts-ignore
      user: { email: this.email, userId: this._id, role: this.role },
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: expiresIn || "30d",
    }
  );
};

UserSchema.methods.comparePasswords = async function (
  enteredPassword: string
): Promise<boolean> {
  const isCorrect = await bcrypt.compare(enteredPassword, this.password);
  return isCorrect;
};

export default model<UserDocument>("User", UserSchema);
