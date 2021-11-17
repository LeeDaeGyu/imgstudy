import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ImageContext } from "../context/ImgContext";
const ImagePages = () => {
  const { imageId } = useParams();
  const { imgs, myImages } = useContext(ImageContext);

  const image =
    imgs.find(img => img._id === imageId) ||
    myImages.find(img => img._id === imageId);

  if (!image) return <h2>Loading...</h2>;
  return (
    <div>
      <h3>ImagePages -{imageId}</h3>
      <img
        style={{ width: "100%" }}
        alt={imageId}
        src={`http://localhost:5000/uploads/${image.key}`}
      />
    </div>
  );
};

export default ImagePages;
