import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Lecturer from "../models/lecturerModel";
import { BadRequestError, NotFoundError } from "../errors";

const getProfile = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.user.userId;
  const lecturer = await Lecturer.findOne({ user: id });
  if (!lecturer) {
    throw new NotFoundError("This profile does not exist");
  }
  res.status(StatusCodes.OK).json(lecturer);
};

const updateProfile = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.user.userId;
  const { firstName, lastName, title, tel } = req.body;
  const payload = {
    firstName,
    lastName,
    title,
    isActive: true,
    tel,
  };
  const lecturer = await Lecturer.findOneAndUpdate({ user: id }, payload, {
    new: true,
    runValidators: true,
  });
  if (!lecturer) {
    throw new NotFoundError("This profile does not exist");
  }
  res.status(StatusCodes.OK).json(lecturer);
};

export { updateProfile, getProfile };
