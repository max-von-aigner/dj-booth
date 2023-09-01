import { Howl, Howler } from "howler";
import React from "react";
import { useState } from "react";
import PlayPauseBtn from "@/components/PlayPauseBtn";
import LineFader from "@/components/LineFader";
import PitchFader from "@/components/PitchFader";
import FileUpload from "@/components/FileUpload";
import NewLineFader from "@/components/NewLineFaderWithHeadphones";
import Head from "next/head";

const DjBooth = () => {
  // initialize sound instance
  const [soundRefA, setSoundRefA] = useState<Howl | null>(null);
  const [soundRefB, setSoundRefB] = useState<Howl | null>(null);

  // Load handlers
  const handleLoadTrackA = (url: string) => {
    const newTrack = new Howl({
      src: [url],
      html5: true,
      preload: true,
    });
    setSoundRefA(newTrack);
  };

  const handleLoadTrackB = (url: string) => {
    const newTrack = new Howl({
      src: [url],
      html5: true,
      preload: true,
    });
    setSoundRefB(newTrack);
  };

  // Initialize volume state
  const [volumeA, setVolumeA] = useState(1.0);
  const [volumeB, setVolumeB] = useState(1.0);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className="flex flex-row m-12 relative">
        <div className="flex items-center flex-col w-[30vw] h-[70vh] bg-theme-blue rounded-3xl p-10 drop-shadow-2xl space-y-8">
          <span className="font-sans font-bold text-center">Player A</span>

          <LineFader
            sound={soundRefA}
            volume={volumeA}
            setVolume={setVolumeA}
          />
          <PitchFader sound={soundRefA} />
          <FileUpload onLoadTrack={handleLoadTrackA} />
          <PlayPauseBtn sound={soundRefA} />
        </div>
        <div className="Player B flex flex-col w-[30vw] h-[70vh] bg-theme-blue rounded-3xl p-10 absolute right-0 drop-shadow-2xl">
          <span className="font-sans font-bold text-center">Player B</span>

          <LineFader
            sound={soundRefB}
            volume={volumeB}
            setVolume={setVolumeB}
          />
          <PitchFader sound={soundRefB} />
          <FileUpload onLoadTrack={handleLoadTrackB} />
          <PlayPauseBtn sound={soundRefB} />
        </div>
      </div>
    </>
  );
};

export default DjBooth;
