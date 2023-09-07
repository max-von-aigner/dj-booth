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
import { Separator } from "@/components/ui/separator";

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
      <div className="bg-green-400 w-screen h-screen -mt-12">
        <div className="flex flex-row m-12  relative">
          <div
            className=" flex flex-col mt-12 w-[30vw] h-[80vh] bg-theme-blue rounded-3xl p-10 drop-shadow-2xl"
            id="playerA"
          >
            <div className="flex flex-col justify-self-center">
              <span className="font-sans font-bold text-center -mt-4 mb-10">
                Player A
              </span>
            </div>
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
          <div
            className=" flex flex-col bg-indigo-400 w-[30vw] h-[50vh] ml-7 mt-56 rounded-3xl p-10 drop-shadow-2xl"
            id="mixer"
          >
            <span className="font-sans font-bold text-center -mt-4 mb-10 ">
              Mixer
            </span>
            <div className="flex flex-row justify-items-end align-middle ">
              <LineFader
                sound={soundA}
                volume={volumeA}
                setVolume={setVolumeA}
              />
              <LineFader
                sound={soundB}
                volume={volumeB}
                setVolume={setVolumeB}
              />
            </div>
          </div>
          <div
            className="Player_B flex flex-col mt-12 w-[30vw] h-[80vh] bg-theme-blue rounded-3xl p-10 absolute right-0 drop-shadow-2xl"
            id="playerB"
          >
            <span className="font-sans font-bold text-center -mt-4 mb-10">
              Player B
            </span>
            {/* <BpmAnalyzer url={urlSoundB} /> */}
            <div className="flex flex-row">
              <PitchFader sound={soundB} />
              <SpinnerImage spin={isPlayingB} />
            </div>
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
      </div>
    </>
  );
};

export default DjBooth;
