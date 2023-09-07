import { cn } from "@/lib/utils";
import { MutableRefObject, useState } from "react";
import { Slider } from "@/components/ui/slider";

type PitchFaderProps = {
  sound: Howl | null;
  setCalculatedBpm: (bpm: number | null) => void;
  originalBpm: number | null;
};

const PitchFader: React.FC<PitchFaderProps> = ({
  sound,
  setCalculatedBpm,
  originalBpm,
}) => {
  const [rate, setRate] = useState(1.0);

  // Function to handle the rate change (playback speed of the track)
  const handleRateChange = (val: number[]) => {
    let rate = val[0];
    sound?.rate(rate);
    setRate(rate);

    // Update the BPM according to the rate change if we have an original BPM.
    if (originalBpm !== null) {
      let newBpm = originalBpm * rate;
      setCalculatedBpm(newBpm);
    }
  };
  return (
    <div>
      <Slider
        min={0.84}
        max={1.16}
        step={0.0005}
        value={[rate]}
        onValueChange={handleRateChange}
        className="h-60 w-2 flex-col"
        orientation="vertical"
      />
    </div>
  );
};

export default PitchFader;
