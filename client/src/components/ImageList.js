import React, { useContext, useState } from "react";

import { ImageContext } from "../context/ImgContext";

const ImageList = () => {
  const { imgs, myImages, isPublic, setIsPublic } = useContext(ImageContext);

  let postImg = (isPublic ? imgs : myImages).map(img => {
    return (
      <img
        alt=""
        key={img.key}
        style={{ width: "100%" }}
        src={`http://localhost:5000/uploads/${img.key}`}
      />
    );
  });

  return (
    <>
      <h2 style={{ display: "inline-block", marginRight: "10px" }}>
        Image List ({isPublic ? "공개" : "개인"} 사진 )
      </h2>
      <button
        onClick={() => {
          setIsPublic(!isPublic);
        }}
      >
        {(isPublic ? "개인" : "공개") + " 사진 보기"}
      </button>

      {postImg}
    </>
  );
};

export default ImageList;
