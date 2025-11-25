"use client";

import { useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const tracks = [
    {
      title: "Mešano meso",
      artist: "123",
      src: "/music/mesanomeso.mp3",
    },
    {
      title: "Kebab Vibes",
      artist: "DJ albo",
      src: "/music/test2.mp3",
    },
    {
      title: "Čevap Flow",
      artist: "pjebi iz juga",
      src: "/music/test3.mp3",
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
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

      {/* CONTAINER */}
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-3xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Zvokify – Predvajalnik
        </h1>

        {/* CURRENT TRACK INFO */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">{tracks[currentTrack].title}</h2>
          <p className="text-gray-400">{tracks[currentTrack].artist}</p>
        </div>

        {/* AUDIO */}
        <audio
          ref={audioRef}
          src={tracks[currentTrack].src}
          onEnded={nextTrack}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* PLAYER CONTROLS */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={prevTrack}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
          >
            <SkipBack />
          </button>

          <button
            onClick={togglePlay}
            className="p-5 bg-indigo-600 rounded-full hover:bg-indigo-500 transition"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={nextTrack}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
          >
            <SkipForward />
          </button>
        </div>


        {/* TRACK LIST */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Playlist
          </h3>

          {tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTrack(index);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-xl transition w-full flex justify-between items-center ${
                index === currentTrack
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              <span>{track.title}</span>
              <span className="text-sm opacity-70">{track.artist}</span>
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}
