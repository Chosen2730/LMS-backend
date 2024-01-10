import cloud from "cloudinary";
import { Request } from "express";
const cloudinary = cloud.v2;
import fs from "fs";

const uploadImageFile = async (
  req: Request,
  key: string,
  resourceType: string
) => {
  try {
    // @ts-ignore
    const file = req.files[key];

    if (!file) {
      throw new Error(`Please upload a ${key}`);
    }

    const uploadedFile = await uploadToCloudinary(file, key, resourceType);
    // @ts-ignore
    if (file.tempFilePath) {
      // @ts-ignore
      fs.unlinkSync(file.tempFilePath);
    }

    return uploadedFile;
  } catch (error) {
    throw error;
  }
};

const uploadToCloudinary = async (
  file: any,
  key: string,
  resourceType: string
) => {
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    file.tempFilePath,
    {
      //@ts-ignore
      resource_type: resourceType,
      use_filename: true,
      folder: key,
    }
  );

  return { public_id, secure_url };
};

export default uploadImageFile;
