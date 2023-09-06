import { useEffect } from "react";
import { createRealTimeBpmProcessor } from "realtime-bpm-analyzer";

const BpmAnalyzerContinious = ({ src }: { src: string | null }) => {
  return null;
  useEffect(() => {
    const initialize = async () => {
      const audioContext = new AudioContext();

      const realtimeAnalyzerNode = await createRealTimeBpmProcessor(
        audioContext
      );

      // Set the source with the HTML Audio Node
      const trackElement = document.getElementById(
        "track"
      ) as HTMLMediaElement | null;
      console.log(src);
      if (trackElement === null) return;
      const source = audioContext.createMediaElementSource(trackElement);

      // Connect nodes together
      source.connect(realtimeAnalyzerNode);
      source.connect(audioContext.destination);

      realtimeAnalyzerNode.port.onmessage = (event) => {
        if (event.data.message === "BPM") {
          //   console.log("BPM", event.data.result);
        }
        if (event.data.message === "BPM_STABLE") {
          //   console.log("BPM_STABLE", event.data.result);
        }
      };
    };
    if (src) initialize();
  }, [src]);

  console.log(src);
  if (src === null) return null;

  return <audio src={src} id="track"></audio>;
};

export default BpmAnalyzerContinious;
