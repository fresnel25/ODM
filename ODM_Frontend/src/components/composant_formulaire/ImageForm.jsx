import React from "react";

const ImageForm = ({ src, name }) => {
  return (
    <div className="w-70">
      <img
        src={src}
        alt={name}
        className="object-cover"
      />
    </div>
  );
};

export default ImageForm;
