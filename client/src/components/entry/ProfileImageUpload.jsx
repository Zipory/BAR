import React, { useState } from "react";

function ProfileImageUpload({image}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // להציג תצוגה מקדימה
    }
  };

  return (
    <div>
      <label htmlFor="profile-image-upload">בחר תמונת פרופיל:</label>
      <input
        type="file"
        id="profile-image-upload"
        accept="image/*"
        ref={image}
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div>
          <p>תצוגה מקדימה:</p>
          <img
            src={selectedImage}
            alt="תצוגה מקדימה"
            style={{ width: 150, height: 150 }}
          />
        </div>
      )}
    </div>
  );
}

export default ProfileImageUpload;
