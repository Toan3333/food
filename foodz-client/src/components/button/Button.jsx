import React, { useEffect } from "react";

const Button = ({ children, className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`py-6 px-12 bg-primary rounded-[40px] text-white text-[26px] font-semibold ${className}`}>
      {children}
    </button>
  );
};

export default Button;
