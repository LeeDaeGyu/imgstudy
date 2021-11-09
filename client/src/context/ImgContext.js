import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
export const ImageContext = createContext();

export const ImageProvider = prop => {
  const [imgs, setImgs] = useState([]);
  const [myImages, setMyImages] = useState([]);
  const [me] = useContext(AuthContext);
  const [isPublic, setIsPublic] = useState();
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
  useEffect(() => {
    if (me) {
      axios
        .get("/users/me/images")
        .then(res => {
          setMyImages(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [me]);
  return (
    <ImageContext.Provider
      value={{ imgs, setImgs, myImages, setMyImages, isPublic, setIsPublic }}
    >
      {prop.children}
    </ImageContext.Provider>
  );
};
