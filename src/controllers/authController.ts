import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/authModel";
import { BadRequestError, NotFoundError } from "../errors";

const register = async (req: Request, res: Response) => {
  const { password, confirmPassword, email } = req.body;
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw new NotFoundError("User with this email address already exists");
  }

  if (password !== confirmPassword) {
    throw new BadRequestError("Password and confirm password must match");
  }

  const user = await User.create(req.body);
  const token = await user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const login = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  if (!password || !email) {
    throw new BadRequestError("Email and password must be provided");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("Invalid credentials");
  }
  const isMatch = await user.comparePasswords(password);
  if (!isMatch) {
    throw new BadRequestError("Passwords do not match");
  }
  const token = await user.createJWT();
  const payload = {
    isTutor: user.isTutor,
    _id: user._id,
    email: user.email,
  };
  res.status(StatusCodes.OK).json({ user: payload, token });
};

export { register, login };
