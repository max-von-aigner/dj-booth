import { Howl, Howler } from "howler";
import { stringify } from "querystring";
import React from "react";
import { useEffect, useState, useRef } from "react";
import PlayPauseBtn from "@/components/playPauseBtn";
import LineFader from "@/components/LineFader";
import PitchFader from "@/components/PitchFader";
import FileUpload from "@/components/FileUpload";

// Howler.volume(0.5);

// function DjBooth() {
//   const sound = useRef(
//     new Howl({
//       src: ["/music/De Los Angeles (Ute Version).wav"],
//       html5: true,
//       preload: true,
//     })
//   );

const DjBooth: React.FC = () => {
  const [soundRef, setSoundRef] = useState<Howl | null>(null);

  const handleLoadTrack = (url: string) => {
    console.log("Hello");
    const newTrack = new Howl({
      src: [url],
      html5: true,
      preload: true,
    });
    setSoundRef(newTrack);
  };

  return (
    <div>
      <PlayPauseBtn sound={soundRef} />
      <LineFader />
      <PitchFader sound={soundRef} />

      <FileUpload onLoadTrack={handleLoadTrack} />
    </div>
  );
};

export default DjBooth;
