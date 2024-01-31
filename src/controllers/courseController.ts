import { Request, Response } from "express";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import User from "../models/authModel";
import Course from "../models/courseModel";
import Student from "../models/studentModel";
import { StatusCodes } from "http-status-codes";
import uploadImageFile from "../utils/imageUploader";
import deleteImage from "../utils/deleteImage";

const getAllCourses = async (req: Request, res: Response) => {
  const courses = await Course.find().populate({
    path: "createdBy",
    select: "-password -confirmPassword",
  });

  res.status(StatusCodes.OK).json({ count: courses.length, courses });
};

const getTutorCourses = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user.userId;
  const courses = await Course.find({ createdBy: userId });
  res.status(StatusCodes.CREATED).json(courses);
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
  const course = await Course.findOne({ _id: id });
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  if (course?.createdBy.toString() !== userId) {
    throw new ForbiddenError("You are not permitted to perform this operation");
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
  res
    .status(StatusCodes.OK)
    .json({ course, msg: "Thumbnail saved successfully" });
};

const updateTrailer = async (req: Request, res: Response) => {
  const id = req.params.courseId;
  //@ts-ignore
  const userId = req.user.userId;
  const course = await Course.findOne({ _id: id });
  // console.log(course);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  if (course?.createdBy.toString() !== userId) {
    throw new ForbiddenError("You are not permitted to perform this operation");
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
  res
    .status(StatusCodes.OK)
    .json({ course, msg: "trailer saved successfully" });
};

const enrol = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  //@ts-ignore
  const { userId } = req.user;
  const course = await Course.findOne({ _id: courseId });
  const student = await Student.findOne({ user: userId });
  if (!student) {
    throw new NotFoundError("This student profile does not exist");
  }
  if (!course) {
    throw new NotFoundError("Course not found");
  }
  const isEnrolled = course.enrolledStudents.find(
    (st) => st.toString() === userId
  );
  if (isEnrolled) {
    throw new BadRequestError("You have already enrolled for this course");
  }
  course.enrolledStudents.push(userId);
  student.enrolledCourses.push(course?._id);
  await course.save();
  await student.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "You have successfully enrolled for this course" });
};

export {
  createCourse,
  getAllCourses,
  getAllCategories,
  updateCourseThumbnail,
  updateTrailer,
  enrol,
  getTutorCourses,
};
