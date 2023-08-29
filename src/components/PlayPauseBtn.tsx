import { MutableRefObject, useRef } from "react";

// Play button plays the audio file - Pause button pauses audio file - When play button is then clicked again, replay will resume where it was paused
const PlayPauseBtn = ({ sound }: { sound: Howl | null }) => {
  if (sound === null) {
    return null;
  } else {
    console.log(sound);
    return (
      <div>
        <button
          onClick={() => {
            console.log("HELLO");
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
export default PlayPauseBtn;
