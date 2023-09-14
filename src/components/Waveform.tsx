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

  // useEffect(() => {
  //   if (waveformRef.current && url) {
  //     setIsLoading(true);

  //     waveSurferRef.current = WaveSurfer.create({
  //       container: waveformRef.current,
  //       waveColor: "black",
  //       progressColor: "black",
  //       minPxPerSec: 100,
  //       normalize: true,
  //       cursorWidth: 2,
  //       cursorColor: "red",
  //       // autoCenter: true,
  //       autoScroll: true,
  //     });

  //     waveSurferRef.current.on("loading", (percentage) => {
  //       if (percentage === 100) {
  //         setIsLoading(false);
  //       }
  //     });

  //     waveSurferRef.current.on("ready", () => {
  //       setIsLoading(false);
  //     });

  //     waveSurferRef.current.load(url);

  //     return () => {
  //       waveSurferRef.current?.destroy();
  //     };
  //   }

  //   return () => {};
  // }, [url, howlInstance]);

  useEffect(() => {
    let intervalId: number;

    const updateWaveform = () => {
      if (howlInstance && waveSurferRef.current) {
        const waveformElement: HTMLElement | null =
          document.getElementById("waveform");

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

      // Call updateWaveform approximately 30 times a second (~33.3ms intervals)
      // intervalId = window.setInterval(updateWaveform, 33.3);

      // // Cleanup function: stops the interval when the component is unmounted
      // return () => {
      //   window.clearInterval(intervalId);
      // };

      // Start the loop
      // animationFrameId = requestAnimationFrame(updateWaveform);

      // Cleanup function: stops the loop when the component is unmounted
      // return () => {
      //   cancelAnimationFrame(animationFrameId);
      // };
    };
    let lastUpdateTime: number = 0;
    let animationFrameId: number;

    const frameDuration = 33; // 100ms per frame = 10fps

    const loop = (timestamp: number) => {
      const deltaTime = timestamp - lastUpdateTime;

      if (deltaTime >= frameDuration) {
        updateWaveform();
        lastUpdateTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    // Cleanup function: stops the animation frame when the component is unmounted
    // return () => {
    //   cancelAnimationFrame(animationFrameId);
    // };

    if (waveformRef.current && url) {
      setIsLoading(true);

      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "black",
        progressColor: "black",
        minPxPerSec: 100,
        normalize: true,
        cursorWidth: 2,
        cursorColor: "red",
        autoScroll: false,
        autoCenter: true,
      });

      waveSurferRef.current.on("loading", (percentage) => {
        if (percentage === 100) {
          setIsLoading(false);
        }
      });

      waveSurferRef.current.on("ready", () => {
        setIsLoading(false);
        // if (howlInstance?.playing()) {
        //   // Start updating WaveSurfer if the audio is playing
        //   animationFrameId = requestAnimationFrame(updateWaveform);
        // }
      });

      waveSurferRef.current.load(url);

      // Listen to Howler's play event to start updating WaveSurfer
      // howlInstance?.on("play", () => {
      //   // animationFrameId = requestAnimationFrame(updateWaveform);
      // });

      return () => {
        waveSurferRef.current?.destroy();
        cancelAnimationFrame(animationFrameId);
        // Cancel the animation frame when unmounting the component
        // if (animationFrameId) {
        //   cancelAnimationFrame(animationFrameId);
        // }
      };
    }

    return () => {};
  }, [url, howlInstance]);

  // Update WaveSurfer's position based on the Howl instance's progress
  // useEffect(() => {
  //   if (howlInstance) {
  //     const updatePosition = () => {
  //       const currentTime = howlInstance.seek() as number;
  //       console.log(currentTime);

  //       waveSurferRef.current?.seekTo(currentTime / howlInstance.duration());
  //       console.log(howlInstance.duration());
  //     };

  //     howlInstance.on("play", updatePosition);
  //     howlInstance.on("seek", updatePosition);

  //     return () => {
  //       howlInstance.off("play", updatePosition);
  //       howlInstance.off("seek", updatePosition);
  //     };
  //   }
  // }, [howlInstance]);

  // Update WaveSurfer's position based on the Howl instance's progress

  // useEffect(() => {
  //   let animationFrameId: number;
  //   let lastUpdateTime = Date.now();

  //   const updatePosition = () => {
  //     const currentTime = Date.now();

  //     if (currentTime - lastUpdateTime >= 1000 / 30) {
  //       // approximately 30 FPS
  //       const currentPlayTime = howlInstance?.seek() as number;
  //       waveSurferRef.current?.seekTo(
  //         currentPlayTime / (howlInstance?.duration() || 1)
  //       );
  //       lastUpdateTime = currentTime;
  //     }

  //     animationFrameId = requestAnimationFrame(updatePosition);
  //   };

  //   if (howlInstance) {
  //     howlInstance.on("play", () => {
  //       // Start the animation loop when the audio starts playing
  //       animationFrameId = requestAnimationFrame(updatePosition);
  //     });

  //     howlInstance.on("seek", () => {
  //       // Update the position immediately when the user seeks
  //       const currentPlayTime = howlInstance.seek() as number;
  //       waveSurferRef.current?.seekTo(
  //         currentPlayTime / (howlInstance?.duration() || 1)
  //       );
  //     });
  //   }

  //   return () => {
  //     howlInstance?.off("play");
  //     howlInstance?.off("seek");

  //     // Cancel the animation loop when the component unmounts or when howlInstance changes
  //     if (animationFrameId) {
  //       cancelAnimationFrame(animationFrameId);
  //     }
  //   };
  // }, [howlInstance]);

  return (
    <div className="w-[30vw] h-60 relative ">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          Loading...
        </div>
      )}
      <div className="playhead"></div>
      <div id="waveform" ref={waveformRef}></div>
    </div>
  );
};

export default Waveform;
