"use client";

import { useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Home,
  Library,
  Search,
} from "lucide-react";

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
      artist: "Pjebi iz juga",
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
    <main className="flex bg-black text-white h-screen overflow-hidden">

      {/* ---- LEFT SIDEBAR ---- */}
      <aside className="w-64 bg-neutral-900 p-6 flex flex-col gap-8">
        <h1 className="text-3xl font-bold tracking-tight">Zvokify</h1>

        <nav className="flex flex-col gap-3 text-neutral-300">
          <button className="flex items-center gap-3 hover:text-white transition text-lg">
            <Home size={20} /> Domov
          </button>
          <button className="flex items-center gap-3 hover:text-white transition text-lg">
            <Search size={20} /> Iskanje
          </button>
          <button className="flex items-center gap-3 hover:text-white transition text-lg">
            <Library size={20} /> Knjižnica
          </button>
        </nav>
      </aside>

      {/* ---- MAIN CONTENT ---- */}
      <section className="flex-1 flex flex-col bg-gradient-to-b from-neutral-800 to-black p-8 overflow-y-auto">

        <h2 className="text-2xl font-bold mb-6">Playlists</h2>

        <div className="grid grid-cols-3 gap-6">

          {tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTrack(index);
                setIsPlaying(false);
              }}
              className="bg-neutral-900 hover:bg-neutral-800 p-4 rounded-xl transition text-left"
            >
              <div className="text-lg font-bold">{track.title}</div>
              <div className="text-neutral-400 text-sm">{track.artist}</div>
            </button>
          ))}

        </div>
      </section>

      {/* ---- MUSIC PLAYER ---- */}
      <footer className="absolute bottom-0 left-0 right-0 bg-neutral-900 p-4 border-t border-neutral-700 flex items-center justify-between">

        {/* CURRENT SONG INFO */}
        <div className="ml-6">
          <div className="font-semibold">{tracks[currentTrack].title}</div>
          <div className="text-neutral-400 text-sm">{tracks[currentTrack].artist}</div>
        </div>

        {/* AUDIO SYSTEM */}
        <audio
          ref={audioRef}
          src={tracks[currentTrack].src}
          onEnded={nextTrack}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* CONTROLS */}
        <div className="flex items-center gap-6">
          <button
            onClick={prevTrack}
            className="p-2 hover:bg-neutral-800 rounded-full"
          >
            <SkipBack />
          </button>

          <button
            onClick={togglePlay}
            className="p-3 bg-white text-black hover:scale-105 transition rounded-full"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <button
            onClick={nextTrack}
            className="p-2 hover:bg-neutral-800 rounded-full"
          >
            <SkipForward />
          </button>
        </div>

        <div className="w-24" />

      </footer>
    </main>
  );
}
