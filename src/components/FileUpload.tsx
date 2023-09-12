import { useState } from "react";
import React from "react";
import { Input } from "@/components/ui/input";

// Define a type for the track
export type Track = {
  url: string;
  name: string;
};

type FileUploadProps = {
  onLoadTrack: (track: Track) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ onLoadTrack }) => {
  const [files, setFiles] = useState<Track[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);

      // Create a new track object
      const track = { url, name: file.name };

      // Add new file track to the files state
      setFiles((prevFiles) => [...prevFiles, track]);

      // Call parent's handler with the new track
      onLoadTrack(track);
    }
  };

  return (
    <div className="mb-4">
      <Input
        type="file"
        onChange={handleFileUpload}
        className=" bg-slate-300 bg-opacity-70"
      />

      {files.map((track, index) => (
        <>
          <div key={track.name} className="hidden">
            {track.name}
            <button onClick={() => onLoadTrack(track)}>Load</button>
          </div>
        </>
      ))}
    </div>
  );
};

export default FileUpload;
