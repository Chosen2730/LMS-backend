import { Request, Response } from "express";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import User from "../models/authModel";
import Course from "../models/courseModel";
import { StatusCodes } from "http-status-codes";
import uploadImageFile from "../utils/imageUploader";
import deleteImage from "../utils/deleteImage";

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

const updateCourseThumbnail = async (req: Request, res: Response) => {
  const id = req.params.courseId;
  //@ts-ignore
  const userId = req.user.userId;
  const course = await Course.findOne({ _id: id, createdBy: userId });
  if (!course) {
    throw new NotFoundError("Course not found");
  }
  if (course?.thumbnail?.imageId) {
    await deleteImage(course?.thumbnail?.imageId);
  }
  const { public_id, secure_url } = await uploadImageFile(
    req,
    "thumbnail",
    "image"
  );
  course.thumbnail = { imageId: public_id, url: secure_url };
  await course.save();
  res.status(StatusCodes.OK).json(course);
};

const updateTrailer = async (req: Request, res: Response) => {
  const id = req.params.courseId;
  //@ts-ignore
  const userId = req.user.userId;
  const course = await Course.findOne({ _id: id, createdBy: userId });
  if (!course) {
    throw new NotFoundError("Course not found");
  }
  if (course?.trailer?.videoId) {
    await deleteImage(course?.trailer?.videoId);
  }
  const { public_id, secure_url } = await uploadImageFile(
    req,
    "trailer",
    "video"
  );
  course.trailer = { videoId: public_id, url: secure_url };
  await course.save();
  res.status(StatusCodes.OK).json(course);
};

export {
  createCourse,
  getAllCourses,
  getAllCategories,
  updateCourseThumbnail,
  updateTrailer,
};
