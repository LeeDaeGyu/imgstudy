import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar.js";

const UploadForm = () => {
  const defaultFileName = "이미지를 선택해주세요.";
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);
  const [percent, setPercent] = useState(0);
  const imgSelectHandler = e => {
    const UploadedFile = e.target.files[0];
    setFile(UploadedFile);
    setFileName(UploadedFile.name);
  };
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: e => {
          setPercent(Math.round((100 * e.loaded) / e.total));
        }
      });
      console.log(res);
      toast.success("success");
      setTimeout(() => {
        setPercent(0);
        setFileName(defaultFileName);
      }, 3000);
    } catch (err) {
      toast.warn("fail");
      console.error(err);
      setPercent(0);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <ProgressBar percent={percent} />
      <div className="file-dropper">
        {fileName}
        <input id="image" type="file" onChange={imgSelectHandler} />
      </div>
      <button className="submitBtn " type="submit">
        제출
      </button>
    </form>
  );
};

export default UploadForm;
