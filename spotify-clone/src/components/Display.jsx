import React, { useEffect, useRef, useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { PlayerContext } from '../context/PlayerContext'
import LikedSongs from './LikedSongs'
import DisplayArtistSongs from './DisplayArtistSongs'

const Display = () => {

  const {albumsData, artistsData} = useContext(PlayerContext);

    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes("album");
    const isArtist = location.pathname.includes("artist");
    const albumId = isAlbum ? location.pathname.split('/').pop() : "";
    const artistId = isArtist ? location.pathname.split('/').pop() : "";  // Get artist ID from URL
    const bgColor = isAlbum && albumsData.length > 0 ? albumsData.find((x)=> (x._id == albumId )).bgColour : "#121212";

    useEffect(() => {
        if(isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
        }
        else {
            displayRef.current.style.background = `#121212`
        }
    })

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[77%] lg:ml'>
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x) => (x._id == albumId))} />} />
        <Route path="/liked-songs" element={<LikedSongs />} />
        <Route path="/artist/:id" element={<DisplayArtistSongs artist={artistsData.find((x) => (x._id == artistId))} />} />  {/* Add the artist route */}
      </Routes>
    </div>
  )
}

export default Display
