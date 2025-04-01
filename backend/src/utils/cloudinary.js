import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dozmtxmsb",
  api_key: `861916424387696`,
  api_secret: `q4HMZJd2N6dxs0J1Imv3ZsXoiO8`,
});

const uploadFileOnCloudinary = async (file) => {
  try {
    if (!file) {
      console.log("file path is not provided");
      return null;
    }

    const response = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: "tour-booking",
    });

    fs.unlinkSync(file);
    return response.url;
  } catch (error) {
    fs.unlinkSync(file);
    console.log("error in uploading image on Cloudinary \n", error);
    return null;
  }
};

export default uploadFileOnCloudinary;
