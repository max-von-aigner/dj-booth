interface LineFaderProps {
  sound: Howl | null;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  headphoneVolume: number;
  setHeadphoneVolume: React.Dispatch<React.SetStateAction<number>>;
}

const NewLineFader: React.FC<LineFaderProps> = ({
  sound,
  volume,
  setVolume,
  headphoneVolume,
  setHeadphoneVolume,
}) => {
  // Function to handle master volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    if (sound) {
      sound.volume(newVolume);
    }
    setVolume(newVolume);
  };

  // Function to handle headphone volume change
  const handleHeadphoneVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newHeadphoneVolume = parseFloat(e.target.value) / 100;
    setHeadphoneVolume(newHeadphoneVolume);
  };

  return (
    <div>
      <p>Line Fader (Master)</p>
      <input
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        onChange={handleVolumeChange}
      />

      <p>Line Fader (Headphones)</p>
      <input
        type="range"
        min="0"
        max="100"
        value={headphoneVolume * 100}
        onChange={handleHeadphoneVolumeChange}
      />
    </div>
  );
};

export default NewLineFader;
