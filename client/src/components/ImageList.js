import React, { useContext, useState } from "react";
import "./ImageList.css";
import { ImageContext } from "../context/ImgContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ImageList = () => {
  const { imgs, myImages, isPublic, setIsPublic } = useContext(ImageContext);
  const [me] = useContext(AuthContext);
  let postImg = (isPublic ? imgs : myImages).map(img => {
    return (
      <Link key={img.key} to={`/images/${img._id}`}>
        <img alt="" src={`http://localhost:5000/uploads/${img.key}`} />
      </Link>
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
      <div className="image-list-container">{postImg}</div>
    </>
  );
};

export default ImageList;
