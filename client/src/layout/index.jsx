import React from "react";
import logo from "../assets/logo.webp";

function AuthLayouts({ children }) {
  return (
    <>
      <header className="flex justify-center items-center py-3 h-20 shadow-md bg-white">
        <div>
          <img src={logo} width={80} />
        </div>
      </header>
      {children}
    </>
  );
}

export default AuthLayouts;
