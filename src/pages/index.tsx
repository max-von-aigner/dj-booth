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
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";

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
      <ThemeProvider>
        <div className="">
          <div className="items-center flex justify-center mt-4 mb-2 fixed inset-x-0 z-10">
            <Logo />
          </div>
          <div>
            <ModeToggle />
          </div>
          <div className="grid grid-cols-3 gap-8 grid-rows-5 h-screen grid-flow-col pt-[94px] px-8 pb-8">
            <motion.div
              initial={{
                left: -500,
                scale: 0.8,
              }}
              animate={{
                left: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.75,
              }}
              className="relative flex flex-col bg-theme-blue rounded-3xl p-10 drop-shadow-neo border-4 border-black col-start-1 col-span-1 row-span-5"
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
                  <Badge className="text-xl">
                    BPM: {calculatedBpmA.toFixed(2)}
                  </Badge>
                ) : originalBpmA ? (
                  <Badge className="text-xl ">BPM: {originalBpmA}</Badge>
                ) : (
                  <Badge className="text-xl">BPM: 0</Badge>
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
            </motion.div>
            {/* <div className=" flex flex-col "> */}
            {/* <Logo /> */}
            {urlSoundA || urlSoundB ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                id="waveformContainer"
                className="flex flex-col border-black rounded-2xl border-4 bg-theme-blue drop-shadow-neo py-2 row-span-2"
              >
                <Waveform
                  id="waveform-player-a"
                  url={urlSoundA}
                  howlInstance={soundA}
                />
                <Waveform
                  id="waveform-player-b"
                  url={urlSoundB}
                  howlInstance={soundB}
                />
              </motion.div>
            ) : (
              <div className="row-span-2" />
            )}
            <Mixer
              soundA={soundA}
              soundB={soundB}
              volumeA={volumeA}
              volumeB={volumeB}
              setVolumeA={setVolumeA}
              setVolumeB={setVolumeB}
            />
            {/* </div> */}
            <motion.div
              initial={{
                left: 500,
                scale: 0.8,
              }}
              animate={{
                left: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.75,
              }}
              className="Player_B relative flex flex-col col-span-1 row-span-5  bg-theme-blue rounded-3xl p-10 drop-shadow-neo border-4 border-black"
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
                  <Badge className="text-xl ">
                    BPM: {calculatedBpmB.toFixed(2)}
                  </Badge>
                ) : originalBpmB ? (
                  <Badge className="text-xl ">BPM: {originalBpmB}</Badge>
                ) : (
                  <Badge className="text-xl ">BPM: 0</Badge>
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
            </motion.div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default DjBooth;
