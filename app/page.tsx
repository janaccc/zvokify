"use client";

import { useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Dodaj nekaj testnih skladb (MP3 URL-jev)
  const tracks = [
    {
      title: "Mešano meso",
      artist: "123",
      src: "/music/mesanomeso.mp3",
    },

  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">🎵 Simple MP3 Player</h1>

        <h2 className="text-xl font-semibold">{tracks[currentTrack].title}</h2>
        <p className="text-gray-400 mb-4">{tracks[currentTrack].artist}</p>

        <audio
          ref={audioRef}
          src={tracks[currentTrack].src}
          onEnded={nextTrack}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className="flex justify-center items-center gap-6 mt-4">
          <button
            onClick={prevTrack}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
          >
            <SkipBack />
          </button>

          <button
            onClick={togglePlay}
            className="p-5 bg-indigo-600 rounded-full hover:bg-indigo-500 text-white"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={nextTrack}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
          >
            <SkipForward />
          </button>
        </div>
      </div>
    </main>
  );
}
