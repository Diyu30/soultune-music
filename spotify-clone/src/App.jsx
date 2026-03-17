import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const { audioRef, track, likedSongs } = useContext(PlayerContext); // ✅ Get likedSongs from context

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
      <Sidebar likedSongs={likedSongs} />
      <Display />
      </div>
      <Player />
      <audio ref={audioRef} src={track?.file} preload="auto"></audio>
    </div>
  );
};

export default App;
