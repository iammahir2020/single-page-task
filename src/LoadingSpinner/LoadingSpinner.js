import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border-t-transparent w-20 h-20 border-4 border-blue-900 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
