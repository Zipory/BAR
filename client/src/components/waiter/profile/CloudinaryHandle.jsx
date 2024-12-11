import React, { useState } from 'react';
import axios from 'axios';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
const CloudinaryHandle = ({setCloudinaryUrl}) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_preset"); // replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfrcalpyz/image/upload",
        formData
      );
      // the real url of the img
      const imageUrl = response.data.secure_url;
      setCloudinaryUrl(()=> imageUrl);
      // the url of the trasaction img.
      // setCloudinaryUrl(`${response.data.secure_url}?c_thumb&g_face&h=200&w=200`);
      // const cloudinaryUrl = `${response.data.secure_url}?w=300&h=300&c_fill`;
      console.log(imageUrl);
      
      // Send the image URL to your server
      // await axios.post("/your-server-endpoint", { imageUrl });
      //   width: 200,
      // height: 200,
      // crop: "thumb",
      // gravity: "face"
      // console.log(response);
      // https://res.cloudinary.com/dfrcalpyz/image/upload/f_auto,q_auto/c_thumb,g_face,h_200,w_200/iph54muyqhugkiitbe4e?_a=BAMCkGXw0
      
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
