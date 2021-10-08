import React, { useEffect, useState } from "react";
import axios from "axios";
const ImageList = () => {
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    axios
      .get("/images")
      .then(res => {
        setImgs(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let postImg = imgs.map(img => {
    return (
      <img
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
