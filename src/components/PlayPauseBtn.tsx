import { MutableRefObject, useRef } from "react";

// Play button plays the audio file - Pause button pauses audio file - When play button is then clicked again, replay will resume where it was paused
const PlayPauseBtnA = ({ sound }: { sound: Howl | null }) => {
  if (sound === null) {
    return null;
  } else {
    return (
      <div>
        <button
          onClick={() => {
            sound?.play();
          }}
        >
          Play
        </button>
        <button onClick={() => sound?.pause()}>Pause</button>
      </div>
    );
  }
};
export default PlayPauseBtnA;
