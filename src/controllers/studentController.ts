import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Student from "../models/studentModel";
import User from "../models/authModel";
import { createToken } from "../utils/createToken";
import { BadRequestError, NotFoundError } from "../errors";
import { sendEmail } from "../utils/sendEmail";

const getProfile = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.user.userId;
  const student = await Student.findOne({ user: id });
  if (!student) {
    throw new NotFoundError("This profile does not exist");
  }
  res.status(StatusCodes.OK).json(student);
};

const updateProfile = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.user.userId;
  const { firstName, lastName, currentLevel, faculty, department, tel } =
    req.body;
  const payload = {
    firstName,
    lastName,
    currentLevel,
    faculty,
    department,
    isActive: true,
    tel,
  };
  const student = await Student.findOneAndUpdate({ user: id }, payload, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    throw new NotFoundError("This profile does not exist");
  }
  res.status(StatusCodes.OK).json(student);
};

export { updateProfile, getProfile };
