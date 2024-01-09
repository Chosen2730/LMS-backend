import cloud from "cloudinary";
import { Request } from "express";
const cloudinary = cloud.v2;
import fs from "fs";
import { BadRequestError } from "../errors";

const uploadImageFile = async (req: Request, name: string) => {
  // @ts-ignore
  const image: Image = req.files?.image;
  const maxSize = 1024 * 1024 * 2;
  if (!image) {
    throw new BadRequestError("Please upload an image");
  }
  if (image.size > maxSize) {
    throw new BadRequestError("Image size must not exceed 3mb");
  }
  if (!image.mimetype.startsWith("image")) {
    throw new BadRequestError("You can only upload an image");
  }
  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      // @ts-ignore
      req.files.image.tempFilePath,
      { use_filename: true, folder: name }
    );

    // @ts-ignore
    fs.unlinkSync(req.files.image.tempFilePath);
    return { public_id, secure_url };
  } catch (error: any) {
    console.log(error);
    throw new BadRequestError(error);
  }
};

export default uploadImageFile;
