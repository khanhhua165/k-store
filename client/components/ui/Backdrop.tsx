import React from "react";

const Backdrop: React.FC<{ cb: () => void }> = ({ cb }) => {
  return (
    <div
      className="fixed inset-0 z-40 hidden bg-gray-800 opacity-70 sm:flex"
      onClick={cb}
    ></div>
  );
};

export default Backdrop;
