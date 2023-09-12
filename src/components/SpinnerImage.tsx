import { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const SpinnerImage = ({ spin }: { spin: boolean }) => {
  const controls = useAnimation();
  // This is the pause/play state. It can come from props

  useEffect(() => {
    if (spin) {
      controls.start((custom, current, velocity) => {
        // This check needs to be here
        const currentRot = (current.rotate as number) || 0;
        return {
          // We use the current value here
          rotate: currentRot + 360,
          transition: { ease: "linear", duration: 2, repeat: Infinity },
        };
      });
    } else {
      controls.stop();
    }
  }, [spin, controls]);
  //grid place-items-center
  //grid place-content-center
  return (
    <motion.div
      animate={controls}
      id="spinnerImage"
      className="absolute inset-0 justify-center items-center flex pointer-events-none"
    >
      <p className="text-[120px]">🍌</p>
    </motion.div>
  );
};

export default SpinnerImage;
