import { Howl, Howler } from "howler";
import * as realtimeBpmAnalyzer from "realtime-bpm-analyzer";
import React, { useState, useEffect } from "react";

interface BpmAnalyzerProps {
  url: string | null;
  setBpm: (bpm: number | null) => void;
}

const BpmAnalyzer: React.FC<BpmAnalyzerProps> = ({ url, setBpm }) => {
  // Now you have access to the setBpm function.

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          const audioContext = new AudioContext();

          audioContext.decodeAudioData(arrayBuffer).then((audioBuffer) => {
            realtimeBpmAnalyzer
              .analyzeFullBuffer(audioBuffer)
              .then((topCandidates) => {
                if (topCandidates.length > 0) {
                  setBpm(parseFloat(topCandidates[0].tempo.toFixed(2)));
                }
              });
          });
        });
    }
  }, [url]);

  return null; // Return null because the displaying of BPM is handled in the parent component
};

export default BpmAnalyzer;
