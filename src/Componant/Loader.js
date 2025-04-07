import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <>
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </>
  );
}

export default Loader;
