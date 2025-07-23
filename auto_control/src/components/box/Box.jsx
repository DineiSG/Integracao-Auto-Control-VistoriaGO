import React from "react";
import Card from "../card/Card"

function Box({ children }) {
  return (
    <div className="container d-flex justify-content-center">
      <div className="row justify-content-center gx-2 gy-2 w-100">
        {children}
      </div>
    </div>
  );
}

export default Box;