// import LineFader from "./LineFader";

// interface MixerProps {
//   soundA: Howl | null;
//   volumeA: number;
//   setVolumeA: React.Dispatch<React.SetStateAction<number>>;
//   soundB: Howl | null;
//   volumeB: number;
//   setVolumeB: React.Dispatch<React.SetStateAction<number>>;
// }

// const Mixer: React.FC<MixerProps> = ({
//   soundA,
//   volumeA,
//   setVolumeA,
//   soundB,
//   volumeB,
//   setVolumeB,
// }) => {
//   return (
//     <div
//       className=" flex flex-col mb-[2rem] bg-indigo-400 w-[30vw] h-[50vh]  rounded-3xl p-10 drop-shadow-neo border-4 border-black"
//       id="mixer"
//     >
//       <span className="font-sans font-bold text-center -mt-4 mb-10 text-2xl tracking-wider text-slate-200 opacity-70 ">
//         Mixer
//       </span>
//       <div className="flex justify-between px-10">
//         <LineFader sound={soundA} volume={volumeA} setVolume={setVolumeA} />
//         <LineFader sound={soundB} volume={volumeB} setVolume={setVolumeB} />
//       </div>
//     </div>
//   );
// };

// export default Mixer;

import React, { useState } from "react";
import LineFader from "./LineFader";
import EQToggle from "./ThreebandEQ";

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
    <div
      className=" flex flex-col mt-[4rem] bg-theme-blue w-[30vw] h-[45vh]  rounded-3xl p-10 drop-shadow-neo border-4 border-black"
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
    </div>
  );
};

export default Mixer;
