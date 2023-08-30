import { useState } from "react";

// Initialize volume state

interface LineFaderProps {
  sound: Howl | null;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const LineFaderA: React.FC<LineFaderProps> = ({ sound, volume, setVolume }) => {
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
      <input
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default LineFaderA;
