import { MutableRefObject, useRef } from "react";

const PlayPauseBtn = ({ sound }: { sound: MutableRefObject<Howl> }) => {
  return (
    <div>
      <button onClick={() => sound.current.play()}>Play</button>
      <button onClick={() => sound.current.pause()}>Pause</button>
    </div>
  );
};
export default PlayPauseBtn;
