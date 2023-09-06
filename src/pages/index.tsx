import { Howl, Howler } from "howler";
import React from "react";
import { useState } from "react";
import PlayPauseBtn from "@/components/PlayPauseBtn";
import LineFader from "@/components/LineFader";
import PitchFader from "@/components/PitchFader";
import FileUpload from "@/components/FileUpload";
import NewLineFader from "@/components/NewLineFaderWithHeadphones";
import Head from "next/head";
import TrackProgressBar from "@/components/TrackProgressBar";
import PitchDrag from "@/components/PitchDrag";
import { motion } from "framer-motion";
import SpinnerImage from "@/components/SpinnerImage";
import BpmAnalyzerContinious from "@/components/BpmAnalyzerContinious";
// import BpmAnalyzer from "@/components/BpmAnalyzer";
import BpmAnalyzerChatGPT from "@/components/ChatGptBpmAnalyzer";

// import BpmAnalyzer from "@/components/BpmAnalyzer";

const DjBooth = () => {
  // initialize sound instance
  const [soundA, setSoundA] = useState<Howl | null>(null);
  const [soundB, setSoundB] = useState<Howl | null>(null);

  const [urlSoundA, setUrlSoundA] = useState<string | null>(null);
  const [urlSoundB, setUrlSoundB] = useState<string | null>(null);

  // initialize state for
  const [isPlayingA, setIsPlayingA] = useState(false);
  const [isPlayingB, setIsPlayingB] = useState(false);

  // Load handlers
  const handleLoadTrackA = (url: string) => {
    setUrlSoundA(url);
    const newTrack = new Howl({
      src: [url],
      html5: true,
      preload: true,
    });
    setSoundA(newTrack);
  };

  const handleLoadTrackB = (url: string) => {
    setUrlSoundB(url);
    const newTrack = new Howl({
      src: [url],
      html5: true,
      preload: true,
    });
    setSoundB(newTrack);
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
        <div
          className=" flex flex-col w-[30vw] h-[70vh] bg-theme-blue rounded-3xl p-10 drop-shadow-2xl"
          id="playerA"
        >
          <span className="font-sans font-bold text-center">Player A</span>
          <div className="flex flex-row">
            <PitchFader sound={soundA} />
            <SpinnerImage spin={isPlayingA} />
          </div>
          <PitchDrag sound={soundA} />
          <FileUpload onLoadTrack={handleLoadTrackA} />
          <BpmAnalyzerContinious src="/Users/max/Coding/dj-booth/public/music/Byron Yeates, Roza Terenzi & D. Tiffany - Roza Terenzi - Gush (Byron Yeates Remix).mp3" />
          <PlayPauseBtn
            isPlaying={isPlayingA}
            setIsPlaying={setIsPlayingA}
            sound={soundA}
          />

          <TrackProgressBar sound={soundA} />
          <BpmAnalyzerChatGPT url={urlSoundA} />
          <div>BPM: {bpmA}</div>
        </div>
        <div className="Mixer flex flex-col bg-indigo-400 w-[30vw] h-[50vh] rounded-3xl p-10 drop-shadow-2xl">
          <span className="font-sans font-bold text-center">Mixer</span>
          <div className="flex flex-row">
            <LineFader sound={soundA} volume={volumeA} setVolume={setVolumeA} />
            <LineFader sound={soundB} volume={volumeB} setVolume={setVolumeB} />
          </div>
        </div>
        <div
          className="Player_B flex flex-col w-[30vw] h-[70vh] bg-theme-blue rounded-3xl p-10 absolute right-0 drop-shadow-2xl"
          id="playerB"
        >
          <span className="font-sans font-bold text-center">Player B</span>
          {/* <BpmAnalyzer url={urlSoundB} /> */}
          <PitchFader sound={soundB} />
          <PitchDrag sound={soundB} />
          <FileUpload onLoadTrack={handleLoadTrackB} />
          <PlayPauseBtn
            isPlaying={isPlayingB}
            setIsPlaying={setIsPlayingB}
            sound={soundB}
          />
          <TrackProgressBar sound={soundB} />
          {/* <BpmAnalyzer sound={soundRefB} setBpm={setBpmB} /> */}
          <div>BPM: {bpmB}</div>
        </div>
      </div>
    </>
  );
};

export default DjBooth;
