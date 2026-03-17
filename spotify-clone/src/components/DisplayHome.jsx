import React, { useContext, useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";
import ArtistItem from "./ArtistItem";

const DisplayHome = () => {
  const { songsData, albumsData, artistsData } = useContext(PlayerContext);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null); // Reference for the scroll container
  const scrollContainerArtistsRef = useRef(null); // Reference for Popular Artists scroll

  useEffect(() => {
    if (albumsData.length > 0 || songsData.length > 0) {
      setLoading(false);
    }
  }, [albumsData, songsData]);

  // Function to scroll left
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  // Function to scroll Popular Artists left
  const handleScrollLeftArtists = () => {
    if (scrollContainerArtistsRef.current) {
      scrollContainerArtistsRef.current.scrollBy({
        left: -300, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  // Function to scroll Popular Artists right
  const handleScrollRightArtists = () => {
    if (scrollContainerArtistsRef.current) {
      scrollContainerArtistsRef.current.scrollBy({
        left: 300, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };  

  return (
    <>
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          {/* ✅ Spinning Loader */}
          <div className="w-16 h-16 border-4 border-gray-300 border-t-green-900 rounded-full animate-spin mb-[300px] mr-[20px]"></div>
        </div>
      ) : (albumsData.length > 0 || songsData.length > 0) ? (
        <>
          <div className="mb-4 ">
            <h1 className="my-5 font-bold text-2xl">Trending Albums</h1>
            <div className="flex overflow-auto max-w-[400px]">
              {albumsData.map((item, index) => (
                <AlbumItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl mt-[50px]">Top Tracks</h1>
            <div className="relative">
              <div className="flex overflow-x-auto space-x-4 pb-4" ref={scrollContainerRef}>
                {songsData.map((item, index) => (
                  <SongItem
                    key={index}
                    name={item.name}
                    desc={item.desc}
                    id={item._id}
                    image={item.image}
                  />
                ))}
              </div>

              {/* Left arrow */}
              <button
                onClick={handleScrollLeft}
                className="absolute left-[-22px] top-[36%] transform -translate-y-1/2 bg-[#242424] text-white p-2 rounded-full"
              >
                <img src={assets.arrow_left} alt="Left Arrow" className="w-4 h-4" />
              </button>

              {/* Right arrow */}
              <button
                onClick={handleScrollRight}
                className="absolute right-[-22px] top-[36%] transform -translate-y-1/2 bg-[#242424] text-white p-2 rounded-full"
              >
                <img src={assets.arrow_right} alt="Right Arrow" className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Popular Artists Section with Scroll Arrows */}
            <div className="mb-4 relative">
            <h1 className="my-5 font-bold text-2xl">Popular Artists</h1>

            <div className="relative">
              <div className="flex overflow-x-auto space-x-4 pb-4" ref={scrollContainerArtistsRef}>
                {artistsData.map((artist, index) => (
                  <ArtistItem
                    key={index}
                    name={artist.name}
                    id={artist._id}
                    image={artist.image}
                  />
                ))}
              </div>

              {/* Left arrow for Popular Artists */}
              <button
                onClick={handleScrollLeftArtists}
                className="absolute left-[-22px] top-[40%] transform -translate-y-1/2 bg-[#242424] text-white p-2 rounded-full"
              >
                <img src={assets.arrow_left} alt="Left Arrow" className="w-4 h-4" />
              </button>

              {/* Right arrow for Popular Artists */}
              <button
                onClick={handleScrollRightArtists}
                className="absolute right-[-22px] top-[40%] transform -translate-y-1/2 bg-[#242424] text-white p-2 rounded-full"
              >
                <img src={assets.arrow_right} alt="Right Arrow" className="w-4 h-4" />
              </button>
            </div>
          </div>

        </>
      ) : (
        <div className="flex justify-center items-center text-[40px] mt-[150px]">
          <h1>No Data Found</h1>
        </div>
      )}
    </>
  );
};

export default DisplayHome;
