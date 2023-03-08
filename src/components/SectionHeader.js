import React from "react";
import logo from "../assets/hot-pot.png";

const SectionHeader = ({ title }) => {
  return (
    <div className="flex justify-center align-center my-10">
      <div className="text-5xl flex flex justify-center font-semibold items-center">
        <img className="h-10 mr-3 sm:h-12" src={logo} />
        <span>{title}</span>
      </div>
    </div>
  );
};

export default SectionHeader;
