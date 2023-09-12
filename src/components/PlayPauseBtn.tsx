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
        className="bg-theme-yellow rounded-full h-10 w-20  m-4 border-2 drop-shadow-md border-white"
        onClick={togglePlayPause}
      >
        {isPlaying ? "Pause" : "Play"}
      </Toggle>
    </div>
  );
};
export default PlayPauseBtnA;
