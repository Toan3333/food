import React from "react";

const Heading = ({ children }) => {
  return (
    <div>
      <h2 className="text-secondary text-xl uppercase font-bold">{children}</h2>
    </div>
  );
};

export default Heading;
