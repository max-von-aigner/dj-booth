import React, { FC, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

type WaveformProps = {
  url?: string | null;
  howlInstance?: Howl | null;
};

const Waveform: FC<WaveformProps> = ({ url, howlInstance }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let intervalId: number;
    const updateWaveform = () => {
      if (howlInstance && waveSurferRef.current) {
        const waveformElement = waveformRef.current;

        // Assuming that the direct child div contains the shadow root
        const childDiv: HTMLDivElement | null | undefined =
          waveformElement?.querySelector("div");

        if (childDiv) {
          const shadowRoot: ShadowRoot | null = childDiv.shadowRoot;

          // Make sure the shadow root exists and is open
          if (shadowRoot) {
            const wrapperElement: HTMLElement | null =
              shadowRoot.querySelector(".wrapper");

            // Make sure the wrapper element exists
            if (wrapperElement) {
              const width: string =
                window.getComputedStyle(wrapperElement).width;

              // Width of waveform
              const parsedWidthOfWaveForm = parseFloat(width);

              // We want to have the percentage that is played of the howl instance

              const currentTime = howlInstance.seek() as number;
              const duration = howlInstance.duration();
              const percentagePlayed = (currentTime / duration) * 100;

              // Calculate the left offset
              const leftOffset =
                (percentagePlayed * parsedWidthOfWaveForm) / 100;

              // Update the left property of the wrapperElement
              wrapperElement.style.position = `relative`;
              wrapperElement.style.left = `-${leftOffset}px`;
            } else {
              console.error("Wrapper element not found.");
            }
          } else {
            console.error("Shadow root not found or is closed.");
          }
        } else {
          console.error("Waveform element or its child div not found.");
        }
      }
    };
    let lastUpdateTime: number = 0;
    let animationFrameId: number;

    const frameDuration = 15; // 100ms per frame = 10fps

    const loop = (timestamp: number) => {
      const deltaTime = timestamp - lastUpdateTime;

      if (deltaTime >= frameDuration) {
        updateWaveform();
        lastUpdateTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    if (waveformRef.current && url) {
      setIsLoading(true);

      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "black",
        progressColor: "black",
        minPxPerSec: 100,
        normalize: true,
        cursorWidth: 0,
        cursorColor: "white",
        autoScroll: false,
        autoCenter: true,
        barWidth: 0,
      });

      waveSurferRef.current.on("loading", (percentage) => {
        if (percentage === 100) {
          setIsLoading(false);
        }
      });

      waveSurferRef.current.on("ready", () => {
        setIsLoading(false);
      });

      waveSurferRef.current.load(url);

      return () => {
        waveSurferRef.current?.destroy();
        cancelAnimationFrame(animationFrameId);
      };
    }

    return () => {};
  }, [url, howlInstance]);
  return (
    <div className="w-[30vw] h-30 relative ">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          Loading...
        </div>
      )}
      <div className="playhead"></div>
      <div id="waveform" ref={waveformRef} />
    </div>
  );
};

export default Waveform;
