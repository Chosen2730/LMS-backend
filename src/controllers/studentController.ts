import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Student from "../models/studentModel";

const createStudent = async (req: Request, res: Response) => {
  const student = await Student.create(req.body);
  res.status(StatusCodes.OK).json(student);
};

export { createStudent };
