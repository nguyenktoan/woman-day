import { useState, useRef } from "react";

export default function MusicPlayer({ tracks }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.musicPlayer}>
      <audio ref={audioRef} src={tracks[0]} loop />
      <button onClick={togglePlay}>{isPlaying ? "🔇" : "🎵"}</button>
    </div>
  );
}
