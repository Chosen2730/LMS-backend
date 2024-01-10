import { Request, Response } from "express";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import User from "../models/authModel";
import Course from "../models/courseModel";
import { StatusCodes } from "http-status-codes";

const getAllCourses = async (req: Request, res: Response) => {
  const courses = await Course.find();
  res.status(StatusCodes.OK).json({ count: courses.length, courses });
};

const getAllCategories = async (req: Request, res: Response) => {
  //@ts-ignore
  const categories = Course.schema.path("category").enumValues;
  res.status(StatusCodes.OK).json(categories);
};

const createCourse = async (req: Request, res: Response) => {
  //@ts-ignore
  const createdBy = req.user.userId;
  const user = await User.findOne({ _id: createdBy });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const isTutor = user.isTutor === true;
  if (!isTutor) {
    throw new ForbiddenError("You are not permitted to perform this operation");
  }
  const course = await Course.create({ ...req.body, createdBy });
  res.status(StatusCodes.CREATED).json(course);
};

export { createCourse, getAllCourses, getAllCategories };
