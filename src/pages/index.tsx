import { Howl, Howler } from "howler";
import React from "react";
import { useState } from "react";
import PlayPauseBtn from "@/components/PlayPauseBtn";
import LineFader from "@/components/LineFader";
import PitchFader from "@/components/PitchFader";
import FileUpload from "@/components/FileUpload";
import NewLineFader from "@/components/NewLineFaderWithHeadphones";
import Head from "next/head";
import TrackVisual from "@/components/TrackVisual";
import PitchDrag from "@/components/PitchDrag";
import { motion } from "framer-motion";
import Image from "next/image";

// import BpmAnalyzer from "@/components/BpmAnalyzer";

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

  // Initialize BPM state
  const [bpmA, setBpmA] = useState(0);
  const [bpmB, setBpmB] = useState(0);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className="flex flex-row m-12 content-evenly relative">
        <div className="Player_1 flex items-center flex-col w-[30vw] h-[70vh] bg-theme-blue rounded-3xl p-10 drop-shadow-2xl">
          <span className="font-sans font-bold text-center">Player A</span>

          <PitchFader sound={soundRefA} />
          <PitchDrag sound={soundRefA} />
          <FileUpload onLoadTrack={handleLoadTrackA} />
          <PlayPauseBtn sound={soundRefA} />

          {soundRefA?.playing() ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, loop: Infinity }}
            >
              <Image />
            </motion.div>
          ) : null}
          <TrackVisual sound={soundRefA} />
          {/* <BpmAnalyzer sound={soundRefA} setBpm={setBpmA} /> */}
          <div>BPM: {bpmA}</div>
        </div>
        <div className="flex bg-indigo-400 w-[30vw] h-[50vh] border-2 border-black">
          Mixer
          <LineFader
            sound={soundRefA}
            volume={volumeA}
            setVolume={setVolumeA}
          />
          <LineFader
            sound={soundRefB}
            volume={volumeB}
            setVolume={setVolumeB}
          />
        </div>
        <div className="Player B flex flex-col w-[30vw] h-[70vh] bg-theme-blue rounded-3xl p-10 absolute right-0 drop-shadow-2xl">
          <span className="font-sans font-bold text-center">Player B</span>

          <PitchFader sound={soundRefB} />
          <PitchDrag sound={soundRefB} />
          <FileUpload onLoadTrack={handleLoadTrackB} />
          <PlayPauseBtn sound={soundRefB} />
          <TrackVisual sound={soundRefB} />
          {/* <BpmAnalyzer sound={soundRefB} setBpm={setBpmB} /> */}
          <div>BPM: {bpmB}</div>
        </div>
      </div>
    </>
  );
};

export default DjBooth;
