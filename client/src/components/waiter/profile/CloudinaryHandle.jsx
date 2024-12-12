import React, { useState } from 'react';
import axios from 'axios';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

const preset = process.env.REACT_APP_CLOUDINARY_PRESET
const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME

const CloudinaryHandle = ({setCloudinaryUrl}) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
      // the url of the img
      const imageUrl = response.data.secure_url;
      setCloudinaryUrl(()=> imageUrl);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage}>אשר תמונה</button>
      
    </div>
  );
};








export default CloudinaryHandle;
