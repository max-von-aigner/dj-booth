import LineFader from "./LineFader";

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
  return (
    <div
      className=" flex flex-col mt-[15rem] bg-indigo-400 w-[30vw] h-[50vh]  rounded-3xl p-10 drop-shadow-neo border-4 border-black"
      id="mixer"
    >
      <span className="font-sans font-bold text-center -mt-4 mb-10 text-2xl tracking-wider text-slate-200 opacity-70 ">
        Mixer
      </span>
      <div className="flex justify-between px-10">
        <LineFader sound={soundA} volume={volumeA} setVolume={setVolumeA} />
        <LineFader sound={soundB} volume={volumeB} setVolume={setVolumeB} />
      </div>
    </div>
  );
};

export default Mixer;
