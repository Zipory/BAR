import React, { useState, useEffect } from "react";
import axios from "axios";

const preset = process.env.REACT_APP_CLOUDINARY_PRESET;
const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME;

const CloudinaryHandle = ({ setCloudinaryUrl, cloudinaryUrl }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImgUrl] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    if (cloudinaryUrl) {
      console.log("Updated image_url:", cloudinaryUrl);
      setImgUrl(cloudinaryUrl);
    }
  }, [cloudinaryUrl]); // This runs every time 'imageUrl' changes

  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
        formData
      );
      let url = await response.data.secure_url;
      // the url of the img
      setCloudinaryUrl(url);
      console.log("url", url);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage}>אשר תמונה</button>
      {imageUrl && (
        <div>
          <p>התמונה מאושרת</p>
          <img
            src={imageUrl}
            alt="התמונה מאושרת"
            style={{ width: 150, height: 150, objectFit: "cover" }}
          />
        </div>
      ) || <p className="very-small">יש לאשר את התמונה ולהמתין להצגתה לפני לחיצה על <span className="very-small-span">התחברות</span></p>}
    </div>
  );
};

export default CloudinaryHandle;
