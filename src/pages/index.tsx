import { Howl, Howler } from "howler";
import React from "react";
import { useState } from "react";
import PlayPauseBtn from "@/components/PlayPauseBtn";
import LineFader from "@/components/LineFader";
import PitchFader from "@/components/PitchFader";
import FileUpload from "@/components/FileUpload";

const DjBooth = () => {
  // initialize sound instance deck A
  const [soundRefA, setSoundRefA] = useState<Howl | null>(null);
  // Load handler for Deck A
  const handleLoadTrackA = (url: string) => {
    const newTrack = new Howl({
      src: [url],
      html5: true,
      preload: true,
    });
    setSoundRefA(newTrack);
  };

  // Initialize volume state deck A
  const [volumeA, setVolumeA] = useState(1.0);

  // initialize sound instance deck B
  const [soundRefB, setSoundRefB] = useState<Howl | null>(null);
  // Load handler for deck B
  const handleLoadTrackB = (url: string) => {
    const newTrack = new Howl({
      src: [url],
      html5: true,
      preload: true,
    });
    setSoundRefB(newTrack);
  };

  // Initialize volume state deck
  const [volumeB, setVolumeB] = useState(1.0);

  return (
    <div className="flex flex-row">
      <div className="Player A">
        <PlayPauseBtn sound={soundRefA} />
        <LineFader sound={soundRefA} volume={volumeA} setVolume={setVolumeA} />
        <PitchFader sound={soundRefA} />
        <FileUpload onLoadTrack={handleLoadTrackA} />
      </div>
      <div className="Player B">
        <PlayPauseBtn sound={soundRefB} />
        <LineFader sound={soundRefB} volume={volumeB} setVolume={setVolumeB} />
        <PitchFader sound={soundRefB} />
        <FileUpload onLoadTrack={handleLoadTrackB} />
      </div>
    </div>
  );
};

export default DjBooth;
