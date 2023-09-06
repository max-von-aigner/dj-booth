import React, { useEffect, useState, useRef } from "react";
import { Howl } from "howler";

interface TrackProgressBarProps {
  sound: Howl | null;
}

const TrackProgressBar: React.FC<TrackProgressBarProps> = ({ sound }) => {
  const [progress, setProgress] = useState(0);
  const progressDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sound) return;

    const interval = setInterval(() => {
      const duration = sound.duration();
      const seek = sound.seek();

      if (typeof duration === "number" && typeof seek === "number") {
        setProgress((seek / duration) * 100);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [sound]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!sound || !progressDiv.current) return;

    const rect = progressDiv.current.getBoundingClientRect();
    const x = event.clientX - rect.left; // X position within the element.
    const width = rect.width;
    const duration = sound.duration();

    const seekTime = (x / width) * duration;
    sound.seek(seekTime);
  };

  return (
    <div
      ref={progressDiv}
      onClick={handleClick}
      style={{
        border: "1px solid #000",
        height: "20px",
        backgroundColor: "#ccc",
      }}
    >
      <div
        style={{ width: `${progress}%`, height: "100%", background: "blue" }}
      ></div>
    </div>
  );
};

export default TrackProgressBar;
