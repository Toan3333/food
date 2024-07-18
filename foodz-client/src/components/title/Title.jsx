import React from "react";

const Title = ({ children }) => {
  return (
    <div>
      <h1 className="text-[52px] font-bold leading-normal">{children}</h1>
    </div>
  );
};

export default Title;
