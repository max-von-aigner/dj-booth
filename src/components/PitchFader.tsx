import { cn } from "@/lib/utils";
import { MutableRefObject, useState } from "react";
import { Slider } from "@/components/ui/slider";

// Function to handle the rate change (playback speed of the track)
// const handleRateChange = (value: number) => {
//   let rate = parseFloat(value.toString());
//   sound?.rate(rate);
//   setRate(rate);
// };

const PitchFader = ({ sound }: { sound: Howl | null }) => {
  const [rate, setRate] = useState(1.0);

  // Function to handle the rate change (playback speed of the track)
  const handleRateChange = (val: number[]) => {
    let rate = val;
    sound?.rate(val[0]);
    setRate(val[0]);
  };
  return (
    <div>
      <p>Pitch</p>
      <Slider
        min={0.84}
        max={1.16}
        step={0.005}
        value={[rate]}
        onValueChange={handleRateChange}
        className="h-60 w-2 flex-col"
        orientation="vertical"
      />
      {/* <input
        type="range"
        min="0.84"
        max="1.16"
        step="0.005"
        value={rate}
        onChange={handleRateChange}
      /> */}
    </div>
  );
};

export default PitchFader;
