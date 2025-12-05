import React from "react";
import loaderGif from "../assets/loader.gif";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <img src={loaderGif} alt="Loading..." className="w-24 h-24" />
    </div>
  );
};

export default Loader;
