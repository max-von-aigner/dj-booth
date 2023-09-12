import React, { useRef, ChangeEvent } from "react";

const FileUpload: React.FC = () => {
  const inputFile = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current?.click();
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (!file) return;

    console.log(file.name);
    // process your file here
  };

  return (
    <>
      <button onClick={handleButtonClick}>Custom Upload Text</button>
      <input
        type="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </>
  );
};

export default FileUpload;
