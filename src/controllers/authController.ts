import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/authModel";
import { BadRequestError, NotFoundError } from "../errors";
import uploadImageFile from "../utils/imageUploader";
import deleteImage from "../utils/deleteImage";

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
  console.log(user);
  if (!user) {
    throw new NotFoundError("Invalid credentials");
  }
  const isMatch = await user.comparePasswords(password);
  console.log(isMatch);
  if (!isMatch) {
    throw new BadRequestError("Invalid credentials");
  }
  const token = await user.createJWT();
  const payload = {
    isTutor: user.isTutor,
    _id: user._id,
    email: user.email,
  };
  res.status(StatusCodes.OK).json({ user: payload, token });
};

const uploadImage = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.user.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  if (user?.profilePhoto.imageId) {
    await deleteImage(user?.profilePhoto.imageId);
  }
  const { public_id, secure_url } = await uploadImageFile(
    req,
    "profile images"
  );
  const profilePhoto = {
    imageId: public_id,
    url: secure_url,
  };

  await User.findOneAndUpdate(
    { _id: id },
    { profilePhoto },
    { runValidators: true, new: true }
  );

  return res
    .status(StatusCodes.OK)
    .json({ msg: "Profile photo updated successfully" });
};

export { register, login, uploadImage };
