import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ImageContext } from "./context/ImgContext";

const ImageList = () => {
  const [imgs] = useContext(ImageContext);

  let postImg = imgs.map(img => {
    return (
      <img
        key={img.key}
        style={{ width: "100%" }}
        src={`http://localhost:5000/uploads/${img.key}`}
      />
    );
  });

  return (
    <>
      <h2>Image List</h2>
      {postImg}
    </>
  );
};

export default ImageList;
