import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
/** upload to cloudinary, and transformat it to foucos on face.*/
(async function () {
  try {
    const result = await cloudinary.uploader.upload("./images/littleNoa.jpg"); // TODO: here i need to switch with the img that the user send to the server.
    // console.log(result);
  const url = cloudinary.url(result.public_id, {
      transformation: [
          {
              quality: "auto",
              fetch_format: "auto"
          },
          {
              width: 200,
              height: 200,
              crop: "thumb",
              gravity: "face"
          }
      ]
  })
  console.log(url);
} catch (error) {
    console.error("Url Error:", error);
  }
  //   DOTO: here i need to save the url inside the DB.
})();
