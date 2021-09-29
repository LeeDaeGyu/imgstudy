import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("이미지를 선택해주세요.");
  const formChange = e => {
    const UploadedFile = e.target.files[0];
    setFile(UploadedFile);
    setFileName(UploadedFile.name);
  };
  return (
    <form>
      <label htmlFor="image">{fileName}</label>
      <input id="image" type="file" onChange={formChange} />
      <button type="submit">제출</button>
    </form>
  );
};

export default UploadForm;
