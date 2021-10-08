import React, { useEffect, useState } from "react";
import axios from "axios";
const ImageList = ({ imgs }) => {
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
