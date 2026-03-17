import React, { useContext, useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const DisplayAlbum = ({album}) => {

    const {id} = useParams();
    const [albumData, setAlbumData] = useState("");
    const {playWithId, albumsData, songsData, likedSongs, toggleLike} = useContext(PlayerContext);

    useEffect(() => {
      albumsData.map((item) => {
        if (item._id === id) {
          setAlbumData(item);
        }
      })
    }, [albumsData, id]);

    const getDaysAgo = (id) => {
      const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
      const daysAgo = Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24));
      return daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
    };     

    const formatDuration = (songs) => {
      let totalSeconds = songs.reduce((acc, song) => {
          let [mins, secs] = song.duration.split(':').map(Number);
          return acc + mins * 60 + secs;
      }, 0);
  
      let hours = Math.floor(totalSeconds / 3600);
      let minutes = Math.floor((totalSeconds % 3600) / 60);
  
      return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
  };  

  return albumData ? (
    <>
      <Navbar />
      <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
          <img className='w-48 rounded' src={albumData.image} alt="" />
          <div className='flex flex-col'>
          <p className="text-sm text-gray-400">Playlist</p>
          <h2 className='text-4xl md:text-6xl font-bold mb-4'>{albumData.name}</h2>
          <h4 className="text-gray-300">{albumData.desc}</h4>
          <p className="flex items-center gap-2 mt-2 text-gray-400">
            <img className='w-5' src={assets.spotify_logo} alt="Spotify" />
            <b className="text-white">Spotify</b>
            <span>● <b>{songsData.filter(song => song.album === albumData.name).length} songs, </b> 
                {formatDuration(songsData.filter(song => song.album === albumData.name))}
            </span>
          </p>
        </div>
      </div>
      <div className='grid grid-cols-3 sm:grid-cols-5 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p><b className='mr-4'>#</b><p className='mt-[-24px] ml-[85px]'>Title</p></p>
        <p className='ml-[60px]'>Album</p>
        <p className='hidden sm:block ml-[100px]'>Date added</p>
        <img className='m-auto w-4 ml-[122px]' src={assets.clock_icon} alt="" />
        <p className='text-center mr-[6px]'>Like</p>
      </div>
      <hr />
      {
        songsData.filter((item)=>item.album === album.name).map((item, index) => (
            <div onClick={()=>{playWithId(item._id)}} key={index} className='grid grid-cols-3 sm:grid-cols-5 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                <p className='text-white flex flex-row items-center'>
                    <b className='mr-[2rem] text-[#a7a7a7]'>{index + 1}</b>
                    <img className='inline w-10 mr-5 rounded-sm aspect-[1]' src={item.image} alt="" />
                    <span className='w-[150px] overflow-hidden text-ellipsis whitespace-nowrap block'>{item.name}</span>
                </p>
                <p className='text-[15px] m-3 ml-[60px]'>{albumData.name}</p>
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

export default DisplayAlbum
