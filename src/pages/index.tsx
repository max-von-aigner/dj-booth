import { Howl, Howler } from "howler";
import { stringify } from "querystring";
import React from "react";
import { useEffect, useState, useRef } from "react";
import PlayPauseBtn from "@/components/playPauseBtn";
import LineFader from "@/components/LineFader";
import PitchFader from "@/components/PitchFader";

// Howler.volume(0.5);

// Play button plays the audio file - Pause button pauses audio file - When play button is then clicked again, replay will resume where it was paused
function PlayPause() {
  const sound = useRef(
    new Howl({
      src: ["/music/De Los Angeles (Ute Version).wav"],
      html5: true,
      preload: true,
    })
  );

  return (
    <div>
      <PlayPauseBtn sound={sound} />

      <LineFader />

      <PitchFader sound={sound} />
    </div>
  );
}

export default PlayPause;
