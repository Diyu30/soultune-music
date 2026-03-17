import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";

const LikedSongs = () => {
  const { likedSongs, playWithId, toggleLike } = useContext(PlayerContext);
  const likedSongsArray = Object.values(likedSongs);

  const getDaysAgo = (id) => {
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
    const daysAgo = Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24));
    return daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-[#691eaa] to-gray-900 p-8 rounded-lg">
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
          <img
            className="w-48 rounded shadow-lg"
            src={assets.liked_img} // Example liked songs image
            alt="Liked Songs"
          />
          <div className="flex flex-col text-white">
            <p className="text-sm text-gray-300">Playlist</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Liked Songs</h2>
            <p className="flex items-center gap-2 mt-2 text-gray-400">
              <img className="w-5" src={assets.spotify_logo} alt="Spotify" />
              <b className="text-white">Spotify</b>
              <span>
                ● <b>{likedSongsArray.length} songs </b>
              </span>
            </p>
            </div>
        </div>
      </div>

      {likedSongsArray.length === 0 ? (
        <p className="mt-6 text-gray-400">No liked songs yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-5 mt-10 mb-4 pl-2 text-[#a7a7a7]">
            <p>
              <b className="mr-4">#</b>
              <p className="mt-[-24px] ml-[85px]">Title</p>
            </p>
            <p className="ml-[60px]">Album</p>
            <p className="hidden sm:block ml-[100px]">Date added</p>
            <img className="m-auto w-4 ml-[122px]" src={assets.clock_icon} alt="" />
            <p className="text-center mr-[6px]">Like</p>
          </div>
          <hr />

          {likedSongsArray.map((item, index) => (
            <div
              onClick={() => playWithId(item._id)}
              key={index}
              className="grid grid-cols-3 sm:grid-cols-5 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            >
              <p className="text-white flex flex-row items-center">
                <b className="mr-[2rem] text-[#a7a7a7]">{index + 1}</b>
                <img className="inline w-10 mr-5 rounded-sm aspect-[1]" src={item.image} alt="" />
                <span className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap block">{item.name}</span>
              </p>
              <p className="text-[15px] m-3 ml-[60px]">{item.album}</p>
              <p className="text-[15px] hidden sm:block ml-[100px]">{getDaysAgo(item._id)}</p>
              <p className="text-[15px] text-center">{item.duration}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(item);
                }}
                className="text-xl"
              >
                {likedSongs[item._id] ? "❤️" : "🤍"}
              </button>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default LikedSongs;
