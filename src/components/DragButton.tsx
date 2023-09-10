import { motion, useMotionValue, useTransform } from "framer-motion";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import UpDownArrow from "UpDownArrow.svg";

export const DragButton = () => {
  const y = useMotionValue(0);
  const background = useTransform(
    y,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]
  );

  return (
    <motion.div style={{ background }}>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        style={{ y }}
      >
        {/* <Icon x={x} /> */} <span>X</span>
        {/* <UpDownArrow /> */}
      </motion.div>
    </motion.div>
  );
};
