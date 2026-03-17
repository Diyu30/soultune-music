import React, { useContext, useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const DisplayArtistSongs = ({artist}) => {

    const {id} = useParams();
    const [artistData, setArtistData] = useState("");
    const {playWithId, artistsData, songsData, likedSongs, toggleLike} = useContext(PlayerContext);

    useEffect(() => {
      artistsData.map((item) => {
        if (item._id === id) {
          setArtistData(item);
        }
      })
    }, [artistsData, id]);

    const getDaysAgo = (id) => {
      const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
      const daysAgo = Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24));
      return daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
    };     

  return artistData ? (
    <>
      <Navbar />
      <div className='bg-gradient-to-b from-[#494749] to-gray-900 p-8 rounded-lg'>
        <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
            <img className='w-[15rem] h-[15rem] rounded-full' src={artistData.image} alt="" />
            <div className='flex flex-col'>
            <p className="text-sm text-gray-300 ml-[20px] text-md font-bold">Artist</p>
            <h2 className='text-4xl md:text-8xl font-bold mb-4'>{artistData.name}</h2>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 sm:grid-cols-5 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
          <p><b className='mr-4'>#</b><p className='mt-[-24px] ml-[85px]'>Title</p></p>
          <p className='ml-[60px]'>Artist</p>
          <p className='hidden sm:block ml-[100px]'>Date added</p>
          <img className='m-auto w-4 ml-[122px]' src={assets.clock_icon} alt="" />
          <p className='text-center mr-[6px]'>Like</p>
        </div>
      <hr />
      {
        songsData.filter((item) => 
          item.artist.some((artist) => artist === artistData.name) // Check if any artist matches
        ).map((item, index) => (
          <div onClick={() => { playWithId(item._id) }} key={index} className='grid grid-cols-3 sm:grid-cols-5 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
            <p className='text-white flex flex-row items-center'>
              <b className='mr-[2rem] text-[#a7a7a7]'>{index + 1}</b>
              <img className='inline w-10 mr-5 rounded-sm aspect-[1]' src={item.image} alt="" />
              <span className='w-[150px] overflow-hidden text-ellipsis whitespace-nowrap block'>{item.name}</span>
            </p>
            <div className="relative group w-[150px] m-3 ml-[60px]">
              <p className="text-[15px] overflow-hidden text-ellipsis whitespace-nowrap block">
                {item.artist.join(', ')}
              </p>

              {/* Custom tooltip */}
              <div className="absolute top-full left-0 mt-2 w-max max-w-[300px] bg-[#232323] text-white text-sm px-4 py-2 rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {item.artist.join(', ')}
              </div>
            </div>
            <p className='text-[15px] hidden sm:block ml-[100px]'>{getDaysAgo(item._id)}</p>
            <p className='text-[15px] text-center'>{item.duration}</p>
            <button onClick={(e) => { e.stopPropagation(); toggleLike(item); }} className='text-xl'>
              {likedSongs[item._id] ? "❤️" : "🤍"}
            </button>
          </div>
        ))
      }

    </>
  ) : null
}

export default DisplayArtistSongs
