import { Howl, Howler } from "howler";
import * as realtimeBpmAnalyzer from "realtime-bpm-analyzer";
import React from "react";
import { useState, useEffect } from "react";

interface BpmAnalyzerProps {
  url: string | null;
}

const BpmAnalyzer: React.FC<BpmAnalyzerProps> = ({ url }) => {
  useEffect(() => {
    if (url) {
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          const audioContext = new AudioContext();

          audioContext.decodeAudioData(arrayBuffer).then((audioBuffer) => {
            // audioBuffer

            // The result is passed to the analyzer
            realtimeBpmAnalyzer
              .analyzeFullBuffer(audioBuffer)
              .then((topCandidates) => {
                // Do something with the BPM
                console.log("Bpm topCandidates", topCandidates);
              });
          });
        });
    }
  }, [url]); // Run this useEffect whenever 'url' prop changes

  return null;
};

export default BpmAnalyzer;
