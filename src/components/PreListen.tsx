interface PreListenProps {
  sound: Howl | null;
  headphoneVolume: number;
}

const PreListen: React.FC<PreListenProps> = ({ sound, headphoneVolume }) => {
  // Function to handle headphone volume change
  const handleHeadphoneVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newHeadphoneVolume = parseFloat(e.target.value) / 100;
    if (sound) {
      sound.volume(newHeadphoneVolume);
    }
  };

  return (
    <div>
      <p>Pre-Listen</p>
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

export default PreListen;
