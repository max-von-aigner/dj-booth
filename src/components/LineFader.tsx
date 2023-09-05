import { useState } from "react";
import { Slider } from "@/components/ui/slider";

// Initialize volume state

interface LineFaderProps {
  sound: Howl | null;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const LineFader: React.FC<LineFaderProps> = ({ sound, volume, setVolume }) => {
  // Function to handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVolume = parseFloat(e.target.value) / 100;
    if (sound) {
      sound.volume(newVolume);
    }

    setVolume(newVolume);
  };
  return (
    <div>
      <p>Line Fader</p>
      <Slider
        min={0}
        max={100}
        value={[volume * 100]}
        onChange={handleVolumeChange}
        className="h-60 w-2 flex-col"
        orientation="vertical"
      />
    </div>
  );
};

export default LineFader;
