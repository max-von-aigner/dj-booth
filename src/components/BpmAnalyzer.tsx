// import { Howl, Howler } from "howler";
// import { createRealTimeBpmProcessor } from "realtime-bpm-analyzer";
// import React, { useEffect } from "react";

// interface BpmAnalyzerProps {
//   sound: Howl | null;
//   setBpm: (bpm: number) => void;
// }

// const BpmAnalyzer: React.FC<BpmAnalyzerProps> = ({ sound, setBpm }) => {
//   useEffect(() => {
//     if (sound) {
//       const handleLoad = async () => {
//         // Get the AudioContext from howler.js
//         const audioContext = Howler.ctx;

//         // Create the analyzer node
//         const realtimeAnalyzerNode = await createRealTimeBpmProcessor(
//           audioContext
//         );

//         // Connect the sound source to the analyzer node
//         const source = audioContext.createMediaElementSource(sound._src);
//         source.connect(realtimeAnalyzerNode);
//         realtimeAnalyzerNode.connect(audioContext.destination);

//         // Enable the continuous feature
//         realtimeAnalyzerNode.port.postMessage({
//           message: "ASYNC_CONFIGURATION",
//           parameters: {
//             continuousAnalysis: true,
//             stabilizationTime: 20_000,
//           },
//         });

//         realtimeAnalyzerNode.port.onmessage = (event) => {
//           if (
//             event.data.message === "BPM" ||
//             event.data.message === "BPM_STABLE"
//           ) {
//             console.log("Detected BPM: ", event.data.result.bpm);
//             setBpm(event.data.result.bpm);
//           }
//         };
//       };

//       sound.once("load", handleLoad);
//     }
//   }, [sound]);

//   return null;
// };

// export default BpmAnalyzer;
