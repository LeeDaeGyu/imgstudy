import React from "react";
import UploadForm from "../components/UploadForm";
import ImageList from "../components/ImageList";

const MainPage = () => {
  return (
    <>
      <h2>사진첩</h2>
      <UploadForm />
      <ImageList />
    </>
  );
};

export default MainPage;
