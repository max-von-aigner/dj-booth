import { MutableRefObject, useRef } from "react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

// Play button plays the audio file - Pause button pauses audio file - When play button is then clicked again, replay will resume where it was paused
const PlayPauseBtnA = ({
  sound,
  isPlaying,
  setIsPlaying,
}: {
  sound: Howl | null;
  isPlaying: boolean;
  setIsPlaying: (newState: boolean) => void;
}) => {
  const togglePlayPause = () => {
    if (sound === null) return null;
    if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
    } else {
      sound.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <Toggle
        className="bg-theme-yellow rounded-2xl h-14 w-24  m-4 mt-14 border-2  border-white text-xl"
        onClick={togglePlayPause}
      >
        {isPlaying ? "Pause" : "Play"}
      </Toggle>
    </div>
  );
};
export default PlayPauseBtnA;
