import { useState } from "react";
import { Slider } from "@/components/ui/slider";

// Initialize volume state

interface LineFaderProps {
  sound: Howl | null;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const LineFader: React.FC<LineFaderProps> = ({ sound, volume, setVolume }) => {
  console.log(volume);
  // Function to handle volume change
  const handleVolumeChange = (e: number[]) => {
    // console.log({ volume });
    let newVolume = e[0];
    if (sound) {
      sound.volume(newVolume);
    }

    console.log({ newVolume });
    setVolume(newVolume);
  };

  console.log(volume);
  console.log(volume * 100);

  return (
    <div>
      <Slider
        defaultValue={[0.7]}
        min={0}
        max={1}
        step={0.01}
        value={[volume]}
        onValueChange={handleVolumeChange}
        className="h-60 w-4 flex-col drop-shadow-md"
        orientation="vertical"
      />
    </div>
  );
};

export default LineFader;
