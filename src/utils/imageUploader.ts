import cloud from "cloudinary";
import { Request } from "express";
const cloudinary = cloud.v2;
import fs from "fs";
import { BadRequestError } from "../errors";

const uploadImageFile = async (req: Request, key: string) => {
  try {
    //@ts-ignore
    const image: Image = req.files[key];
    const maxSize = 1024 * 1024 * 10;
    if (!image) {
      throw new Error(`Please upload a ${key}`);
    }

    // if (image.size > maxSize) {
    //   throw new Error(`Image must not be larger than ${maxSize}`);
    // }

    // if (!image.mimetype.startsWith("image")) {
    //   throw new Error("You can only upload a file of type image");
    // }

    const uploadedImage = await uploadToCloudinary(image, key);
    //@ts-ignore
    if (req.files[key].tempFilePath) {
      //@ts-ignore
      fs.unlinkSync(req.files[key].tempFilePath);
    }

    return uploadedImage;
  } catch (error) {
    throw error;
  }
};

const uploadToCloudinary = async (image: any, key: string) => {
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    image.tempFilePath,
    {
      use_filename: true,
      folder: key,
    }
  );

  return { public_id, secure_url };
};

export default uploadImageFile;
