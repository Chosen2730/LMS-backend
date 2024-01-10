import { Request, Response } from "express";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import CourseModule from "../models/courseModuleModel";
import Course from "../models/courseModel";
import Section from "../models/moduleSectionModel";
import { StatusCodes } from "http-status-codes";
import uploadImageFile from "../utils/imageUploader";
import deleteImage from "../utils/deleteImage";

const getAllModules = async (req: Request, res: Response) => {
  //@ts-ignore
  const { courseId } = req.params;
  const courses = await CourseModule.find({ course: courseId }).populate(
    "sections"
  );
  res.status(StatusCodes.OK).json({ count: courses.length, courses });
};

const createModule = async (req: Request, res: Response) => {
  const id = req.body.course;
  //@ts-ignore
  const userId = req.user.userId;
  const validCourse = await Course.findOne({ createdBy: userId });
  // console.log(validCourse);
  if (!validCourse) {
    throw new ForbiddenError(
      "You are not authorised to perform this operation"
    );
  }
  const courseModule = await CourseModule.create({ course: id });
  res.status(StatusCodes.CREATED).json(courseModule);
};

const createSection = async (req: Request, res: Response) => {
  const { lectureName, module, type } = req.body;
  const isLecture = await Section.findOne({ lectureName, module });
  const courseModule = await CourseModule.findOne({ _id: module });
  if (!courseModule) {
    throw new BadRequestError("Invalid module id supplied");
  }
  if (isLecture) {
    throw new BadRequestError("Lecture name already exist");
  }
  const { public_id, secure_url } = await uploadImageFile(
    req,
    "resource",
    type
  );
  // console.log(public_id);

  const payload = {
    lectureName: lectureName,
    module: module,
    resource: { resourceId: public_id, url: secure_url },
  };
  const section = await Section.create(payload);
  courseModule.sections.push(section._id);
  await courseModule.save();
  res.status(StatusCodes.CREATED).json({ section, courseModule });
};

export { getAllModules, createModule, createSection };
