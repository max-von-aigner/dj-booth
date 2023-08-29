import { useState } from "react";

// Initialize volume state

const LineFader = () => {
  const [volume, setVolume] = useState(Howler.volume());

  // Function to handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let volume = parseFloat(e.target.value);
    Howler.volume(volume / 100); // slider returns a value from 0 - 100, we convert it to 0 - 1
    setVolume(volume);
  };
  return (
    <div>
      <p>Line Fader</p>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default LineFader;
