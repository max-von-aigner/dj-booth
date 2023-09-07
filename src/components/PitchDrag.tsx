import { useEffect, useState } from "react";
import { Howl } from "howler";
import React from "react";
import { Button } from "@/components/ui/button";

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
      <Button
        className="bg-theme-yellow rounded-xl m-1 mb-4 border-2 drop-shadow-2xl border-white"
        onMouseDown={() => handlePitchDrag(false)}
        onMouseUp={handlePitchDragEnd}
      >
        -
      </Button>
      <Button
        className="bg-theme-yellow rounded-xl m-1 border-2 drop-shadow-2xl border-white"
        onMouseDown={() => handlePitchDrag(true)}
        onMouseUp={handlePitchDragEnd}
      >
        +
      </Button>
    </div>
  );
};

export default PitchDrag;
