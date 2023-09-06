import React, { useRef, useEffect } from "react";
import { createRealTimeBpmProcessor } from "realtime-bpm-analyzer";

interface BpmAnalyzerProps {
  url: string | null;
}

const BpmAnalyzerChatGPT: React.FC<BpmAnalyzerProps> = ({ url }) => {
  return null;
  const playerRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext>();
  const analyzerNodeRef = useRef<AudioWorkletNode | null>(null);

  useEffect(() => {
    if (url) {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const audioContext = audioContextRef.current;
      audioContext.resume().then(() => {
        createRealTimeBpmProcessor(audioContext).then(
          (realtimeAnalyzerNode) => {
            analyzerNodeRef.current = realtimeAnalyzerNode;

            const track = document.getElementById("track") as HTMLAudioElement;
            track.src = url; // Set the url here.
            const source = audioContext.createMediaElementSource(track);

            source.connect(realtimeAnalyzerNode);
            source.connect(audioContext.destination);

            realtimeAnalyzerNode.port.postMessage({
              message: "ASYNC_CONFIGURATION",
              parameters: {
                continuousAnalysis: true,
                stabilizationTime: 20_000,
              },
            });

            realtimeAnalyzerNode.port.onmessage = (event) => {
              if (event.data.message === "BPM") {
                console.log("BPM", event.data.result);
              }
              if (event.data.message === "BPM_STABLE") {
                console.log("BPM_STABLE", event.data.result);
              }
            };
          }
        );
      });
    }
    // When url changes or component unmounts, it will disconnect audio nodes and close the context to clean up.
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (analyzerNodeRef.current) {
        analyzerNodeRef.current.port.postMessage({
          message: "ASYNC_DISCONNECTION",
        });
      }
    };
  }, [url]);

  return <audio id="track" ref={playerRef} />;
};

export default BpmAnalyzerChatGPT;

// Please note that you need to handle the initialization and unmount cleanup logic for the audio
// contexts and connections in the `useEffect` hook's cleanup function.

// Also, pay attention to the presence of `audio` tag in the component's render method.
// This is required for the `createMediaElementSource` function to work properly.

// I have also added `audioContext.resume` call, to handle interactions with the AudioContext
// in response to a user gesture, which is a requirement in some browsers due to auto-play policy.
