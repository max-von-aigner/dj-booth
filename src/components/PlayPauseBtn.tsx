import { MutableRefObject, useRef } from "react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

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
  // const [isPlaying, setIsPlaying] = useState(false);

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
      <Button
        className="bg-theme-yellow rounded-full absolute h-20 w-20 right-0 bottom-0 m-4 border-2 drop-shadow-2xl border-white"
        onClick={togglePlayPause}
      >
        {isPlaying ? "Pause" : "Play"}
      </Button>
    </div>
  );
};
export default PlayPauseBtnA;
