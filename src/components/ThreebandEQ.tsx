import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Howl } from "howler";

interface EQToggleProps {
  sound: Howl | null;
}

const EQToggle: React.FC<EQToggleProps> = ({ sound }) => {
  const [lowGain, setLowGain] = useState(false);
  const [midGain, setMidGain] = useState(false);
  const [highGain, setHighGain] = useState(false);

  useEffect(() => {
    if (sound) {
      // Adjust sound properties based on the toggle values
      // e.g. sound.someMethodToAdjustFrequencyOrVolume(lowGain, midGain, highGain);
      // Keep in mind that you'll need to translate the boolean values of the toggles to some numeric value or state that your sound method understands
    }
  }, [lowGain, midGain, highGain, sound]);

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Switch id="low-gain" onChange={() => setLowGain((prev) => !prev)} />
        <Label htmlFor="low-gain">Low Gain</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="mid-gain" onChange={() => setMidGain((prev) => !prev)} />
        <Label htmlFor="mid-gain">Mid Gain</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="high-gain" onChange={() => setHighGain((prev) => !prev)} />
        <Label htmlFor="high-gain">High Gain</Label>
      </div>
    </div>
  );
};

export default EQToggle;
