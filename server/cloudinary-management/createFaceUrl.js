import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** upload to cloudinary, and transformat it to foucos on face.
 * return the url of the face img.
*/
async function createFaceUrl(image)  {
  try {
    const result = await cloudinary.uploader.upload(image); 
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
//   console.log(url);
return url;
} catch (error) {
    console.error("Url Error:", error);
  }
};

export {createFaceUrl};

