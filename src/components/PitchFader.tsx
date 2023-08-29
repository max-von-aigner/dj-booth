import { MutableRefObject, useState } from "react";

const PitchFader = ({ sound }: { sound: MutableRefObject<Howl> }) => {
  const [rate, setRate] = useState(1.0);

  // Function to handle the rate change (playback speed of the track)
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rate = parseFloat(e.target.value);
    sound.current.rate(rate);
    setRate(rate);
  };
  return (
    <div>
      <p>Pitch</p>
      <input
        type="range"
        min="0.84"
        max="1.16"
        step="0.005"
        value={rate}
        onChange={handleRateChange}
      />
    </div>
  );
};

export default PitchFader;
