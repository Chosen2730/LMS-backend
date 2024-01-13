import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Student from "../models/studentModel";
import { NotFoundError } from "../errors";

const getAllStudents = async (req: Request, res: Response) => {
  const students = await Student.find().populate("user");
  res
    .status(StatusCodes.OK)
    .json({ counts: students.length, student: students });
};

const getStudentProfile = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const student = await Student.findOne({ user: id });
  if (!student) {
    throw new NotFoundError("This profile does not exist");
  }
  res.status(StatusCodes.OK).json(student);
};

const getProfile = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.user.userId;
  const student = await Student.findOne({ user: id });
  if (!student) {
    throw new NotFoundError("This profile does not exist");
  }
  res.status(StatusCodes.OK).json(student);
};

const getEnrolledCourses = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.user.userId;
  const student = await Student.findOne({ user: id })
    .populate("enrolledCourses")
    .select("enrolledCourses");
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

export {
  updateProfile,
  getProfile,
  getAllStudents,
  getStudentProfile,
  getEnrolledCourses,
};
