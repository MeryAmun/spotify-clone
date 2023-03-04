import React from "react";
import { CircularProgress } from "@mui/material";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <center>
        <CircularProgress />
      </center>
    </div>
  );
};

export default Loader;
