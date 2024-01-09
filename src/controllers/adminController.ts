import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Student from "../models/studentModel";
import Lecturer from "../models/lecturerModel";
import User from "../models/authModel";
import { createToken } from "../utils/createToken";
import { BadRequestError, NotFoundError } from "../errors";
import { sendEmail } from "../utils/sendEmail";

const createStudent = async (req: Request, res: Response) => {
  const { email, matricNo } = req.body;
  const isUser = await User.findOne({ email: email });
  const isStudent = await Student.findOne({ matricNo });

  if (isUser) {
    throw new BadRequestError("User with this email already exists");
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

const createLecturer = async (req: Request, res: Response) => {
  const { email, matricNo } = req.body;
  const isUser = await User.findOne({ email: email });

  if (isUser) {
    throw new BadRequestError("User with this email already exists");
  }

  const password = await createToken(6);
  const confirmPassword = password;
  const user = await User.create({
    email,
    password,
    confirmPassword,
    role: "lecturer",
    isTutor: true,
  });
  const lecturer = await Lecturer.create({ ...req.body, user: user._id });

  await sendEmail({
    subject: "Lecturer Account Created",
    to: email,
    text: `Your login was successfully created and your default login password is ${password}, email: ${email}. Login to the student portal and change your password to a more convenient password and also complete your student profile`,
  });
  res.status(StatusCodes.OK).json({
    lecturer,
    user,
    msg: `Lecturer created successfully`,
  });
};

const getAllTutors = async (req: Request, res: Response) => {
  const users = await User.find({ isTutor: true }).select(
    "-password -confirmPassword -isTutor -__v"
  );
  const allTutorsPromises = users.map(async (user) => {
    let profile;
    if (user.role === "student") {
      profile = await Student.findOne({ user: user._id });
    }
    if (user.role === "lecturer") {
      profile = await Lecturer.findOne({ user: user._id });
    }
    return { profile, user };
  });

  const allTutors = await Promise.all(allTutorsPromises);

  res.status(StatusCodes.OK).json({ allTutors });
};

export { createStudent, createLecturer, getAllTutors };
