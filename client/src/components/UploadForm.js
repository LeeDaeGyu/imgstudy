import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";
import { toast } from "react-toastify";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("이미지를 선택해주세요.");
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
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(res);
      toast.success("success");
    } catch (err) {
      toast.warn("fail");
      console.error(err);
    }
  };
  return (
    <form onSubmit={onSubmit}>
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
