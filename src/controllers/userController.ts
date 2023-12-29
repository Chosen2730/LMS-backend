import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getUser = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "User acquired" });
};

export { getUser };
