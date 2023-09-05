import { useState } from "react";
import { Howler } from "howler";
import React from "react";

//Test to integrate continious bpm analysis

// Define a type for the track
type Track = {
  url: string;
  name: string;
};

const FileUpload: React.FC<{ onLoadTrack: (url: string) => void }> = ({
  onLoadTrack,
}) => {
  const [files, setFiles] = useState<Track[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Create a blob URL
      const url = URL.createObjectURL(file);

      // Add new file URL and the original file name to the files state
      setFiles((prevFiles) => [...prevFiles, { url, name: file.name }]);
      onLoadTrack(url);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <ul>
        {files.map((track, index) => (
          <li key={index}>
            {track.name}
            <button onClick={() => onLoadTrack(track.url)}>Load</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
