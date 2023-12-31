import { useEffect, useState } from "react";
import { Howl } from "howler";
import React from "react";
import { Button } from "@/components/ui/button";

interface PitchBendProps {
  sound: Howl | null;
}

const PitchBend: React.FC<PitchBendProps> = ({ sound }) => {
  const [dragging, setDragging] = useState(false);

  // Function to handle pitch drag
  const handlePitchDrag = (increase: boolean) => {
    if (sound) {
      sound.rate(increase ? 1.05 : 0.95);
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
    <div className="flex flex-col ml-5 ">
      <Button
        className="bg-theme-yellow w-3 h-3 rounded-m m-1 border-2 drop-shadow-2xl border-white  text-black"
        onMouseDown={() => handlePitchDrag(true)}
        onMouseUp={handlePitchDragEnd}
      >
        +
      </Button>
      <Button
        className="bg-theme-yellow w-3 h-3 rounded-m m-1 mb-4 border-2 drop-shadow-2xl border-white text-black"
        onMouseDown={() => handlePitchDrag(false)}
        onMouseUp={handlePitchDragEnd}
      >
        -
      </Button>
    </div>
  );
};

export default PitchBend;
