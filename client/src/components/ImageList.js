import React, { useContext, useState } from "react";

import { ImageContext } from "../context/ImgContext";
import { AuthContext } from "../context/AuthContext";

const ImageList = () => {
  const { imgs, myImages, isPublic, setIsPublic } = useContext(ImageContext);
  const [me] = useContext(AuthContext);
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
      {me && (
        <button
          onClick={() => {
            setIsPublic(!isPublic);
          }}
        >
          {(isPublic ? "개인" : "공개") + " 사진 보기"}
        </button>
      )}

      {postImg}
    </>
  );
};

export default ImageList;
