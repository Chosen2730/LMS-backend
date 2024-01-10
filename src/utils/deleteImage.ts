import cloud from "cloudinary";

const cloudinary = cloud.v2;

const deleteImage = async (imageId: string) => {
  console.log("first");
  const del = await cloudinary.uploader.destroy(imageId);
  console.log(del);
};

export default deleteImage;
