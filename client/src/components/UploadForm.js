import React, { useState } from "react";
import axios from "axios";
const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("이미지를 선택해주세요.");
  const formChange = e => {
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
      alert("success");
    } catch (err) {
      alert("fail");
      console.error(err);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="image">{fileName}</label>
      <input id="image" type="file" onChange={formChange} />
      <button type="submit">제출</button>
    </form>
  );
};

export default UploadForm;
