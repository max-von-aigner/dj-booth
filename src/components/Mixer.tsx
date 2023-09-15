import React, { useState } from "react";
import LineFader from "./LineFader";
import EQToggle from "./ThreebandEQ";
import { motion } from "framer-motion";

interface MixerProps {
  soundA: Howl | null;
  volumeA: number;
  setVolumeA: React.Dispatch<React.SetStateAction<number>>;
  soundB: Howl | null;
  volumeB: number;
  setVolumeB: React.Dispatch<React.SetStateAction<number>>;
}

const Mixer: React.FC<MixerProps> = ({
  soundA,
  volumeA,
  setVolumeA,
  soundB,
  volumeB,
  setVolumeB,
}) => {
  // EQ states for soundA
  // const [lowGainA, setLowGainA] = useState(0);
  // const [midGainA, setMidGainA] = useState(0);
  // const [highGainA, setHighGainA] = useState(0);

  // EQ states for soundB
  // const [lowGainB, setLowGainB] = useState(0);
  // const [midGainB, setMidGainB] = useState(0);
  // const [highGainB, setHighGainB] = useState(0);

  return (
    <motion.div
      initial={{
        top: 500,
        scale: 0.8,
      }}
      animate={{
        top: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.75,
      }}
      className="relative flex flex-col bg-theme-blue row-span-3 rounded-3xl p-10 drop-shadow-neo border-4 border-black"
      id="mixer"
    >
      <span className="font-sans font-bold text-center -mt-4 mb-10 text-2xl tracking-wider text-slate-200 opacity-70 ">
        Mixer
      </span>

      <div className="flex justify-between px-10">
        <div>
          <LineFader sound={soundA} volume={volumeA} setVolume={setVolumeA} />
          {/* <EQToggle sound={soundA} /> */}
        </div>
        <div>
          <LineFader sound={soundB} volume={volumeB} setVolume={setVolumeB} />
          {/* <EQToggle sound={soundB} /> */}
        </div>
      </div>
    </motion.div>
  );
};

export default Mixer;
