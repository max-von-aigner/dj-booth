import { Howl, Howler } from "howler";
import React from "react";
import { useState } from "react";
import PlayPauseBtn from "@/components/PlayPauseBtn";
import LineFader from "@/components/LineFader";
import PitchFader from "@/components/PitchFader";
import FileUpload from "@/components/FileUpload";
import Head from "next/head";
import TrackProgressBar from "@/components/TrackProgressBar";
import PitchDrag from "@/components/PitchDrag";
import SpinnerImage from "@/components/SpinnerImage";
import BpmAnalyzer from "@/components/BpmAnalyzer";

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

  // Set the original bpm on load, and calculated bpm after pitch is changed
  const [originalBpmA, setOriginalBpmA] = useState<number | null>(null);
  const [originalBpmB, setOriginalBpmB] = useState<number | null>(null);

  const [calculatedBpmA, setCalculatedBpmA] = useState<number | null>(null);
  const [calculatedBpmB, setCalculatedBpmB] = useState<number | null>(null);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className="h-screen flex flex-row relative mx-8 pt-12">
        <div
          className=" flex flex-col  w-[30vw] h-[80vh] bg-theme-blue rounded-3xl p-10 drop-shadow-2xl"
          id="playerA"
        >
          <div className="flex flex-col justify-self-center">
            <span className="font-sans font-bold text-center -mt-4 mb-10">
              Player A
            </span>
          </div>
          <div className="flex flex-row">
            <PitchFader
              sound={soundA}
              setCalculatedBpm={setCalculatedBpmA}
              originalBpm={originalBpmA}
            />
            <SpinnerImage spin={isPlayingA} />
          </div>
          <PitchDrag sound={soundA} />
          <FileUpload onLoadTrack={handleLoadTrackA} />
          <PlayPauseBtn
            isPlaying={isPlayingA}
            setIsPlaying={setIsPlayingA}
            sound={soundA}
          />
          <TrackProgressBar sound={soundA} />
          <BpmAnalyzer url={urlSoundA} setBpm={setOriginalBpmA} />
          {originalBpmA ? <div>Original BPM: {originalBpmA}</div> : null}
          {calculatedBpmA ? (
            <div>Calculated BPM: {calculatedBpmA.toFixed(2)}</div>
          ) : null}
        </div>

        <div
          className=" flex flex-col bg-indigo-400 w-[30vw] h-[50vh] ml-7 mt-56 rounded-3xl p-10 drop-shadow-2xl"
          id="mixer"
        >
          <span className="font-sans font-bold text-center -mt-4 mb-10 ">
            Mixer
          </span>
          <div className="flex flex-row justify-items-end align-middle ">
            <LineFader sound={soundA} volume={volumeA} setVolume={setVolumeA} />
            <LineFader sound={soundB} volume={volumeB} setVolume={setVolumeB} />
          </div>
        </div>
        <div
          className="Player_B flex flex-col  w-[30vw] h-[80vh] bg-theme-blue rounded-3xl p-10 absolute right-0 drop-shadow-2xl"
          id="playerB"
        >
          <span className="font-sans font-bold text-center -mt-4 mb-10">
            Player B
          </span>
          <div className="flex flex-row">
            <PitchFader
              sound={soundB}
              setCalculatedBpm={setCalculatedBpmB}
              originalBpm={originalBpmB}
            />
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
          <BpmAnalyzer url={urlSoundB} setBpm={setOriginalBpmB} />
          {originalBpmB ? <div>Original BPM: {originalBpmB}</div> : null}
          {calculatedBpmB ? (
            <div>Calculated BPM: {calculatedBpmB.toFixed(2)}</div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default DjBooth;
