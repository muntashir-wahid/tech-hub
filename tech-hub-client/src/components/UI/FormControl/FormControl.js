import React from "react";

const FormControl = ({ label, type, inputConfig, error }) => {
  return (
    <div className="max-w-md flex flex-col items-start gap-2">
      <label>{label}</label>
      <input
        className="w-full p-2 rounded-md md:max-w-xs"
        type={type}
        {...inputConfig}
      />
      {error && <span className="text-sm text-red-500">{error?.message}</span>}
    </div>
  );
};

export default FormControl;
