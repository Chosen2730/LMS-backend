import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Student from "../models/studentModel";
import User from "../models/authModel";
import { createToken } from "../utils/createToken";
import { BadRequestError, NotFoundError } from "../errors";
import { sendEmail } from "../utils/sendEmail";

const createStudent = async (req: Request, res: Response) => {
  const { email, matricNo } = req.body;
  const isUser = await User.findOne({ email: email });
  const isStudent = await Student.findOne({ matricNo });

  if (isUser) {
    throw new BadRequestError("Student with this email already exists");
  }
  if (isStudent) {
    throw new BadRequestError("Student with this matric number already exists");
  }

  const password = await createToken(6);
  const confirmPassword = password;
  const user = await User.create({ email, password, confirmPassword });
  const student = await Student.create({ ...req.body, user: user._id });

  await sendEmail({
    subject: "Student Account Created",
    to: email,
    text: `Your login was successfully created and your default login password is ${password}, email: ${email}. Login to the student portal and change your password to a more convenient password and also complete your student profile`,
  });
  res.status(StatusCodes.OK).json({
    student,
    user,
    msg: `Student created successfully`,
  });
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

const updateProfile = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.user.userId;
  const { firstName, lastName, currentLevel, faculty, department } = req.body;
  const payload = { firstName, lastName, currentLevel, faculty, department };
  const student = await Student.findOneAndUpdate({ user: id }, payload, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    throw new NotFoundError("This profile does not exist");
  }
  res.status(StatusCodes.OK).json(student);
};

export { createStudent, updateProfile, getProfile };
