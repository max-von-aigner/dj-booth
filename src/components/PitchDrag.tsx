import { useEffect, useState } from "react";
import { Howl } from "howler";
import React from "react";

interface PitchDragProps {
  sound: Howl | null;
}

const PitchDrag: React.FC<PitchDragProps> = ({ sound }) => {
  const [dragging, setDragging] = useState(false);

  // Function to handle pitch drag
  const handlePitchDrag = (increase: boolean) => {
    if (sound) {
      sound.rate(increase ? 1.03 : 0.97);
      setDragging(true);
    }
  };

  // Function to handle pitch drag end
  const handlePitchDragEnd = () => {
    if (sound) {
      sound.rate(1);
      setDragging(false);
    }
  };

  // Reset pitch drag on unmount and when sound changes
  useEffect(() => {
    return () => {
      if (dragging && sound) {
        sound.rate(1);
      }
    };
  }, [dragging, sound]);

  return (
    <div>
      <p>Pitch Drag</p>
      <button
        onMouseDown={() => handlePitchDrag(false)}
        onMouseUp={handlePitchDragEnd}
      >
        -
      </button>
      <button
        onMouseDown={() => handlePitchDrag(true)}
        onMouseUp={handlePitchDragEnd}
      >
        +
      </button>
    </div>
  );
};

export default PitchDrag;
