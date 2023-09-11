import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface TickerProps {
  items: string[];
}

const Ticker: React.FC<TickerProps> = ({ items }) => {
  return null;
  const controls = useAnimation();

  useEffect(() => {
    const startAnimation = async () => {
      while (true) {
        await controls.start({
          x: -100,
          transition: { duration: 8, ease: "linear", repeat: Infinity },
        });
        await controls.set({ x: 0 });
        await controls.set({ x: "100%" }); // Move the text to the right (off-screen)
        await controls.start({ x: "0%", transition: { duration: 0 } }); // Reset position
      }
    };

    startAnimation();
  }, [controls]);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <motion.div
        style={{ display: "inline-block", whiteSpace: "nowrap" }}
        animate={controls}
      >
        {items.map((item, index) => (
          <span key={index} style={{ marginRight: "20px" }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Ticker;
