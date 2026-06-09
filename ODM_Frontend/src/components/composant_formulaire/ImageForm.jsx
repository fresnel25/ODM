import React from "react";

const ImageForm = ({ src, name }) => {
  return (
    <div className="w-70 flex justify-center">
      <img
        src={src}
        alt={name}
        className="object-cover w-28 h-28"
      />
    </div>
  );
};

export default ImageForm;
