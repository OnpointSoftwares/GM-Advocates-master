import React from "react";

const PractiseAreaBg = ({ title }) => {
  return (
    <div className="relative h-64 bg-cover bg-center flex items-center justify-center" 
         style={{ backgroundImage: "url('/images/practise-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-4xl font-bold text-center">{title}</h1>
      </div>
    </div>
  );
};

export default PractiseAreaBg;
 