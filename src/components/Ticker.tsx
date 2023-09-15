import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Track } from "./FileUpload";

interface TickerProps {
  track: Track | null;
}

const Ticker: React.FC<TickerProps> = ({ track }) => {
  if (!track) {
    return (
      <div style={{ width: "100%", overflow: "hidden" }}>
        <motion.div
          className="relative p-2"
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
          animate={{
            right: ["-50%", "100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          <span style={{ marginRight: "20px" }}>No Track Loaded</span>
        </motion.div>
      </div>
    );
  }
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <motion.div
        className="relative"
        style={{ display: "inline-block", whiteSpace: "nowrap" }}
        animate={{
          right: ["-100%", "100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        <div className="flex flex-row p-2">
          <ul className="flex justify-evenly">
            <li style={{ marginRight: "20px" }}>{track.name}</li>
            {/* <li>{"  🎵  "}</li>
            <li style={{ marginRight: "20px" }}>{track.name}</li> */}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Ticker;
