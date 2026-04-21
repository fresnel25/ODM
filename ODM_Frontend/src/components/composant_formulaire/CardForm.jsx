import React from "react";

const CardForm = ({ children, title }) => {
  return (
    <div className="flex justify-center">
      <div className="card shadow w-220">
        <div className="px-6 py-4 border-b bg-base-100 border-base-300">
          <h2 className="text-xl font-semibold text-base-content text-center">{title}</h2>
        </div>
        <div className="card-body bg-base-100 flex justify-center items-center">
          <div className="mt-6">{children}</div>
        </div>
      </div>
      <div className="card"></div>
    </div>
  );
};

export default CardForm;
