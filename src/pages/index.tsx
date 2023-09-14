import { Howl, Howler } from "howler";
import React from "react";
import { useState, useEffect } from "react";
import PlayPauseBtn from "@/components/PlayPauseBtn";
import LineFader from "@/components/LineFader";
import PitchFader from "@/components/PitchFader";
import FileUpload from "@/components/FileUpload";
import Head from "next/head";
import TrackProgressBar from "@/components/TrackProgressBar";
import PitchBend from "@/components/PitchBend";
import SpinnerImage from "@/components/SpinnerImage";
import BpmAnalyzer from "@/components/BpmAnalyzer";
import { Badge } from "@/components/ui/badge";
import { DragButton } from "@/components/DragButton";
import Ticker from "@/components/Ticker";
import { Track } from "@/components/FileUpload";
// import "/Users/max/Coding/dj-booth/src/fonts/fonts.css";
import Logo from "@/components/Logo";
import Mixer from "@/components/Mixer";
import Waveform from "@/components/Waveform";

const DjBooth = () => {
  // Initialize sound instance
  const [soundA, setSoundA] = useState<Howl | null>(null);
  const [soundB, setSoundB] = useState<Howl | null>(null);

  const [urlSoundA, setUrlSoundA] = useState<string | null>(null);
  const [urlSoundB, setUrlSoundB] = useState<string | null>(null);

  const [newTrackForTickerA, setNewTrackForTickerA] = useState<Track | null>(
    null
  );
  const [newTrackForTickerB, setNewTrackForTickerB] = useState<Track | null>(
    null
  );

  // Initialize state for PlauPauseButton
  const [isPlayingA, setIsPlayingA] = useState(false);
  const [isPlayingB, setIsPlayingB] = useState(false);

  type HowlerTrack = Track & { howler: Howl };

  useEffect(() => {
    console.log("DjBooth rendered");
  }, []);

  // Load handlers
  const handleLoadTrackA = (track: Track) => {
    const newTrack = new Howl({
      src: [track.url],
      html5: true,
      preload: true,
    });
    setSoundA(newTrack);
    setNewTrackForTickerA(track);
    setUrlSoundA(track.url);
  };

  const handleLoadTrackB = (track: Track) => {
    const newTrack = new Howl({
      src: [track.url],
      html5: true,
      preload: true,
    });
    setUrlSoundB(track.url);
    setSoundB(newTrack);
    setNewTrackForTickerB(track);
  };

  // Initialize volume state
  const [volumeA, setVolumeA] = useState(1.0);
  const [volumeB, setVolumeB] = useState(1.0);

  // Set the original bpm on load, and calculated bpm after pitch is changed
  const [originalBpmA, setOriginalBpmA] = useState<number | null>(null);
  const [originalBpmB, setOriginalBpmB] = useState<number | null>(null);

  const [calculatedBpmA, setCalculatedBpmA] = useState<number | null>(null);
  const [calculatedBpmB, setCalculatedBpmB] = useState<number | null>(null);

  // Get the duration and current time from your Howler player for Waveform
  function getCurrentTimeFraction(howl: Howl) {
    const duration = howl.duration();
    const currentTime = howl.seek();
    return currentTime / duration;
  }

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className="h-screen flex flex-row relative justify-between mx-8 mt-16 pt-12">
        <div
          className=" flex flex-col  w-[30vw] h-[80vh] my-12 bg-theme-blue rounded-3xl p-10 drop-shadow-neo border-4 border-black"
          id="playerA"
        >
          <div className="flex flex-col justify-self-center">
            <span className="font-sans font-bold text-center -mt-4 mb-10 text-2xl tracking-wider text-slate-200 opacity-70">
              Player A
            </span>
          </div>

          <div className="flex flex-row" id="midSection">
            <div
              className="flex flex-row items-center mb-10 relative w-full"
              id="pitchSection"
            >
              <PitchFader
                sound={soundA}
                setCalculatedBpm={setCalculatedBpmA}
                originalBpm={originalBpmA}
              />
              <PitchBend sound={soundA} />

              <SpinnerImage spin={isPlayingA} />
            </div>
          </div>
          <BpmAnalyzer url={urlSoundA} setBpm={setOriginalBpmA} />
          <div className="flex flex-row justify-center mb-2">
            {calculatedBpmA ? (
              <Badge>BPM: {calculatedBpmA.toFixed(2)}</Badge>
            ) : originalBpmA ? (
              <Badge>BPM: {originalBpmA}</Badge>
            ) : (
              <Badge>BPM: 0</Badge>
            )}
          </div>

          <FileUpload onLoadTrack={handleLoadTrackA} />
          <Ticker track={newTrackForTickerA} />
          <TrackProgressBar sound={soundA} />
          <div className="flex justify-center">
            <PlayPauseBtn
              isPlaying={isPlayingA}
              setIsPlaying={setIsPlayingA}
              sound={soundA}
            />
          </div>
        </div>
        <div className=" flex flex-col ">
          <Logo />
          <div className="flex flex-col mt-2 border-black rounded-2xl border-4 bg-theme-blue drop-shadow-neo py-2 h-[30vh]">
            <Waveform url={urlSoundA} howlInstance={soundA} />
            <Waveform url={urlSoundB} howlInstance={soundB} />
          </div>
          <Mixer
            soundA={soundA}
            soundB={soundB}
            volumeA={volumeA}
            volumeB={volumeB}
            setVolumeA={setVolumeA}
            setVolumeB={setVolumeB}
          />
        </div>
        <div
          className="Player_B flex flex-col my-12 w-[30vw] h-[80vh] bg-theme-blue rounded-3xl p-10 drop-shadow-neo border-4 border-black"
          id="playerB"
        >
          <span className="font-sans font-bold text-center -mt-4 mb-10 text-2xl tracking-wider text-slate-200 opacity-70">
            Player B
          </span>
          <div className="flex flex-row items-center mb-10 relative">
            <PitchFader
              sound={soundB}
              setCalculatedBpm={setCalculatedBpmB}
              originalBpm={originalBpmB}
            />
            <PitchBend sound={soundB} />
            <SpinnerImage spin={isPlayingB} />
          </div>
          <BpmAnalyzer url={urlSoundB} setBpm={setOriginalBpmB} />
          <div className="flex flex-row justify-center mb-2">
            {calculatedBpmB ? (
              <Badge>BPM: {calculatedBpmB.toFixed(2)}</Badge>
            ) : originalBpmB ? (
              <Badge>BPM: {originalBpmB}</Badge>
            ) : (
              <Badge>BPM: 0</Badge>
            )}
          </div>
          <FileUpload onLoadTrack={handleLoadTrackB} />
          <Ticker track={newTrackForTickerB}></Ticker>
          <TrackProgressBar sound={soundB} />
          <div className="flex justify-center">
            <PlayPauseBtn
              isPlaying={isPlayingB}
              setIsPlaying={setIsPlayingB}
              sound={soundB}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DjBooth;
