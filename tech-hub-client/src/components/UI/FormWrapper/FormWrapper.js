import React from "react";

const FormWrapper = ({ children, className }) => {
  return (
    <div
      className={`max-w-md mx-auto p-6 shadow-lg rounded-lg bg-slate-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default FormWrapper;
