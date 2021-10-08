import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ImageContext = createContext();

export const ImageProvider = prop => {
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
  return (
    <ImageContext.Provider value={[imgs, setImgs]}>
      {prop.children}
    </ImageContext.Provider>
  );
};
