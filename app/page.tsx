"use client";

import { useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
} from "lucide-react";

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const initialTracks = [
    {
      title: "Mešano meso",
      artist: "123",
      src: "/music/mesanomeso.mp3",
      liked: false,
    },
    {
      title: "Kebab Vibes",
      artist: "DJ Grill",
      src: "/music/test2.mp3",
      liked: false,
    },
    {
      title: "Čevap Flow",
      artist: "Ćevap Boy",
      src: "/music/test3.mp3",
      liked: false,
    },
  ];

  const [tracks, setTracks] = useState(initialTracks);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [search, setSearch] = useState("");

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

  const toggleLike = (index: number) => {
    const updated = [...tracks];
    updated[index].liked = !updated[index].liked;
    setTracks(updated);
  };

  // Filter skladb
  const filteredTracks = tracks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6">
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

        {/* SEARCH BAR */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Išči skladbe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* TRACK LIST */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Playlist
          </h3>

          {filteredTracks.map((track, index) => {
            // Ker se filteredTracks uporablja, potrebujemo originalni index
            const realIndex = tracks.findIndex(
              (t) => t.title === track.title
            );

            return (
              <div
                key={realIndex}
                className={`p-3 rounded-xl transition w-full flex items-center justify-between ${
                  realIndex === currentTrack
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <button
                  onClick={() => {
                    setCurrentTrack(realIndex);
                    setIsPlaying(false);
                  }}
                  className="flex flex-col text-left"
                >
                  <span>{track.title}</span>
                  <span className="text-sm opacity-70">{track.artist}</span>
                </button>

                {/* HEART BUTTON */}
                <button
                  onClick={() => toggleLike(realIndex)}
                  className="p-2 hover:scale-110 transition"
                >
                  <Heart
                    size={22}
                    fill={track.liked ? "red" : "none"}
                    color={track.liked ? "red" : "white"}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
