import { motion, useMotionValue, useTransform } from "framer-motion";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import UpDownArrow from "UpDownArrow.svg";
import { Button } from "./ui/button";

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
        className="w-4 h-4 rounded-full flex items-center justify-center"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        style={{ y }}
      >
        {/* <Icon x={x} /> */} <Button className="w-4 h-4">X</Button>
        {/* <UpDownArrow /> */}
      </motion.div>
    </motion.div>
  );
};
