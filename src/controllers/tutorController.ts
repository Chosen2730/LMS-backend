import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Student from "../models/studentModel";
import User from "../models/authModel";
import TutorRequest from "../models/tutorRequestModel";
import { BadRequestError, NotFoundError } from "../errors";
import { Types } from "mongoose";

const makeTutorRequest = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.user.userId;
  const isTutor = await TutorRequest.findOne({ user: id });
  const student = await Student.findOne({ user: id });
  if (!student) {
    throw new NotFoundError("This profile does not exist");
  }
  if (isTutor) {
    throw new BadRequestError("You have already made a tutor request");
  }
  const tutorReq = await TutorRequest.create({ user: id });
  res.status(StatusCodes.CREATED).json(tutorReq);
};

const getRequests = async (req: Request, res: Response) => {
  const tutorReq = await TutorRequest.find().populate({
    path: "user",
    select: "-password -confirmPassword",
  });
  res.status(StatusCodes.OK).json(tutorReq);
};

const appproveRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tutorReq = await TutorRequest.findOne({ _id: id });
  if (!tutorReq) {
    throw new NotFoundError("Request not found");
  }
  const user = await User.findOneAndUpdate(
    { _id: tutorReq.user },
    { isTutor: true },
    { new: true, runValidators: true }
  );
  await TutorRequest.findOneAndDelete({ _id: id });
  res.status(StatusCodes.OK).json(user);
};

export { makeTutorRequest, getRequests, appproveRequest };
