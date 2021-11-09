import React, { useState, useContext } from "react";
import axios from "axios";
import "./UploadForm.css";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar.js";
import { ImageContext } from "../context/ImgContext";

const UploadForm = () => {
  const { imgs, setImgs, myImages, setMyImages } = useContext(ImageContext);
  const defaultFileName = "이미지를 선택해주세요.";
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);
  const [percent, setPercent] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [isPublic, setIsPublic] = useState(true);

  const imgSelectHandler = e => {
    const UploadedFile = e.target.files[0];
    setFile(UploadedFile);
    setFileName(UploadedFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(UploadedFile);
    fileReader.onload = e => {
      setImgSrc(e.target.result);
    };
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("public", isPublic);
    try {
      const res = await axios.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: e => {
          setPercent(Math.round((100 * e.loaded) / e.total));
        }
      });

      toast.success("success");
      setTimeout(() => {
        setPercent(0);
        setFileName(defaultFileName);
        setImgSrc(null);
      }, 3000);

      if (isPublic) setImgs([...imgs, res.data]);
      else setMyImages([...myImages, res.data]);
    } catch (err) {
      toast.warn(err.response.data.message);
      console.log(err);
      setFileName(defaultFileName);
      setPercent(0);
      setImgSrc(null);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <img
        alt=""
        src={imgSrc}
        className={`"image-preview" ${imgSrc && "image-preview-show"}`}
      />
      <ProgressBar percent={percent} />
      <div className="file-dropper">
        {fileName}
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={imgSelectHandler}
        />
      </div>
      <input
        type="checkbox"
        id="public-check"
        value={!isPublic}
        onChange={() => {
          setIsPublic(!isPublic);
        }}
      />
      <label htmlFor="public-check">비공개</label>
      <button className="submitBtn " type="submit">
        제출
      </button>
    </form>
  );
};

export default UploadForm;
